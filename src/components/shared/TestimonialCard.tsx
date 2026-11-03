import { Card } from "@/components/ui/Card";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-[300px] shrink-0 rounded-[24px] p-1.5 md:w-[380px]">
      <div className="rounded-[20px] bg-[url('/brand/capp-repeated.webp')] bg-[length:160px] p-4">
        <Card className="flex min-h-[260px] h-full flex-col justify-between gap-6 rounded-[14px] p-6">
          <blockquote className="text-[17px] leading-relaxed">“{testimonial.quote}”</blockquote>
          <p className="text-[15px] font-bold">From the {testimonial.program}</p>
        </Card>
      </div>
    </div>
  );
}