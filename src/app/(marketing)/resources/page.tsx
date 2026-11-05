import { ResourceBrowser } from "@/components/resources/ResourceBrowser";
import { SuggestResourceBand } from "@/components/shared/SuggestedResourceBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { getPublishedResources } from "@/lib/services/resource.service";
import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "The CAPP resource library: CV and interview guides, plus curated resources for Tech, Business & Finance, Engineering and Law.",
};

/**
 * /resources: the permanent, searchable library of everything CAPP recommends.
 * Sections: PageHeader, library (sidebar + cards), suggest-a-resource band, closing CTA.
 * Content lives in data/resources.ts.
 */
export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        title="Everything CAPP recommends, in one place"
        description="Guides, practice material and curated links from our ambassadors, searchable and always here when you need them."
      />

      <Section>
        <Suspense fallback={<ResourceLibrarySkeleton />}>
          <ResourceLibrary />
        </Suspense>
      </Section>

      <Section>
        <SuggestResourceBand />
      </Section>
    </>
  );
}

async function ResourceLibrary() {
  await connection();

  const libraryResources = await getPublishedResources();

  return <ResourceBrowser resources={libraryResources} iconPosition="left" />;
}

function ResourceLibrarySkeleton() {
  const pulse = "animate-pulse motion-reduce:animate-none rounded-card bg-indigo-soft";

  return (
    <div>
      <span role="status" className="sr-only">
        Loading resources…
      </span>
      <div aria-hidden="true">
        <div className={`mx-auto h-10 max-w-md ${pulse}`} />
        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <div className="space-y-5">
            <div className={`h-5 w-28 ${pulse}`} />
            <div className={`h-11 w-full ${pulse}`} />
            <div className="space-y-3">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className={`h-8 w-full ${pulse}`} />
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div key={item} className={`h-48 ${pulse}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}