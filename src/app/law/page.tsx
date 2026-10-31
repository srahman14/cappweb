import type { Metadata } from "next";
import { EventList } from "@/components/events/EventList";
import { PersonGrid } from "@/components/people/PersonGrid";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { CTABand } from "@/components/shared/CTABand";
import { MediaFeatureSplit } from "@/components/shared/MediaFeatureSplit";
import {
  Button,
  HandDrawnUnderline,
  PageHeader,
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
      <PageHeader
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
        // aside={law.nextEvent && <NextEventCard event={law.nextEvent} label="Next Law event" />}
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
          linkLabel="All resources →"
          linkHref="/resources"
        />
        <ResourceGrid resources={law.resources} />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Events"
          title="What we've done"
          linkLabel="All events →"
          linkHref="/events"
        />
        <EventList events={law.pastEvents} variant="past" />
      </Section>

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
