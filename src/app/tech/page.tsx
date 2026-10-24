import type { Metadata } from "next";
import { EventList } from "@/components/events/EventList";
import { NextEventCard } from "@/components/events/NextEventCard";
import { PersonGrid } from "@/components/people/PersonGrid";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { CTABand } from "@/components/shared/CTABand";
import { FeatureSplit } from "@/components/shared/FeatureSplit";
import { Button, HandDrawnUnderline, PageHeader, Section, SectionHeader } from "@/components/ui";
import { tech } from "@/data/tech";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: tech.name, description: tech.description };

export default function TechPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Subjects", href: "/" }, { label: tech.name }]}
        title={<><HandDrawnUnderline rotate={-1.5}>{tech.name}</HandDrawnUnderline> at CAPP</>}
        description={tech.description}
        actions={
          <>
            <Button href={tech.channelUrl ?? SITE.whatsappUrl} variant="onDark">{tech.channelLabel}</Button>
            <Button href="#resources" variant="outlineOnDark">Jump to resources</Button>
          </>
        }
        aside={tech.nextEvent && <NextEventCard event={tech.nextEvent} label="Next Tech event" />}
      />

      <Section>
        <FeatureSplit {...tech.about} />
      </Section>

      <Section id="resources" className="scroll-mt-8">
        <SectionHeader eyebrow="Resources" title="Tools to level up" linkLabel="All resources →" linkHref="/resources" />
        <ResourceGrid resources={tech.resources} />
      </Section>

      <Section>
        <SectionHeader eyebrow="Events" title="What we've done" linkLabel="All events →" linkHref="/events" />
        <EventList events={tech.pastEvents} variant="past" />
      </Section>

      <Section>
        <SectionHeader eyebrow="Ambassadors" title="Meet the Tech ambassadors" />
        <PersonGrid people={tech.ambassadors} />
      </Section>

      <CTABand title="Join the Tech community" />
    </>
  );
}