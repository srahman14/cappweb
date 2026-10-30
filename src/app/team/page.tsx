import { ApplyBand } from "@/components/team/ApplyBand";
import { DirectorsFeature } from "@/components/team/DirectorsFeature";
import {
  HandDrawnUnderline,
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/ui";
import {
  application,
  directors,
  directorsMessage
} from "@/data/team";
import { getMediaBySlots } from "@/lib/services/media.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the team",
  description: "The directors, committee and ambassadors who run CAPP.",
};

export default async function TeamPage() {
  const mediaSlots = await getMediaBySlots(["directors_image_1"]);

  const directorImage = mediaSlots.find(
    (slot) => slot.slot_key === "directors_image_1"
  )?.blob_url;

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Team" }]}
        title={
          <>
            Meet the <HandDrawnUnderline>team</HandDrawnUnderline>
          </>
        }
        description="The people who run CAPP, and the ambassadors who keep each subject going."
      />

      <Section>
        <SectionHeader eyebrow="DIRECTORS" title="Our directors" />
        <DirectorsFeature
          directors={directors}
          image={{
            src: directorImage ?? undefined, 
            alt: "CAPP Image"
          }}
          message={directorsMessage}
        />
      </Section>

      {/* <Section>
        <SectionHeader eyebrow="THE TEAM" title="The rest of the team" />
        <MemberGrid groups={teamGroups} />
      </Section> */}

      {/* Closing band for this page: replaces CTABand because it already links to WhatsApp when closed. */}
      <ApplyBand info={application} />
    </>
  );
}
