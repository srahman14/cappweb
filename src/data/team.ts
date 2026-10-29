/**
 * Content for /team. Edit this file only; no React needed.
 * Anything in [BRACKETS] is a placeholder until real content exists.
 * Types live here for now; move them into types/index.ts if you prefer.
 */

export interface Director {
  id: string;
  name: string;
  role: string;
}

export interface TeamMember {
  id: string;
  name: string;
  /** e.g. "Tech ambassador" */
  role: string;
  /** Which tab they appear under. */
  subject: TeamSubjectId;
  /** One line: why they joined CAPP, or what they love about it. */
  oneLiner?: string;
  /** Full LinkedIn profile URL. Leave out to hide the icon. */
  linkedin?: string;
}
export interface TeamGroup {
  id: string;
  title: string;
  members: TeamMember[];
}

export type TeamSubjectId = "tech" | "business-finance" | "law" | "engineering";

/** Tabs on the team page, in display order. First one is selected by default. */
export const teamSubjects: { id: TeamSubjectId; label: string }[] = [
  { id: "tech", label: "Technology" },
  { id: "business-finance", label: "Business & Finance" },
  { id: "law", label: "Law" },
  { id: "engineering", label: "Engineering" },
];

export interface ApplicationInfo {
  status: "open" | "closed";
  /** Shown when applications are open. */
  openText: string;
  /** Shown when applications are closed. */
  closedText: string;
  /** e.g. "within two weeks" */
  responseTime: string;
  /** Where "Apply now" goes while open. Replace with the real form link. */
  applyHref: string;
}

export const directors: Director[] = [
  { id: "director-1", name: "[DIRECTOR NAME]", role: "[ROLE]" },
  { id: "director-2", name: "[DIRECTOR NAME]", role: "[ROLE]" },
];

/** Optional group photo of the directors, a path in /public. Leave out for the placeholder. */
export const directorsImage: { src?: string; alt: string } = {
  src: "/media/IMG_2820.JPG",
  alt: "panel-event image",
};

export const directorsVideo: { src?: string } = {
  src: "/media/IMG_1112.MP4",
};

export const directorsMessage = {
  title: "A note from the directors",
  paragraphs: [
    "Welcome to CAPP (Careers and People Progression)! We believe that everyone deserves the opportunity to grow, develop their skills, and reach their full potential, regardless of their background, experience, or where they are starting from. CAPP exists to help create those opportunities by bringing people together, encouraging personal development, and supporting individuals as they navigate their career journeys.",

    "We want CAPP to be a place where everyone feels welcome. Whether you are a student exploring your future career, a graduate taking your first steps into the professional world, someone looking to develop new skills, or an experienced individual seeking new opportunities, there is a place for you here. We value the different perspectives, experiences, and ambitions that every member brings to our community.",

    "Thank you for being part of CAPP. We look forward to growing together and helping one another take the next step towards a brighter future.",
  ],
  signOff: "Aiman & Khadeja",
};

export const teamMembers: TeamMember[] = [
  {
    id: "tech-1",
    name: "[NAME]",
    role: "Tech ambassador",
    subject: "tech",
    oneLiner: "[ONE LINER: why they joined CAPP or what they love about it.]",
    linkedin: "https://www.linkedin.com/", // replace with the real profile URL
  },
  { id: "tech-2", name: "[NAME]", role: "Tech ambassador", subject: "tech" },
  {
    id: "bf-1",
    name: "[NAME]",
    role: "Business & Finance ambassador",
    subject: "business-finance",
  },
  {
    id: "bf-2",
    name: "[NAME]",
    role: "Business & Finance ambassador",
    subject: "business-finance",
  },
  { id: "law-1", name: "[NAME]", role: "Law ambassador", subject: "law" },
  { id: "law-2", name: "[NAME]", role: "Law ambassador", subject: "law" },
  {
    id: "eng-1",
    name: "[NAME]",
    role: "Engineering ambassador",
    subject: "engineering",
  },
  {
    id: "eng-2",
    name: "[NAME]",
    role: "Engineering ambassador",
    subject: "engineering",
  },
];

export const application: ApplicationInfo = {
  status: "open", // change to "closed" when applications shut
  openText:
    "Applications are open. [WHAT YOU CAN APPLY FOR, e.g. ambassador and committee roles.]",
  closedText:
    "Applications are closed for now. Join the WhatsApp community and we will announce it there when they reopen.",
  responseTime: "[RESPONSE TIME, e.g. within two weeks]",
  applyHref: "/get-involved",
};
