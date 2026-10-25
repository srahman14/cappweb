/**
 * Generic infinite-scroll row. Children (cards, logos, anything) loop forever;
 * the row is rendered twice so the loop is seamless, and the copy is hidden from
 * screen readers. Uses the `animate-marquee` keyframes in app/globals.css.
 *
 *   direction="left" | "right"  which way it moves
 *   duration                    seconds per loop (higher = slower)
 *   pauseOnHover                pause while the pointer is over the row
 *   fade                        fade the left/right edges
 *
 * Respects "reduce motion" (no animation, shows a single static row).
 *
 * Usage:
 *   <Marquee direction="right" duration={50}>{cards}</Marquee>
 */
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  duration?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  fade?: boolean;
}

export function Marquee({ children, duration = 40, direction = "left", pauseOnHover = true, fade = true, className, ...props }: MarqueeProps) {
  // `gap-5 pr-5` (equal) keeps the loop seamless: the group's width includes its trailing gap.
  const group = cn(
    "flex min-w-full shrink-0 items-stretch gap-5 pr-5 animate-marquee motion-reduce:animate-none",
    direction === "right" && "[animation-direction:reverse]",
    pauseOnHover && "group-hover:[animation-play-state:paused]",
  );

  return (
    <div
      className={cn(
        "group flex w-full overflow-hidden",
        fade && "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      {...props}
    >
      <div className={group}>{children}</div>
      <div aria-hidden="true" className={cn(group, "motion-reduce:hidden")}>{children}</div>
    </div>
  );
}