/**
 * Groups media slots by the page they appear on, derived from the slot_key
 * prefix (no DB column yet). Ids double as section anchors on /admin/media.
 * Pure: safe to import from server or client code.
 */
export type SlotGroupId = "about" | "subject" | "directors" | "other";

export const SLOT_GROUPS: { id: SlotGroupId; label: string }[] = [
  { id: "about", label: "About page" },
  { id: "subject", label: "Subject pages" },
  { id: "directors", label: "Directors" },
  { id: "other", label: "Other" },
];

export function getSlotGroup(slotKey: string): SlotGroupId {
  if (slotKey.startsWith("about_")) return "about";
  if (slotKey.startsWith("subject_")) return "subject";
  if (slotKey.startsWith("directors_")) return "directors";
  return "other";
}

export function getSlotGroupLabel(slotKey: string) {
  const id = getSlotGroup(slotKey);
  return SLOT_GROUPS.find((group) => group.id === id)!.label;
}
