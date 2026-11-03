/** Absolute, server-formatted admin date, e.g. "3 Nov 2026, 14:05". */
const adminDateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/London",
});

export function formatAdminDate(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : adminDateFormat.format(date);
}
