import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { ExternalLink } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ResourcesBrowser } from "@/components/admin/resources/ResourcesBrowser";
import { ScrollToHash } from "@/components/admin/ScrollToHash";
import { ResourcesAdminSkeleton } from "@/components/admin/Skeletons";
import { Button } from "@/components/ui/Button";
import { requireAdmin } from "@/lib/auth/admin";
import { getAllResources } from "@/lib/services/resource.service";

export const metadata: Metadata = {
  title: "Resources",
};

export default function AdminResourcesPage() {
  return (
    <>
      <AdminPageHeader
        title="Resources"
        description="The library shown on /resources. Tap a resource to edit it. Drafts stay hidden until you publish them."
        actions={
          <Button
            variant="secondary"
            size="sm"
            href="/resources"
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
      <Suspense fallback={<ResourcesAdminSkeleton />}>
        <AdminResourcesContent />
      </Suspense>
    </>
  );
}

async function AdminResourcesContent() {
  await connection();
  await requireAdmin();

  const resources = await getAllResources();
  const categories = [...new Set(resources.map((r) => r.category))].sort();

  return (
    <>
      <ResourcesBrowser resources={resources} categories={categories} />
      <ScrollToHash />
    </>
  );
}
