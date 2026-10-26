import type { Metadata } from "next";
import {
  HandDrawnUnderline,
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/ui";
import { ApplyBand } from "@/components/team/ApplyBand";
import { DirectorsFeature } from "@/components/team/DirectorsFeature";
import { MemberGrid } from "@/components/team/MemberGrid";
import {
  application,
  directors,
  directorsImage,
  directorsMessage,
  directorsVideo,
  teamGroups,
} from "@/data/team";

export const metadata: Metadata = {
  title: "Meet the team",
  description: "The directors, committee and ambassadors who run CAPP.",
};

export default function TeamPage() {
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
          image={directorsImage}
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
