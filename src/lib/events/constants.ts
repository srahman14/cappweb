/**
 * Shared event constants. Safe to import from client components
 * (unlike event.service.ts, which is server-only).
 */

/** Must match the CHECK constraint on events.subjects. */
export const EVENT_SUBJECT_IDS = ["tech", "business-finance", "engineering", "law"] as const;

export type EventSubject = (typeof EVENT_SUBJECT_IDS)[number];

export const EVENT_SUBJECT_LABELS: Record<EventSubject, string> = {
  tech: "Tech",
  "business-finance": "Business & Finance",
  engineering: "Engineering",
  law: "Law",
};

export function isEventSubject(value: string): value is EventSubject {
  return (EVENT_SUBJECT_IDS as readonly string[]).includes(value);
}

/** Same shape as the CHECK constraint on events.id, plus a length bound. */
const EVENT_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MAX_EVENT_ID_LENGTH = 80;

export function isValidEventId(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= MAX_EVENT_ID_LENGTH &&
    EVENT_ID_PATTERN.test(value)
  );
}

/** Where an event's cover lives in Vercel Blob. Only call with a validated id. */
export function eventCoverPrefix(id: string): string {
  return `capp-media/events/${id}/`;
}

/** Input limits, enforced by the service and mirrored on the admin form. */
export const EVENT_LIMITS = {
  title: 160,
  description: 4000,
  dateLabel: 60,
  location: 200,
  hostName: 120,
  url: 2048,
  coverAlt: 300,
  tag: 40,
  tags: 10,
} as const;
