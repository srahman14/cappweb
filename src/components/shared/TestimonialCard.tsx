/**
 * One member quote: quote text, then avatar, name and role.
 * Fixed width so cards line up inside a <Marquee>.
 *
 * Usage: <TestimonialCard testimonial={t} />
 */
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex w-[300px] shrink-0 flex-col justify-between gap-6 p-6 md:w-[380px]">
      <blockquote className="text-[17px] leading-relaxed">“{testimonial.quote}”</blockquote>
      <figcaption className="flex items-center gap-3">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-gold-gradient">
          {testimonial.photoSrc && <Image src={testimonial.photoSrc} alt="" fill sizes="44px" className="object-cover" />}
        </div>
        <div>
          <p className="text-[15px] font-bold">{testimonial.name}</p>
          <p className="text-sm text-muted">{testimonial.role}</p>
        </div>
      </figcaption>
    </Card>
  );
}