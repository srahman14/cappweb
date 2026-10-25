import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CTABand } from "@/components/shared/CTABand";
import { SuggestResourceBand } from "@/components/shared/SuggestedResourceBand";
import { Section } from "@/components/ui/Section";
import { ResourceBrowser } from "@/components/resources/ResourceBrowser";
import { libraryResources } from "@/data/resources";

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
        <ResourceBrowser resources={libraryResources} iconPosition="left" />
      </Section>

      <Section>
        <SuggestResourceBand />
      </Section>

      {/* <CTABand /> */}
    </>
  );
}