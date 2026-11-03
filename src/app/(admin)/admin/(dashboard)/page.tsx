import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { OverviewSkeleton } from "@/components/admin/Skeletons";
import { StatTile } from "@/components/admin/StatTile";
import { requireAdmin } from "@/lib/auth/admin";
import { getSlotGroupLabel } from "@/lib/media/slot-groups";
import { getMediaOverview } from "@/lib/services/media.service";

export const metadata: Metadata = {
  title: "Overview",
};

const EMPTY_LIST_LIMIT = 5;

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

  const { total, filled, empty, emptySlots } = await getMediaOverview();
  const shown = emptySlots.slice(0, EMPTY_LIST_LIMIT);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <StatTile label="Media slots" value={total} />
        <StatTile label="Filled" value={filled} />
        {empty > 0 ? (
          <StatTile label="Need an image" value={empty} tone="attention" href="/admin/media" />
        ) : (
          <StatTile
            label="Need an image"
            value={0}
            caption={
              <span className="flex items-center gap-1 text-success">
                <CheckCircle2 aria-hidden="true" className="size-3.5" />
                All filled
              </span>
            }
          />
        )}
      </div>

      <AdminPanel
        title="Needs an image"
        className="max-w-2xl"
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
        ) : (
          <p className="flex items-center gap-2 p-4 text-sm text-navy-ink">
            <CheckCircle2 aria-hidden="true" className="size-4 text-success" />
            Every slot has an image.
          </p>
        )}
      </AdminPanel>

      <p className="text-sm text-muted">Resources and events management are coming soon.</p>
    </div>
  );
}
