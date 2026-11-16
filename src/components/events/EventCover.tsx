/**
 * An event's cover image, or the brand gradient when there isn't one.
 * The parent sets the size; this fills it.
 *
 * Usage: <EventCover event={event} sizes="150px" className="h-32 w-32" />
 */
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { EventItem } from "@/types";

export interface EventCoverProps {
  event: Pick<EventItem, "coverSrc" | "coverAlt">;
  sizes: string;
  className?: string;
}

export function EventCover({ event, sizes, className }: EventCoverProps) {
  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br from-indigo to-navy", className)}>
      {event.coverSrc && (
        <Image src={event.coverSrc} alt={event.coverAlt ?? ""} fill sizes={sizes} className="object-cover" />
      )}
    </div>
  );
}
