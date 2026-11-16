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
import { engineering } from "@/data/engineering";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/engineering", engineering.name);

export default function EngineeringPage() {
  return (
    <>
      <SubjectPageHeader
        subject="engineering"
        breadcrumb={[{ label: "Subjects", href: "/" }, { label: engineering.name }]}
        title={<><HandDrawnUnderline rotate={-1.5}>{engineering.name}</HandDrawnUnderline> at CAPP</>}
        description={engineering.description}
        actions={
          <>
            <Button href={engineering.channelUrl ?? SITE.whatsappUrl} variant="onDark">{engineering.channelLabel}</Button>
            <Button href={`#${SUBJECT_BENTO_ID}`} variant="outlineOnDark">Explore the hub</Button>
          </>
        }
      />

      <MediaFeatureSplit
          slotKey="subject_engineering_feature"
          // caption={`From our ${engineering.name} panel`}
          alt="A speaker presenting at a CAPP career event"
          {...engineering.about}
        />

      <SubjectBento data={engineering} />

      <SubjectEvents subject="engineering" />

      <ApplicationCalendar subject={engineering.name} rows={engineering.calendar} />

      <SubjectFAQ subject={engineering.name} faqs={engineering.faqs} channelUrl={engineering.channelUrl ?? SITE.whatsappUrl} />

      <CTABand title="Join the Engineering community" />
    </>
  );
}