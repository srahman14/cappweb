/**
 * Small rounded label (event type, subject, date...).
 *
 *   tone="indigo"  soft indigo (default)
 *   tone="neutral" grey
 *   tone="gold"    soft gold
 *   tone="glass"   translucent, for navy backgrounds
 *
 * Usage: <Pill>Panel</Pill>
 */
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "indigo" | "neutral" | "gold" | "glass";

const TONES: Record<Tone, string> = {
  indigo: "bg-indigo-soft text-indigo",
  neutral: "bg-black/[0.04] text-muted",
  gold: "bg-gold/15 text-gold-deep",
  glass: "border border-white/20 bg-white/10 text-gold-light",
};

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Pill({ tone = "indigo", className, ...props }: PillProps) {
  return <span className={cn("inline-block rounded-sm px-3 py-1 text-[13px] font-semibold", TONES[tone], className)} {...props} />;
}
