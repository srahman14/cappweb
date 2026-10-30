import type { Metadata } from "next";
import Image from "next/image";
import { EventList } from "@/components/events/EventList";
import { NextEventCard } from "@/components/events/NextEventCard";
import { PersonGrid } from "@/components/people/PersonGrid";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { CTABand } from "@/components/shared/CTABand";
import { FeatureSplit } from "@/components/shared/FeatureSplit";
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

      <Section>
        <FeatureSplit
          {...law.about}
          media={
            <div className="relative aspect-4/3 overflow-hidden rounded-panel">
              <Image
                src="/media/IMG_0070.JPG"
                alt="A speaker presenting at a CAPP career event"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          }
        />
      </Section>

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
