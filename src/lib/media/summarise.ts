/**
 * Pure summary of media slots for the admin Overview. Takes the rows from
 * getMediaSlots() (already in sort_order), so the Overview needs no extra query.
 */
export type SummarisableSlot = {
  slot_key: string;
  label: string | null;
  blob_url: string | null;
};

export type MediaSummary = {
  total: number;
  filled: number;
  empty: number;
  /** Empty slots in sort_order. */
  emptySlots: { slotKey: string; label: string }[];
};

export function summariseMedia(slots: SummarisableSlot[]): MediaSummary {
  const emptySlots = slots
    .filter((slot) => !slot.blob_url)
    .map((slot) => ({ slotKey: slot.slot_key, label: slot.label || slot.slot_key }));

  return {
    total: slots.length,
    filled: slots.length - emptySlots.length,
    empty: emptySlots.length,
    emptySlots,
  };
}
