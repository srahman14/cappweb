"use server";

import {
  createEvent,
  deleteEvent,
  EventServiceError,
  removeEventCover,
  setEventFeatured,
  setEventPublished,
  updateEvent,
  type EventInput,
} from "@/lib/services/event.service";

/**
 * Server actions for /admin/events.
 *
 * Every action delegates to event.service.ts, which re-checks that the caller is
 * an admin and revalidates the affected pages, so these are safe even if someone
 * calls them directly. Every export here is a public endpoint, so only export
 * what the admin UI needs. Cover uploads go through /api/admin/events/cover.
 */

export type ActionState = {
  ok: boolean;
  error?: string;
  /** Set on success so the UI can show a confirmation. */
  message?: string;
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function fail(err: unknown): ActionState {
  if (err instanceof EventServiceError) {
    return { ok: false, error: err.message };
  }
  console.error("[events actions] unexpected error:", err);
  return { ok: false, error: "Something went wrong. Please try again." };
}

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/** Reads the shared create/edit form fields. Validation happens in the service. */
function readEventFields(formData: FormData): EventInput {
  return {
    title: text(formData, "title"),
    description: text(formData, "description"),
    startsOn: text(formData, "startsOn"),
    endsOn: text(formData, "endsOn"),
    startTime: text(formData, "startTime"),
    endTime: text(formData, "endTime"),
    dateLabel: text(formData, "dateLabel"),
    location: text(formData, "location"),
    hostName: text(formData, "hostName"),
    tags: text(formData, "tags").split(","),
    subjects: formData.getAll("subjects").filter((value) => typeof value === "string"),
    signupUrl: text(formData, "signupUrl"),
    recapUrl: text(formData, "recapUrl"),
    coverAlt: text(formData, "coverAlt"),
    // A checkbox is only present in FormData when ticked.
    isPublished: formData.get("isPublished") === "on",
  };
}

/* -------------------------------------------------------------------------- */
/* Form actions (use with useActionState)                                      */
/* -------------------------------------------------------------------------- */

export async function createEventAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const created = await createEvent(readEventFields(formData));
    return { ok: true, message: `Created "${created.title}".` };
  } catch (err) {
    return fail(err);
  }
}

/**
 * Bind the id before passing to useActionState:
 *   const action = updateEventAction.bind(null, event.id);
 */
export async function updateEventAction(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const updated = await updateEvent(id, readEventFields(formData));
    return { ok: true, message: `Saved "${updated.title}".` };
  } catch (err) {
    return fail(err);
  }
}

/* -------------------------------------------------------------------------- */
/* Button actions (call from onClick / startTransition)                         */
/* -------------------------------------------------------------------------- */

export async function setPublishedAction(id: string, isPublished: boolean): Promise<ActionState> {
  try {
    await setEventPublished(id, isPublished === true);
    return { ok: true, message: isPublished ? "Published." : "Moved back to draft." };
  } catch (err) {
    return fail(err);
  }
}

export async function setFeaturedAction(id: string, isFeatured: boolean): Promise<ActionState> {
  try {
    await setEventFeatured(id, isFeatured === true);
    return { ok: true, message: isFeatured ? "Featured." : "No longer featured." };
  } catch (err) {
    return fail(err);
  }
}

export async function deleteEventAction(id: string): Promise<ActionState> {
  try {
    await deleteEvent(id);
    return { ok: true, message: "Deleted." };
  } catch (err) {
    return fail(err);
  }
}

export async function removeCoverAction(id: string): Promise<ActionState> {
  try {
    await removeEventCover(id);
    return { ok: true, message: "Cover removed." };
  } catch (err) {
    return fail(err);
  }
}
