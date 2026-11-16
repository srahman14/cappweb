/**
 * Events data.
 *
 * To add an image to an event, set `image` to either:
 *  - a path under /public, e.g. "/images/events/tech-panel.jpg", or
 *  - an https URL on the Vercel Blob host allowed in next.config.ts
 *    (images.remotePatterns), e.g.
 *    "https://8sa5xojgvkufeag3.public.blob.vercel-storage.com/events/tech-panel.jpg".
 * Optionally set `alt` to describe it. Events without `image` show a placeholder.
 */
export type Event = {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  image?: string;
  alt?: string;
};

export type FeaturedEvent = Event & {
  time: string;
  location: string;
};

export const featuredEvent: FeaturedEvent = {
  id: 0,
  title: "Upcoming CAPP Event",
  date: "Date to be announced",
  time: "Time to be announced",
  location: "Location to be announced",
  category: "Upcoming",
  description:
    "Text goes here. Add a short description of the event, what attendees can expect, and why they should join us.",
};

const DEFAULT_DESCRIPTION =
  "Text goes here. Add details about this event, what happened, and the experience of the people who attended.";

const e = (
  id: number,
  title: string,
  date: string,
  category: string,
): Event => ({ id, title, date, category, description: DEFAULT_DESCRIPTION });

// Most recent first.
export const pastEvents: Event[] = [
  e(1, "Tech Panel 2026", "Oct 22, 2026", "Community"),
  e(2, "Meet and Greet", "Oct 16, 2026", "Careers"),
  e(3, "Banking Panel 2026", "Oct 15, 2026", "Volunteering"),
  e(4, "CAPP Socials", "19/20 Sep, 2026", "Wellbeing"),
  e(5, "Summer Series", "July, 2026", "Networking"),
  e(6, "FCA Firm Visit", "23 April, 2026", "Education"),
  e(7, "Women in Tech Panel", "10 Feb, 2026", "Education"),
  e(8, "Alumni Panel", "5 Feb, 2026", "Education"),
  e(9, "AC Simulation", "22 Jan, 2026", "Education"),
  e(10, "Winter Series", "19 Dec 2025 - 9 Jan 2026", "Education"),
  e(11, "Business and Finance Meet and Greet", "29 Jan, 2025", "Education"),
  e(12, "Tech Meet and Greet", "27 Jan, 2025", "Education"),
];
