import { ApplyBand } from "@/components/team/ApplyBand";
import { DirectorsFeature } from "@/components/team/DirectorsFeature";
import {
  HandDrawnUnderline,
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/ui";
import { connection } from "next/server";
import { Suspense } from "react";

import { TeamBrowser } from "@/components/team/TeamBrowser";
import {
  application,
  directors,
  directorsImage,
  directorsMessage,
  teamSubjects,
} from "@/data/team";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

import { getMediaBySlots } from "@/lib/services/media.service";
import { getPublishedTeamMembers } from "@/lib/services/team.service";

export const metadata: Metadata = pageMetadata("/team", "Meet the team");

export default function TeamPage() {
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

      <Suspense fallback={<TeamDirectorsSection />}>
        <TeamDirectors />
      </Suspense>

      <Section>
        <SectionHeader eyebrow="AMBASSADORS" title="Meet the team" />
        <p className="-mt-2 mb-10 max-w-2xl text-lg leading-relaxed text-muted">
          Our ambassadors share events, internships and resources in their
          subject. Pick a subject to see who to talk to.
        </p>
        <Suspense fallback={<TeamMembersSkeleton />}>
          <TeamAmbassadors />
        </Suspense>
      </Section>

      {/* Closing band for this page: replaces CTABand because it already links to WhatsApp when closed. */}
      <ApplyBand info={application} />
    </>
  );
}

async function TeamAmbassadors() {
  await connection();

  const members = await getPublishedTeamMembers();
  return <TeamBrowser subjects={teamSubjects} members={members} />;
}

function TeamMembersSkeleton() {
  return (
    <div>
      <span role="status" className="sr-only">
        Loading the team…
      </span>
      <div aria-hidden="true" className="space-y-8">
        <div className="h-8 max-w-md animate-pulse rounded bg-indigo-soft motion-reduce:animate-none" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded bg-indigo-soft motion-reduce:animate-none" />
          ))}
        </div>
      </div>
    </div>
  );
}

async function TeamDirectors() {
  await connection();

  const mediaSlots = await getMediaBySlots(["directors_image_1"]);
  const directorImage = mediaSlots.find(
    (slot) => slot.slot_key === "directors_image_1"
  )?.blob_url;

  return (
    <TeamDirectorsSection image={directorImage ?? undefined} />
  );
}

function TeamDirectorsSection({ image }: { image?: string }) {
  return (
    <Section>
      <SectionHeader eyebrow="DIRECTORS" title="Our directors" />
      <DirectorsFeature
        directors={directors}
        image={{ src: image, alt: "CAPP Image" }}
        message={directorsMessage}
      />
    </Section>
  );
}
