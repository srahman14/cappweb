/**
 * Rounded navy gradient container with a soft glow. Used for the hero and the
 * closing call-to-action (and anywhere else we need a "hero-style" block).
 *
 *   glow="indigo"  glow from the top (hero)
 *   glow="gold"    warm glow from the bottom (CTA)
 *
 * Content is layered above the glow automatically.
 *
 * Usage:
 *   <GradientPanel glow="gold" className="p-16 text-center">...</GradientPanel>
 */
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const GLOWS = { indigo: "bg-glow-indigo", gold: "bg-glow-gold" } as const;

export interface GradientPanelProps extends HTMLAttributes<HTMLDivElement> {
  glow?: keyof typeof GLOWS;
}

export function GradientPanel({ glow = "indigo", className, children, ...props }: GradientPanelProps) {
  return (
    <div
      className={cn("relative overflow-hidden isolate rounded-panel bg-panel-gradient text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]", className)}
      {...props}
    >
      {/* The glow sits BEHIND the content (-z-10 inside this panel's own stacking context, thanks to `isolate`). */}
      <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10", GLOWS[glow])} />
      {children}
    </div>
  );
}
