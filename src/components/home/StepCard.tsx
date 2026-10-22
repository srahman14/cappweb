/**
 * One numbered step. Used by <StepJourney>, but generic enough to reuse
 * (e.g. a "how it works" row on another page).
 *
 * Positioning and tilt are applied by the parent through `className`/`style`.
 */
import type { CSSProperties } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import type { Step } from "@/types";

export interface StepCardProps {
  step: Step;
  /** 1-based number shown in the gold badge. */
  number: number;
  className?: string;
  style?: CSSProperties;
}

export function StepCard({ step, number, className, style }: StepCardProps) {
  return (
    <Card className={cn("flex flex-col gap-2.5 p-6", className)} style={style}>
      <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gold-gradient text-[15px] font-extrabold text-navy-ink">
        {number}
      </span>
      <h3 className="mt-1 text-xl font-bold leading-tight tracking-[-0.02em]">{step.title}</h3>
      <p className="text-[15px] leading-normal text-muted">{step.description}</p>
    </Card>
  );
}
