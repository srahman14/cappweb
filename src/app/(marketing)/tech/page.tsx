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
import { tech } from "@/data/tech";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/tech", tech.name);

export default function TechPage() {
  return (
    <>
      <SubjectPageHeader
        subject="tech"
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
            <Button href={`#${SUBJECT_BENTO_ID}`} variant="outlineOnDark">
              Explore the hub
            </Button>
          </>
        }
      />

      <MediaFeatureSplit
          slotKey="subject_tech_feature"
          // caption={`From our ${tech.name} panel`}
          alt="A speaker presenting at a CAPP career event"
          {...tech.about}
        />

      <SubjectBento data={tech} />

      <ApplicationCalendar subject={tech.name} rows={tech.calendar} />

      <SubjectFAQ subject={tech.name} faqs={tech.faqs} channelUrl={tech.channelUrl ?? SITE.whatsappUrl} />

      <CTABand title="Join the Tech community" />
    </>
  );
}
