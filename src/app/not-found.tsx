/**
 * 404 page.
 *
 * Next.js renders this automatically for any unknown route.
 * Minimal on purpose: no panel or background, just centred text sitting on
 * the page surface. Sections only, tokens only, no `<main>`.
 */
import type { Metadata } from "next";
import { Button, HandDrawnUnderline, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  description: "We could not find that page.",
};

export default function NotFound() {
  return (
    <Section>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        {/* Giant decorative 404 (the h1 below carries the meaning) */}
        <p
          aria-hidden="true"
          className="bg-navy  bg-clip-text text-[7rem] leading-none font-extrabold tracking-[-0.1em] text-transparent sm:text-[10rem] md:text-[13rem]"
        >
          404
        </p>

        <h1 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-[-0.03em] text-navy-ink md:text-5xl">
          This page took a different{" "}
          <HandDrawnUnderline rotate={-2}>path</HandDrawnUnderline>
        </h1>

        <p className="mt-5 max-w-xl text-base text-muted md:text-lg">
          The link may be old, or the page may have moved. Here is a quick way
          back on track.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="primary">
            Back to home
          </Button>
          <Button href="/resources" variant="secondary">
            Browse resources
          </Button>
        </div>
      </div>
    </Section>
  );
}
