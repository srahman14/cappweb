import type { Metadata } from "next";
import { SubjectEvents } from "@/components/events/SubjectEvents";
import { SubjectPageHeader } from "@/components/events/SubjectPageHeader";
import { pageMetadata } from "@/lib/seo";
import { EventList } from "@/components/events/EventList";
import { NextEventCard } from "@/components/events/NextEventCard";
import { PersonGrid } from "@/components/people/PersonGrid";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { CTABand } from "@/components/shared/CTABand";
import { MediaFeatureSplit } from "@/components/shared/MediaFeatureSplit";
import { Button, HandDrawnUnderline, Section, SectionHeader } from "@/components/ui";
import { engineering } from "@/data/engineering";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/engineering", engineering.name);

export default function EngineeringPage() {
  return (
    <>
      <SubjectPageHeader
        subject="engineering"
        breadcrumb={[{ label: "Subjects", href: "/" }, { label: engineering.name }]}
        title={<><HandDrawnUnderline rotate={-1.5}>{engineering.name}</HandDrawnUnderline> at CAPP</>}
        description={engineering.description}
        actions={
          <>
            <Button href={engineering.channelUrl ?? SITE.whatsappUrl} variant="onDark">{engineering.channelLabel}</Button>
            <Button href="#resources" variant="outlineOnDark">Jump to resources</Button>
          </>
        }
      />

      <MediaFeatureSplit
          slotKey="subject_engineering_feature"
          alt="A speaker presenting at a CAPP career event"
          {...engineering.about}
        />

      <Section id="resources" className="scroll-mt-8">
        <SectionHeader eyebrow="Resources" title="Tools to level up" linkLabel="All resources" linkHref="/resources" />
        <ResourceGrid resources={engineering.resources} />
      </Section>

      <SubjectEvents subject="engineering" />

      <Section>
        <SectionHeader eyebrow="Ambassadors" title="Meet the Engineering ambassadors" />
        <PersonGrid people={engineering.ambassadors} />
      </Section>

      <CTABand title="Join the Engineering community" />
    </>
  );
}