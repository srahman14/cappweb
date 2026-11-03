import type { SlotGroupId } from "@/lib/media/slot-groups";
import type { MediaSlot } from "@/lib/services/media.service";
import { MediaSlotCard } from "./MediaSlotCard";

type MediaSlotGroupProps = {
  group: { id: SlotGroupId; label: string };
  slots: MediaSlot[];
};

export function MediaSlotGroup({ group, slots }: MediaSlotGroupProps) {
  const filled = slots.filter((slot) => slot.blob_url).length;
  const empty = slots.length - filled;
  const headingId = `${group.id}-heading`;

  return (
    <section id={group.id} aria-labelledby={headingId} className="mt-10 scroll-mt-28 first:mt-0 lg:scroll-mt-8">
      <div className="mb-4 flex items-baseline gap-2">
        <h2 id={headingId} className="text-sm font-semibold text-navy-ink">
          {group.label}
        </h2>
        <p className="text-xs tabular-nums text-muted">
          {filled}/{slots.length} filled
          {empty > 0 && <span className="text-gold-ink"> · {empty} empty</span>}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {slots.map((slot) => (
          <MediaSlotCard key={slot.id} slot={slot} />
        ))}
      </div>
    </section>
  );
}
