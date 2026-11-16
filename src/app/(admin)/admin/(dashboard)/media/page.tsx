import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { ExternalLink } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { MediaBrowser } from "@/components/admin/media/MediaBrowser";
import { ScrollToHash } from "@/components/admin/ScrollToHash";
import { MediaSkeleton } from "@/components/admin/Skeletons";
import { Button } from "@/components/ui/Button";
import { requireAdmin } from "@/lib/auth/admin";
import { getMediaSlots } from "@/lib/services/media.service";

export const metadata: Metadata = {
  title: "Media",
};

export default function AdminMediaPage() {
  return (
    <>
      <AdminPageHeader
        title="Media"
        description="Images used across the CAPP website. Pick a page or search to find the one you need. Uploads go live on the next page refresh."
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

  return (
    <>
      <MediaBrowser slots={mediaSlots} />
      <ScrollToHash />
    </>
  );
}
