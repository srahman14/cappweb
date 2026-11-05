/**
 * The next few events on the landing page. Only the list is request-time, so the
 * rest of the page stays in the static shell.
 *
 * Usage: <LandingEvents />
 */
import { connection } from "next/server";
import { Suspense } from "react";
import { selectLandingEvents } from "@/lib/events/format";
import { getPublicEvents } from "@/lib/services/event.service";
import { EventList } from "./EventList";
import { EventListSkeleton } from "./EventSkeletons";
import { EventsEmptyState } from "./EventsEmptyState";

export function LandingEvents() {
  return (
    <Suspense fallback={<EventListSkeleton />}>
      <LandingEventsContent />
    </Suspense>
  );
}

async function LandingEventsContent() {
  await connection();

  const { upcoming } = await getPublicEvents();
  const events = selectLandingEvents(upcoming);

  if (events.length === 0) {
    return (
      <div className="mt-8">
        <EventsEmptyState
          title="No upcoming events right now"
          description="New events are on the way. In the meantime, see what we've done so far."
          linkLabel="Past events and recaps"
          linkHref="/events"
        />
      </div>
    );
  }

  return <EventList events={events} />;
}
