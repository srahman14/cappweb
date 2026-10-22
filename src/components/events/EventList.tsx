/**
 * A vertical list of <EventRow>s. Keeps spacing in one place.
 *
 * Usage: <EventList events={upcomingEvents} />
 *        <EventList events={pastEvents} variant="past" />
 */
import type { EventItem } from "@/types";
import { EventRow, type EventRowProps } from "./EventRow";

export interface EventListProps {
  events: EventItem[];
  variant?: EventRowProps["variant"];
}

export function EventList({ events, variant = "upcoming" }: EventListProps) {
  return (
    <ul className="flex flex-col gap-5">
      {events.map((event) => (
        <EventRow key={event.id} event={event} variant={variant} />
      ))}
    </ul>
  );
}
