import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { CheckCircle2, ChevronRight, Pin } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { OverviewSkeleton } from "@/components/admin/Skeletons";
import { StatGroup } from "@/components/admin/StatTile";
import { resourceGroups } from "@/data/resources";
import { requireAdmin } from "@/lib/auth/admin";
import { LANDING_EVENT_LIMIT } from "@/lib/events/format";
import { getSlotGroupLabel } from "@/lib/media/slot-groups";
import { getEventOverview } from "@/lib/services/event.service";
import { getMediaOverview } from "@/lib/services/media.service";
import { getResourceOverview } from "@/lib/services/resource.service";
import type { ResourceGroup } from "@/types";

export const metadata: Metadata = {
  title: "Overview",
};

const EMPTY_LIST_LIMIT = 5;
const DRAFT_LIST_LIMIT = 5;

const groupLabel = (id: ResourceGroup) => resourceGroups.find((g) => g.id === id)?.label ?? id;

export default function AdminOverviewPage() {
  return (
    <>
      <AdminPageHeader title="Overview" description="Images and content managed through the CAPP admin." />
      <Suspense fallback={<OverviewSkeleton />}>
        <OverviewContent />
      </Suspense>
    </>
  );
}

async function OverviewContent() {
  // Event overview works out "today"; it must run at request time, not prerender.
  await connection();
  await requireAdmin();

  const [media, resources, events] = await Promise.all([
    getMediaOverview(),
    getResourceOverview(),
    getEventOverview(),
  ]);

  const { total, filled, empty, emptySlots } = media;
  const allFilled = total > 0 && empty === 0;
  const shown = emptySlots.slice(0, EMPTY_LIST_LIMIT);
  const shownDrafts = resources.draftResources.slice(0, DRAFT_LIST_LIMIT);
  const shownEventDrafts = events.draftEvents.slice(0, DRAFT_LIST_LIMIT);

  return (
    <div className="space-y-6">
      <section
        aria-label="Summary"
        className="grid grid-cols-1 divide-y divide-line rounded-xl border border-line bg-white lg:grid-cols-3 lg:divide-x lg:divide-y-0"
      >
        <StatGroup
          title="Media"
          status={allFilled ? <DoneNote>All filled</DoneNote> : undefined}
          items={[
            { label: "Slots", value: total },
            { label: "Filled", value: filled },
            { label: "Needs image", value: empty, attention: empty > 0, href: empty > 0 ? "/admin/media" : undefined },
          ]}
        />
        <StatGroup
          title="Resources"
          status={resources.total > 0 && resources.drafts === 0 ? <DoneNote>All published</DoneNote> : undefined}
          items={[
            { label: "Total", value: resources.total },
            { label: "Published", value: resources.published },
            { label: "Drafts", value: resources.drafts, attention: resources.drafts > 0, href: resources.drafts > 0 ? "/admin/resources" : undefined },
          ]}
        />
        <StatGroup
          title="Events"
          status={events.total > 0 && events.drafts === 0 ? <DoneNote>All published</DoneNote> : undefined}
          items={[
            { label: "Total", value: events.total },
            { label: "Upcoming", value: events.upcoming, href: "/admin/events" },
            { label: "Drafts", value: events.drafts, attention: events.drafts > 0, href: events.drafts > 0 ? "/admin/events" : undefined },
          ]}
        />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminPanel
          title="On the landing page"
          meta={`${events.pinnedCount}/${LANDING_EVENT_LIMIT} pinned`}
          footer={
            <div className="space-y-1 text-xs text-muted">
              <p>
                <span className="font-medium text-navy-ink">Featured on /events:</span>{" "}
                {events.featured ? events.featured.title : "none (the next upcoming event leads)"}
              </p>
              <p>
                <span className="font-medium text-navy-ink">Next event:</span>{" "}
                {events.next ? `${events.next.title}, ${events.next.whenLabel}` : "nothing upcoming"}
              </p>
            </div>
          }
        >
          {events.landing.length > 0 ? (
            <ul className="p-2">
              {events.landing.map((event) => (
                <li key={event.id}>
                  <Link
                    href={`/admin/events#event-${event.id}`}
                    className="focus-ring flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 hover:bg-surface"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-navy-ink">{event.title}</span>
                      <span className="flex items-center gap-1.5 text-xs text-muted">
                        {event.pinned ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-indigo">
                            <Pin aria-hidden="true" className="size-3 fill-current" />
                            Pinned
                          </span>
                        ) : (
                          <span>Automatic</span>
                        )}
                        <span aria-hidden="true">·</span>
                        {event.whenLabel}
                      </span>
                    </span>
                    <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-sm text-muted">
              No upcoming published events, so the landing page shows its empty message.
            </p>
          )}
        </AdminPanel>

        <AdminPanel
          title="Needs an image"
          meta={total > 0 ? `${filled}/${total} done` : undefined}
          footer={
            empty > EMPTY_LIST_LIMIT ? (
              <Link href="/admin/media" className="focus-ring rounded text-sm font-medium text-indigo hover:underline">
                View all media →
              </Link>
            ) : undefined
          }
        >
          {shown.length > 0 ? (
            <ul className="p-2">
              {shown.map((slot) => (
                <li key={slot.slotKey}>
                  <Link
                    href={`/admin/media#slot-${slot.slotKey}`}
                    className="focus-ring flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 hover:bg-surface"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-navy-ink">{slot.label}</span>
                      <span className="block text-xs text-muted">{getSlotGroupLabel(slot.slotKey)}</span>
                    </span>
                    <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : total === 0 ? (
            <p className="p-4 text-sm text-muted">No media slots configured.</p>
          ) : (
            <p className="flex items-center gap-2 p-4 text-sm text-navy-ink">
              <CheckCircle2 aria-hidden="true" className="size-4 text-success" />
              Every slot has an image.
            </p>
          )}
        </AdminPanel>

        <AdminPanel
          title="Drafts to publish"
          meta={resources.total > 0 ? `${resources.published}/${resources.total} done` : undefined}
          footer={
            resources.drafts > DRAFT_LIST_LIMIT ? (
              <Link
                href="/admin/resources"
                className="focus-ring rounded text-sm font-medium text-indigo hover:underline"
              >
                View all resources →
              </Link>
            ) : undefined
          }
        >
          {shownDrafts.length > 0 ? (
            <ul className="p-2">
              {shownDrafts.map((resource) => (
                <li key={resource.id}>
                  <Link
                    href={`/admin/resources#resource-${resource.id}`}
                    className="focus-ring flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 hover:bg-surface"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-navy-ink">{resource.title}</span>
                      <span className="block text-xs text-muted">
                        {groupLabel(resource.group)} · {resource.category}
                      </span>
                    </span>
                    <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : resources.total === 0 ? (
            <p className="p-4 text-sm text-muted">No resources yet.</p>
          ) : (
            <p className="flex items-center gap-2 p-4 text-sm text-navy-ink">
              <CheckCircle2 aria-hidden="true" className="size-4 text-success" />
              Every resource is published.
            </p>
          )}
        </AdminPanel>

        <AdminPanel
          title="Event drafts"
          meta={events.total > 0 ? `${events.total - events.drafts}/${events.total} done` : undefined}
          footer={
            events.drafts > DRAFT_LIST_LIMIT ? (
              <Link href="/admin/events" className="focus-ring rounded text-sm font-medium text-indigo hover:underline">
                View all events →
              </Link>
            ) : undefined
          }
        >
          {shownEventDrafts.length > 0 ? (
            <ul className="p-2">
              {shownEventDrafts.map((event) => (
                <li key={event.id}>
                  <Link
                    href={`/admin/events#event-${event.id}`}
                    className="focus-ring flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 hover:bg-surface"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-navy-ink">{event.title}</span>
                      <span className="block text-xs text-muted">{event.whenLabel}</span>
                    </span>
                    <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : events.total === 0 ? (
            <p className="p-4 text-sm text-muted">No events yet.</p>
          ) : (
            <p className="flex items-center gap-2 p-4 text-sm text-navy-ink">
              <CheckCircle2 aria-hidden="true" className="size-4 text-success" />
              Every event is published.
            </p>
          )}
        </AdminPanel>
      </div>
    </div>
  );
}

function DoneNote({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1 text-success">
      <CheckCircle2 aria-hidden="true" className="size-3.5" />
      {children}
    </span>
  );
}
