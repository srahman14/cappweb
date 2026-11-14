import "server-only";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { cache } from "react";

import { getCappAdminStatus } from "@/lib/auth/admin";
import {
  EVENT_LIMITS,
  eventCoverPrefix,
  isEventSubject,
  isValidEventId,
  type EventSubject,
} from "@/lib/events/constants";
import {
  formatFullDate,
  formatShortDate,
  formatTimeRange,
  formatWeekday,
  getLondonToday,
  isUpcomingEvent,
  LANDING_EVENT_LIMIT,
  pickFeatured,
  sanitiseEventHref,
  selectLandingEvents,
} from "@/lib/events/format";
import { createClient } from "@/lib/supabase/server";
import type { EventItem } from "@/types";

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const TABLE = "events";

/** Listed explicitly so audit fields and blob pathnames never reach a page. */
const PUBLIC_COLUMNS =
  "id, title, description, starts_on, ends_on, start_time, end_time, date_label, location, host_name, tags, signup_url, recap_url, cover_url, cover_alt, is_featured, is_landing_pinned";

/** Still no cover_pathname or updated_by: these rows reach client components. */
const ADMIN_COLUMNS = `${PUBLIC_COLUMNS}, subjects, is_published, updated_at`;

/** Every page that shows events, plus the admin pages that list them. */
const EVENT_PATHS = [
  "/",
  "/events",
  "/tech",
  "/law",
  "/business-finance",
  "/engineering",
  "/admin/events",
  "/admin",
];

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

/** Row shape for PUBLIC_COLUMNS. */
interface PublicEventRow {
  id: string;
  title: string;
  description: string;
  starts_on: string | null;
  ends_on: string | null;
  start_time: string | null;
  end_time: string | null;
  date_label: string | null;
  location: string | null;
  host_name: string;
  tags: string[];
  signup_url: string | null;
  recap_url: string | null;
  cover_url: string | null;
  cover_alt: string | null;
  is_featured: boolean;
  is_landing_pinned: boolean;
}

/** Row shape for ADMIN_COLUMNS. */
interface AdminEventRow extends PublicEventRow {
  subjects: EventSubject[];
  is_published: boolean;
  updated_at: string;
}

/** What the public pages render. */
export interface PublicEvents {
  /** Soonest first. */
  upcoming: EventItem[];
  /** Most recent first. */
  past: EventItem[];
  /** The event /events leads with. Subject pages use upcoming[0] instead. */
  featured: EventItem | null;
  /** What the landing page shows: pinned events first, then the soonest. */
  landing: EventItem[];
}

/** What the admin dashboard works with: raw editable values plus display labels. */
export interface AdminEvent {
  id: string;
  title: string;
  description: string;
  startsOn: string;
  endsOn: string;
  /** HH:MM, ready for <input type="time">. */
  startTime: string;
  endTime: string;
  dateLabel: string;
  location: string;
  hostName: string;
  tags: string[];
  subjects: EventSubject[];
  signupUrl: string;
  recapUrl: string;
  coverUrl: string | null;
  coverAlt: string;
  isFeatured: boolean;
  /** Pinned to the landing page (shows before the automatic picks). */
  isLandingPinned: boolean;
  isPublished: boolean;
  isUpcoming: boolean;
  /** e.g. "22 Oct 2026 · 6pm", as shown in the admin list. */
  whenLabel: string;
  updatedAt: string;
}

/** Everything the admin form supplies. Featured and cover are managed separately. */
export interface EventInput {
  title: string;
  description: string;
  startsOn: string;
  endsOn: string;
  startTime: string;
  endTime: string;
  dateLabel: string;
  location: string;
  hostName: string;
  tags: string[];
  subjects: string[];
  signupUrl: string;
  recapUrl: string;
  coverAlt: string;
  isPublished: boolean;
}

/** Thrown for anything the UI should show to the admin. */
export class EventServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EventServiceError";
  }
}

/* -------------------------------------------------------------------------- */
/* Mapping                                                                    */
/* -------------------------------------------------------------------------- */

const compareUpcoming = (a: PublicEventRow, b: PublicEventRow) => {
  // Undated events ("to be announced") go last.
  if (a.starts_on !== b.starts_on) {
    if (a.starts_on === null) return 1;
    if (b.starts_on === null) return -1;
    return a.starts_on < b.starts_on ? -1 : 1;
  }
  // Ends on the id so the order is fixed: the landing page and its admin card take a top 3.
  return (
    (a.start_time ?? "").localeCompare(b.start_time ?? "") ||
    a.title.localeCompare(b.title) ||
    a.id.localeCompare(b.id)
  );
};

const comparePast = (a: PublicEventRow, b: PublicEventRow) => compareUpcoming(b, a);

/** Splits rows on the one upcoming rule, sorted for display. Doesn't mutate its input. */
function partitionRows<T extends PublicEventRow>(rows: T[], today: string) {
  const upcoming = rows.filter((row) => isUpcomingEvent(row, today)).sort(compareUpcoming);
  const past = rows.filter((row) => !isUpcomingEvent(row, today)).sort(comparePast);
  return { upcoming, past };
}

function shortDateOf(row: PublicEventRow): string {
  if (row.date_label) return row.date_label;
  return row.starts_on ? formatShortDate(row.starts_on, row.ends_on) : "TBA";
}

function fullDateOf(row: PublicEventRow): string {
  if (row.date_label) return row.date_label;
  return row.starts_on ? formatFullDate(row.starts_on, row.ends_on) : "TBA";
}

/**
 * The single mapping from a DB row to the public view model.
 * What's missing reads "TBA" on an upcoming event, and is left out on a past one.
 */
function toEventItem(row: PublicEventRow, today: string): EventItem {
  const upcoming = isUpcomingEvent(row, today);
  const missing = upcoming ? "TBA" : undefined;

  return {
    id: row.id,
    title: row.title,
    dateLabel: shortDateOf(row),
    fullDateLabel: fullDateOf(row),
    // A date_label means the date is deliberately vague, so don't claim a weekday.
    weekday: row.starts_on && !row.date_label ? formatWeekday(row.starts_on, row.ends_on) : undefined,
    time: formatTimeRange(row.start_time, row.end_time) ?? missing,
    location: row.location ?? missing,
    hostName: row.host_name,
    tags: row.tags,
    description: row.description || undefined,
    coverSrc: row.cover_url ?? undefined,
    coverAlt: row.cover_alt ?? undefined,
    // Re-checked on read: an admin session can write these columns without this app.
    href: sanitiseEventHref(upcoming ? row.signup_url : row.recap_url) ?? undefined,
  };
}

function toAdminEvent(row: AdminEventRow, today: string): AdminEvent {
  const time = formatTimeRange(row.start_time, row.end_time);

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    startsOn: row.starts_on ?? "",
    endsOn: row.ends_on ?? "",
    startTime: row.start_time?.slice(0, 5) ?? "",
    endTime: row.end_time?.slice(0, 5) ?? "",
    dateLabel: row.date_label ?? "",
    location: row.location ?? "",
    hostName: row.host_name,
    tags: row.tags,
    subjects: row.subjects,
    signupUrl: row.signup_url ?? "",
    recapUrl: row.recap_url ?? "",
    coverUrl: row.cover_url,
    coverAlt: row.cover_alt ?? "",
    isFeatured: row.is_featured,
    isLandingPinned: row.is_landing_pinned,
    isPublished: row.is_published,
    isUpcoming: isUpcomingEvent(row, today),
    whenLabel: time ? `${fullDateOf(row)} · ${time}` : fullDateOf(row),
    updatedAt: row.updated_at,
  };
}

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 60)
      // After the slice: cutting mid-title can leave a trailing hyphen, which the id CHECK rejects.
      .replace(/^-+|-+$/g, "") || "event"
  );
}

function assertEventId(id: unknown): asserts id is string {
  if (!isValidEventId(id)) throw new EventServiceError("Event not found.");
}

function optionalText(value: string, label: string, max: number): string | null {
  const trimmed = value.trim();
  if (trimmed.length > max) {
    throw new EventServiceError(`${label} must be ${max} characters or fewer.`);
  }
  return trimmed || null;
}

function optionalUrl(value: string, label: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const href = sanitiseEventHref(trimmed);
  if (!href || href.length > EVENT_LIMITS.url) {
    throw new EventServiceError(
      `${label} must start with https:// (or be an internal path like /events).`,
    );
  }
  return href;
}

function optionalDate(value: string, label: string): string | null {
  if (!value) return null;

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (match) {
    // Date.UTC rolls 31 Feb over to March, so round-tripping rejects impossible dates.
    const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
    if (date.toISOString().slice(0, 10) === value) return value;
  }
  throw new EventServiceError(`${label} isn't a valid date.`);
}

function optionalTime(value: string, label: string): string | null {
  if (!value) return null;
  if (/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(value)) return value;
  throw new EventServiceError(`${label} isn't a valid time.`);
}

function normaliseTags(tags: string[]): string[] {
  const cleaned = [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];

  if (cleaned.length > EVENT_LIMITS.tags) {
    throw new EventServiceError(`Use ${EVENT_LIMITS.tags} tags or fewer.`);
  }
  if (cleaned.some((tag) => tag.length > EVENT_LIMITS.tag)) {
    throw new EventServiceError(`Each tag must be ${EVENT_LIMITS.tag} characters or fewer.`);
  }
  return cleaned;
}

function normaliseSubjects(subjects: string[]): EventSubject[] {
  const unique = [...new Set(subjects)];
  if (!unique.every(isEventSubject)) throw new EventServiceError("Choose a valid subject.");
  return unique;
}

/** Validates form input into columns. Never includes is_featured or the cover blob. */
function toEventColumns(input: EventInput) {
  const title = input.title.trim();
  if (!title) throw new EventServiceError("Title is required.");
  if (title.length > EVENT_LIMITS.title) {
    throw new EventServiceError(`Title must be ${EVENT_LIMITS.title} characters or fewer.`);
  }

  const description = input.description.trim();
  if (description.length > EVENT_LIMITS.description) {
    throw new EventServiceError(
      `Description must be ${EVENT_LIMITS.description} characters or fewer.`,
    );
  }

  const startsOn = optionalDate(input.startsOn, "Start date");
  const endsOn = optionalDate(input.endsOn, "End date");
  const startTime = optionalTime(input.startTime, "Start time");
  const endTime = optionalTime(input.endTime, "End time");
  const dateLabel = optionalText(input.dateLabel, "Date label", EVENT_LIMITS.dateLabel);

  // Same rules as the table's constraints, so admins get a clear message.
  if (endsOn && !startsOn) throw new EventServiceError("Add a start date before an end date.");
  if (endsOn && startsOn && endsOn < startsOn) {
    throw new EventServiceError("The end date can't be before the start date.");
  }
  if (startTime && !startsOn) throw new EventServiceError("Add a start date before a time.");
  if (endTime && !startTime) throw new EventServiceError("Add a start time before an end time.");
  if (startTime && endTime && (!endsOn || endsOn === startsOn) && endTime <= startTime) {
    throw new EventServiceError("The end time must be after the start time.");
  }
  // Without a real date the event could never become past, whatever the label says.
  if (dateLabel && !startsOn) {
    throw new EventServiceError("A date label needs a start date, so the event can move to past.");
  }

  return {
    title,
    description,
    starts_on: startsOn,
    ends_on: endsOn,
    start_time: startTime,
    end_time: endTime,
    date_label: dateLabel,
    location: optionalText(input.location, "Location", EVENT_LIMITS.location),
    host_name: optionalText(input.hostName, "Host", EVENT_LIMITS.hostName) ?? "CAPP",
    tags: normaliseTags(input.tags),
    subjects: normaliseSubjects(input.subjects),
    signup_url: optionalUrl(input.signupUrl, "The sign-up link"),
    recap_url: optionalUrl(input.recapUrl, "The recap link"),
    cover_alt: optionalText(input.coverAlt, "Cover description", EVENT_LIMITS.coverAlt),
    is_published: input.isPublished === true,
  };
}

/* -------------------------------------------------------------------------- */
/* Shared helpers                                                             */
/* -------------------------------------------------------------------------- */

/** Refresh every page that shows events. */
function refreshEventPages() {
  EVENT_PATHS.forEach((path) => revalidatePath(path));
}

/**
 * Removes an event's cover from Blob, best effort: the database is already right
 * by this point, and an orphaned file is harmless.
 *
 * The prefix check matters. `del` accepts any path in the store, and an admin
 * session can write cover_pathname directly, so it must not be trusted here.
 */
async function deleteCoverBlob(id: string, pathname: string | null) {
  if (!pathname) return;

  if (!pathname.startsWith(eventCoverPrefix(id)) || pathname.includes("..")) {
    console.error(`[event.service] refused to delete a cover outside ${eventCoverPrefix(id)}`);
    return;
  }

  try {
    await del(pathname);
  } catch (err) {
    console.error("[event.service] cover blob cleanup failed:", err);
  }
}

/* -------------------------------------------------------------------------- */
/* Admin guard                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Confirms there is a signed-in admin, then returns the client to use.
 * RLS is the backstop; this gives a clear error before reaching it and stops
 * non-admins from reaching admin-only reads.
 */
async function requireEventAdmin() {
  const { user, isAdmin } = await getCappAdminStatus();

  if (!user) throw new EventServiceError("You need to be signed in.");
  if (!isAdmin) throw new EventServiceError("You don't have permission to manage events.");

  return createClient();
}

/* -------------------------------------------------------------------------- */
/* Public reads                                                               */
/* -------------------------------------------------------------------------- */

const NO_EVENTS: PublicEvents = { upcoming: [], past: [], featured: null, landing: [] };

/**
 * Published events for the public pages, optionally for one subject.
 *
 * Call from a request-time component (after connection()): "today" is worked out
 * here, so that's what keeps an ended event from showing as upcoming.
 * cache() lets a page's header and section share one query per render.
 *
 * The is_published filter is required, not just tidy: RLS returns drafts to admins,
 * and a signed-in admin browsing the public site uses this same client.
 */
export const getPublicEvents = cache(async (subject?: EventSubject): Promise<PublicEvents> => {
  if (subject && !isEventSubject(subject)) return NO_EVENTS;

  const supabase = await createClient();

  let query = supabase.from(TABLE).select(PUBLIC_COLUMNS).eq("is_published", true);
  if (subject) query = query.contains("subjects", [subject]);

  const { data, error } = await query.returns<PublicEventRow[]>();

  if (error) {
    // Fail soft on public pages: no events beats a crashed page.
    console.error("[event.service] getPublicEvents failed:", error.message);
    return NO_EVENTS;
  }

  const today = getLondonToday();
  const { upcoming, past } = partitionRows(data, today);
  const featured = pickFeatured(upcoming);

  return {
    upcoming: upcoming.map((row) => toEventItem(row, today)),
    past: past.map((row) => toEventItem(row, today)),
    featured: featured && toEventItem(featured, today),
    landing: selectLandingEvents(upcoming, (row) => row.is_landing_pinned).map((row) =>
      toEventItem(row, today),
    ),
  };
});

/* -------------------------------------------------------------------------- */
/* Admin reads                                                                */
/* -------------------------------------------------------------------------- */

/** Every event, including drafts: upcoming soonest first, then past most recent first. */
export async function getAllEvents(): Promise<AdminEvent[]> {
  const supabase = await requireEventAdmin();

  const { data, error } = await supabase
    .from(TABLE)
    .select(ADMIN_COLUMNS)
    .returns<AdminEventRow[]>();

  if (error) {
    console.error("[event.service] getAllEvents failed:", error.message);
    throw new EventServiceError("Couldn't load events.");
  }

  const today = getLondonToday();
  const { upcoming, past } = partitionRows(data, today);
  return [...upcoming, ...past].map((row) => toAdminEvent(row, today));
}

/** Counts plus the list of drafts, for the admin overview page. */
export async function getEventOverview() {
  const all = await getAllEvents();
  const published = all.filter((event) => event.isPublished);
  const drafts = all.filter((event) => !event.isPublished);

  const upcoming = published.filter((event) => event.isUpcoming);
  const landing = selectLandingEvents(upcoming, (event) => event.isLandingPinned);
  const featured = upcoming.find((event) => event.isFeatured) ?? null;

  return {
    total: all.length,
    upcoming: upcoming.length,
    drafts: drafts.length,
    draftEvents: drafts.map(({ id, title, whenLabel }) => ({ id, title, whenLabel })),
    /** What the landing page shows right now, and which of those are pinned. */
    landing: landing.map(({ id, title, whenLabel, isLandingPinned }) => ({
      id,
      title,
      whenLabel,
      pinned: isLandingPinned,
    })),
    pinnedCount: landing.filter((event) => event.isLandingPinned).length,
    featured: featured && { id: featured.id, title: featured.title, whenLabel: featured.whenLabel },
    next: upcoming[0] ? { id: upcoming[0].id, title: upcoming[0].title, whenLabel: upcoming[0].whenLabel } : null,
  };
}

/** Lets the cover route return a 404 before it uploads anything. */
export async function eventExists(id: string): Promise<boolean> {
  assertEventId(id);
  const supabase = await requireEventAdmin();

  const { data, error } = await supabase
    .from(TABLE)
    .select("id")
    .eq("id", id)
    .maybeSingle<{ id: string }>();

  if (error) throw new EventServiceError("Couldn't look up the event.");
  return data !== null;
}

/* -------------------------------------------------------------------------- */
/* Admin writes                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Create an event. Defaults to whatever the form says about publishing.
 * The id is generated from the title (the table's primary key is TEXT).
 */
export async function createEvent(input: EventInput): Promise<AdminEvent> {
  const supabase = await requireEventAdmin();

  const columns = toEventColumns(input);
  const baseId = slugify(columns.title);

  // Retry with a short suffix if the slug is taken. is_featured is never part of an
  // insert, so a unique violation here can only be the id.
  for (let attempt = 0; attempt < 4; attempt++) {
    const id = attempt === 0 ? baseId : `${baseId}-${Math.random().toString(36).slice(2, 6)}`;

    const { data, error } = await supabase
      .from(TABLE)
      .insert({ id, ...columns })
      .select(ADMIN_COLUMNS)
      .single<AdminEventRow>();

    if (!error) {
      refreshEventPages();
      return toAdminEvent(data, getLondonToday());
    }

    if (error.code === "23505") continue;
    console.error("[event.service] createEvent failed:", error.message);
    throw new EventServiceError("Couldn't create the event.");
  }

  throw new EventServiceError("Couldn't generate a unique id. Try a different title.");
}

/** Save the form. Unpublishing also drops the featured and pinned flags, in the same write. */
export async function updateEvent(id: string, input: EventInput): Promise<AdminEvent> {
  assertEventId(id);
  const supabase = await requireEventAdmin();

  const columns = toEventColumns(input);
  const patch = columns.is_published
    ? columns
    : { ...columns, is_featured: false, is_landing_pinned: false };

  const { data, error } = await supabase
    .from(TABLE)
    .update(patch)
    .eq("id", id)
    .select(ADMIN_COLUMNS)
    .maybeSingle<AdminEventRow>();

  if (error) {
    console.error("[event.service] updateEvent failed:", error.message);
    throw new EventServiceError("Couldn't save the event.");
  }
  if (!data) throw new EventServiceError("Event not found.");

  refreshEventPages();
  return toAdminEvent(data, getLondonToday());
}

/** Publish or unpublish. Unpublishing also drops the featured and pinned flags, in the same write. */
export async function setEventPublished(id: string, isPublished: boolean): Promise<void> {
  assertEventId(id);
  const supabase = await requireEventAdmin();

  const patch = isPublished
    ? { is_published: true }
    : { is_published: false, is_featured: false, is_landing_pinned: false };

  const { data, error } = await supabase
    .from(TABLE)
    .update(patch)
    .eq("id", id)
    .select("id")
    .maybeSingle<{ id: string }>();

  if (error) {
    console.error("[event.service] setEventPublished failed:", error.message);
    throw new EventServiceError("Couldn't update the event.");
  }
  if (!data) throw new EventServiceError("Event not found.");

  refreshEventPages();
}

/**
 * Feature or unfeature an event. The only code that sets is_featured to true.
 *
 * The unique index allows one featured row, so the previous one is cleared first.
 * That takes two writes: if the second fails the previous event is restored. While
 * the swap runs nothing is featured, and /events falls back to the next upcoming event.
 */
export async function setEventFeatured(id: string, isFeatured: boolean): Promise<void> {
  assertEventId(id);
  const supabase = await requireEventAdmin();

  if (!isFeatured) {
    const { data, error } = await supabase
      .from(TABLE)
      .update({ is_featured: false })
      .eq("id", id)
      .select("id")
      .maybeSingle<{ id: string }>();

    if (error) {
      console.error("[event.service] unfeature failed:", error.message);
      throw new EventServiceError("Couldn't update the event.");
    }
    if (!data) throw new EventServiceError("Event not found.");

    refreshEventPages();
    return;
  }

  const { data: target, error: targetError } = await supabase
    .from(TABLE)
    .select("starts_on, ends_on, is_published")
    .eq("id", id)
    .maybeSingle<{ starts_on: string | null; ends_on: string | null; is_published: boolean }>();

  if (targetError) throw new EventServiceError("Couldn't update the event.");
  if (!target) throw new EventServiceError("Event not found.");
  // Checked before the swap so a refused request never touches the current featured event.
  if (!target.is_published) throw new EventServiceError("Publish this event before featuring it.");
  if (!isUpcomingEvent(target, getLondonToday())) {
    throw new EventServiceError("This event has ended, so it can't be featured.");
  }

  const { data: previous, error: previousError } = await supabase
    .from(TABLE)
    .select("id")
    .eq("is_featured", true)
    .maybeSingle<{ id: string }>();

  if (previousError) throw new EventServiceError("Couldn't update the event.");
  if (previous?.id === id) return;

  if (previous) {
    // By id, so this can't clear an event another admin has just featured.
    const { error: clearError } = await supabase
      .from(TABLE)
      .update({ is_featured: false })
      .eq("id", previous.id);

    if (clearError) {
      console.error("[event.service] clearing featured failed:", clearError.message);
      throw new EventServiceError("Couldn't update the event.");
    }
  }

  // The published check is part of the write, so it can't go stale after a read.
  const { data: featured, error: featureError } = await supabase
    .from(TABLE)
    .update({ is_featured: true })
    .eq("id", id)
    .eq("is_published", true)
    .select("id")
    .maybeSingle<{ id: string }>();

  if (featureError || !featured) {
    if (previous) {
      const { error: restoreError } = await supabase
        .from(TABLE)
        .update({ is_featured: true })
        .eq("id", previous.id);

      // Fails with 23505 if another admin got there first, which is fine: one is featured.
      if (restoreError) {
        console.error("[event.service] restoring featured failed:", restoreError.message);
      }
    }
    refreshEventPages();

    if (featureError?.code === "23505") {
      throw new EventServiceError("Another admin just featured an event. Refresh and try again.");
    }
    if (featureError) {
      console.error("[event.service] setting featured failed:", featureError.message);
      throw new EventServiceError("Couldn't update the event.");
    }
    throw new EventServiceError("Publish this event before featuring it.");
  }

  refreshEventPages();
}

/**
 * Pin an event to the landing page, or unpin it. Pinned events show before the
 * automatic picks. At most LANDING_EVENT_LIMIT upcoming events can be pinned.
 */
export async function setEventLandingPinned(id: string, isPinned: boolean): Promise<void> {
  assertEventId(id);
  const supabase = await requireEventAdmin();

  if (isPinned) {
    const { data: target, error: targetError } = await supabase
      .from(TABLE)
      .select("starts_on, ends_on, is_published")
      .eq("id", id)
      .maybeSingle<{ starts_on: string | null; ends_on: string | null; is_published: boolean }>();

    if (targetError) throw new EventServiceError("Couldn't update the event.");
    if (!target) throw new EventServiceError("Event not found.");
    if (!target.is_published) throw new EventServiceError("Publish this event before pinning it.");
    const today = getLondonToday();
    if (!isUpcomingEvent(target, today)) {
      throw new EventServiceError("This event has ended, so it can't be pinned.");
    }

    // Ended events keep their flag but no longer take a slot, so only upcoming ones count.
    const { data: pinned, error: pinnedError } = await supabase
      .from(TABLE)
      .select("id, starts_on, ends_on")
      .eq("is_landing_pinned", true)
      .eq("is_published", true)
      .neq("id", id)
      .returns<{ id: string; starts_on: string | null; ends_on: string | null }[]>();

    if (pinnedError) throw new EventServiceError("Couldn't update the event.");
    if (pinned.filter((row) => isUpcomingEvent(row, today)).length >= LANDING_EVENT_LIMIT) {
      throw new EventServiceError(
        `The landing page has room for ${LANDING_EVENT_LIMIT} events. Unpin one first.`,
      );
    }
  }

  // The published check is part of the write, so it can't go stale after the read above.
  let query = supabase.from(TABLE).update({ is_landing_pinned: isPinned }).eq("id", id);
  if (isPinned) query = query.eq("is_published", true);

  const { data, error } = await query.select("id").maybeSingle<{ id: string }>();

  if (error) {
    console.error("[event.service] setEventLandingPinned failed:", error.message);
    throw new EventServiceError("Couldn't update the event.");
  }
  if (!data) throw new EventServiceError("Event not found, or not published.");

  refreshEventPages();
}

/** Permanently delete an event and its cover. Prefer unpublishing unless it was a mistake. */
export async function deleteEvent(id: string): Promise<void> {
  assertEventId(id);
  const supabase = await requireEventAdmin();

  // The pathname comes from the row actually deleted, so there's no read to race.
  const { data, error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id)
    .select("cover_pathname")
    .maybeSingle<{ cover_pathname: string | null }>();

  if (error) {
    console.error("[event.service] deleteEvent failed:", error.message);
    throw new EventServiceError("Couldn't delete the event.");
  }
  if (!data) throw new EventServiceError("Event not found.");

  await deleteCoverBlob(id, data.cover_pathname);
  refreshEventPages();
}

async function getCoverPathname(
  supabase: Awaited<ReturnType<typeof createClient>>,
  id: string,
): Promise<string | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("cover_pathname")
    .eq("id", id)
    .maybeSingle<{ cover_pathname: string | null }>();

  if (error) throw new EventServiceError("Couldn't look up the event.");
  if (!data) throw new EventServiceError("Event not found.");
  return data.cover_pathname;
}

/**
 * Point an event at a newly uploaded cover, then remove the old file.
 * Clears the cover description, because it described the previous image.
 * For the cover route only: never re-export this from actions.ts, because every
 * export of a "use server" file is a public endpoint.
 */
export async function setEventCover(
  id: string,
  cover: { url: string; pathname: string },
): Promise<void> {
  assertEventId(id);
  const supabase = await requireEventAdmin();

  const previousPathname = await getCoverPathname(supabase, id);

  const { data, error } = await supabase
    .from(TABLE)
    .update({ cover_url: cover.url, cover_pathname: cover.pathname, cover_alt: null })
    .eq("id", id)
    .select("id")
    .maybeSingle<{ id: string }>();

  if (error) {
    console.error("[event.service] setEventCover failed:", error.message);
    throw new EventServiceError("Couldn't save the cover.");
  }
  if (!data) throw new EventServiceError("Event not found.");

  await deleteCoverBlob(id, previousPathname);
  refreshEventPages();
}

/** Remove an event's cover, including its description, and delete the file. */
export async function removeEventCover(id: string): Promise<void> {
  assertEventId(id);
  const supabase = await requireEventAdmin();

  const previousPathname = await getCoverPathname(supabase, id);

  const { data, error } = await supabase
    .from(TABLE)
    .update({ cover_url: null, cover_pathname: null, cover_alt: null })
    .eq("id", id)
    .select("id")
    .maybeSingle<{ id: string }>();

  if (error) {
    console.error("[event.service] removeEventCover failed:", error.message);
    throw new EventServiceError("Couldn't remove the cover.");
  }
  if (!data) throw new EventServiceError("Event not found.");

  await deleteCoverBlob(id, previousPathname);
  refreshEventPages();
}
