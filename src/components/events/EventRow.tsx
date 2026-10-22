/**
 * One event in the Luma-style layout: date column on the left, then a card with
 * time, title, host, location, tags and a square cover thumbnail on the right.
 *
 * Reused on the Home page, the Events page and subject pages.
 *   variant="upcoming" -> link says "Details and sign-up"
 *   variant="past"     -> link says "Read the recap"
 *
 * Usage: <EventRow event={event} variant="upcoming" />
 */
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import type { EventItem } from "@/types";

export interface EventRowProps {
  event: EventItem;
  variant?: "upcoming" | "past";
}

export function EventRow({ event, variant = "upcoming" }: EventRowProps) {
  return (
    <li className="flex flex-col gap-3 md:flex-row md:gap-8">
      <div className="md:w-[120px] md:pt-1.5">
        <p className="text-[17px] font-bold">{event.dateLabel}</p>
        <p className="mt-0.5 text-[15px] text-muted-soft">{event.weekday}</p>
      </div>

      <Card className="flex flex-1 items-center justify-between gap-6 p-5 md:p-6">
        <div className="flex flex-col gap-2.5">
          <span className="text-[15px] text-muted-soft">{event.time}</span>
          <h3 className="text-xl font-bold tracking-[-0.02em] md:text-2xl">{event.title}</h3>
          <p className="text-[15px] text-muted">By {event.hostName} · {event.location}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {event.tags.map((tag, i) => (
              <Pill key={tag} tone={i === 0 ? "indigo" : "neutral"}>{tag}</Pill>
            ))}
          </div>
          <Link href={event.href} className="mt-1 text-[15px] font-semibold text-indigo hover:underline">
            {variant === "upcoming" ? "Details and sign-up →" : "Read the recap →"}
          </Link>
        </div>

        {/* Cover thumbnail: real image if provided, otherwise a brand-gradient placeholder */}
        <div className="relative hidden h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo to-navy sm:block md:h-[150px] md:w-[150px]">
          {event.coverSrc && <Image src={event.coverSrc} alt="" fill sizes="150px" className="object-cover" />}
        </div>
      </Card>
    </li>
  );
}
