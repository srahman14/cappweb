/**
 * Site font. Apply once in app/layout.tsx:
 *
 *   <body className={`${jakarta.variable} font-sans bg-surface text-navy-ink`}>
 *
 * `variable` exposes `--font-jakarta`, which tailwind.config.ts maps to `font-sans`.
 */
import { Caveat, Plus_Jakarta_Sans } from "next/font/google";

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

/** Handwritten accent font for small annotations (e.g. the subject bento grid). */
export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-caveat",
  display: "swap",
});
