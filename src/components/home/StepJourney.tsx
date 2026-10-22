/**
 * "Get started" journey: step cards at staggered heights, tilted slightly and
 * joined by looping arrows, so it reads like a path.
 *
 * - xl screens and up: the staggered layout with arrows (JOURNEY_LAYOUT below).
 * - smaller screens: a plain grid of cards (arrows hidden).
 *
 * Designed for 4 steps. To change the number of steps, add/remove entries in
 * JOURNEY_LAYOUT and ARROWS to match.
 *
 * Usage: <StepJourney steps={steps} />
 */
import type { Step } from "@/types";
import { LoopArrow } from "./LoopArrow";
import { StepCard } from "./StepCard";

/** Virtual canvas the layout is drawn on (matches the mockup: 1280 x 440). */
const CANVAS = { width: 1280, height: 440 };

/** Per-step position (as % of the canvas) and tilt in degrees. */
const JOURNEY_LAYOUT = [
  { left: 0, top: 6.8, rotate: -1.5 },
  { left: 26.9, top: 45.5, rotate: 1.2 },
  { left: 53.9, top: 13.6, rotate: -1 },
  { left: 80.5, top: 52.3, rotate: 1.5 },
] as const;

/** Arrows between consecutive cards, in canvas coordinates. `flipped` = goes up. */
const ARROWS = [
  { x: 252, y: 165, flipped: false },
  { x: 597, y: 225, flipped: true },
  { x: 942, y: 185, flipped: false },
] as const;

export function StepJourney({ steps }: { steps: Step[] }) {
  return (
    <>
      {/* Desktop: staggered journey */}
      <div className="relative hidden w-full xl:block" style={{ aspectRatio: `${CANVAS.width} / ${CANVAS.height}` }}>
        <svg aria-hidden="true" viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`} className="absolute inset-0 h-full w-full overflow-visible">
          {ARROWS.map((a) => (
            <LoopArrow key={a.x} {...a} />
          ))}
        </svg>
        {steps.slice(0, JOURNEY_LAYOUT.length).map((step, i) => {
          const pos = JOURNEY_LAYOUT[i];
          return (
            <StepCard
              key={step.id}
              step={step}
              number={i + 1}
              className="absolute w-[19.5%]"
              style={{ left: `${pos.left}%`, top: `${pos.top}%`, transform: `rotate(${pos.rotate}deg)` }}
            />
          );
        })}
      </div>

      {/* Tablet / mobile: simple grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:hidden">
        {steps.map((step, i) => (
          <StepCard key={step.id} step={step} number={i + 1} />
        ))}
      </div>
    </>
  );
}
