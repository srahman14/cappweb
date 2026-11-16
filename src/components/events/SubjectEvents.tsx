/**
 * The events sections on a subject page: what's coming up and what's been done,
 * or a single empty state if the subject has neither.
 *
 * Usage: <SubjectEvents subject="tech" />
 */
import { connection } from "next/server";
import { Suspense } from "react";
import { Section, SectionHeader } from "@/components/ui";
import { EVENT_SUBJECT_LABELS, type EventSubject } from "@/lib/events/constants";
import { getPublicEvents } from "@/lib/services/event.service";
import { EventList } from "./EventList";
import { EventListSkeleton } from "./EventSkeletons";
import { EventsEmptyState } from "./EventsEmptyState";

const PAST_EVENT_LIMIT = 3;

export interface SubjectEventsProps {
  subject: EventSubject;
}

export function SubjectEvents({ subject }: SubjectEventsProps) {
  return (
    <Suspense
      fallback={
        <Section>
          <SectionHeader eyebrow="Events" title="Events" />
          <EventListSkeleton />
        </Section>
      }
    >
      <SubjectEventsContent subject={subject} />
    </Suspense>
  );
}

async function SubjectEventsContent({ subject }: SubjectEventsProps) {
  await connection();

  const { upcoming, past } = await getPublicEvents(subject);

  if (upcoming.length === 0 && past.length === 0) {
    return (
      <Section>
        <SectionHeader eyebrow="Events" title="Events" />
        <div className="mt-8">
          <EventsEmptyState
            title={`No ${EVENT_SUBJECT_LABELS[subject]} events yet`}
            description="We'll list them here as soon as they're announced. In the meantime, see everything CAPP has coming up."
            linkLabel="All events"
            linkHref="/events"
          />
        </div>
      </Section>
    );
  }

  return (
    <>
      {upcoming.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow="Events"
            title="What's coming up"
            linkLabel="All events"
            linkHref="/events"
          />
          <EventList events={upcoming} />
        </Section>
      )}

      {past.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow="Events"
            title="What we've done"
            linkLabel="All events"
            linkHref="/events"
          />
          <EventList events={past.slice(0, PAST_EVENT_LIMIT)} variant="past" />
        </Section>
      )}
    </>
  );
}
