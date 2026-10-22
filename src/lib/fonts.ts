/**
 * Site font. Apply once in app/layout.tsx:
 *
 *   <body className={`${jakarta.variable} font-sans bg-surface text-navy-ink`}>
 *
 * `variable` exposes `--font-jakarta`, which tailwind.config.ts maps to `font-sans`.
 */
import { Plus_Jakarta_Sans } from "next/font/google";

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});
