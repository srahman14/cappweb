/**
 * Closing "Ready to join?" band. Put it at the bottom of EVERY page
 * (required by the page rules) so each page links back into WhatsApp.
 *
 * Usage:
 *   <CTABand title={<>Ready to join <HandDrawnUnderline>CAPP?</HandDrawnUnderline></>} />
 */
import type { ReactNode } from "react";
import { GradientPanel } from "@/components/ui/GradientPanel";
import { WhatsAppButton } from "./WhatsAppButton";

export interface CTABandProps {
  title: ReactNode;
  description?: string;
}

export function CTABand({ title, description = "Chat on WhatsApp, find everything else here." }: CTABandProps) {
  return (
    <div className="px-3 py-12 md:px-6 md:py-20">
      <GradientPanel glow="gold" className="flex flex-col items-center gap-6 px-6 py-16 text-center md:px-20 md:py-20">
        <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] md:text-6xl">{title}</h2>
        <p className="text-lg text-on-dark md:text-xl">{description}</p>
        <WhatsAppButton variant="onDark" className="mt-2" />
      </GradientPanel>
    </div>
  );
}
