import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { ExternalLink } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EventsBrowser } from "@/components/admin/events/EventsBrowser";
import { ScrollToHash } from "@/components/admin/ScrollToHash";
import { EventsAdminSkeleton } from "@/components/admin/Skeletons";
import { Button } from "@/components/ui/Button";
import { requireAdmin } from "@/lib/auth/admin";
import { getAllEvents } from "@/lib/services/event.service";

export const metadata: Metadata = {
  title: "Events",
};

export default function AdminEventsPage() {
  return (
    <>
      <AdminPageHeader
        title="Events"
        description="Tap an event to edit it. Drafts stay hidden until you publish them; events move to Past on their own once they end."
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
        <AdminEventsContent />
      </Suspense>
    </>
  );
}

async function AdminEventsContent() {
  await connection();
  await requireAdmin();

  const events = await getAllEvents();

  return (
    <>
      <EventsBrowser events={events} />
      <ScrollToHash />
    </>
  );
}
