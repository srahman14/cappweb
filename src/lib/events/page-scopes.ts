/**
 * The site pages an admin can scope /admin/events to. Pure: safe from server or
 * client code. Subject scopes come from EVENT_SUBJECT_IDS, so adding a subject
 * there adds its card.
 */
import {
  EVENT_SUBJECT_IDS,
  EVENT_SUBJECT_LABELS,
  type EventSubject,
} from "@/lib/events/constants";
import { selectLandingEvents } from "@/lib/events/format";

export type EventPageId = "events" | "landing" | EventSubject;

export const DEFAULT_EVENT_PAGE: EventPageId = "events";

export const EVENT_PAGE_SCOPES: { id: EventPageId; label: string }[] = [
  { id: "events", label: "Events page" },
  { id: "landing", label: "Landing page" },
  ...EVENT_SUBJECT_IDS.map((id) => ({ id, label: EVENT_SUBJECT_LABELS[id] })),
];

/** Reads an untrusted ?page= value. Anything not on the list gets the default. */
export function parseEventPage(value: unknown): EventPageId {
  return EVENT_PAGE_SCOPES.find((scope) => scope.id === value)?.id ?? DEFAULT_EVENT_PAGE;
}

/**
 * The events belonging to a page, in the order given. `events` must be upcoming
 * soonest first, as getAllEvents() returns them, for the landing page to be right.
 */
export function filterEventsForPage<
  T extends { subjects: EventSubject[]; isPublished: boolean; isUpcoming: boolean },
>(events: T[], page: EventPageId): T[] {
  if (page === "events") return events;
  if (page === "landing") {
    // The same selection the public landing page makes from its own published read.
    return selectLandingEvents(events.filter((event) => event.isPublished && event.isUpcoming));
  }
  return events.filter((event) => event.subjects.includes(page));
}
