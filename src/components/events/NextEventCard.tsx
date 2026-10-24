/**
 * Glass card for navy panels highlighting one upcoming event
 * (used in <PageHeader aside={...} />).
 *
 * Usage: <NextEventCard event={event} label="Next Tech event" />
 */
import Link from "next/link";
import type { EventItem } from "@/types";

export interface NextEventCardProps {
  event: EventItem;
  label?: string;
}

export function NextEventCard({ event, label = "Next event" }: NextEventCardProps) {
  return (
    <Link
      href={event.href}
      className="block rounded-3xl border border-white/20 bg-white/10 p-7 transition hover:bg-white/15"
    >
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-gold">{label}</p>
      <h2 className="mb-1.5 text-2xl font-bold tracking-[-0.02em] md:text-[28px]">{event.title}</h2>
      <p className="text-on-dark">
        {event.dateLabel} · {event.time} · {event.location}
      </p>
    </Link>
  );
}