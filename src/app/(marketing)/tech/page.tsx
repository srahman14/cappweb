import { SubjectEvents } from "@/components/events/SubjectEvents";
import { SubjectPageHeader } from "@/components/events/SubjectPageHeader";
import { PersonGrid } from "@/components/people/PersonGrid";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { CTABand } from "@/components/shared/CTABand";
import { MediaFeatureSplit } from "@/components/shared/MediaFeatureSplit";
import {
  Button,
  HandDrawnUnderline,
  Section,
  SectionHeader,
} from "@/components/ui";
import { tech } from "@/data/tech";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/tech", tech.name);

export default function TechPage() {
  return (
    <>
      <SubjectPageHeader
        subject="tech"
        breadcrumb={[{ label: "Subjects", href: "/" }, { label: tech.name }]}
        title={
          <>
            <HandDrawnUnderline rotate={-1.5}>{tech.name}</HandDrawnUnderline>{" "}
            at CAPP
          </>
        }
        description={tech.description}
        actions={
          <>
            <Button href={tech.channelUrl ?? SITE.whatsappUrl} variant="onDark">
              {tech.channelLabel}
            </Button>
            <Button href="#resources" variant="outlineOnDark">
              Jump to resources
            </Button>
          </>
        }
      />

      <MediaFeatureSplit
          slotKey="subject_tech_feature"
          alt="A speaker presenting at a CAPP career event"
          {...tech.about}
        />

      <Section id="resources" className="scroll-mt-8">
        <SectionHeader
          eyebrow="Resources"
          title="Tools to level up"
          linkLabel="All resources"
          linkHref="/resources"
        />
        <ResourceGrid resources={tech.resources} />
      </Section>

      <SubjectEvents subject="tech" />

      <CTABand title="Join the Tech community" />
    </>
  );
}
