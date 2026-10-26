import type { Metadata } from "next";
import Image from "next/image";
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

const WHAT_WE_DO_IMAGES: Record<string, string> = {
  events: "/media/IMG_0053.JPEG",
  panels: "/media/IMG_0052 2.JPEG",
  workshops: "/media/IMG_0003.JPEG",
  resources: "/media/IMG_0034.JPG",
  "subject-chats": "/media/IMG_0080.JPEG",
  volunteering: "/media/IMG_0005.JPEG",
};

export const metadata: Metadata = {
  title: "About",
  description:
    "CAPP is a careers community that runs events and panels with industry professionals across Tech, Business & Finance, Engineering and Law.",
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

      {/* What we do */}
      <Section>
        <SectionHeader eyebrow={whatWeDo.eyebrow} title={whatWeDo.title} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.items.map((item) => (
            <li key={item.id}>
              <Card className="group h-full overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={WHAT_WE_DO_IMAGES[item.id]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/10 to-transparent"
                  />
                  <h3 className="absolute bottom-5 right-5 max-w-[85%] text-right text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none sm:text-4xl">
                    {item.title}
                  </h3>
                </div>
                {/* <p className="p-6 leading-relaxed text-muted md:p-7">{item.text}</p> */}
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <CTABand title="Join the community" />
    </>
  );
}
