import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { ChevronRight, ExternalLink, Plus } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EventForm } from "@/components/admin/events/EventForm";
import { EventPageCards } from "@/components/admin/events/EventPageCards";
import { EventRow } from "@/components/admin/events/EventRow";
import { ScrollToHash } from "@/components/admin/ScrollToHash";
import { EventsAdminSkeleton } from "@/components/admin/Skeletons";
import { Button } from "@/components/ui/Button";
import { requireAdmin } from "@/lib/auth/admin";
import { LANDING_EVENT_LIMIT } from "@/lib/events/format";
import {
  EVENT_PAGE_SCOPES,
  filterEventsForPage,
  parseEventPage,
  type EventPageId,
} from "@/lib/events/page-scopes";
import { getAllEvents, type AdminEvent } from "@/lib/services/event.service";

export const metadata: Metadata = {
  title: "Events",
};

type EventsSearchParams = Promise<{ page?: string | string[] }>;

export default function AdminEventsPage({ searchParams }: { searchParams: EventsSearchParams }) {
  return (
    <>
      <AdminPageHeader
        title="Events"
        description="Shown on the landing page, /events and the subject pages. Drafts stay hidden until you publish them; events move to Past on their own once they end."
        actions={
          <Button
            variant="secondary"
            size="sm"
            href="/events"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
          >
            View live page
            <ExternalLink aria-hidden="true" className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </Button>
        }
      />
      <Suspense fallback={<EventsAdminSkeleton />}>
        <AdminEventsContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function AdminEventsContent({ searchParams }: { searchParams: EventsSearchParams }) {
  await connection();
  await requireAdmin();

  const selectedPage = parseEventPage((await searchParams).page);

  const events = await getAllEvents();
  const published = events.filter((event) => event.isPublished);
  const drafts = events.filter((event) => !event.isPublished);

  const stats = [
    { label: "Total", value: events.length },
    { label: "Published", value: published.length },
    { label: "Drafts", value: drafts.length },
  ];

  const counts = Object.fromEntries(
    EVENT_PAGE_SCOPES.map(({ id }) => [id, filterEventsForPage(events, id).length]),
  ) as Record<EventPageId, number>;

  const scoped = filterEventsForPage(events, selectedPage);
  const selectedLabel = EVENT_PAGE_SCOPES.find((scope) => scope.id === selectedPage)?.label;

  const sections: { id: string; label: string; items: AdminEvent[]; empty: string }[] = [
    {
      id: "upcoming",
      label: "Upcoming",
      items: scoped.filter((event) => event.isPublished && event.isUpcoming),
      empty: "No upcoming events published here.",
    },
    {
      id: "drafts",
      label: "Drafts",
      items: scoped.filter((event) => !event.isPublished),
      empty: "No drafts here.",
    },
    {
      id: "past",
      label: "Past",
      items: scoped.filter((event) => event.isPublished && !event.isUpcoming),
      empty: "No past events here.",
    },
  ];

  return (
    <div className="space-y-6">
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[20px] border border-line bg-white p-5">
            <dt className="text-xs font-medium uppercase tracking-[0.12em] text-muted-soft">
              {stat.label}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-navy">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <details className="group/add rounded-2xl border border-dashed border-line bg-white">
        <summary className="flex cursor-pointer list-none items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo [&::-webkit-details-marker]:hidden">
          <Plus aria-hidden="true" className="size-4" />
          Add an event
        </summary>
        <div className="border-t border-dashed border-line p-4 sm:p-5">
          <EventForm />
        </div>
      </details>

      <div className="space-y-3">
        <EventPageCards selected={selectedPage} counts={counts} />
        <p className="text-sm text-muted">
          {selectedPage === "landing"
            ? `Chosen automatically: the next ${LANDING_EVENT_LIMIT} published upcoming events. There's nothing to pin here.`
            : `Showing events for: ${selectedLabel}.`}
        </p>
      </div>

      {/* Every section is shown (even when empty). Click a heading to collapse it. */}
      <div className="space-y-4">
        {sections.map((section) => (
          <details
            key={section.id}
            id={`section-${section.id}`}
            open
            className="group/section scroll-mt-24 rounded-[20px] border border-line bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-[20px] px-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo sm:px-5 [&::-webkit-details-marker]:hidden">
              <span className="flex min-w-0 items-center gap-2">
                <ChevronRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted transition-transform group-open/section:rotate-90"
                />
                <span className="text-base font-semibold text-navy">{section.label}</span>
                <span className="rounded-full bg-indigo-soft px-2 py-0.5 text-xs font-medium text-indigo">
                  {section.items.length}
                </span>
              </span>
            </summary>

            <div className="border-t border-line p-4 sm:p-5">
              {section.items.length === 0 ? (
                <p className="px-1 text-sm text-muted">{section.empty}</p>
              ) : (
                <ul className="space-y-3">
                  {section.items.map((event) => (
                    <li key={event.id} id={`event-${event.id}`} className="scroll-mt-24">
                      <EventRow event={event} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        ))}
      </div>

      <ScrollToHash />
    </div>
  );
}
