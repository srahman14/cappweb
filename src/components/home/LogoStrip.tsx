/**
 * Greyed-out row of companies whose people have spoken at CAPP panels.
 * Shows the logo image if `logoSrc` is given, otherwise the company name as text.
 *
 * ONLY list firms that have actually spoken at a CAPP panel.
 *
 * Usage: <LogoStrip speakers={[{ name: "PwC" }, { name: "EY", logoSrc: "/logos/ey.svg" }]} />
 */
import Image from "next/image";
import { Container } from "@/components/ui/Section";
import type { Speaker } from "@/types";

export interface LogoStripProps {
  heading?: string;
  speakers: Speaker[];
}

export function LogoStrip({ heading = "Panel speakers have come from", speakers }: LogoStripProps) {
  return (
    <Container className="flex flex-col items-center gap-7 pt-14">
      <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-muted-soft">{heading}</p>
      <ul className="flex w-full flex-wrap items-center justify-between gap-x-8 gap-y-5 border-y border-line py-7 text-muted-soft">
        {speakers.map((s) => (
          <li key={s.name} className="whitespace-nowrap text-xl font-bold opacity-80 grayscale">
            {s.logoSrc ? <Image src={s.logoSrc} alt={s.name} width={110} height={32} className="h-7 w-auto" /> : s.name}
          </li>
        ))}
      </ul>
    </Container>
  );
}
