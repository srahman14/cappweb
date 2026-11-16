import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SubjectPageHeader } from "@/components/events/SubjectPageHeader";
import { CTABand } from "@/components/shared/CTABand";
import { MediaFeatureSplit } from "@/components/shared/MediaFeatureSplit";
import { ApplicationCalendar } from "@/components/subjects/ApplicationCalendar";
import { SUBJECT_BENTO_ID, SubjectBento } from "@/components/subjects/SubjectBento";
import { SubjectFAQ } from "@/components/subjects/SubjectFAQ";
import {
  Button,
  HandDrawnUnderline,
} from "@/components/ui";
import { law } from "@/data/law";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/law", law.name);

export default function LawPage() {
  return (
    <>
      <SubjectPageHeader
        subject="law"
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
            <Button href={`#${SUBJECT_BENTO_ID}`} variant="outlineOnDark">
              Explore the hub
            </Button>
          </>
        }
      />

      <MediaFeatureSplit
        slotKey="subject_law_feature"
        // caption={`From our ${law.name} panel`}
        alt="A speaker presenting at a CAPP career event"
        {...law.about}
      />

      <SubjectBento data={law} />

      <ApplicationCalendar subject={law.name} rows={law.calendar} />

      <SubjectFAQ subject={law.name} faqs={law.faqs} channelUrl={law.channelUrl ?? SITE.whatsappUrl} />

      <CTABand title="Join the Law community" />
    </>
  );
}
