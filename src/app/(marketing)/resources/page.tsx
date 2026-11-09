import { ResourceBrowser } from "@/components/resources/ResourceBrowser";
import { SuggestResourceBand } from "@/components/shared/SuggestedResourceBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { libraryResources } from "@/data/resources";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/resources", "Resources");

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
        <ResourceBrowser resources={libraryResources} iconPosition="left" />
      </Section>

      <Section>
        <SuggestResourceBand />
      </Section>
    </>
  );
}