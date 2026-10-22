import * as React from "react";
import { cn } from "@/lib/cn";

export interface CompanyMarquee extends React.HTMLAttributes<HTMLDivElement> {
  /** Logos or wordmarks: <img>, inline SVGs or text. */
  items: React.ReactNode[];
  /** Heading above the strip, e.g. "Trusted by teams at". */
  title?: string;
  /** Seconds for one full loop. */
  duration?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  /** Fade out the left and right edges. */
  fade?: boolean;
}

export function CompanyMarquee({
  items,
  title,
  duration = 30,
  direction = "left",
  pauseOnHover = true,
  fade = true,
  className,
  ...props
}: CompanyMarquee) {
  const groupClass = cn(
    "flex min-w-full shrink-0 items-center justify-around animate-marquee motion-reduce:animate-none",
    direction === "right" && "[animation-direction:reverse]",
    pauseOnHover && "group-hover:[animation-play-state:paused]",
  );

  const renderGroup = (duplicate: boolean) => (
    <div
      aria-hidden={duplicate || undefined}
      className={cn(groupClass, duplicate && "motion-reduce:hidden")}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="flex shrink-0 items-center px-10 opacity-60 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0 motion-reduce:transition-none"
        >
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn("flex w-full flex-col items-center gap-6", className)}
      {...props}
    >
      {title && (
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
      )}
      <div
        className={cn(
          "group flex w-full overflow-hidden",
          fade &&
            "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        )}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {renderGroup(false)}
        {renderGroup(true)}
      </div>
    </div>
  );
}
