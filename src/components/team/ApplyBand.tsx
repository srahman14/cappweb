import { Button, Pill, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";
import type { ApplicationInfo } from "@/data/team";

/**
 * ApplyBand: "Interested in joining CAPP?" band with application status
 * (open/closed), response time and one button.
 * Open → "Apply now" goes to `applyHref`. Closed → button goes to the WhatsApp community.
 * Props: `info` (ApplicationInfo from data/team.ts).
 * Usage: <ApplyBand info={application} />
 */
export function ApplyBand({ info }: { info: ApplicationInfo }) {
  const open = info.status === "open";

  return (
    <Section>
      <div className="rounded-[28px] border border-line bg-linear-to-br from-gold/10 via-white to-indigo/10 p-8 md:p-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Pill tone="none">
              <span
                aria-hidden="true"
                className={cn(
                  "mr-2 inline-block size-2 rounded-full",
                  open ? "bg-green-500" : "bg-muted-soft",
                )}
              />
              Applications {open ? "open" : "closed"}
            </Pill>
            <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.03em] text-navy md:text-4xl">
              Interested in joining CAPP?
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              {open ? info.openText : info.closedText}
            </p>
            <p className="mt-4 text-sm text-muted">
              Response time:{" "}
              <span className="font-semibold text-navy">
                {info.responseTime}
              </span>
            </p>
          </div>
          <div className="shrink-0">
            {open ? (
              <Button href={info.applyHref}>Apply now</Button>
            ) : (
              <Button href={SITE.whatsappUrl} variant="gold">
                Join on WhatsApp
              </Button>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
