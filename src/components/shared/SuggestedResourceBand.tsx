import { Button } from "@/components/ui/Button";

/**
 * "Got a resource to add?" band: says what we accept, what we don't, and that every
 * suggestion is verified, then links to the suggestion route.
 *
 * Props:
 * - href: where "Suggest a resource" goes (defaults to "/get-involved"; open decision in the spec)
 *
 * Usage: <SuggestResourceBand href="/get-involved" />
 */
interface SuggestResourceBandProps {
  href?: string;
}

const accepted = [
  "Relevant to careers, interview and CV preparation, or one of our four subjects",
  "Accurate, up to date and easy to access",
  "Free where possible, with any cost clearly stated",
];

const declined = [
  "Anything harmful, hateful or inciteful",
  "Anything that doesn't align with CAPP's values",
  "Misleading or inaccurate material",
];

export function SuggestResourceBand({ href = "/get-involved" }: SuggestResourceBandProps) {
  return (
    <div className="rounded-[28px] border border-line bg-gradient-to-br from-gold/10 via-white to-indigo/10 p-8 md:p-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
            Got a resource to add?
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            If something helped you, it might help others. Send it our way and we&rsquo;ll consider it for the
            library. Every suggestion is verified by the CAPP team before it goes live.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-navy">What we&rsquo;re looking for</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted">
                {accepted.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-navy">What we won&rsquo;t add</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted">
                {declined.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Button href={href}>Suggest a resource</Button>
      </div>
    </div>
  );
}