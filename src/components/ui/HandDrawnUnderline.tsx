/**
 * The signature gold, hand-drawn underline: a wobbly stroke with a thinner
 * offset line beneath it, slightly rotated.
 *
 * DESIGN RULE: use sparingly (hero keyword and the closing call-to-action only),
 * never on every heading.
 *
 * Wrap the word(s) you want underlined:
 *   <HandDrawnUnderline rotate={-1.5}>one place</HandDrawnUnderline>
 *
 * The gold stops below mirror the `gold` tokens in tailwind.config.ts
 * (SVG gradients can't read Tailwind classes).
 */
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface HandDrawnUnderlineProps {
  children: ReactNode;
  /** Tilt in degrees. Vary it between uses so underlines don't look stamped out. */
  rotate?: number;
  className?: string;
}

export function HandDrawnUnderline({ children, rotate = -1.2, className }: HandDrawnUnderlineProps) {
  // Unique id per instance so several underlines on one page don't clash.
  const gradientId = `ul-${useId().replace(/:/g, "")}`;

  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className="absolute -bottom-3 -left-[2%] h-4 w-[104%] overflow-visible"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#F7DC9B" />
            <stop offset="0.6" stopColor="#E3B04B" />
            <stop offset="1" stopColor="#C98A22" />
          </linearGradient>
        </defs>
        <path d="M4 11 C60 4, 120 16, 182 9 S268 6, 296 11" fill="none" stroke={`url(#${gradientId})`} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M40 20 C110 15, 190 21, 252 16" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </svg>
    </span>
  );
}
