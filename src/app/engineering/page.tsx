import type { Metadata } from "next";
import Image from "next/image";
import { EventList } from "@/components/events/EventList";
import { NextEventCard } from "@/components/events/NextEventCard";
import { PersonGrid } from "@/components/people/PersonGrid";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { CTABand } from "@/components/shared/CTABand";
import { FeatureSplit } from "@/components/shared/FeatureSplit";
import { Button, HandDrawnUnderline, PageHeader, Section, SectionHeader } from "@/components/ui";
import { engineering } from "@/data/engineering";
import { SITE } from "@/lib/site";
import { getMediaBySlots } from "@/lib/services/media.service";

export const metadata: Metadata = { title: engineering.name, description: engineering.description };

export default async function EngineeringPage() {
  const mediaSlots = await getMediaBySlots(["subject_engineering_feature"])

  const engineeringImage = mediaSlots.find(
    (slot) => slot.slot_key === "subject_engineering_feature"
  )?.blob_url;
  
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

      <Section>
        <FeatureSplit
          {...engineering.about}
          media={
            <div className="relative aspect-4/3 overflow-hidden rounded-panel">
              {engineeringImage ? (
              <Image
                src={engineeringImage}
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