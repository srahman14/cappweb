"use server";

import {
  TeamServiceError,
  createAmbassador,
  deleteAmbassador,
  reorderAmbassadors,
  setAmbassadorPublished,
  updateAmbassador,
  type AmbassadorInput,
} from "@/lib/services/team.service";

/**
 * Server actions for /admin/ambassadors. Each delegates to team.service.ts, which
 * re-checks that the caller is an admin and validates everything.
 */
export type ActionState = { ok: boolean; error?: string; message?: string };

function fail(err: unknown): ActionState {
  if (err instanceof TeamServiceError) return { ok: false, error: err.message };
  console.error("[ambassadors actions] unexpected error:", err);
  return { ok: false, error: "Something went wrong. Please try again." };
}

const text = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
};

function readFields(formData: FormData): AmbassadorInput {
  return {
    name: text(formData, "name"),
    subject: text(formData, "subject"),
    role: text(formData, "role"),
    oneLiner: text(formData, "oneLiner"),
    linkedin: text(formData, "linkedin"),
    // A checkbox is only present in FormData when ticked.
    isPublished: formData.get("isPublished") === "on",
  };
}

export async function createAmbassadorAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const created = await createAmbassador(readFields(formData));
    return { ok: true, message: `Added ${created.name}.` };
  } catch (err) {
    return fail(err);
  }
}

/** Bind the id first: updateAmbassadorAction.bind(null, person.id). */
export async function updateAmbassadorAction(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const updated = await updateAmbassador(id, readFields(formData));
    return { ok: true, message: `Saved ${updated.name}.` };
  } catch (err) {
    return fail(err);
  }
}

export async function setAmbassadorPublishedAction(id: string, isPublished: boolean): Promise<ActionState> {
  try {
    await setAmbassadorPublished(id, isPublished === true);
    return { ok: true, message: isPublished ? "Now shown on the team page." : "Hidden from the team page." };
  } catch (err) {
    return fail(err);
  }
}

export async function deleteAmbassadorAction(id: string): Promise<ActionState> {
  try {
    await deleteAmbassador(id);
    return { ok: true, message: "Removed." };
  } catch (err) {
    return fail(err);
  }
}

/** Pass the ids of one subject in their new order. */
export async function reorderAmbassadorsAction(orderedIds: string[]): Promise<ActionState> {
  try {
    await reorderAmbassadors(orderedIds);
    return { ok: true, message: "Order saved." };
  } catch (err) {
    return fail(err);
  }
}
