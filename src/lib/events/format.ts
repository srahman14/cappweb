/**
 * Pure event date, time and link helpers. Safe from server or client code.
 *
 * events.starts_on / ends_on are `date` and start_time / end_time are `time`:
 * UK wall-clock values with no timezone. They are formatted from their string
 * parts in UTC, so the server's timezone can never shift them by a day.
 */

/** Today's date in Europe/London as YYYY-MM-DD, whatever the server's timezone. */
export function getLondonToday(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/**
 * The only definition of upcoming versus past. An event with no date is upcoming,
 * and an event stays upcoming through the whole of its last day.
 * YYYY-MM-DD strings compare correctly as text.
 */
export function isUpcomingEvent(
  event: { starts_on: string | null; ends_on: string | null },
  today: string,
): boolean {
  const lastDay = event.ends_on ?? event.starts_on;
  return lastDay === null || lastDay >= today;
}

/**
 * Which upcoming event /events leads with. `upcoming` must be soonest first.
 * An ended is_featured event never wins: the section is headed "Upcoming Events".
 */
export function pickFeatured<T extends { is_featured: boolean }>(upcoming: T[]): T | null {
  return upcoming.find((event) => event.is_featured) ?? upcoming[0] ?? null;
}

/** How many events the landing page shows. */
export const LANDING_EVENT_LIMIT = 3;

/**
 * The one definition of what the landing page shows, used by the page itself and by
 * the admin. `upcoming` must be published only, and soonest first.
 *
 * Pinned events come first (soonest first, up to the limit); any slots left over are
 * filled with the soonest unpinned events. The result keeps the soonest-first order.
 */
export function selectLandingEvents<T>(
  upcoming: T[],
  isPinned: (event: T) => boolean = () => false,
): T[] {
  const chosen = new Set<T>([
    ...upcoming.filter(isPinned),
    ...upcoming.filter((event) => !isPinned(event)),
  ].slice(0, LANDING_EVENT_LIMIT));

  return upcoming.filter((event) => chosen.has(event));
}

function toUtcDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

const dayFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", timeZone: "UTC" });
const dayMonthFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});
const yearFormat = new Intl.DateTimeFormat("en-GB", { year: "numeric", timeZone: "UTC" });
const weekdayFormat = new Intl.DateTimeFormat("en-GB", { weekday: "long", timeZone: "UTC" });

const day = (value: string) => dayFormat.format(toUtcDate(value));
const dayMonth = (value: string) => dayMonthFormat.format(toUtcDate(value));
const year = (value: string) => yearFormat.format(toUtcDate(value));

/** "22 Oct", "19–20 Sep" or "19 Dec – 9 Jan". */
export function formatShortDate(startsOn: string, endsOn: string | null): string {
  if (!endsOn || endsOn === startsOn) return dayMonth(startsOn);
  if (startsOn.slice(0, 7) === endsOn.slice(0, 7)) return `${day(startsOn)}–${dayMonth(endsOn)}`;
  return `${dayMonth(startsOn)} – ${dayMonth(endsOn)}`;
}

/** "22 Oct 2026", "19–20 Sep 2026" or "19 Dec 2025 – 9 Jan 2026". */
export function formatFullDate(startsOn: string, endsOn: string | null): string {
  if (endsOn && endsOn !== startsOn && year(startsOn) !== year(endsOn)) {
    return `${dayMonth(startsOn)} ${year(startsOn)} – ${dayMonth(endsOn)} ${year(endsOn)}`;
  }
  return `${formatShortDate(startsOn, endsOn)} ${year(startsOn)}`;
}

/** "Thursday". Undefined for multi-day events, where one weekday would mislead. */
export function formatWeekday(startsOn: string, endsOn: string | null): string | undefined {
  if (endsOn && endsOn !== startsOn) return undefined;
  return weekdayFormat.format(toUtcDate(startsOn));
}

/** "18:30:00" -> "6:30pm", "18:00:00" -> "6pm". */
function formatClock(value: string): string {
  const [hours, minutes] = value.split(":").map(Number);
  const hour12 = hours % 12 || 12;
  const suffix = hours < 12 ? "am" : "pm";
  return minutes === 0
    ? `${hour12}${suffix}`
    : `${hour12}:${String(minutes).padStart(2, "0")}${suffix}`;
}

/** "6pm" or "6pm – 8:30pm". Undefined when there is no start time. */
export function formatTimeRange(
  startTime: string | null,
  endTime: string | null,
): string | undefined {
  if (!startTime) return undefined;
  return endTime ? `${formatClock(startTime)} – ${formatClock(endTime)}` : formatClock(startTime);
}

/** Only used as the base for resolving internal paths; it never reaches a page. */
const INTERNAL_BASE = "https://capp.invalid";

/**
 * Returns a safe href, or null if the value can't be rendered as a link.
 * Parsed with the same URL rules browsers use, not prefix checks, because browsers
 * strip tabs and newlines: "/<tab>/evil.com" would otherwise become "//evil.com".
 *
 * - Starting with "/": must stay on this site. Returns path + query + hash.
 * - Anything else: must be an absolute http(s) URL. Returns the normalised URL.
 */
export function sanitiseEventHref(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  try {
    if (trimmed.startsWith("/")) {
      const url = new URL(trimmed, INTERNAL_BASE);
      const path = `${url.pathname}${url.search}${url.hash}`;

      // Checked again on the result: parsing removes dot segments, so "/.//evil.com"
      // keeps this origin but its path is "//evil.com", which leaves the site.
      const staysOnSite =
        url.origin === INTERNAL_BASE && new URL(path, INTERNAL_BASE).origin === INTERNAL_BASE;
      return staysOnSite ? path : null;
    }

    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

/** Off-site links open in a new tab. Pass to a <Link> or <a>. */
export function eventLinkProps(href: string) {
  return href.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" };
}
