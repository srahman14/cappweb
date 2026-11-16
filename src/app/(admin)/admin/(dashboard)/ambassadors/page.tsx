import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { ExternalLink } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AmbassadorsBrowser } from "@/components/admin/ambassadors/AmbassadorsBrowser";
import { ScrollToHash } from "@/components/admin/ScrollToHash";
import { ResourcesAdminSkeleton } from "@/components/admin/Skeletons";
import { Button } from "@/components/ui/Button";
import { requireAdmin } from "@/lib/auth/admin";
import { getAllAmbassadors } from "@/lib/services/team.service";

export const metadata: Metadata = {
  title: "Ambassadors",
};

export default function AdminAmbassadorsPage() {
  return (
    <>
      <AdminPageHeader
        title="Ambassadors"
        description="The people shown under “Meet the team” on /team. Tap a person to edit them. Role, one-liner and LinkedIn are optional."
        actions={
          <Button variant="secondary" size="sm" href="/team" target="_blank" rel="noopener noreferrer" className="gap-2">
            View live page
            <ExternalLink aria-hidden="true" className="size-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </Button>
        }
      />
      <Suspense fallback={<ResourcesAdminSkeleton />}>
        <AdminAmbassadorsContent />
      </Suspense>
    </>
  );
}

async function AdminAmbassadorsContent() {
  await connection();
  await requireAdmin();

  const people = await getAllAmbassadors();

  return (
    <>
      <AmbassadorsBrowser people={people} />
      <ScrollToHash />
    </>
  );
}
