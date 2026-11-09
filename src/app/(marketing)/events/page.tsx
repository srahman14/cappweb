import type { Metadata } from "next";
import { Suspense } from "react";
import { EventsPageContent } from "@/components/events/EventsPageContent";
import { EventsPageSkeleton } from "@/components/events/EventSkeletons";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/events", "Events");

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-[18px] pb-[56px] pt-[28px] text-navy-ink sm:px-[4%] sm:pb-[80px] sm:pt-[38px]">
      {/* Page heading */}
      <header className="mb-[26px] max-w-[650px]">
        <p className="mb-[8px] text-[13px] font-extrabold tracking-[1.5px] text-navy">
          CAPP EVENTS
        </p>

        <h1 className="text-[clamp(36px,5vw,54px)] font-extrabold leading-[1.1] tracking-[-1.8px]">
          Upcoming <span className="text-indigo">Events</span>
        </h1>

        <p className="mt-3 max-w-[500px] text-[16px] leading-[1.65] text-muted">
          Stay connected and get involved! Explore our upcoming
          events, workshops, and community gatherings.
        </p>
      </header>

      <Suspense fallback={<EventsPageSkeleton />}>
        <EventsPageContent />
      </Suspense>
    </div>
  );
}
