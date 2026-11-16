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
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { eventLinkProps } from "@/lib/events/format";
import type { EventItem } from "@/types";

export interface EventRowProps {
  event: EventItem;
  variant?: "upcoming" | "past";
}

export function EventRow({ event, variant = "upcoming" }: EventRowProps) {
  // Past events can be from any year, so their date needs it.
  const date = variant === "past" ? event.fullDateLabel ?? event.dateLabel : event.dateLabel;

  return (
    <li className="flex flex-col gap-3 md:flex-row md:gap-8">
      <div className="md:w-[120px] md:pt-1.5">
        <span className="flex items-center justify-start ml-4 gap-2 md:hidden">
          <p className="text-[17px] font-bold">{date}</p>
          {event.weekday && <p className="mt-0.5 text-[15px] text-muted-soft font-bold">{event.weekday}</p>}
        </span>
        <span className="hidden md:block">
          <p className="text-[17px] font-bold">{date}</p>
          {event.weekday && <p className="mt-0.5 text-[15px] text-muted-soft">{event.weekday}</p>}
        </span>
      </div>

      <Card className="flex flex-1 items-center justify-between gap-6 p-5 md:p-6">
        <div className="flex flex-col gap-2.5">
          {event.time && <span className="text-[15px] text-muted-soft">{event.time}</span>}
          <h3 className="text-xl font-bold tracking-[-0.02em] md:text-2xl">{event.title}</h3>
          <p className="text-[15px] text-muted">By {[event.hostName, event.location].filter(Boolean).join(" · ")}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {event.tags.map((tag, i) => (
              <Pill key={tag} tone={i === 0 ? "indigo" : "neutral"}>{tag}</Pill>
            ))}
          </div>
          {event.href && (
            <Link href={event.href} {...eventLinkProps(event.href)} className="mt-1 inline-flex items-center gap-1 text-[15px] font-semibold text-indigo hover:underline">
              {variant === "upcoming" ? "Details and sign-up" : "Read the recap"}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Cover thumbnail: real image if provided, otherwise a brand-gradient placeholder */}
        <div className="relative hidden h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo to-navy sm:block md:h-[150px] md:w-[150px]">
          {event.coverSrc && <Image src={event.coverSrc} alt={event.coverAlt ?? ""} fill sizes="150px" className="object-cover" />}
        </div>
      </Card>
    </li>
  );
}
