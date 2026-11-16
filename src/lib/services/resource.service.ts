import "server-only";

import { revalidatePath } from "next/cache";

// ADJUST THIS IMPORT to wherever your server-side Supabase client lives
// (the same one media.service.ts uses). It must be the cookie-aware client
// so auth.uid() / is_capp_admin() work inside RLS.
import { createClient } from "@/lib/supabase/server";

import {
  RESOURCE_GROUP_IDS,
  RESOURCE_ICONS,
  type ResourceIcon,
} from "@/lib/resources/constants";
import type { LibraryResource, ResourceGroup, ResourceIconName } from "@/types";

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const TABLE = "library_resources";

// The constants live in lib/resources/constants.ts so client components can use them
// (this file is server-only). Re-exported here for convenience on the server.
export { RESOURCE_GROUP_IDS, RESOURCE_ICONS };
export type { ResourceIcon };

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

/** Raw row shape from Supabase. */
interface ResourceRow {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string | null;
  icon: string;
  group_id: ResourceGroup;
  sort_order: number;
  is_published: boolean;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

/** What the admin dashboard works with (public fields plus management fields). */
export interface AdminResource extends LibraryResource {
  sortOrder: number;
  isPublished: boolean;
  updatedAt: string;
}

/** Fields an admin supplies when creating a resource. */
export interface CreateResourceInput {
  title: string;
  description: string;
  group: ResourceGroup;
  category: string;
  href?: string | null;
  icon: ResourceIcon;
  /** Optional. Defaults to the end of the group. */
  sortOrder?: number;
  /** Optional. Defaults to false (draft). */
  isPublished?: boolean;
}

/** Fields an admin can change on an existing resource. The id never changes. */
export type UpdateResourceInput = Partial<Omit<CreateResourceInput, never>>;

/** Thrown for anything the UI should show to the admin. */
export class ResourceServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResourceServiceError";
  }
}

/* -------------------------------------------------------------------------- */
/* Mapping and validation helpers                                             */
/* -------------------------------------------------------------------------- */

/**
 * The DB stores icon as plain text, but the UI expects the ResourceIconName union.
 * Anything unrecognised falls back to "document" (the card's own default).
 */
function toIconName(icon: string): ResourceIconName {
  return (RESOURCE_ICONS as readonly string[]).includes(icon)
    ? (icon as ResourceIconName)
    : "document";
}

/**
 * Orders rows by group (the order of RESOURCE_GROUP_IDS), then sort_order, then title.
 * Group-aware so a group with many items can never interleave with the next group.
 */
function sortByGroupThenOrder<
  T extends { group_id: ResourceGroup; sort_order: number; title: string },
>(rows: T[]): T[] {
  return [...rows].sort(
    (a, b) =>
      RESOURCE_GROUP_IDS.indexOf(a.group_id) - RESOURCE_GROUP_IDS.indexOf(b.group_id) ||
      a.sort_order - b.sort_order ||
      a.title.localeCompare(b.title),
  );
}

/** Public mapping: keeps the UI's existing LibraryResource contract. */
function toLibraryResource(row: ResourceRow): LibraryResource {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    href: row.href ?? "#",
    icon: toIconName(row.icon),
    group: row.group_id,
  };
}

function toAdminResource(row: ResourceRow): AdminResource {
  return {
    ...toLibraryResource(row),
    // Admins should see the real value, not the "#" fallback.
    href: row.href ?? "",
    sortOrder: row.sort_order,
    isPublished: row.is_published,
    updatedAt: row.updated_at,
  };
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "resource"
  );
}

/** Empty string -> null. Otherwise must be an http(s) URL or an internal path. */
function normaliseHref(href: string | null | undefined): string | null {
  const value = href?.trim();
  if (!value) return null;

  if (value.startsWith("/")) return value; // internal route

  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") return value;
  } catch {
    /* fall through */
  }
  throw new ResourceServiceError(
    "The link must start with https:// (or be an internal path like /events).",
  );
}

function requireText(value: string | undefined, label: string): string {
  const trimmed = value?.trim();
  if (!trimmed) throw new ResourceServiceError(`${label} is required.`);
  return trimmed;
}

function assertGroup(group: string): asserts group is ResourceGroup {
  if (!(RESOURCE_GROUP_IDS as readonly string[]).includes(group)) {
    throw new ResourceServiceError("Choose a valid group.");
  }
}

function assertIcon(icon: string): asserts icon is ResourceIcon {
  if (!(RESOURCE_ICONS as readonly string[]).includes(icon)) {
    throw new ResourceServiceError("Choose a supported icon.");
  }
}

/** Refresh the public page after any change. */
function refreshPublicPage() {
  revalidatePath("/resources");
}

/* -------------------------------------------------------------------------- */
/* Admin guard                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Confirms there is a signed-in user and that is_capp_admin() is true.
 * RLS is the real security boundary; this gives a clear error before hitting it
 * and stops non-admins from reaching admin-only reads.
 */
async function requireAdmin() {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    throw new ResourceServiceError("You need to be signed in.");
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc("is_capp_admin");
  if (adminError || isAdmin !== true) {
    throw new ResourceServiceError("You don't have permission to manage resources.");
  }

  return supabase;
}

/* -------------------------------------------------------------------------- */
/* Public reads                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Published resources for /resources, in display order.
 * sort_order is banded by group (CAPP 10s, Subjects 100s, Events 200s),
 * so ordering by it alone reproduces the old static array order.
 */
export async function getPublishedResources(): Promise<LibraryResource[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true })
    .returns<ResourceRow[]>();

  if (error) {
    // Fail soft on the public page: an empty library beats a crashed page.
    console.error("[resource.service] getPublishedResources failed:", error.message);
    return [];
  }

  return sortByGroupThenOrder(data).map(toLibraryResource);
}

/* -------------------------------------------------------------------------- */
/* Admin reads                                                                */
/* -------------------------------------------------------------------------- */

/** Every resource, including drafts. Admin only. */
export async function getAllResources(): Promise<AdminResource[]> {
  const supabase = await requireAdmin();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true })
    .returns<ResourceRow[]>();

  if (error) throw new ResourceServiceError(`Couldn't load resources: ${error.message}`);
  return sortByGroupThenOrder(data).map(toAdminResource);
}

export async function getResourceById(id: string): Promise<AdminResource | null> {
  const supabase = await requireAdmin();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle<ResourceRow>();

  if (error) throw new ResourceServiceError(`Couldn't load resource: ${error.message}`);
  return data ? toAdminResource(data) : null;
}

/** Counts plus the list of drafts, for the admin overview page. */
export async function getResourceOverview() {
  const all = await getAllResources();
  const drafts = all.filter((r) => !r.isPublished);

  return {
    total: all.length,
    published: all.length - drafts.length,
    drafts: drafts.length,
    draftResources: drafts.map(({ id, title, group, category }) => ({
      id,
      title,
      group,
      category,
    })),
  };
}

/* -------------------------------------------------------------------------- */
/* Admin writes                                                               */
/* -------------------------------------------------------------------------- */

/** Next sort_order at the end of a group (steps of 10, within the group's band). */
async function nextSortOrder(
  supabase: Awaited<ReturnType<typeof createClient>>,
  group: ResourceGroup,
): Promise<number> {
  const { data } = await supabase
    .from(TABLE)
    .select("sort_order")
    .eq("group_id", group)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle<{ sort_order: number }>();

  if (data) return data.sort_order + 10;

  // Empty group: start at the group's band.
  const bands: Record<ResourceGroup, number> = { capp: 10, subjects: 110, events: 210 };
  return bands[group];
}

/**
 * Create a resource. Defaults to an unpublished draft.
 * The id is generated from the title (the table's primary key is TEXT).
 */
export async function createResource(input: CreateResourceInput): Promise<AdminResource> {
  const supabase = await requireAdmin();

  const title = requireText(input.title, "Title");
  const description = requireText(input.description, "Description");
  const category = requireText(input.category, "Category");
  assertGroup(input.group);
  assertIcon(input.icon);
  const href = normaliseHref(input.href);

  const sortOrder = input.sortOrder ?? (await nextSortOrder(supabase, input.group));
  const baseId = slugify(title);

  // Retry with a short suffix if the slug is already taken.
  for (let attempt = 0; attempt < 4; attempt++) {
    const id = attempt === 0 ? baseId : `${baseId}-${Math.random().toString(36).slice(2, 6)}`;

    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        id,
        title,
        description,
        category,
        href,
        icon: input.icon,
        group_id: input.group,
        sort_order: sortOrder,
        is_published: input.isPublished ?? false,
      })
      .select("*")
      .single<ResourceRow>();

    if (!error) {
      refreshPublicPage();
      return toAdminResource(data);
    }

    if (error.code === "23505") continue; // id already exists, try another
    throw new ResourceServiceError(`Couldn't create resource: ${error.message}`);
  }

  throw new ResourceServiceError("Couldn't generate a unique id. Try a different title.");
}

/** Update fields on an existing resource. Only the fields you pass are changed. */
export async function updateResource(
  id: string,
  input: UpdateResourceInput,
): Promise<AdminResource> {
  const supabase = await requireAdmin();

  const patch: Partial<Omit<ResourceRow, "id" | "created_at" | "updated_at" | "updated_by">> = {};

  if (input.title !== undefined) patch.title = requireText(input.title, "Title");
  if (input.description !== undefined) patch.description = requireText(input.description, "Description");
  if (input.category !== undefined) patch.category = requireText(input.category, "Category");
  if (input.href !== undefined) patch.href = normaliseHref(input.href);
  if (input.group !== undefined) {
    assertGroup(input.group);
    patch.group_id = input.group;
  }
  if (input.icon !== undefined) {
    assertIcon(input.icon);
    patch.icon = input.icon;
  }
  if (input.sortOrder !== undefined) patch.sort_order = input.sortOrder;
  if (input.isPublished !== undefined) patch.is_published = input.isPublished;

  if (Object.keys(patch).length === 0) {
    throw new ResourceServiceError("Nothing to update.");
  }

  const { data, error } = await supabase
    .from(TABLE)
    .update(patch)
    .eq("id", id)
    .select("*")
    .maybeSingle<ResourceRow>();

  if (error) throw new ResourceServiceError(`Couldn't update resource: ${error.message}`);
  if (!data) throw new ResourceServiceError("Resource not found.");

  refreshPublicPage();
  return toAdminResource(data);
}

/** Publish or unpublish without deleting. */
export async function setResourcePublished(id: string, isPublished: boolean) {
  return updateResource(id, { isPublished });
}

export async function publishResource(id: string) {
  return setResourcePublished(id, true);
}

export async function unpublishResource(id: string) {
  return setResourcePublished(id, false);
}

/** Permanently delete a resource. Prefer unpublishing unless it was a mistake. */
export async function deleteResource(id: string): Promise<void> {
  const supabase = await requireAdmin();

  const { error, count } = await supabase
    .from(TABLE)
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) throw new ResourceServiceError(`Couldn't delete resource: ${error.message}`);
  if (!count) throw new ResourceServiceError("Resource not found.");

  refreshPublicPage();
}

/**
 * Reorder resources. Pass ids in the desired order; they are renumbered in
 * steps of 10 starting from the lowest sort_order currently used by those ids.
 * (Use within one group so the group bands stay intact.)
 */
export async function reorderResources(orderedIds: string[]): Promise<void> {
  const supabase = await requireAdmin();
  if (orderedIds.length === 0) return;

  const { data, error } = await supabase
    .from(TABLE)
    .select("id, sort_order")
    .in("id", orderedIds)
    .returns<{ id: string; sort_order: number }[]>();

  if (error) throw new ResourceServiceError(`Couldn't reorder: ${error.message}`);

  const start = Math.min(...data.map((r) => r.sort_order));

  const results = await Promise.all(
    orderedIds.map((id, index) =>
      supabase
        .from(TABLE)
        .update({ sort_order: start + index * 10 })
        .eq("id", id),
    ),
  );

  const failed = results.find((r) => r.error);
  if (failed?.error) throw new ResourceServiceError(`Couldn't reorder: ${failed.error.message}`);

  refreshPublicPage();
}