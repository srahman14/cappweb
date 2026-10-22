/**
 * Standard section heading: small uppercase eyebrow, big title,
 * and an optional "view all" link on the right.
 *
 * Usage:
 *   <SectionHeader eyebrow="EVENTS" title="Upcoming"
 *                  linkLabel="Past events and recaps →" linkHref="/events" />
 */
import Link from "next/link";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  linkLabel?: string;
  linkHref?: string;
}

export function SectionHeader({ eyebrow, title, linkLabel, linkHref }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
      <div>
        {eyebrow && <p className="mb-2.5 text-[13px] font-bold uppercase tracking-[0.12em] text-muted-soft">{eyebrow}</p>}
        <h2 className="text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[40px]">{title}</h2>
      </div>
      {linkLabel && linkHref && (
        <Link href={linkHref} className="shrink-0 text-base font-semibold text-indigo hover:underline">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
