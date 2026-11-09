/**
 * Bento grid shared by the four subject pages (Tech, Engineering, Law, Business & Finance).
 * Three fixed cards link to the hub pages; 2-3 subject-specific cards come from
 * `bentoCards` in the subject's data file (generic fallback if omitted).
 *
 * Cards have gradient backdrops only. Each has an empty, aria-hidden "image slot"
 * (marked IMAGE SLOT below) so artwork can be dropped in later.
 */
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { caveat } from "@/lib/fonts";
import type { SubjectBentoCard } from "@/types";

export const SUBJECT_BENTO_ID = "explore";

const TINTS = [
  "from-sky-100 to-indigo-soft",
  "from-violet-100 to-fuchsia-50",
  "from-orange-100 to-amber-50",
  "from-emerald-100 to-lime-50",
] as const;

/**
 * PLACEHOLDER pictures (reusing the team hover images) so every card shows its image slot.
 * Replace per card with a real `image={{ src, alt }}`; once every card has one, delete this list.
 */
const PLACEHOLDERS = [
  { src: "/team/hover-1.png", alt: "" },
  { src: "/team/hover-2.png", alt: "" },
  { src: "/team/hover-3.png", alt: "" },
] as const;

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo";

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 50"
      className={cn("h-10 w-16 text-gold-deep", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6 C30 -4 60 10 40 26 C28 36 24 18 42 20 C58 22 66 32 72 42" />
      <path d="M71 31 L72 43 L61 40" />
    </svg>
  );
}

/**
 * IMAGE SLOT. Every card has one. Pass `image={{ src, alt }}` to a BentoCard (subject cards get it
 * from `bentoCards[].image` in src/data/<subject>.ts) and the picture sits behind the text, mostly
 * visible at the bottom and fading out towards the top. With no image it is just empty space.
 */
function Slot({ image }: { image?: { src: string; alt: string } }) {
  if (!image) return <div aria-hidden="true" data-slot="bento-image" className="mt-6 min-h-24 flex-1" />;
  return (
    <>
      <div aria-hidden="true" className="mt-6 min-h-40 flex-1" />
      <div
        data-slot="bento-image"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 [mask-image:linear-gradient(to_bottom,transparent,black_75%)]"
      >
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-bottom" />
      </div>
    </>
  );
}

interface CardProps {
  title: string;
  body: string;
  tint: string;
  className?: string;
  href?: string;
  cta?: string;
  image?: { src: string; alt: string };
}

function BentoCard({ title, body, tint, className, href, cta, image }: CardProps) {
  const inner = (
    <>
      <div className="relative z-10">
        <h3 className="text-xl font-extrabold tracking-tight text-navy-ink md:text-2xl">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted md:text-base">{body}</p>
        {cta && (
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-indigo group-hover:underline">
            {cta} <ArrowUpRight aria-hidden="true" size={16} />
          </span>
        )}
      </div>
      <Slot image={image} />
    </>
  );
  const base = cn(
    "relative flex min-h-52 flex-col overflow-hidden rounded-3xl bg-gradient-to-br p-6 md:p-8",
    tint,
    className,
  );
  return href ? (
    <Link
      href={href}
      className={cn(
        base,
        "group outline-none transition-transform motion-safe:hover:-translate-y-1 motion-reduce:transition-none",
        FOCUS,
      )}
    >
      {inner}
    </Link>
  ) : (
    <div className={base}>{inner}</div>
  );
}

export function SubjectBento({
  subject,
  cards,
}: {
  subject: string;
  cards?: SubjectBentoCard[];
}) {
  const own: SubjectBentoCard[] =
    cards && cards.length > 0
      ? cards.slice(0, 3)
      : [
          {
            id: "fallback",
            title: `${subject} at CAPP`,
            body: `Talks, workshops and advice from people working in ${subject}.`,
          },
        ];

  return (
    <section id={SUBJECT_BENTO_ID} aria-labelledby="bento-title" className="scroll-mt-8 py-12 md:py-20">
      <div className="px-3 md:px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo">The {subject} hub</p>
        <h2 id="bento-title" className="mt-2 text-3xl font-extrabold tracking-tight text-navy-ink md:text-4xl">
          Everything {subject}, in one place
        </h2>

        <div className="relative mt-8 grid gap-4 md:grid-cols-6 md:gap-5">
          {/* IMAGE: add a picture for this card with an `image={{ src, alt }}` prop. */}
          <BentoCard
            title="Resources"
            body="Guides, templates and tools. Browse the full library and filter by subject to find what you need."
            tint={TINTS[0]}
            href="/resources"
            cta="Find resources"
            image={PLACEHOLDERS[1]}
            className="md:col-span-4"
          />
          {/* IMAGE: add a picture for this card with an `image={{ src, alt }}` prop. */}
          <BentoCard
            title="Events"
            body="See what's coming up and book a place, or look back at what we've already done."
            tint={TINTS[1]}
            href="/events"
            cta="Find events"
            image={PLACEHOLDERS[2]}
            className="md:col-span-2"
          />

          <div className="hidden items-center gap-3 md:col-span-6 md:flex" aria-hidden="true">
            <Arrow className="rotate-12" />
            <span className={cn(caveat.className, "text-2xl text-gold-ink")}>Also done for you</span>
          </div>

          {/* IMAGE: subject cards take their picture from `bentoCards[].image` in src/data/<subject>.ts. */}
          {own.map((c, i) => (
            <BentoCard
              key={c.id}
              title={c.title}
              body={c.body}
              tint={TINTS[(i + 2) % 4]}
              image={c.image ?? PLACEHOLDERS[i % 3]}
              className={own.length === 1 ? "md:col-span-6" : own.length === 2 ? "md:col-span-3" : "md:col-span-2"}
            />
          ))}

          {/* IMAGE: add a picture for this card with an `image={{ src, alt }}` prop. */}
          <BentoCard
            title="Ambassadors"
            body={`Meet the ambassadors who run ${subject} at CAPP, and find out who to ask.`}
            tint={TINTS[0]}
            href="/team"
            cta="Meet the ambassadors"
            image={PLACEHOLDERS[0]}
            className="md:col-span-6"
          />
        </div>
      </div>
    </section>
  );
}
