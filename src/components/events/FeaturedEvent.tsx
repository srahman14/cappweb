/**
 * The large card at the top of /events. Shows the event's cover, or the navy
 * "your next big event" panel when it doesn't have one.
 *
 * Usage: <FeaturedEvent event={event} hasTimeline={past.length > 0} />
 */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { eventLinkProps } from "@/lib/events/format";
import type { EventItem } from "@/types";
import { EventCover } from "./EventCover";
import { ShareEventButton } from "./ShareEventButton";

export interface FeaturedEventProps {
  event: EventItem;
  /** Whether the past-events timeline is on the page, for the fallback link. */
  hasTimeline: boolean;
}

const primaryLink =
  "inline-flex items-center gap-[18px] rounded-[7px] bg-indigo px-[19px] py-[13px] text-[13px] font-bold text-white no-underline transition-colors hover:bg-navy";

export function FeaturedEvent({ event, hasTimeline }: FeaturedEventProps) {
  return (
    <section
      className="grid grid-cols-1 items-center gap-[18px] rounded-card border border-line bg-white p-4 sm:grid-cols-2 sm:gap-[30px]"
      aria-labelledby="featured-title"
    >
      <div className="relative min-w-0 overflow-hidden rounded-[9px] bg-navy">
        {event.coverSrc ? (
          <EventCover
            event={event}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="min-h-[230px] sm:min-h-[330px]"
          />
        ) : (
          <>
            <div className="min-h-[230px] sm:min-h-[330px]" />
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col items-start justify-center bg-[linear-gradient(90deg,var(--color-navy-deep),transparent)] p-5 text-white sm:p-[28px]"
            >
              <span className="mb-[28px] text-[19px] font-extrabold">✳ CAPP</span>
              <p className="text-[clamp(27px,4vw,46px)] font-black leading-[1.08] tracking-[-1px]">
                YOUR NEXT
              </p>
              <p className="text-[clamp(27px,4vw,46px)] font-black leading-[1.08] tracking-[-1px]">
                BIG EVENT
              </p>
              <span className="mt-[22px] text-[10px] font-extrabold tracking-[1.4px]">
                LEARN / CONNECT / GROW
              </span>
            </div>
          </>
        )}
      </div>

      <div className="p-2 sm:py-3 sm:pr-4 sm:pl-0">
        <span className="inline-block rounded-[30px] bg-navy px-[14px] py-2 text-[11px] font-extrabold tracking-[0.5px] text-white">
          FEATURED EVENT
        </span>

        <h2
          id="featured-title"
          className="my-[17px] text-[clamp(25px,3vw,34px)] font-bold leading-[1.2] tracking-[-0.7px]"
        >
          {event.title}
        </h2>

        <div className="flex flex-wrap gap-x-[18px] gap-y-3 text-[13px] text-muted">
          <span>▦ &nbsp; {event.fullDateLabel ?? event.dateLabel}</span>
          {event.time && <span>◷ &nbsp; {event.time}</span>}
          {event.location && <span>⌖ &nbsp; {event.location}</span>}
        </div>

        {event.description && (
          <p className="my-6 whitespace-pre-line text-[14px] leading-[1.8] text-muted">
            {event.description}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
          {event.href ? (
            <Link className={primaryLink} href={event.href} {...eventLinkProps(event.href)}>
              Details and sign-up <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          ) : hasTimeline ? (
            <a className={primaryLink} href="#past-events">
              Explore events <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : null}

          <ShareEventButton title={event.title} />
        </div>
      </div>
    </section>
  );
}
