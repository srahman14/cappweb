import { EventList } from "@/components/events/EventList";
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
import { tech } from "@/data/tech";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";
import { getMediaBySlots } from "@/lib/services/media.service";

export const metadata: Metadata = {
  title: tech.name,
  description: tech.description,
};

export default async function TechPage() {
  const mediaSlots = await getMediaBySlots(["subject_tech_feature"])

  const techImage = mediaSlots.find(
    (slot) => slot.slot_key === "subject_tech_feature"
  )?.blob_url;
  
  return (
    <>
      <PageHeader
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
        // aside={tech.nextEvent && <NextEventCard event={tech.nextEvent} label="Next Tech event" />}
      />

      <Section>
        <FeatureSplit
          {...tech.about}
          media={
            <div className="relative aspect-4/3 overflow-hidden rounded-panel">
              {techImage ? (
              <Image
                src={techImage}
                alt="A speaker presenting at a CAPP career event"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              ) : (
                <div 
                  aria-hidden="true"
                  className="absolute inset-0 bg-navy-deep" 
                />  
              )}
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
        <ResourceGrid resources={tech.resources} />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Events"
          title="What we've done"
          linkLabel="All events →"
          linkHref="/events"
        />
        <EventList events={tech.pastEvents} variant="past" />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Ambassadors"
          title="Meet the Tech ambassadors"
        />
        <PersonGrid people={tech.ambassadors} />
      </Section>

      <CTABand title="Join the Tech community" />
    </>
  );
}
