import type { LibraryResource, Resource, ResourceGroup } from "@/types";

/**
 * Everything listed on /resources.
 *
 * - Sidebar sections (and their order) come from `resourceGroups`.
 * - Sidebar options inside each section are derived from each resource's `category`,
 *   so adding a resource with a new category adds a new option automatically.
 * - Anything still in [BRACKETS] is a placeholder waiting for the content curator.
 */

export const resourceGroups: { id: ResourceGroup; label: string; allLabel: string }[] = [
  { id: "capp", label: "CAPP", allLabel: "All CAPP" },
  { id: "subjects", label: "Subjects", allLabel: "All subjects" },
  { id: "events", label: "Events", allLabel: "All events" },
];

/** Tags a list of resources with their group. */
const inGroup = (group: ResourceGroup, items: Resource[]): LibraryResource[] =>
  items.map((item) => ({ ...item, group }));

/** General resources useful to every subject. */
const capp = inGroup("capp", [
  {
    id: "cv-guide",
    title: "CAPP CV guide: tailoring your CV for ATS",
    description: "[TBC: one-line description]",
    category: "CV and ATS",
    href: "#", // [TBC] link
    icon: "document",
  },
  {
    id: "interview-practice",
    title: "Interview practice",
    description: "[TBC: one-line description]",
    category: "Interviews",
    href: "#", // [TBC] link
    icon: "chat",
  },
  {
    id: "linkedin-tips",
    title: "LinkedIn tips",
    description: "[TBC: one-line description]",
    category: "LinkedIn",
    href: "#", // [TBC] link
    icon: "network",
  },
]);

/**
 * Subject resources. Category must be the subject name: it becomes the sidebar option.
 * TODO: once each subject's data file exists, replace its placeholder with that
 * file's resources, e.g.
 * `...inGroup("subjects", tech.resources.map((r) => ({ ...r, category: "Tech" })))`.
 */
const subjects = inGroup("subjects", [
  {
    id: "tech-placeholder",
    title: "[Tech resource title]",
    description: "[TBC: one-line description]",
    category: "Tech",
    href: "#",
    icon: "code",
  },
  {
    id: "business-finance-placeholder",
    title: "[Business & Finance resource title]",
    description: "[TBC: one-line description]",
    category: "Business & Finance",
    href: "#",
    icon: "chart",
  },
  {
    id: "engineering-placeholder",
    title: "[Engineering resource title]",
    description: "[TBC: one-line description]",
    category: "Engineering",
    href: "#",
    icon: "cog",
  },
  {
    id: "law-placeholder",
    title: "[Law resource title]",
    description: "[TBC: one-line description]",
    category: "Law",
    href: "#",
    icon: "scale",
  },
]);

/** Material from past events (recaps, slides, recordings). */
const events = inGroup("events", [
  {
    id: "panel-recap-placeholder",
    title: "[Panel name] recap",
    description: "[TBC: one-line description]",
    category: "Panel recaps",
    href: "#",
    icon: "calendar",
  },
]);

/** Order matters: it sets the card order and the order of subject options in the sidebar. */
export const libraryResources: LibraryResource[] = [...capp, ...subjects, ...events];