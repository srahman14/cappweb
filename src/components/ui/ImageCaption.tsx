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
        {/* tail at bottom-left (next to the text), head at top-right (at the image) */}
        <path d="M3 52 C14 64 20 0 14 45 C8 32 22 60 28 34 C34 42 60 26 50 14 C52 10 55 7 58 4" />
        <path d="M47 5 L58 4 L59 16" />
      </svg>
    </p>
  );
}
