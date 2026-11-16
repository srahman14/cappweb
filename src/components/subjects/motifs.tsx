/**
 * Per-subject visual identity for the hub bento. The layout is the same on every subject
 * page; only these pieces change:
 *
 *   <MotifPattern>  faint background texture (dot grid, blueprint, ruled lines, ticker line)
 *   MOTIF_GLYPH     the large character on the navy anchor card
 *   <FocusArt>      the small illustration at the bottom of each of the two focus cards
 *
 * Every colour comes from the theme tokens in globals.css (via color-mix), so no raw hex here.
 * All of it is decorative and hidden from screen readers.
 */
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { SubjectMotif } from "@/types";

const ink = (tone: "light" | "dark", pct: number) =>
  tone === "dark"
    ? `color-mix(in srgb, var(--color-on-dark) ${pct}%, transparent)`
    : `color-mix(in srgb, var(--color-indigo) ${pct}%, transparent)`;

function patternStyle(motif: SubjectMotif, tone: "light" | "dark"): CSSProperties {
  switch (motif) {
    case "tech":
      return {
        backgroundImage: `radial-gradient(${ink(tone, 14)} 1.2px, transparent 1.4px)`,
        backgroundSize: "18px 18px",
      };
    case "engineering":
      return {
        backgroundImage: `linear-gradient(${ink(tone, 10)} 1px, transparent 1px), linear-gradient(90deg, ${ink(tone, 10)} 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      };
    case "law":
      return {
        backgroundImage: `linear-gradient(transparent 23px, ${ink(tone, 12)} 24px)`,
        backgroundSize: "100% 24px",
      };
    case "business":
      return {};
  }
}

/** Absolutely positioned texture. Put it first inside a `relative overflow-hidden` card. */
export function MotifPattern({ motif, tone = "light" }: { motif: SubjectMotif; tone?: "light" | "dark" }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={patternStyle(motif, tone)}>
      {motif === "business" && (
        <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-3/5 w-full" fill="none">
          <polyline
            points="0,80 25,70 45,76 70,52 95,58 120,36 145,44 170,20 200,26"
            stroke={ink(tone, tone === "dark" ? 22 : 18)}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
}

export const MOTIF_GLYPH: Record<SubjectMotif, { char: string; className: string }> = {
  tech: { char: "</>", className: "font-mono tracking-[-0.06em]" },
  engineering: { char: "⌀", className: "font-mono" },
  law: { char: "§", className: "font-serif" },
  business: { char: "£", className: "font-extrabold" },
};

/* ---------- Focus card illustrations (index 0 and 1 for each motif) ---------- */

const chip = "rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-muted";

function Terminal() {
  return (
    <pre className="overflow-x-auto rounded-xl bg-navy-deep px-4 py-3.5 font-mono text-[13px] leading-relaxed text-on-dark">
      <span className="text-gold-light">&gt;</span> two_sum([2,7,11,15], 9){"\n"}
      <span className="text-success-soft">[0, 1]</span>  <span className="text-gold-light">O(n)</span>
    </pre>
  );
}

const COMMITS = [0, 1, 0, 2, 3, 1, 0, 2, 0, 1, 3, 2, 0, 1, 1, 0, 2, 3, 3, 2, 1, 0, 1, 2, 3, 0, 1, 2];
const COMMIT_TONE = ["bg-indigo-soft", "bg-indigo/25", "bg-indigo/50", "bg-indigo"];

function CommitGrid() {
  return (
    <div className="grid max-w-72 grid-cols-14 gap-1">
      {COMMITS.map((level, i) => (
        <span key={i} className={cn("aspect-square rounded-[3px]", COMMIT_TONE[level])} />
      ))}
    </div>
  );
}

function Chain({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-1.5">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-muted-soft">→</span>}
          <span className={cn(chip, i === steps.length - 1 && "border-transparent bg-indigo-soft text-indigo")}>{s}</span>
        </li>
      ))}
    </ol>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <li key={s} className={chip}>{s}</li>
      ))}
    </ul>
  );
}

function Blueprint() {
  return (
    <svg viewBox="0 0 220 70" className="h-16 w-full max-w-64 text-indigo" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="20" y="10" width="140" height="36" rx="3" />
      <circle cx="60" cy="28" r="8" />
      <circle cx="120" cy="28" r="8" />
      <path d="M20 58H160M20 53V63M160 53V63" strokeOpacity=".6" />
      <path d="M20 58l6-3M20 58l6 3M160 58l-6-3M160 58l-6 3" strokeOpacity=".6" />
      <text x="176" y="32" fill="currentColor" stroke="none" className="font-mono text-[11px]">⌀16</text>
    </svg>
  );
}

function Sparkline() {
  return (
    <svg viewBox="0 0 200 50" className="h-12 w-full max-w-64 text-indigo" fill="none">
      <polyline
        points="0,40 20,36 40,38 60,26 80,30 100,18 120,22 140,12 160,16 180,6 200,9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="200" cy="9" r="3.5" className="fill-gold" />
    </svg>
  );
}

const FOCUS_ART: Record<SubjectMotif, [() => ReactNode, () => ReactNode]> = {
  tech: [Terminal, CommitGrid],
  engineering: [
    () => <Chips items={["Civil", "Mechanical", "Electrical", "Chemical", "Aerospace"]} />,
    () => <Blueprint />,
  ],
  law: [
    () => (
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-xl border border-line bg-surface p-3">
          <p className="font-bold text-navy-ink">Solicitor</p>
          <p className="mt-1 text-muted">SQE1, SQE2 and 2 years&apos; work experience</p>
        </div>
        <div className="rounded-xl border border-line bg-surface p-3">
          <p className="font-bold text-navy-ink">Barrister</p>
          <p className="mt-1 text-muted">Bar course, then a pupillage</p>
        </div>
      </div>
    ),
    () => <Chain steps={["Apply", "Vac scheme", "Training contract"]} />,
  ],
  business: [
    () => <Chain steps={["Online tests", "Interview", "Assessment centre"]} />,
    () => <Sparkline />,
  ],
};

export function FocusArt({ motif, index }: { motif: SubjectMotif; index: 0 | 1 }) {
  const Art = FOCUS_ART[motif][index];
  return (
    <div aria-hidden="true" className="mt-auto pt-4">
      <Art />
    </div>
  );
}
