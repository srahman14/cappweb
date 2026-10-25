import type { Testimonial } from "@/types";

/** Placeholder. Replace with real quotes (with the member's permission) and delete this helper. */
const placeholder = (n: number): Testimonial => ({
  id: `t${n}`,
  quote: "[Short quote from a CAPP member: what they gained from a panel, resource or ambassador.]",
  name: "[NAME]",
  role: "[Course, year]",
});

export const testimonials: Testimonial[] = Array.from({ length: 8 }, (_, i) => placeholder(i + 1));