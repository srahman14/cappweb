/**
 * PullQuote: a short motto in an italic blockquote, centred, with a thin gold rule.
 * Props: `quote` (string), `cite` (optional attribution).
 * Usage: <PullQuote quote="..." cite="CAPP" />
 */
export function PullQuote({ quote, cite }: { quote: string; cite?: string }) {
  return (
    <figure className="mx-auto max-w-3xl text-center">
      <div
        aria-hidden="true"
        className="mx-auto mb-8 h-0.5 w-12 rounded-full bg-gold-gradient"
      />
      <blockquote>
        <p className="text-2xl font-semibold italic leading-snug tracking-[-0.02em] text-navy-ink md:text-4xl">
          “{quote}”
        </p>
      </blockquote>
      {cite && (
        <figcaption className="mt-5 text-sm text-muted-soft">{cite}</figcaption>
      )}
    </figure>
  );
}
