/**
 * The expandable past-events timeline on /events. The most recent event starts open.
 *
 * Usage: <EventTimeline events={past} />
 */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { eventLinkProps } from "@/lib/events/format";
import { cn } from "@/lib/cn";
import type { EventItem } from "@/types";
import { EventCover } from "./EventCover";

export interface EventTimelineProps {
  events: EventItem[];
}

export function EventTimeline({ events }: EventTimelineProps) {
  return (
    <section className="mt-8 border-t border-line pt-7" id="past-events">
      <div className="mb-6">
        <p className="mb-[8px] text-[13px] font-extrabold tracking-[1.5px] text-navy">
          LOOKING BACK
        </p>

        <h2 className="text-[clamp(36px,5vw,54px)] font-extrabold leading-[1.1] tracking-[-1.8px]">
          Event <span className="text-indigo">Timeline</span>
        </h2>

        <p className="mb-0 mt-3 max-w-[500px] text-[16px] leading-[1.65] text-muted">
          Take a look at some of the events we&apos;ve hosted in the
          past. Select an event to see more details.
        </p>
      </div>

      <div className="relative ml-3 border-l-2 border-indigo">
        {events.map((event, index) => (
          <TimelineEvent key={event.id} event={event} open={index === 0} />
        ))}
      </div>
    </section>
  );
}

function TimelineEvent({ event, open }: { event: EventItem; open: boolean }) {
  const date = event.fullDateLabel ?? event.dateLabel;
  const category = event.tags[0];

  return (
    <details
      className={cn(
        "group relative ml-5 border-b border-line",
        open &&
          "group/featured [&[open]]:mb-[6px] [&[open]]:mt-[6px] [&[open]]:rounded-[9px] [&[open]]:border [&[open]]:border-indigo",
      )}
      open={open}
    >
      {/* Timeline dot */}
      <span className="absolute top-7 left-[-28px] h-3 w-3 rounded-full border-2 border-white bg-indigo shadow-[0_0_0_1px_var(--color-indigo)]" />

      {/* Expandable event heading */}
      <summary
        className={cn(
          "flex min-h-[88px] cursor-pointer list-none items-center gap-3 py-[10px] pr-3 [&::-webkit-details-marker]:hidden sm:gap-[18px]",
          open && "group-open/featured:bg-indigo-soft",
        )}
      >
        <div className="w-[76px] min-w-[76px] sm:w-[125px] sm:min-w-[125px]">
          <EventCover
            event={{ coverSrc: event.coverSrc }}
            sizes="125px"
            className="min-h-[58px] rounded-[7px] sm:min-h-[68px]"
          />
        </div>

        <span className="flex flex-1 flex-col gap-[9px] text-[12px] sm:text-[14px]">
          <strong>{event.title}</strong>

          <span className="text-[12px] text-muted">▦ &nbsp; {date}</span>
        </span>

        <span
          className="text-[27px] text-navy transition-transform duration-200 group-open:rotate-90"
          aria-hidden="true"
        >
          ›
        </span>
      </summary>

      {/* Expanded event details */}
      <div
        className={cn(
          "grid grid-cols-1 gap-[14px] px-4 pb-[18px]",
          event.coverSrc && "sm:grid-cols-[minmax(180px,0.9fr)_1fr] sm:gap-6",
        )}
      >
        {event.coverSrc && (
          <EventCover
            event={event}
            sizes="(min-width: 640px) 40vw, 100vw"
            className="min-h-[180px] rounded-[7px] sm:min-h-[210px]"
          />
        )}

        <div>
          {category && (
            <span className="inline-block text-[12px] font-extrabold text-indigo">{category}</span>
          )}

          <h3 className="my-2 text-[21px] font-bold">{event.title}</h3>

          <p className="text-[12px] text-muted">
            {[date, event.time, event.location].filter(Boolean).join(" · ")}
          </p>

          {event.description && (
            <p className="whitespace-pre-line text-[13px] leading-[1.7] text-muted">
              {event.description}
            </p>
          )}

          <div className="my-[14px] flex flex-wrap gap-2">
            {[...new Set([...event.tags, "CAPP Community", "Past Event"])].map((label) => (
              <span
                key={label}
                className="rounded-[20px] bg-indigo-soft px-[11px] py-[7px] text-[11px] text-navy"
              >
                {label}
              </span>
            ))}
          </div>

          {event.href && (
            <Link
              className="text-[13px] font-extrabold text-indigo no-underline hover:underline"
              href={event.href}
              {...eventLinkProps(event.href)}
            >
              Event details <ArrowUpRight size={16} aria-hidden="true" className="inline" />
            </Link>
          )}
        </div>
      </div>
    </details>
  );
}
