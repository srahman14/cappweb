/**
 * Handwritten caption with a squiggly arrow that points UP at the image above it,
 * e.g. "From our Tech panel". Decorative styling, but the text is real content,
 * so it stays readable by screen readers.
 */
import { cn } from "@/lib/cn";
import { caveat } from "@/lib/fonts";

export function ImageCaption({ children, className }: { children: string; className?: string }) {
  return (
    // Sits under the image's right-hand edge: the text comes first, and the arrow's tail starts
    // right at the end of the text, then swoops up so its head points at the image.
    <p className={cn("mt-1 flex items-end justify-start gap-1 pr-6", className)}>
      <span className={cn(caveat.className, "pb-1 text-2xl leading-none text-gold-ink")}>{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 70 60"
        className="h-14 w-[4.25rem] shrink-0 text-gold-deep"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* tail at bottom-left (next to the text): one smooth wave, then up to the head at top-right (at the image) */}
        <path d="M4 54 C12 54 16 40 26 40 C36 40 40 52 46 36 C52 20 54 18 60 8" />
        <path d="M49.6 13.9 L60 8 L59.9 20" />
      </svg>
    </p>
  );
}
