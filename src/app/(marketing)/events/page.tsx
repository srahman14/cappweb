
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Button, HandDrawnUnderline, PageHeader } from "@/components/ui";
import { SITE } from "@/lib/site";
import { featuredEvent, pastEvents } from "@/data/events";
import { EventImage } from "@/components/events/EventImage";
import { EventTimeline } from "@/components/events/EventTimeline";
import ShareButton from "./sharebutton";

export const metadata: Metadata = {
  title: "Events",
  description: "Discover upcoming CAPP events and explore events from the past.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Events" }]}
        title={
          <>
            <HandDrawnUnderline rotate={-1.5}>Events</HandDrawnUnderline> at CAPP
          </>
        }
        description="Stay connected and get involved! Explore our upcoming events, workshops and community gatherings."
        actions={
          <>
            <Button href={SITE.whatsappUrl} variant="onDark">
              Join the community
            </Button>
            <Button href="#past-events" variant="outlineOnDark">
              Explore past events
            </Button>
          </>
        }
      />
    <div className="px-3 pb-[56px] pt-[28px] text-navy-ink sm:pb-[80px] sm:pt-[38px] md:px-6">
      {/* Featured event */}
      <section
        className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 sm:gap-[30px]"
        aria-labelledby="featured-title"
      >
        <EventImage
          src={featuredEvent.image}
          alt={featuredEvent.alt ?? featuredEvent.title}
          className="min-h-[230px] sm:min-h-[330px]"
          sizes="(min-width: 640px) 50vw, 100vw"
        />

        <div className="flex min-w-0 flex-col">
          <div className="flex items-start justify-between gap-4">
            <h2
              id="featured-title"
              className="text-[clamp(25px,3vw,34px)] font-bold leading-[1.2] tracking-[-0.7px]"
            >
              {featuredEvent.title}
            </h2>
            <ShareButton />
          </div>

          <div className="mt-4 flex flex-wrap gap-x-[18px] gap-y-3 text-[13px] text-muted">
            <span>▦ &nbsp; {featuredEvent.date}</span>
            <span>◷ &nbsp; {featuredEvent.time}</span>
            <span>⌖ &nbsp; {featuredEvent.location}</span>
          </div>

          <p className="my-6 text-[14px] leading-[1.8] text-muted">
            {featuredEvent.description}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              className="inline-flex items-center gap-[18px] rounded-[7px] bg-indigo px-[19px] py-[13px] text-[13px] font-bold text-white no-underline transition-colors hover:bg-navy"
              href="#past-events"
            >
              Explore events <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a
              className="text-[13px] font-extrabold text-indigo no-underline hover:underline"
              href="#past-events"
            >
              Learn more <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Past events */}
      <section
        className="mt-8 border-t border-line pt-7"
        id="past-events"
      >
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

        <EventTimeline events={pastEvents} />
      </section>
    </div>
    </>
  );
}
