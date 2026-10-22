/**
 * EXAMPLE ONLY: shows how the landing components fit together (layout A).
 * Copy into app/page.tsx. The sample content below is placeholder data and
 * should move into data/*.ts files; delete this file once that's done.
 */
import { EventList } from "@/components/events/EventList";
import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";
import { StepJourney } from "@/components/home/StepJourney";
import { SubjectAccordion } from "@/components/home/SubjectAccordion";
import { CTABand } from "@/components/shared/CTABand";
import { HandDrawnUnderline } from "@/components/ui/HandDrawnUnderline";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE } from "@/lib/site";
import type { EventItem, Speaker, Step, Subject } from "@/types";

const speakers: Speaker[] = [
  { name: "Accenture", logoSrc: "/company_logos/Accenture_logo.svg", logoScale: 1},
  { name: "BT", logoSrc: "/company_logos/BT.svg" },
  { name: "Amazon", logoSrc: "/company_logos/Amazon_logo.svg", logoScale: 0.9},
  { name: "NHS", logoSrc: "/company_logos/nhs.svg", logoScale: 2.4 },
  { name: "Barclays", logoSrc: "/company_logos/Barclays-Logo.svg", logoScale: 2.3 },
  { name: "EY", logoSrc: "/company_logos/ernst-young.svg", logoScale: 1.3 },
  { name: "KPMG", logoSrc: "/company_logos/kpmg.svg" },
  { name: "PwC", logoSrc: "/company_logos/PwC_2025_Logo.svg", logoScale: 2.4 },
  { name: "JPMorgan", logoSrc: "/company_logos/JPMorgan.svg"  },

];

const events: EventItem[] = [1, 2, 3].map((n) => ({
  id: `e${n}`, title: "[EVENT NAME]", dateLabel: "[DATE]", weekday: "[WEEKDAY]", time: "[TIME]",
  location: "[LOCATION]", hostName: "[HOST NAME]", tags: ["Panel", "Tech"], href: "#",
}));
// Gradient classes are written out in full so Tailwind can detect them.
const subjects: Subject[] = [
  { id: "tech", title: "Tech", description: "LeetCode, NeetCode, AI courses and more.", ctaLabel: "Explore Tech", href: "/tech", gradient: "from-indigo to-navy" },
  { id: "business", title: "Business & Finance", description: "Guides, events and opportunities from your ambassador.", ctaLabel: "Explore Business", href: "/business-finance", gradient: "from-navy to-indigo" },
  { id: "engineering", title: "Engineering", description: "Guides, events and opportunities from your ambassador.", ctaLabel: "Explore Engineering", href: "/engineering", gradient: "from-indigo to-navy-deep" },
  { id: "law", title: "Law", description: "Guides, events and opportunities from your ambassador.", ctaLabel: "Explore Law", href: "/law", gradient: "from-navy-deep to-indigo" },
];
const steps: Step[] = [
  { id: "s1", title: "Join the WhatsApp community", description: "Announcements, chat and your subject channel." },
  { id: "s2", title: "Explore upcoming and past events", description: "Panels, hackathons and recaps from industry speakers." },
  { id: "s3", title: "Dive into the resources", description: "CV and ATS guides, interview practice, LinkedIn tips." },
  { id: "s4", title: "Get involved", description: "Volunteer, help run a panel or become an ambassador." },
];

export default function HomePage() {
  return (
    <main>
      <Hero
        // commented out eyebrow for now (in hero)
        eyebrow="Careers and People's Progression"
        title={<>Your careers community, all in <HandDrawnUnderline rotate={-1.5}>one place</HandDrawnUnderline></>}
        description="Events, industry panels and resources for Tech, Business & Finance, Engineering and Law. WhatsApp is where we chat. This is where you find the rest."
        secondaryCta={{ label: "Explore resources", href: "/resources" }}
        stat={SITE.memberStat}
      />
      <LogoStrip speakers={speakers} />
      <Section>
        <SectionHeader eyebrow="Events" title="Upcoming" linkLabel="Past events and recaps →" linkHref="/events" />
        <EventList events={events} />
      </Section>
      <Section>
        <SectionHeader eyebrow="Subjects" title="Find your field" />
        <SubjectAccordion subjects={subjects} />
      </Section>
      <Section>
        <SectionHeader eyebrow="New here?" title="Get started in four steps" />
        <StepJourney steps={steps} />
      </Section>
      <CTABand title={<>Ready to join <HandDrawnUnderline rotate={1}>CAPP?</HandDrawnUnderline></>} />
    </main>
  );
}
