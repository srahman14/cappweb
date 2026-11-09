import type { ResourceIconName } from "@/types";

/**
 * Shared resource constants. Safe to import from client components
 * (unlike resource.service.ts, which is server-only).
 */

/** Must match the CHECK constraint on library_resources.group_id. */
export const RESOURCE_GROUP_IDS = ["capp", "subjects", "events"] as const;

/**
 * Icons your card renderer supports. Admins can only pick from this list.
 * Add to it whenever you add an icon to the renderer.
 */
export const RESOURCE_ICONS = [
  "document",
  "chat",
  "network",
  "code",
  "chart",
  "cog",
  "scale",
  "calendar",
] as const satisfies readonly ResourceIconName[];

export type ResourceIcon = (typeof RESOURCE_ICONS)[number];