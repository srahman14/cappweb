import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { ChevronRight, ExternalLink, Plus } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ResourceForm } from "@/components/admin/resources/ResourceForm";
import { ResourceRow } from "@/components/admin/resources/ResourceRow";
import { ScrollToHash } from "@/components/admin/ScrollToHash";
import { Button } from "@/components/ui/Button";
import { resourceGroups } from "@/data/resources";
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
        description="The library shown on /resources. Drafts stay hidden until you publish them; changes go live on the next page refresh."
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
      <Suspense fallback={<ResourcesSkeleton />}>
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
  const publishedCount = resources.filter((r) => r.isPublished).length;

  const stats = [
    { label: "Total", value: resources.length },
    { label: "Published", value: publishedCount },
    { label: "Drafts", value: resources.length - publishedCount },
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

      {/* Every group is shown (even when empty) so you can add to it. Click a heading to collapse it. */}
      <div className="space-y-4">
        {resourceGroups.map((group) => {
          const items = resources.filter((r) => r.group === group.id);
          const groupIds = items.map((r) => r.id);
          const groupPublished = items.filter((r) => r.isPublished).length;

          return (
            <details
              key={group.id}
              id={`group-${group.id}`}
              open
              className="group/section scroll-mt-24 rounded-[20px] border border-line bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-[20px] px-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo sm:px-5 [&::-webkit-details-marker]:hidden">
                <span className="flex min-w-0 items-center gap-2">
                  <ChevronRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted transition-transform group-open/section:rotate-90"
                  />
                  <span className="text-base font-semibold text-navy">{group.label}</span>
                  <span className="rounded-full bg-indigo-soft px-2 py-0.5 text-xs font-medium text-indigo">
                    {items.length}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-muted">
                  {groupPublished} of {items.length} published
                </span>
              </summary>

              <div className="space-y-4 border-t border-line p-4 sm:p-5">
                <details className="group/add rounded-2xl border border-dashed border-line">
                  <summary className="flex cursor-pointer list-none items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo [&::-webkit-details-marker]:hidden">
                    <Plus aria-hidden="true" className="size-4" />
                    Add to {group.label}
                  </summary>
                  <div className="border-t border-dashed border-line p-4 sm:p-5">
                    <ResourceForm categories={categories} defaultGroup={group.id} />
                  </div>
                </details>

                {items.length === 0 ? (
                  <p className="px-1 text-sm text-muted">No resources in {group.label} yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {items.map((resource, index) => (
                      <li key={resource.id} id={`resource-${resource.id}`} className="scroll-mt-24">
                        <ResourceRow
                          resource={resource}
                          index={index}
                          groupIds={groupIds}
                          categories={categories}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          );
        })}
      </div>

      <ScrollToHash />
    </div>
  );
}

/** Loading state. Move into components/admin/Skeletons.tsx if you'd like it alongside MediaSkeleton. */
function ResourcesSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-[20px] bg-indigo-soft" />
        ))}
      </div>
      <div className="space-y-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-[20px] bg-indigo-soft" />
        ))}
      </div>
    </div>
  );
}