"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { LegalSection } from "@/types";

/**
 * LegalNav: sticky "On this page" contents list for legal pages.
 *
 * - Desktop (lg+): sticks beside the content while you scroll, highlights the
 *   section you are reading, and returns to its place when you scroll back up.
 * - Mobile: a collapsible "On this page" card above the content.
 * - Without JavaScript the links still jump to each section.
 *
 * Props:
 * - sections: id + title of each section (ids must match the section ids on the page)
 *
 * Usage:
 *   <LegalNav sections={sections.map(({ id, title }) => ({ id, title }))} />
 */
export interface LegalNavProps {
  sections: Pick<LegalSection, "id" | "title">[];
}

export function LegalNav({ sections }: LegalNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Scroll-spy: the section nearest the top of the reading area is "active".
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Ignore the navbar area at the top and the lower part of the screen.
      { rootMargin: "-112px 0px -65% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
    detailsRef.current?.removeAttribute("open"); // close the mobile list
  }

  const list = (
    <ul className="border-l border-line">
      {sections.map((s, i) => {
        const active = s.id === activeId;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={(e) => handleClick(e, s.id)}
              aria-current={active ? "location" : undefined}
              className={cn(
                "-ml-px block rounded-r-md border-l-2 py-1.5 pl-4 pr-2 text-sm transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo",
                active
                  ? "border-gold font-semibold text-navy-ink"
                  : "border-transparent text-muted hover:text-navy-ink",
              )}
            >
              {i + 1}. {s.title}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile / tablet */}
      <details
        ref={detailsRef}
        className="mb-8 rounded-card border border-line bg-white shadow-card lg:hidden"
      >
        <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-navy-ink focus-visible:outline-2 focus-visible:outline-indigo">
          On this page
        </summary>
        <nav aria-label="On this page" className="px-5 pb-4">
          {list}
        </nav>
      </details>

      {/* Desktop: sticky */}
      <nav
        aria-label="On this page"
        className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block"
      >
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">
          On this page
        </p>
        {list}
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0 });
            history.replaceState(null, "", window.location.pathname);
          }}
          className="mt-4 text-sm font-semibold text-indigo hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
        >
          Back to top
        </button>
      </nav>
    </>
  );
}
