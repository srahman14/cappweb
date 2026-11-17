"use client";
/**
 * The expandable past-events timeline on /events. The most recent event starts open,
 * and only one event is open at a time (opening another closes the current one).
 * Panels animate open and closed (height + fade); the small thumbnail slides away
 * while open so the cover only shows once. Respects prefers-reduced-motion.
 *
 * Usage: <EventTimeline events={past} />
 */
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { eventLinkProps } from "@/lib/events/format";
import type { EventItem } from "@/types";
import { EventCover } from "./EventCover";

export interface EventTimelineProps {
  events: EventItem[];
}

export function EventTimeline({ events }: EventTimelineProps) {
  const [openId, setOpenId] = useState<string | null>(events[0]?.id ?? null);

  return (
    <section className="mt-8 border-t border-line pt-7" id="past-events">
      <div className="mb-6">
        <p className="mb-[8px] text-[13px] font-extrabold tracking-[1.5px] text-navy">LOOKING BACK</p>

        <h2 className="text-[clamp(36px,5vw,54px)] font-extrabold leading-[1.1] tracking-[-1.8px]">
          Event <span className="text-indigo">Timeline</span>
        </h2>

        <p className="mb-0 mt-3 max-w-[500px] text-[16px] leading-[1.65] text-muted">
          Take a look at some of the events we&apos;ve hosted in the past. Select an event to see more details.
        </p>
      </div>

      <ol className="relative ml-3 list-none border-l-2 border-indigo p-0">
        {events.map((event) => (
          <TimelineEvent
            key={event.id}
            event={event}
            open={openId === event.id}
            onToggle={() => setOpenId((current) => (current === event.id ? null : event.id))}
          />
        ))}
      </ol>
    </section>
  );
}

function TimelineEvent({ event, open, onToggle }: { event: EventItem; open: boolean; onToggle: () => void }) {
  const date = event.fullDateLabel ?? event.dateLabel;
  const category = event.tags[0];
  const panelId = `event-panel-${event.id}`;
  const buttonId = `event-button-${event.id}`;
  // Only hide the thumbnail when the open panel shows the cover instead.
  const hideThumb = open && Boolean(event.coverSrc);

  return (
    <li
      className={cn(
        // Same 1px border in both states (transparent when closed) so nothing shifts when it opens.
        "relative ml-5 border transition-[margin,border-color,border-radius] duration-300 motion-reduce:transition-none",
        open ? "my-2 rounded-[10px] border-indigo" : "rounded-none border-transparent border-b-line",
      )}
    >
      {/* Timeline dot (outside the card, on the line) */}
      <span
        aria-hidden="true"
        className="absolute left-[-29px] top-[38px] h-3 w-3 rounded-full border-2 border-white bg-indigo shadow-[0_0_0_1px_var(--color-indigo)]"
      />

      {/* Inner radius = outer radius minus the 1px border, so the tinted header fills the corners exactly */}
      <div className={cn("overflow-hidden", open && "rounded-[9px]")}>
        <h3 className="m-0">
          <button
            type="button"
            id={buttonId}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
            className={cn(
              "flex min-h-[88px] w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left transition-colors duration-300 motion-reduce:transition-none sm:gap-[18px]",
              "outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo",
              open ? "bg-indigo-soft" : "hover:bg-indigo-soft/50",
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                "shrink-0 overflow-hidden transition-[width,opacity] duration-300 ease-out motion-reduce:transition-none",
                hideThumb ? "w-0 opacity-0" : "w-[76px] opacity-100 sm:w-[125px]",
              )}
            >
              <EventCover
                event={{ coverSrc: event.coverSrc }}
                sizes="125px"
                className="h-[58px] w-[76px] rounded-[7px] sm:h-[68px] sm:w-[125px]"
              />
            </div>

            <span className="flex min-w-0 flex-1 flex-col gap-[9px] text-[12px] text-navy-ink sm:text-[14px]">
              <strong>{event.title}</strong>
              <span className="text-[12px] text-muted">▦ &nbsp; {date}</span>
            </span>

            <span
              aria-hidden="true"
              className={cn(
                "text-[27px] leading-none text-navy transition-transform duration-300 motion-reduce:transition-none",
                open && "rotate-90",
              )}
            >
              ›
            </span>
          </button>
        </h3>

        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          inert={!open}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                "grid grid-cols-1 gap-[14px] p-4 sm:p-5",
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

              <div className="flex min-w-0 flex-col">
                {category && (
                  <span className="self-start rounded-full bg-indigo-soft px-[11px] py-[5px] text-[11px] font-extrabold text-indigo">
                    {category}
                  </span>
                )}

                <h4 className="my-2 text-[21px] font-bold text-navy-ink">{event.title}</h4>

                <p className="text-[12px] text-muted">
                  {[date, event.time, event.location].filter(Boolean).join(" · ")}
                </p>

                {event.description && (
                  <p className="mt-2 whitespace-pre-line text-[13px] leading-[1.7] text-muted">{event.description}</p>
                )}

                <div className="mt-[14px] flex flex-wrap gap-2">
                  {[...new Set([...event.tags.slice(1), "CAPP Community", "Past Event"])].map((label) => (
                    <span key={label} className="rounded-full bg-indigo-soft px-[11px] py-[6px] text-[11px] text-navy">
                      {label}
                    </span>
                  ))}
                </div>

                {event.href && (
                  <Link
                    className="mt-[14px] inline-flex items-center gap-1 self-start text-[13px] font-extrabold text-indigo no-underline hover:underline"
                    href={event.href}
                    {...eventLinkProps(event.href)}
                  >
                    Event details <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
