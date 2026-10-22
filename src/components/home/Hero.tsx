/**
 * Landing-page hero (layout A): navy gradient panel with eyebrow, headline,
 * description, two buttons and a members line.
 *
 * `title` is a ReactNode so you can underline a keyword:
 *   <Hero
 *     eyebrow="Careers and People's Progression"
 *     title={<>Your careers community, all in <HandDrawnUnderline>one place</HandDrawnUnderline></>}
 *     description="Events, panels and resources..."
 *     secondaryCta={{ label: "Explore resources", href: "/resources" }}
 *     stat={SITE.memberStat}
 *   />
 */
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { GradientPanel } from "@/components/ui/GradientPanel";
import { Pill } from "@/components/ui/Pill";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export interface HeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  secondaryCta?: { label: string; href: string };
  stat?: string;
}

export function Hero({ eyebrow, title, description, secondaryCta, stat }: HeroProps) {
  return (
    <div className="px-3 pt-6 md:px-6">
      <GradientPanel glow="indigo" className="flex flex-col items-center gap-7 px-6 py-20 text-center md:px-20 md:py-28">
        {/* <Pill tone="glass" className="px-4 py-2 text-[13px] uppercase tracking-[0.12em]">{eyebrow}</Pill> */}
        <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.03] tracking-[-0.04em] md:text-[80px]">{title}</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-on-dark md:text-[21px]">{description}</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton variant="onDark" />
          <Button href={secondaryCta?.href} variant="outlineOnDark">{secondaryCta?.label}</Button>
        </div>
        {stat && <p className="mt-3 text-[15px] text-on-dark/80">{stat}</p>}
      </GradientPanel>
    </div>
  );
}
