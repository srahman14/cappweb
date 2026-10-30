import { ApplyBand } from "@/components/team/ApplyBand";
import { DirectorsFeature } from "@/components/team/DirectorsFeature";
import {
  HandDrawnUnderline,
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/ui";

import { TeamBrowser } from "@/components/team/TeamBrowser";
import {
  application,
  directors,
  directorsImage,
  directorsMessage,
  teamMembers,
  teamSubjects,
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
            Our <HandDrawnUnderline>team</HandDrawnUnderline>
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

      <Section>
        <SectionHeader eyebrow="AMBASSADORS" title="Meet the team" />
        <p className="-mt-2 mb-10 max-w-2xl text-lg leading-relaxed text-muted">
          Our ambassadors share events, internships and resources in their
          subject. Pick a subject to see who to talk to.
        </p>
        <TeamBrowser subjects={teamSubjects} members={teamMembers} />
      </Section>

      {/* Closing band for this page: replaces CTABand because it already links to WhatsApp when closed. */}
      <ApplyBand info={application} />
    </>
  );
}
