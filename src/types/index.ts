/**
 * Shared types. Components receive these as props, so page content
 * (events, subjects, steps...) can live in plain data files.
 */

/** A link in the navbar. */
export interface NavLink {
  label: string;
  href: string;
}

/** A social profile shown as an icon. */
export interface SocialLink {
  platform: "tiktok" | "instagram" | "linkedin";
  href: string;
}

/** A CAPP event (upcoming or past). */
export interface EventItem {
  id: string;
  title: string;
  /** Short date, e.g. "Oct 24". */
  dateLabel: string;
  /** e.g. "Saturday". */
  weekday: string;
  time: string;
  location: string;
  hostName: string;
  /** Pill labels, e.g. ["Panel", "Tech"]. */
  tags: string[];
  /** Optional cover image (path in /public). A gradient placeholder is shown if missing. */
  coverSrc?: string;
  /** Sign-up link (upcoming) or recap page (past). */
  href: string;
}

/** One subject card (Tech, Business & Finance, ...). */
export interface Subject {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  /** Full Tailwind gradient classes, e.g. "from-indigo to-navy". Must be written out in full so Tailwind sees them. */
  gradient: string;
  /** Optional background photo (path in /public). */
  imageSrc?: string;
}

/** One step in the "get started" journey. */
export interface Step {
  id: string;
  title: string;
  description: string;
}

/** A company whose people have spoken at CAPP panels. */
export interface Speaker {
  name: string;
  /** Optional logo file in /public. Falls back to the name as text. */
  logoSrc?: string;
}
