/**
 * "The <Subject> hub": the bento grid plus the "Roles you could do" row, shared by the four
 * subject pages (Tech, Engineering, Law, Business & Finance).
 *
 * The layout is identical everywhere. What makes each page its own:
 *   - `motif` (pattern, glyph, focus-card illustrations; see ./motifs.tsx)
 *   - data from src/data/<subject>.ts: resources, ambassadors, bentoCards, roles
 *
 * Grid (desktop, 6 columns):
 *   [ next event (navy) ............ 4 ][ ambassadors .. 2 ]
 *   [ resources .. 2 ][ focus card 1 .. 2 ][ focus card 2 .. 2 ]
 * On mobile every card stacks in one column.
 */
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { SubjectPageData } from "@/types";
import { FocusArt, MOTIF_GLYPH, MotifPattern } from "./motifs";
import { SubjectRoles } from "./SubjectRoles";

export const SUBJECT_BENTO_ID = "explore";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo";
const LABEL = "text-xs font-bold uppercase tracking-[0.12em]";

function Tile({
  href,
  dark,
  className,
  children,
}: {
  href?: string;
  /** Navy anchor card instead of a white one. */
  dark?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const base = cn(
    "relative isolate flex min-w-0 flex-col gap-3 overflow-hidden rounded-card p-6 md:p-7",
    dark ? "bg-panel-gradient text-white" : "border border-line bg-white",
    className,
  );
  if (!href) return <div className={base}>{children}</div>;
  const external = /^https?:\/\//.test(href);
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        base,
        "group outline-none",
        !dark && "transition-colors hover:border-muted-soft motion-reduce:transition-none",
        FOCUS,
      )}
    >
      {children}
    </Link>
  );
}

function Go({ children, onDark }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span
      className={cn(
        "mt-auto inline-flex items-center gap-1 pt-2 text-sm font-bold group-hover:underline",
        onDark ? "text-gold-light" : "text-indigo",
      )}
    >
      {children} <ArrowUpRight aria-hidden="true" size={16} />
    </span>
  );
}

export function SubjectBento({ data }: { data: SubjectPageData }) {
  const { name, motif, resources, ambassadors, bentoCards } = data;
  const glyph = MOTIF_GLYPH[motif];
  const faces = ambassadors.slice(0, 4);
  const extra = ambassadors.length - faces.length;

  return (
    <section id={SUBJECT_BENTO_ID} aria-labelledby="hub-title" className="scroll-mt-8 py-12 md:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-20">
        <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-muted-soft">The {name} hub</p>
        <h2 id="hub-title" className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[40px]">
          Everything {name}, in one place
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-6 md:gap-5">
          {/* Anchor: links to /events. (The live next event shows in the page header and the events section.) */}
          <Tile href="/events" dark className="min-h-64 md:col-span-4 md:min-h-72">
            <MotifPattern motif={motif} tone="dark" />
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -bottom-8 -right-2 -z-10 select-none text-[120px] leading-none text-on-dark/15 md:text-[180px]",
                glyph.className,
              )}
            >
              {glyph.char}
            </span>
            <span className={cn(LABEL, "text-gold-light")}>{name} events</span>
            <h3 className="text-3xl font-extrabold tracking-[-0.02em] md:text-[40px]">Events</h3>
            <p className="max-w-[46ch] text-on-dark">See what&apos;s coming up and book a place, or look back at what we&apos;ve run before.</p>
            <Go onDark>See all events</Go>
          </Tile>

          {/* Ambassadors */}
          <Tile href="/team" className="md:col-span-2">
            <MotifPattern motif={motif} />
            <span className={cn(LABEL, "text-muted-soft")}>Ambassadors</span>
            <h3 className="text-xl font-extrabold tracking-[-0.02em] md:text-[22px]">Ask someone who&apos;s done it</h3>
            {faces.length > 0 && (
              <div aria-hidden="true" className="flex">
                {faces.map((p, i) => (
                  <span
                    key={p.id}
                    className={cn(
                      "relative size-12 overflow-hidden rounded-full border-[3px] border-white bg-gold-gradient",
                      i > 0 && "-ml-2.5",
                    )}
                  >
                    {p.photoSrc && <Image src={p.photoSrc} alt="" fill sizes="48px" className="object-cover" />}
                  </span>
                ))}
                {extra > 0 && (
                  <span className="-ml-2.5 grid size-12 place-items-center rounded-full border-[3px] border-white bg-navy text-sm font-bold text-white">
                    +{extra}
                  </span>
                )}
              </div>
            )}
            <p className="text-[15px] text-muted">
              {ambassadors.length > 0
                ? `${ambassadors.length} ${name} ambassadors run this hub. Message them in the channel.`
                : `Meet the team behind ${name} at CAPP.`}
            </p>
            <Go>Meet the ambassadors</Go>
          </Tile>

          {/* Resources */}
          <Tile href="/resources" className="md:col-span-2">
            <span className={cn(LABEL, "text-muted-soft")}>Resources</span>
            <h3 className="text-xl font-extrabold tracking-[-0.02em] md:text-[22px]">Start here</h3>
            {resources.length > 0 ? (
              <ul className="flex flex-col">
                {resources.slice(0, 3).map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-3 border-t border-line py-3 font-bold last:border-b">
                    <span className="min-w-0 truncate">{r.title}</span>
                    <span className="shrink-0 rounded-full border border-line bg-surface px-2 py-0.5 text-xs font-semibold text-muted">
                      {r.category}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[15px] text-muted">Guides, templates and tools picked by our ambassadors.</p>
            )}
            <Go>{resources.length > 0 ? `See all ${name} resources` : "Browse the library"}</Go>
          </Tile>

          {/* Two subject-specific focus cards */}
          {bentoCards.slice(0, 2).map((card, i) => (
            <Tile key={card.id} className="md:col-span-2">
              <span className={cn(LABEL, "text-muted-soft")}>Focus</span>
              <h3 className="text-xl font-extrabold tracking-[-0.02em] md:text-[22px]">{card.title}</h3>
              <p className="text-[15px] text-muted">{card.body}</p>
              <FocusArt motif={motif} index={i as 0 | 1} />
            </Tile>
          ))}
        </div>

        <SubjectRoles subject={name} motif={motif} roles={data.roles} />
      </div>
    </section>
  );
}
