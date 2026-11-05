import type { Metadata } from "next";
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
import { law } from "@/data/law";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: law.name,
  description: law.description,
};

export default function LawPage() {
  return (
    <>
      <SubjectPageHeader
        subject="law"
        breadcrumb={[{ label: "Subjects", href: "/" }, { label: law.name }]}
        title={
          <>
            <HandDrawnUnderline rotate={-1.5}>{law.name}</HandDrawnUnderline>{" "}
            at CAPP
          </>
        }
        description={law.description}
        actions={
          <>
            <Button href={law.channelUrl ?? SITE.whatsappUrl} variant="onDark">
              {law.channelLabel}
            </Button>
            <Button href="#resources" variant="outlineOnDark">
              Jump to resources
            </Button>
          </>
        }
      />

      <MediaFeatureSplit
        slotKey="subject_law_feature"
        alt="A speaker presenting at a CAPP career event"
        {...law.about}
      />

      <Section id="resources" className="scroll-mt-8">
        <SectionHeader
          eyebrow="Resources"
          title="Tools to level up"
          linkLabel="All resources"
          linkHref="/resources"
        />
        <ResourceGrid resources={law.resources} />
      </Section>

      <SubjectEvents subject="law" />

      <Section>
        <SectionHeader
          eyebrow="Ambassadors"
          title="Meet the Law ambassadors"
        />
        <PersonGrid people={law.ambassadors} />
      </Section>

      <CTABand title="Join the Law community" />
    </>
  );
}
