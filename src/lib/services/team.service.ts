import "server-only";

import { revalidatePath } from "next/cache";

import type { TeamMember, TeamSubjectId } from "@/data/team";
import { getCappAdminStatus } from "@/lib/auth/admin";
import { TEAM_LIMITS, TEAM_SUBJECT_IDS, capitaliseWords, defaultRoleFor, isTeamSubject } from "@/lib/team/constants";
import { createClient } from "@/lib/supabase/server";

/**
 * Ambassadors shown on /team. Only name and subject are needed to add someone: the role
 * defaults from the subject, and the one-liner and LinkedIn link are optional.
 */

const TABLE = "team_members";

interface TeamRow {
  id: string;
  name: string;
  role: string;
  subject: TeamSubjectId;
  one_liner: string | null;
  linkedin: string | null;
  sort_order: number;
  is_published: boolean;
  updated_at: string;
}

/** What the admin works with: the public fields plus management fields. */
export interface AdminAmbassador {
  id: string;
  name: string;
  role: string;
  subject: TeamSubjectId;
  /** Empty string when not set, ready for a form field. */
  oneLiner: string;
  linkedin: string;
  sortOrder: number;
  isPublished: boolean;
  updatedAt: string;
}

export interface AmbassadorInput {
  name: string;
  subject: string;
  role?: string;
  oneLiner?: string;
  linkedin?: string;
  isPublished?: boolean;
}

export class TeamServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TeamServiceError";
  }
}

/* -------------------------------------------------------------------------- */
/* Mapping and validation                                                     */
/* -------------------------------------------------------------------------- */

/** The shape the public page already renders. Optional fields are left out when empty. */
function toTeamMember(row: TeamRow): TeamMember {
  return {
    id: row.id,
    name: row.name,
    role: capitaliseWords(row.role),
    subject: row.subject,
    ...(row.one_liner ? { oneLiner: row.one_liner } : {}),
    ...(row.linkedin ? { linkedin: row.linkedin } : {}),
  };
}

function toAdminAmbassador(row: TeamRow): AdminAmbassador {
  return {
    id: row.id,
    name: row.name,
    role: capitaliseWords(row.role),
    subject: row.subject,
    oneLiner: row.one_liner ?? "",
    linkedin: row.linkedin ?? "",
    sortOrder: row.sort_order,
    isPublished: row.is_published,
    updatedAt: row.updated_at,
  };
}

const sortBySubjectThenOrder = <T extends { subject: TeamSubjectId; sort_order: number; name: string }>(rows: T[]) =>
  [...rows].sort(
    (a, b) =>
      TEAM_SUBJECT_IDS.indexOf(a.subject) - TEAM_SUBJECT_IDS.indexOf(b.subject) ||
      a.sort_order - b.sort_order ||
      a.name.localeCompare(b.name),
  );

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50) || "member"
  );
}

/** Empty -> null. Otherwise a https LinkedIn address; "linkedin.com/in/x" is accepted too. */
function normaliseLinkedin(value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;

  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    const host = url.hostname.toLowerCase();
    if ((url.protocol === "https:" || url.protocol === "http:") && (host === "linkedin.com" || host.endsWith(".linkedin.com"))) {
      url.protocol = "https:";
      return url.toString();
    }
  } catch {
    /* fall through */
  }
  throw new TeamServiceError("Use a LinkedIn link, e.g. https://www.linkedin.com/in/your-name (or leave it blank).");
}

function optionalText(value: string | undefined, max: number, label: string): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  if (trimmed.length > max) throw new TeamServiceError(`${label} must be ${max} characters or fewer.`);
  return trimmed;
}

function toColumns(input: AmbassadorInput) {
  const name = input.name?.trim();
  if (!name) throw new TeamServiceError("Name is required.");
  if (name.length > TEAM_LIMITS.name) throw new TeamServiceError(`Name must be ${TEAM_LIMITS.name} characters or fewer.`);

  if (!isTeamSubject(input.subject)) throw new TeamServiceError("Choose a subject.");

  const role = capitaliseWords(optionalText(input.role, TEAM_LIMITS.role, "Role") ?? defaultRoleFor(input.subject));

  return {
    name,
    subject: input.subject,
    role,
    one_liner: optionalText(input.oneLiner, TEAM_LIMITS.oneLiner, "The one-liner"),
    linkedin: normaliseLinkedin(input.linkedin),
    is_published: input.isPublished ?? true,
  };
}

function refreshPages() {
  revalidatePath("/team");
  revalidatePath("/admin/ambassadors");
}

/* -------------------------------------------------------------------------- */
/* Admin guard                                                                */
/* -------------------------------------------------------------------------- */

async function requireTeamAdmin() {
  const { user, isAdmin } = await getCappAdminStatus();
  if (!user) throw new TeamServiceError("You need to be signed in.");
  if (!isAdmin) throw new TeamServiceError("You don't have permission to manage the team.");
  return createClient();
}

/* -------------------------------------------------------------------------- */
/* Reads                                                                      */
/* -------------------------------------------------------------------------- */

/** Published ambassadors for /team, in display order. Fails soft: an empty list beats a crashed page. */
export async function getPublishedTeamMembers(): Promise<TeamMember[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("id, name, role, subject, one_liner, linkedin, sort_order, is_published, updated_at")
    .eq("is_published", true)
    .returns<TeamRow[]>();

  if (error) {
    console.error("[team.service] getPublishedTeamMembers failed:", error.message);
    return [];
  }
  return sortBySubjectThenOrder(data).map(toTeamMember);
}

/** Everyone, including hidden people. Admin only. */
export async function getAllAmbassadors(): Promise<AdminAmbassador[]> {
  const supabase = await requireTeamAdmin();

  const { data, error } = await supabase
    .from(TABLE)
    .select("id, name, role, subject, one_liner, linkedin, sort_order, is_published, updated_at")
    .returns<TeamRow[]>();

  if (error) {
    console.error("[team.service] getAllAmbassadors failed:", error.message);
    throw new TeamServiceError("Couldn't load the team.");
  }
  return sortBySubjectThenOrder(data).map(toAdminAmbassador);
}

/* -------------------------------------------------------------------------- */
/* Writes                                                                     */
/* -------------------------------------------------------------------------- */

export async function createAmbassador(input: AmbassadorInput): Promise<AdminAmbassador> {
  const supabase = await requireTeamAdmin();
  const columns = toColumns(input);

  // New people go to the end of their subject.
  const { data: last } = await supabase
    .from(TABLE)
    .select("sort_order")
    .eq("subject", columns.subject)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle<{ sort_order: number }>();
  const sortOrder = (last?.sort_order ?? 0) + 10;

  const baseId = slugify(columns.name);

  // Retry with a short suffix if the slug is already taken (two people with one name).
  for (let attempt = 0; attempt < 4; attempt++) {
    const id = attempt === 0 ? baseId : `${baseId}-${Math.random().toString(36).slice(2, 6)}`;

    const { data, error } = await supabase
      .from(TABLE)
      .insert({ id, ...columns, sort_order: sortOrder })
      .select("id, name, role, subject, one_liner, linkedin, sort_order, is_published, updated_at")
      .single<TeamRow>();

    if (!error) {
      refreshPages();
      return toAdminAmbassador(data);
    }
    if (error.code === "23505") continue;

    console.error("[team.service] createAmbassador failed:", error.message);
    throw new TeamServiceError("Couldn't add the person.");
  }

  throw new TeamServiceError("Couldn't generate a unique id. Try a slightly different name.");
}

export async function updateAmbassador(id: string, input: AmbassadorInput): Promise<AdminAmbassador> {
  const supabase = await requireTeamAdmin();
  const columns = toColumns(input);

  const { data, error } = await supabase
    .from(TABLE)
    .update({ ...columns, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("id, name, role, subject, one_liner, linkedin, sort_order, is_published, updated_at")
    .maybeSingle<TeamRow>();

  if (error) {
    console.error("[team.service] updateAmbassador failed:", error.message);
    throw new TeamServiceError("Couldn't save the changes.");
  }
  if (!data) throw new TeamServiceError("Person not found.");

  refreshPages();
  return toAdminAmbassador(data);
}

export async function setAmbassadorPublished(id: string, isPublished: boolean): Promise<void> {
  const supabase = await requireTeamAdmin();

  const { data, error } = await supabase
    .from(TABLE)
    .update({ is_published: isPublished, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("id")
    .maybeSingle<{ id: string }>();

  if (error) {
    console.error("[team.service] setAmbassadorPublished failed:", error.message);
    throw new TeamServiceError("Couldn't update the person.");
  }
  if (!data) throw new TeamServiceError("Person not found.");

  refreshPages();
}

export async function deleteAmbassador(id: string): Promise<void> {
  const supabase = await requireTeamAdmin();

  const { error, count } = await supabase.from(TABLE).delete({ count: "exact" }).eq("id", id);

  if (error) {
    console.error("[team.service] deleteAmbassador failed:", error.message);
    throw new TeamServiceError("Couldn't remove the person.");
  }
  if (!count) throw new TeamServiceError("Person not found.");

  refreshPages();
}

/** Pass the ids of ONE subject in their new order; they are renumbered in steps of 10. */
export async function reorderAmbassadors(orderedIds: string[]): Promise<void> {
  const supabase = await requireTeamAdmin();
  if (orderedIds.length === 0) return;

  const { data, error } = await supabase
    .from(TABLE)
    .select("id, sort_order")
    .in("id", orderedIds)
    .returns<{ id: string; sort_order: number }[]>();

  if (error) throw new TeamServiceError("Couldn't save the order.");

  const start = Math.min(...data.map((row) => row.sort_order));
  const results = await Promise.all(
    orderedIds.map((id, index) => supabase.from(TABLE).update({ sort_order: start + index * 10 }).eq("id", id)),
  );
  if (results.some((result) => result.error)) throw new TeamServiceError("Couldn't save the order.");

  refreshPages();
}
