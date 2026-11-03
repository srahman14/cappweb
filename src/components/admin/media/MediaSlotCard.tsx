import { ImagePlus } from "lucide-react";
import MediaUploadButton from "@/components/media/media-upload-button";
import { MediaImage } from "@/components/media/MediaImage";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import { formatAdminDate } from "@/lib/format";
import type { MediaSlot } from "@/lib/services/media.service";

/** Server-rendered slot card; the upload button is the only client island. */
export function MediaSlotCard({ slot }: { slot: MediaSlot }) {
  const label = slot.label || slot.slot_key;
  const labelId = `slot-${slot.slot_key}-label`;
  const filled = Boolean(slot.blob_url);

  return (
    <article
      id={`slot-${slot.slot_key}`}
      aria-labelledby={labelId}
      className={cn(
        "flex scroll-mt-28 flex-col overflow-hidden rounded-xl border bg-white lg:scroll-mt-8",
        filled ? "border-line" : "border-gold/60",
      )}
    >
      <div className="relative aspect-video bg-indigo-soft">
        {slot.blob_url ? (
          <MediaImage
            src={slot.blob_url}
            alt={slot.alt_text ?? ""}
            fill
            sizes="(min-width: 1280px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <>
            <div className="grid h-full place-items-center border-b border-dashed border-muted-soft bg-indigo-soft/60">
              <div className="flex flex-col items-center gap-1">
                <ImagePlus aria-hidden="true" className="size-6 text-muted" />
                <span className="text-xs font-medium text-muted">No image yet</span>
              </div>
            </div>
            <Pill tone="attention" className="absolute left-3 top-3">
              Empty
            </Pill>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 id={labelId} className="text-sm font-semibold text-navy-ink">
          {label}
        </h3>
        <p className="font-mono text-xs text-muted">{slot.slot_key}</p>
        {slot.description && <p className="line-clamp-2 text-sm text-muted">{slot.description}</p>}
        {filled && slot.updated_at && (
          <p className="text-xs text-muted">
            Updated <time dateTime={slot.updated_at}>{formatAdminDate(slot.updated_at)}</time>
          </p>
        )}

        <div className="mt-auto pt-3">
          <MediaUploadButton slotKey={slot.slot_key} slotLabel={label} hasImage={filled} />
        </div>
      </div>
    </article>
  );
}
