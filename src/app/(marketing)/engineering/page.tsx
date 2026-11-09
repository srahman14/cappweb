import type { Metadata } from "next";
import { NextEventCard } from "@/components/events/NextEventCard";
import { CTABand } from "@/components/shared/CTABand";
import { MediaFeatureSplit } from "@/components/shared/MediaFeatureSplit";
import { SUBJECT_BENTO_ID, SubjectBento } from "@/components/subjects/SubjectBento";
import { Button, HandDrawnUnderline, PageHeader } from "@/components/ui";
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
            <Button href={`#${SUBJECT_BENTO_ID}`} variant="outlineOnDark">Explore the hub</Button>
          </>
        }
        aside={engineering.nextEvent && <NextEventCard event={engineering.nextEvent} label="Next Engineering event" />}
      />

      <MediaFeatureSplit
          slotKey="subject_engineering_feature"
          caption={`From our ${engineering.name} panel`}
          alt="A speaker presenting at a CAPP career event"
          {...engineering.about}
        />

      <SubjectBento subject={engineering.name} cards={engineering.bentoCards} />

      <CTABand title="Join the Engineering community" />
    </>
  );
}