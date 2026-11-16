/**
 * "Who it's for" bento for /about. Mirrors the visual language of SubjectBento
 * (gradient rounded-3xl cards, handwritten annotation + squiggly arrow, faded
 * placeholder pictures) without importing it. Content lives in src/data/about.ts.
 */
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { caveat } from "@/lib/fonts";
import { whoItsFor } from "@/data/about";

const TINTS = [
  "from-sky-100 to-indigo-soft",
  "from-violet-100 to-fuchsia-50",
  "from-orange-100 to-amber-50",
  "from-emerald-100 to-lime-50",
] as const;

// PLACEHOLDER pictures; swap for real artwork later.
const PLACEHOLDERS = ["/team/hover-1.png", "/team/hover-2.png", "/team/hover-3.png"] as const;

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

interface CardProps {
  title: string;
  body: string;
  tint: string;
  image: string;
  className?: string;
  href?: string;
}

function BentoCard({ title, body, tint, image, className, href }: CardProps) {
  const inner = (
    <>
      {href && (
        <ArrowUpRight
          aria-hidden="true"
          size={22}
          className="absolute right-5 top-5 z-10 text-indigo md:right-6 md:top-6"
        />
      )}
      <div className="relative z-10">
        <h3 className="pr-8 text-xl font-extrabold tracking-tight text-navy-ink md:text-2xl">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted md:text-base">{body}</p>
      </div>
      <div aria-hidden="true" className="mt-6 min-h-32 flex-1" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 [mask-image:linear-gradient(to_bottom,transparent,black_75%)]">
        <Image src={image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-bottom" />
      </div>
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

export function WhoItsForBento() {
  const [tech, finance, engineering, law] = whoItsFor.subjects;
  const [exploring, applying] = whoItsFor.general;
  const subjectCards = [
    { c: tech, span: "md:col-span-4" },
    { c: finance, span: "md:col-span-2" },
    { c: engineering, span: "md:col-span-2" },
    { c: law, span: "md:col-span-4" },
  ];

  return (
    <section aria-labelledby="who-its-for-title" className="py-12 md:py-20">
      <div className="px-3 md:px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo">{whoItsFor.eyebrow}</p>
        <h2 id="who-its-for-title" className="mt-2 text-3xl font-extrabold tracking-tight text-navy-ink md:text-4xl">
          {whoItsFor.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{whoItsFor.intro}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-6 md:gap-5">
          {subjectCards.map(({ c, span }, i) => (
            <BentoCard
              key={c.id}
              title={c.title}
              body={c.text}
              href={c.href}
              tint={TINTS[i % 4]}
              image={PLACEHOLDERS[i % 3]}
              className={span}
            />
          ))}

          <div className="hidden items-center gap-3 md:col-span-6 md:flex" aria-hidden="true">
            <Arrow className="rotate-12" />
            <span className={cn(caveat.className, "text-2xl text-gold-ink")}>{whoItsFor.annotation}</span>
          </div>

          <BentoCard
            title={exploring.title}
            body={exploring.text}
            tint={TINTS[3]}
            image={PLACEHOLDERS[1]}
            className="md:col-span-3"
          />
          <BentoCard
            title={applying.title}
            body={applying.text}
            tint={TINTS[2]}
            image={PLACEHOLDERS[2]}
            className="md:col-span-3"
          />
        </div>
      </div>
    </section>
  );
}
