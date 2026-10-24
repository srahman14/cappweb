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
  /** Optional visual scale for logos whose artwork has extra whitespace in its viewBox. */
  logoScale?: number;
}

/** A learning resource (LeetCode, a CV guide...). */
export interface Resource {
  id: string;
  title: string;
  description: string;
  /** Pill label, e.g. "Practice", "Learn", "AI". */
  category: string;
  href: string;
}

/** An ambassador or team member. */
export interface Person {
  id: string;
  name: string;
  role: string;
  /** Optional photo (path in /public). A gold gradient circle is shown if missing. */
  photoSrc?: string;
  linkedinUrl?: string;
}

/**
 * Everything a subject page needs. Typed, so the build fails if a field is missing.
 * Tech, Business & Finance, Engineering and Law each supply one of these in data/.
 */
export interface SubjectPageData {
  /** e.g. "Tech" */
  name: string;
  description: string;
  /** Label of the main button, e.g. "Join the Tech channel". */
  channelLabel: string;
  /** Subject-specific WhatsApp channel link. Falls back to the main community link. */
  channelUrl?: string;
  about: { eyebrow: string; title: string; body: string; bullets: string[] };
  /** Shown in the header's right-hand card. Omit if nothing is scheduled. */
  nextEvent?: EventItem;
  resources: Resource[];
  pastEvents: EventItem[];
  ambassadors: Person[];
}