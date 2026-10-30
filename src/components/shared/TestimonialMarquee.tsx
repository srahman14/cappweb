/**
 * Testimonials section: header plus two rows of cards that scroll in OPPOSITE
 * directions (top row left, bottom row right, at slightly different speeds).
 * The list is split in half between the rows; aim for 6+ testimonials so each
 * row is long enough to loop smoothly.
 *
 * The rows run edge to edge, so use this OUTSIDE a <Section> (it has its own spacing).
 *
 * Usage: <TestimonialMarquee testimonials={testimonials} />
 */
import { Container } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Testimonial } from "@/types";
import { TestimonialCard } from "./TestimonialCard";

export interface TestimonialMarqueeProps {
  testimonials: Testimonial[];
}

export function TestimonialMarquee({ testimonials }: TestimonialMarqueeProps) {
  const half = Math.ceil(testimonials.length / 2);
  const rows = [
    { items: testimonials.slice(0, half), direction: "left", duration: 50 },
    { items: testimonials.slice(half), direction: "right", duration: 58 },
  ] as const;

  return (
    <section className="py-12 md:py-12">
      <div className="flex flex-col gap-5">
        {rows.map(
          (row) =>
            row.items.length > 0 && (
              <Marquee
                key={row.direction}
                direction={row.direction}
                duration={row.duration}
              >
                {row.items.map((t) => (
                  <TestimonialCard key={t.id} testimonial={t} />
                ))}
              </Marquee>
            ),
        )}
      </div>
    </section>
  );
}
