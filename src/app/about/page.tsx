import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { PullQuote } from "@/components/about/PullQuote";
import { CTABand } from "@/components/shared/CTABand";
import { FeatureSplit } from "@/components/shared/FeatureSplit";
import {
  Card,
  HandDrawnUnderline,
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/ui";
import { motto, whatCappIs, whatWeDo, whoItsFor } from "@/data/about";
import { getMediaBySlots } from "@/lib/services/media.service";

export const metadata: Metadata = {
  title: "About",
  description:
    "CAPP is a careers community that runs events and panels with industry professionals across Tech, Business & Finance, Engineering and Law.",
};

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

      <Section>
        <FeatureSplit
          eyebrow={whatCappIs.eyebrow}
          title={whatCappIs.title}
          body={whatCappIs.paragraphs.join(" ")}
        />
      </Section>

      {/* Who it's for */}
      <Section>
        <SectionHeader eyebrow={whoItsFor.eyebrow} title={whoItsFor.title} />
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted">
          {whoItsFor.intro}
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whoItsFor.subjects.map((s) => (
            <li key={s.id}>
              <Card className="h-full p-6">
                <h3 className="text-lg font-extrabold tracking-[-0.02em] text-navy-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.text}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Motto */}
      <Section>
        <PullQuote quote={motto.quote} cite={motto.cite} />
      </Section>

      <Suspense fallback={<WhatWeDoSection slotImages={{}} />}>
        <AboutWhatWeDo />
      </Suspense>

      <CTABand title="Join the community" />
    </>
  );
}

async function AboutWhatWeDo() {
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
                  <Image
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
