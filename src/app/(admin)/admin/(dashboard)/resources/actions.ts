"use server";

import { revalidatePath } from "next/cache";

import {
  createResource,
  deleteResource,
  reorderResources,
  ResourceServiceError,
  setResourcePublished,
  updateResource,
  type CreateResourceInput,
  type ResourceIcon,
} from "@/lib/services/resource.service";
import type { ResourceGroup } from "@/types";

/**
 * Server actions for /admin/resources.
 *
 * Every action delegates to resource.service.ts, which re-checks that the caller
 * is an admin, so these are safe even if someone calls them directly.
 *
 * Form actions return an ActionState for use with React's useActionState:
 *   const [state, formAction, pending] = useActionState(createResourceAction, { ok: false });
 */

export type ActionState = {
  ok: boolean;
  error?: string;
  /** Set on success so the UI can show a confirmation. */
  message?: string;
};

const ADMIN_PATH = "/admin/resources";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function fail(err: unknown): ActionState {
  if (err instanceof ResourceServiceError) {
    return { ok: false, error: err.message };
  }
  console.error("[resources actions] unexpected error:", err);
  return { ok: false, error: "Something went wrong. Please try again." };
}

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/** Reads the shared create/edit form fields. Validation happens in the service. */
function readResourceFields(formData: FormData): CreateResourceInput {
  const sortRaw = text(formData, "sortOrder").trim();

  return {
    title: text(formData, "title"),
    description: text(formData, "description"),
    group: text(formData, "group") as ResourceGroup,
    category: text(formData, "category"),
    href: text(formData, "href"),
    icon: text(formData, "icon") as ResourceIcon,
    sortOrder: sortRaw === "" ? undefined : Number(sortRaw),
    // A checkbox is only present in FormData when ticked.
    isPublished: formData.get("isPublished") === "on",
  };
}

function refreshAdmin() {
  revalidatePath(ADMIN_PATH);
}

/* -------------------------------------------------------------------------- */
/* Form actions (use with useActionState)                                      */
/* -------------------------------------------------------------------------- */

export async function createResourceAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const input = readResourceFields(formData);

    if (input.sortOrder !== undefined && !Number.isInteger(input.sortOrder)) {
      return { ok: false, error: "Display order must be a whole number." };
    }

    const created = await createResource(input);
    refreshAdmin();
    return { ok: true, message: `Created "${created.title}".` };
  } catch (err) {
    return fail(err);
  }
}

/**
 * Bind the id before passing to useActionState:
 *   const action = updateResourceAction.bind(null, resource.id);
 *   const [state, formAction] = useActionState(action, { ok: false });
 */
export async function updateResourceAction(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const input = readResourceFields(formData);

    if (input.sortOrder !== undefined && !Number.isInteger(input.sortOrder)) {
      return { ok: false, error: "Display order must be a whole number." };
    }

    const updated = await updateResource(id, input);
    refreshAdmin();
    return { ok: true, message: `Saved "${updated.title}".` };
  } catch (err) {
    return fail(err);
  }
}

/* -------------------------------------------------------------------------- */
/* Button actions (call from onClick / a <form action> / startTransition)       */
/* -------------------------------------------------------------------------- */

export async function setPublishedAction(
  id: string,
  isPublished: boolean,
): Promise<ActionState> {
  try {
    await setResourcePublished(id, isPublished);
    refreshAdmin();
    return { ok: true, message: isPublished ? "Published." : "Moved back to draft." };
  } catch (err) {
    return fail(err);
  }
}

export async function deleteResourceAction(id: string): Promise<ActionState> {
  try {
    await deleteResource(id);
    refreshAdmin();
    return { ok: true, message: "Deleted." };
  } catch (err) {
    return fail(err);
  }
}

/** Pass the ids of one group in their new order. */
export async function reorderResourcesAction(orderedIds: string[]): Promise<ActionState> {
  try {
    await reorderResources(orderedIds);
    refreshAdmin();
    return { ok: true, message: "Order saved." };
  } catch (err) {
    return fail(err);
  }
}