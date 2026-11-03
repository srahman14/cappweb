import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { ExternalLink, ImageOff } from "lucide-react";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { MediaSlotGroup } from "@/components/admin/media/MediaSlotGroup";
import { ScrollToHash } from "@/components/admin/ScrollToHash";
import { MediaSkeleton } from "@/components/admin/Skeletons";
import { Button } from "@/components/ui/Button";
import { requireAdmin } from "@/lib/auth/admin";
import { SLOT_GROUPS, getSlotGroup } from "@/lib/media/slot-groups";
import { getMediaSlots } from "@/lib/services/media.service";

export const metadata: Metadata = {
  title: "Media",
};

export default function AdminMediaPage() {
  return (
    <>
      <AdminPageHeader
        title="Media"
        description="Images used across the CAPP website. Uploads go live on the next page refresh."
        actions={
          <Button
            variant="secondary"
            size="sm"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
          >
            View live site
            <ExternalLink aria-hidden="true" className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </Button>
        }
      />
      <Suspense fallback={<MediaSkeleton />}>
        <AdminMediaContent />
      </Suspense>
    </>
  );
}

async function AdminMediaContent() {
  await connection();
  await requireAdmin();

  const mediaSlots = await getMediaSlots();

  if (mediaSlots.length === 0) {
    return (
      <AdminEmptyState
        icon={ImageOff}
        title="No media slots yet"
        description="Slots are created by a developer in Supabase."
      />
    );
  }

  // Slots arrive in sort_order; grouping keeps that order within each group.
  const groups = SLOT_GROUPS.map((group) => ({
    group,
    slots: mediaSlots.filter((slot) => getSlotGroup(slot.slot_key) === group.id),
  })).filter(({ slots }) => slots.length > 0);

  return (
    <div>
      {groups.map(({ group, slots }) => (
        <MediaSlotGroup key={group.id} group={group} slots={slots} />
      ))}
      <ScrollToHash />
    </div>
  );
}
