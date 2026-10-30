import type { Metadata } from "next";
  import { EventList } from "@/components/events/EventList";
import { NextEventCard } from "@/components/events/NextEventCard";
import { PersonGrid } from "@/components/people/PersonGrid";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { CTABand } from "@/components/shared/CTABand";
import { MediaFeatureSplit } from "@/components/shared/MediaFeatureSplit";
import { Button, HandDrawnUnderline, PageHeader, Section, SectionHeader } from "@/components/ui";
import { businessFinance } from "@/data/business-finance";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: businessFinance.name, description: businessFinance.description };

export default function BusinessFinancePage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Subjects", href: "/" }, { label: businessFinance.name }]}
        title={<><HandDrawnUnderline rotate={-1.5}>{businessFinance.name}</HandDrawnUnderline> at CAPP</>}
        description={businessFinance.description}
        actions={
          <>
            <Button href={businessFinance.channelUrl ?? SITE.whatsappUrl} variant="onDark">{businessFinance.channelLabel}</Button>
            <Button href="#resources" variant="outlineOnDark">Jump to resources</Button>
          </>
        }
        aside={businessFinance.nextEvent && <NextEventCard event={businessFinance.nextEvent} label="Next Business & Finance event" />}
      />

      <MediaFeatureSplit
          slotKey="subject_business_finance_feature"
          alt="A speaker presenting at a CAPP career event"
          {...businessFinance.about}
        />

      <Section id="resources" className="scroll-mt-8">
        <SectionHeader eyebrow="Resources" title="Tools to level up" linkLabel="All resources →" linkHref="/resources" />
        <ResourceGrid resources={businessFinance.resources} />
      </Section>

      <Section>
        <SectionHeader eyebrow="Events" title="What we've done" linkLabel="All events →" linkHref="/events" />
        <EventList events={businessFinance.pastEvents} variant="past" />
      </Section>

      <Section>
        <SectionHeader eyebrow="Ambassadors" title="Meet the Business & Finance ambassadors" />
        <PersonGrid people={businessFinance.ambassadors} />
      </Section>

      <CTABand title="Join the B&F community" />
    </>
  );
}