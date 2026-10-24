/**
 * Text on one side, media on the other (defaults to a <TileCollage />).
 * Used for "What Tech is about at CAPP" style blocks on every subject page.
 *
 * Usage:
 *   <FeatureSplit eyebrow="..." title="..." body="..." bullets={["..."]} />
 *   <FeatureSplit {...about} reverse media={<MyImage />} />
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TileCollage } from "@/components/ui/TileCollage";

export interface FeatureSplitProps {
  eyebrow?: string;
  title: string;
  body: string;
  bullets?: string[];
  /** Replaces the default tile collage. */
  media?: ReactNode;
  /** Put the media on the left instead of the right (desktop). */
  reverse?: boolean;
}

export function FeatureSplit({ eyebrow, title, body, bullets, media, reverse }: FeatureSplitProps) {
  return (
    <div className={cn("flex flex-col gap-12 md:items-center md:gap-16", reverse ? "md:flex-row-reverse" : "md:flex-row")}>
      <div className="flex flex-1 flex-col gap-4">
        {eyebrow && <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-muted-soft">{eyebrow}</p>}
        <h2 className="text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[40px]">{title}</h2>
        <p className="text-lg leading-relaxed text-muted">{body}</p>
        {bullets && (
          <ul className="mt-1 flex flex-col gap-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[17px] text-muted">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-gold" />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex-1">{media ?? <TileCollage />}</div>
    </div>
  );
}