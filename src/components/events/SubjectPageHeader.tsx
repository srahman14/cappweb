/**
 * A subject page's header, with the next event for that subject on the right when
 * there is one. Renders without the card until the event loads, or if there is none.
 *
 * Usage: <SubjectPageHeader subject="tech" title={...} description="..." />
 */
import { connection } from "next/server";
import { Suspense } from "react";
import { PageHeader, type PageHeaderProps } from "@/components/ui/PageHeader";
import { EVENT_SUBJECT_LABELS, type EventSubject } from "@/lib/events/constants";
import { getPublicEvents } from "@/lib/services/event.service";
import { NextEventCard } from "./NextEventCard";

export interface SubjectPageHeaderProps extends Omit<PageHeaderProps, "aside"> {
  subject: EventSubject;
}

export function SubjectPageHeader({ subject, ...header }: SubjectPageHeaderProps) {
  return (
    <Suspense fallback={<PageHeader {...header} />}>
      <SubjectPageHeaderContent subject={subject} header={header} />
    </Suspense>
  );
}

async function SubjectPageHeaderContent({
  subject,
  header,
}: {
  subject: EventSubject;
  header: Omit<PageHeaderProps, "aside">;
}) {
  await connection();

  const { upcoming } = await getPublicEvents(subject);
  const next = upcoming.at(0);

  return (
    <PageHeader
      {...header}
      aside={
        next && <NextEventCard event={next} label={`Next ${EVENT_SUBJECT_LABELS[subject]} event`} />
      }
    />
  );
}
