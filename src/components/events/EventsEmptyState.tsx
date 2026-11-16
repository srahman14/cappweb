/**
 * Shown where a page has no events to list.
 *
 * Usage: <EventsEmptyState title="No events yet" description="..." />
 */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface EventsEmptyStateProps {
  title: string;
  /** Match the page's outline. Defaults to h3, for use under a section heading. */
  headingLevel?: "h2" | "h3";
  description: string;
  linkLabel?: string;
  linkHref?: string;
}

export function EventsEmptyState({
  title,
  headingLevel: Heading = "h3",
  description,
  linkLabel,
  linkHref,
}: EventsEmptyStateProps) {
  return (
    <div className="rounded-card border border-line bg-white px-6 py-12 text-center">
      <Heading className="text-xl font-bold tracking-[-0.02em]">{title}</Heading>
      <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-muted">{description}</p>
      {linkLabel && linkHref && (
        <Link
          href={linkHref}
          className="mt-4 inline-flex items-center gap-1 text-[15px] font-semibold text-indigo hover:underline"
        >
          {linkLabel}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
