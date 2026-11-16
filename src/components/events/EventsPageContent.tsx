/**
 * Everything on /events below the page heading, from published events.
 * Request-time: render inside Suspense with <EventsPageSkeleton />.
 *
 * Usage: <EventsPageContent />
 */
import { connection } from "next/server";
import { getPublicEvents } from "@/lib/services/event.service";
import { EventList } from "./EventList";
import { EventsEmptyState } from "./EventsEmptyState";
import { EventTimeline } from "./EventTimeline";
import { FeaturedEvent } from "./FeaturedEvent";

export async function EventsPageContent() {
  await connection();

  const { upcoming, past, featured } = await getPublicEvents();
  const otherUpcoming = upcoming.filter((event) => event.id !== featured?.id);

  return (
    <>
      {featured ? (
        <FeaturedEvent event={featured} hasTimeline={past.length > 0} />
      ) : (
        <EventsEmptyState
          headingLevel="h2"
          title="No upcoming events right now"
          description="New events are on the way. Join the community to hear about them first."
          linkLabel="Get involved"
          linkHref="/get-involved"
        />
      )}

      {otherUpcoming.length > 0 && (
        <section className="mt-8" aria-labelledby="more-upcoming-title">
          <h2
            id="more-upcoming-title"
            className="mb-6 text-[clamp(25px,3vw,34px)] font-bold leading-[1.2] tracking-[-0.7px]"
          >
            More upcoming events
          </h2>
          <EventList events={otherUpcoming} />
        </section>
      )}

      {past.length > 0 && <EventTimeline events={past} />}
    </>
  );
}
