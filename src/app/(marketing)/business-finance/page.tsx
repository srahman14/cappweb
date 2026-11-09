import type { Metadata } from "next";
import { NextEventCard } from "@/components/events/NextEventCard";
import { CTABand } from "@/components/shared/CTABand";
import { MediaFeatureSplit } from "@/components/shared/MediaFeatureSplit";
import { SUBJECT_BENTO_ID, SubjectBento } from "@/components/subjects/SubjectBento";
import { Button, HandDrawnUnderline, PageHeader } from "@/components/ui";
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
            <Button href={`#${SUBJECT_BENTO_ID}`} variant="outlineOnDark">Explore the hub</Button>
          </>
        }
        aside={businessFinance.nextEvent && <NextEventCard event={businessFinance.nextEvent} label="Next Business & Finance event" />}
      />

      <MediaFeatureSplit
          slotKey="subject_business_finance_feature"
          caption={`From our ${businessFinance.name} panel`}
          alt="A speaker presenting at a CAPP career event"
          {...businessFinance.about}
        />

      <SubjectBento subject={businessFinance.name} cards={businessFinance.bentoCards} />

      <CTABand title="Join the B&F community" />
    </>
  );
}