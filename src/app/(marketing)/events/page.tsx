import type { Metadata } from "next";
import { Suspense } from "react";
import { EventsPageContent } from "@/components/events/EventsPageContent";
import { EventsPageSkeleton } from "@/components/events/EventSkeletons";
import { Button, HandDrawnUnderline, PageHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/events", "Events");

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

      <div className="mx-auto max-w-[1440px] px-[18px] pb-[56px] pt-[28px] text-navy-ink sm:px-[4%] sm:pb-[80px] sm:pt-[38px]">
        <Suspense fallback={<EventsPageSkeleton />}>
          <EventsPageContent />
        </Suspense>
      </div>
    </>
  );
}
