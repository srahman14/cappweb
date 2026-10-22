/**
 * Layout primitives used by EVERY page.
 *
 * - <Container>: centres content, sets max width and side padding.
 * - <Section>: a Container plus standard vertical spacing.
 *
 * Usage:
 *   <Section>
 *     <SectionHeader eyebrow="EVENTS" title="Upcoming" />
 *     ...
 *   </Section>
 */
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-20", className)} {...props} />;
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Extra classes for the inner Container (e.g. to add flex/gap). */
  containerClassName?: string;
}

export function Section({ className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-12 md:py-20", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
