import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { OverviewSkeleton } from "@/components/admin/Skeletons";
import { StatTile } from "@/components/admin/StatTile";
import { resourceGroups } from "@/data/resources";
import { requireAdmin } from "@/lib/auth/admin";
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
  await requireAdmin();

  const [media, resources, events] = await Promise.all([
    getMediaOverview(),
    getResourceOverview(),
    getEventOverview(),
  ]);

  const { total, filled, empty, emptySlots } = media;
  const shown = emptySlots.slice(0, EMPTY_LIST_LIMIT);
  const shownDrafts = resources.draftResources.slice(0, DRAFT_LIST_LIMIT);
  const shownEventDrafts = events.draftEvents.slice(0, DRAFT_LIST_LIMIT);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatTile label="Media slots" value={total} />
        <StatTile label="Filled" value={filled} />
        {empty > 0 ? (
          <StatTile label="Needs an image" value={empty} tone="attention" href="/admin/media" />
        ) : (
          <StatTile
            label="Needs an image"
            value={0}
            caption={
              total === 0 ? (
                <span className="text-muted">No media slots configured</span>
              ) : (
                <span className="flex items-center gap-1 text-success">
                  <CheckCircle2 aria-hidden="true" className="size-3.5" />
                  All filled
                </span>
              )
            }
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatTile label="Resources" value={resources.total} />
        <StatTile label="Published" value={resources.published} />
        {resources.drafts > 0 ? (
          <StatTile label="Drafts" value={resources.drafts} tone="attention" href="/admin/resources" />
        ) : (
          <StatTile
            label="Drafts"
            value={0}
            caption={
              resources.total === 0 ? (
                <span className="text-muted">No resources yet</span>
              ) : (
                <span className="flex items-center gap-1 text-success">
                  <CheckCircle2 aria-hidden="true" className="size-3.5" />
                  All published
                </span>
              )
            }
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatTile label="Events" value={events.total} />
        <StatTile label="Upcoming" value={events.upcoming} href="/admin/events" />
        {events.drafts > 0 ? (
          <StatTile label="Event drafts" value={events.drafts} tone="attention" href="/admin/events" />
        ) : (
          <StatTile
            label="Event drafts"
            value={0}
            caption={
              events.total === 0 ? (
                <span className="text-muted">No events yet</span>
              ) : (
                <span className="flex items-center gap-1 text-success">
                  <CheckCircle2 aria-hidden="true" className="size-3.5" />
                  All published
                </span>
              )
            }
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminPanel
          title="Needs an image"
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