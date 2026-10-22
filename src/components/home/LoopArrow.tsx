/**
 * Hand-drawn gold arrow that loops once on its way to the next step.
 * It's an SVG <g>, so it must be rendered INSIDE an <svg> (see StepJourney).
 *
 *   x, y     where the arrow starts, in the parent svg's coordinate space
 *   flipped  true makes the arrow travel UP-and-right instead of down-and-right
 */
export interface LoopArrowProps {
  x: number;
  y: number;
  flipped?: boolean;
}

export function LoopArrow({ x, y, flipped = false }: LoopArrowProps) {
  return (
    <g
      transform={`translate(${x} ${y})${flipped ? " scale(1 -1)" : ""}`}
      fill="none"
      stroke="#C98A22" // = gold-deep token (SVG can't use Tailwind classes)
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* the looping line */}
      <path d="M0 0 C30 -30 70 -10 55 20 C42 45 10 25 30 8 C50 -8 75 30 90 60" />
      {/* the arrow head */}
      <path d="M90.7 48 L90 60 L80 53.4" />
    </g>
  );
}
