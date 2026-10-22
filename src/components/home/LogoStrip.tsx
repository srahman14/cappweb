/**
 * Moving, greyed-out row of companies whose people have spoken at CAPP panels.
 * Built on <TrustedByMarquee>, which loops the items forever, pauses on hover,
 * fades the edges and respects "reduce motion".
 *
 * Each speaker shows its logo image if `logoSrc` is given, otherwise its name as text.
 * ONLY list firms that have actually spoken at a CAPP panel.
 *
 * Usage: <LogoStrip speakers={[{ name: "PwC" }, { name: "EY", logoSrc: "/logos/ey.svg" }]} />
 */
import Image from "next/image";
import { Container } from "@/components/ui/Section";
import { CompanyMarquee } from "@/components/home/CompanyMarquee";
import type { Speaker } from "@/types";

export interface LogoStripProps {
  heading?: string;
  speakers: Speaker[];
  /** Seconds for one full loop (higher = slower). */
  duration?: number;
}

export function LogoStrip({ heading = "panel speakers have come from", speakers, duration = 30 }: LogoStripProps) {
  return (
    <Container className="flex flex-col items-center gap-7 pt-14">
      <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-muted-soft">{heading}</p>

      {/* The hairlines above and below frame the moving strip */}
      <div className="w-full border-y border-line py-7">
        <CompanyMarquee
          duration={duration}
          items={speakers.map((s) =>
            s.logoSrc ? (
              <Image
                key={s.name}
                src={s.logoSrc}
                alt={s.name}
                width={176}
                height={48}
                className="h-12 w-44 object-contain"
                style={{ transform: `scale(${s.logoScale ?? 1})` }}
              />
            ) : (
              <span key={s.name} className="whitespace-nowrap text-xl font-bold text-muted">
                {s.name}
              </span>
            ),
          )}
        />
      </div>
    </Container>
  );
}