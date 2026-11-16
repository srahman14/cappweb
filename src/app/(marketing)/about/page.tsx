import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { connection } from "next/server";
import { Suspense } from "react";
import { /* StatStrip, */ TeamTeaser, ValuesGrid, WhereToFindUs } from "@/components/about/AboutSections";
import { CTABand } from "@/components/shared/CTABand";
// import { WhoItsForBento } from "@/components/about/WhoItsForBento"; // removed for now, see below
import { MediaFeatureSplit } from "@/components/shared/MediaFeatureSplit";
import { MediaImage } from "@/components/media/MediaImage";
import {
  Card,
  HandDrawnUnderline,
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/ui";
import { whatCappIs, whatWeDo } from "@/data/about";
import { getMediaBySlots } from "@/lib/services/media.service";

export const metadata: Metadata = pageMetadata("/about", "About");

const slotByItemId: Record<string, string> = {
  events: "about_image_1",
  panels: "about_image_2",
  workshops: "about_image_3",
  resources: "about_image_4",
  "subject-chats": "about_image_5",
  volunteering: "about_image_6",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        title={
          <>
            About <HandDrawnUnderline>CAPP</HandDrawnUnderline>
          </>
        }
        description="A careers community that connects members with industry professionals."
      />

      <MediaFeatureSplit
        slotKey="about_image_2"
        caption="From a CAPP event"
        alt="A CAPP community event"
        eyebrow={whatCappIs.eyebrow}
        title={whatCappIs.title}
        body={whatCappIs.paragraphs.join(" ")}
      />

      {/* "Who it's for" bento removed for now. Restore by uncommenting this and the import above. */}
      {/* <WhoItsForBento /> */}

      {/* "CAPP in numbers" hidden for now. Restore by uncommenting this and StatStrip in the import above. */}
      {/* <StatStrip /> */}

      <WhereToFindUs />

      {/* Values and the team teaser sit together as one block (the teaser has no top padding). */}
      <ValuesGrid />
      <TeamTeaser />

      <Suspense fallback={<WhatWeDoSection slotImages={{}} />}>
        <AboutWhatWeDo />
      </Suspense>

      <CTABand title="Join the community" />
    </>
  );
}

async function AboutWhatWeDo() {
  // Media slots are fetched per request (the Supabase client reads the clock), same as MediaFeatureSplit.
  await connection();
  const mediaSlots = await getMediaBySlots([
    "about_image_1",
    "about_image_2",
    "about_image_3",
    "about_image_4",
    "about_image_5",
    "about_image_6",
  ]);

  const slotImages: Record<string, string> = Object.fromEntries(
    mediaSlots
      .filter(
        (slot): slot is typeof slot & { blob_url: string } =>
          slot.blob_url !== null
      )
      .map((slot) => [slot.slot_key, slot.blob_url])
  );

  return (
    <WhatWeDoSection slotImages={slotImages} />
  );
}

function WhatWeDoSection({ slotImages }: { slotImages: Record<string, string> }) {
  return (
    <Section>
      <SectionHeader eyebrow={whatWeDo.eyebrow} title={whatWeDo.title} />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whatWeDo.items.map((item) => (
          <li key={item.id}>
            <Card className="group h-full overflow-hidden transition-[transform,box-shadow] duration-300 hover:shadow-lg active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none">
              <div className="relative aspect-4/3 overflow-hidden">
                {slotImages[slotByItemId[item.id]] ? (
                  <MediaImage
                    src={slotImages[slotByItemId[item.id]]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-navy-deep"
                  />
                )}
                <h3 className="absolute bottom-5 right-5 max-w-[85%] text-right text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none sm:text-4xl">
                  {item.title}
                </h3>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
