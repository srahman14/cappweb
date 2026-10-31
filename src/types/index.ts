/**
 * Shared types. Components receive these as props, so page content
 * (events, subjects, steps...) can live in plain data files.
 */

import { ReactNode } from "react";

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

/** Which sidebar section a resource belongs to. */
export type ResourceGroup = "capp" | "subjects" | "events";

/** Icon keys understood by <ResourceIcon />. Add a key there before adding it here. */
export type ResourceIconName =
  | "document"
  | "chat"
  | "network"
  | "code"
  | "chart"
  | "cog"
  | "scale"
  | "calendar";

export interface Resource {
  id: string;
  title: string;
  description: string;
  /** Sidebar option inside the group, e.g. "CV and ATS", "Tech", "Panel recaps". */
  category: string;
  href: string;
  /** Optional card icon. Defaults to "document". */
  icon?: ResourceIconName;
  featured?: boolean; // no longer used by this page; safe to remove
}

/** A resource as listed on /resources: a Resource plus the group it sits under. */
export interface LibraryResource extends Resource {
  group: ResourceGroup;
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

/** A member quote shown in the testimonials marquee. Get the person's permission first. */
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  /** e.g. "Computer Science, Year 2". */
  role: string;
  photoSrc?: string;
}

/** One accordion row. `content` can be plain text or JSX. */
export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

/** A link in a footer column or the legal row. */
export interface FooterLink {
  label: string;
  href: string;
  /** Optional small gold tag, e.g. "New". */
  badge?: string;
}

/** A titled group of footer links. */
export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

/** One block of text inside a legal section. */
export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

/** A numbered section of a legal page. `id` becomes the anchor (#id). */
export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

/** Everything a legal page (Privacy, Terms) needs. */
export interface LegalPageData {
  /** Shown as "Last updated: ...". Keep as a [PLACEHOLDER] until launch. */
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}
