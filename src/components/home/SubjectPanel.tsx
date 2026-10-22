/**
 * One card inside <SubjectAccordion>. Don't use it on its own.
 *
 * Desktop: when `active` it widens, the title grows and the description plus
 * button fade in. Mobile: cards stack and always show their content.
 * The background is a brand gradient with decorative tilted tiles as a "collage";
 * if the subject has an `imageSrc` that photo is used underneath instead.
 */
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Subject } from "@/types";

/** Decorative tilted tiles layered on the gradient (placeholder for a real photo collage). */
const COLLAGE_TILES = [
  "right-[-30px] top-10 h-[290px] w-[230px] rotate-[8deg] bg-gold/40",
  "right-[110px] top-[-20px] h-[230px] w-[190px] -rotate-[7deg] bg-indigo/50",
  "left-[30px] top-[150px] h-[200px] w-[170px] -rotate-[4deg] bg-white/15",
];

export interface SubjectPanelProps {
  subject: Subject;
  /** Zero-based position, shown as 01, 02... */
  index: number;
  active: boolean;
  onActivate: () => void;
}

export function SubjectPanel({ subject, index, active, onActivate }: SubjectPanelProps) {
  return (
    <article
      onMouseEnter={onActivate}
      onFocusCapture={onActivate}
      onClick={onActivate} // tap to open on touch devices
      className={cn(
        "relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[28px] bg-gradient-to-br p-7 text-white",
        "transition-[flex] duration-500 ease-out md:min-h-0 md:min-w-0 md:flex-1",
        subject.gradient,
        active && "md:flex-[3.2]",
      )}
    >
      {subject.imageSrc ? (
        <Image src={subject.imageSrc} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
      ) : (
        COLLAGE_TILES.map((tile) => <div key={tile} aria-hidden="true" className={cn("absolute rounded-3xl", tile)} />)
      )}
      {/* Dark fade so the text stays readable over images */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-deep/90" />

      <span className="absolute left-7 top-6 text-sm font-bold text-white/70">{String(index + 1).padStart(2, "0")}</span>

      <div className="relative flex flex-col gap-3">
        <h3
          className={cn(
            "text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] transition-[font-size] duration-500",
            active ? "md:text-[52px]" : "md:text-3xl",
          )}
        >
          {subject.title}
        </h3>
        {/* Description + button: always visible on mobile, revealed only when active on desktop */}
        <div className={cn("overflow-hidden transition-all duration-500 md:max-h-0 md:opacity-0", active && "md:max-h-52 md:opacity-100")}>
          <p className="mb-4 max-w-sm text-[17px] leading-relaxed text-on-dark">{subject.description}</p>
          <Button href={subject.href} variant="onDark" size="sm">{subject.ctaLabel} →</Button>
        </div>
      </div>
    </article>
  );
}
