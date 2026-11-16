import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SubjectEvents } from "@/components/events/SubjectEvents";
import { SubjectPageHeader } from "@/components/events/SubjectPageHeader";
import { CTABand } from "@/components/shared/CTABand";
import { MediaFeatureSplit } from "@/components/shared/MediaFeatureSplit";
import { ApplicationCalendar } from "@/components/subjects/ApplicationCalendar";
import { SUBJECT_BENTO_ID, SubjectBento } from "@/components/subjects/SubjectBento";
import { SubjectFAQ } from "@/components/subjects/SubjectFAQ";
import { Button, HandDrawnUnderline } from "@/components/ui";
import { businessFinance } from "@/data/business-finance";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/business-finance", businessFinance.name);

export default function BusinessFinancePage() {
  return (
    <>
      <SubjectPageHeader
        subject="business-finance"
        breadcrumb={[{ label: "Subjects", href: "/" }, { label: businessFinance.name }]}
        title={<><HandDrawnUnderline rotate={-1.5}>{businessFinance.name}</HandDrawnUnderline> at CAPP</>}
        description={businessFinance.description}
        actions={
          <>
            <Button href={businessFinance.channelUrl ?? SITE.whatsappUrl} variant="onDark">{businessFinance.channelLabel}</Button>
            <Button href={`#${SUBJECT_BENTO_ID}`} variant="outlineOnDark">Explore the hub</Button>
          </>
        }
      />

      <MediaFeatureSplit
          slotKey="subject_business_finance_feature"
          // caption={`From our ${businessFinance.name} panel`}
          alt="A speaker presenting at a CAPP career event"
          {...businessFinance.about}
        />

      <SubjectBento data={businessFinance} />

      <SubjectEvents subject="business-finance" />

      <ApplicationCalendar subject={businessFinance.name} rows={businessFinance.calendar} />

      <SubjectFAQ subject={businessFinance.name} faqs={businessFinance.faqs} channelUrl={businessFinance.channelUrl ?? SITE.whatsappUrl} />

      <CTABand title="Join the B&F community" />
    </>
  );
}