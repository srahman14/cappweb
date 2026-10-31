import type { Metadata } from "next";
import { EventList } from "@/components/events/EventList";
import { NextEventCard } from "@/components/events/NextEventCard";
import { PersonGrid } from "@/components/people/PersonGrid";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { CTABand } from "@/components/shared/CTABand";
import { MediaFeatureSplit } from "@/components/shared/MediaFeatureSplit";
import { Button, HandDrawnUnderline, PageHeader, Section, SectionHeader } from "@/components/ui";
import { engineering } from "@/data/engineering";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: engineering.name, description: engineering.description };

export default function EngineeringPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Subjects", href: "/" }, { label: engineering.name }]}
        title={<><HandDrawnUnderline rotate={-1.5}>{engineering.name}</HandDrawnUnderline> at CAPP</>}
        description={engineering.description}
        actions={
          <>
            <Button href={engineering.channelUrl ?? SITE.whatsappUrl} variant="onDark">{engineering.channelLabel}</Button>
            <Button href="#resources" variant="outlineOnDark">Jump to resources</Button>
          </>
        }
        aside={engineering.nextEvent && <NextEventCard event={engineering.nextEvent} label="Next Engineering event" />}
      />

      <MediaFeatureSplit
          slotKey="subject_engineering_feature"
          alt="A speaker presenting at a CAPP career event"
          {...engineering.about}
        />

      <Section id="resources" className="scroll-mt-8">
        <SectionHeader eyebrow="Resources" title="Tools to level up" linkLabel="All resources →" linkHref="/resources" />
        <ResourceGrid resources={engineering.resources} />
      </Section>

      <Section>
        <SectionHeader eyebrow="Events" title="What we've done" linkLabel="All events →" linkHref="/events" />
        <EventList events={engineering.pastEvents} variant="past" />
      </Section>

      <Section>
        <SectionHeader eyebrow="Ambassadors" title="Meet the Engineering ambassadors" />
        <PersonGrid people={engineering.ambassadors} />
      </Section>

      <CTABand title="Join the Engineering community" />
    </>
  );
}