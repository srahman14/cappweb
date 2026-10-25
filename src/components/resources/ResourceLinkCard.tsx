import Link from "next/link";
import type { ResourceIconName } from "@/types";
import { ResourceIcon } from "./ResourceIcon";

/**
 * A resource card where the whole card is a link: icon + title in a header row,
 * short description underneath.
 *
 * Props:
 * - title, description, href: the resource
 * - icon: which icon to show (defaults to "document")
 * - iconPosition: "left" (default) or "right" side of the header
 *
 * External links (http/https) open in a new tab with rel="noopener noreferrer".
 * Internal links use next/link.
 *
 * Usage:
 *   <ResourceLinkCard title="Interview practice" description="..." href="https://..." icon="chat" iconPosition="right" />
 */
interface ResourceLinkCardProps {
  title: string;
  description: string;
  href: string;
  icon?: ResourceIconName;
  iconPosition?: "left" | "right";
}

const cardClasses =
  "group flex h-full flex-col gap-3 border border-line bg-white p-5 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo";

export function ResourceLinkCard({
  title,
  description,
  href,
  icon = "document",
  iconPosition = "left",
}: ResourceLinkCardProps) {
  const external = /^https?:\/\//.test(href);

  const content = (
    <>
      <div className={`flex items-center gap-3 ${iconPosition === "right" ? "flex-row-reverse" : ""}`}>
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo/10 text-indigo"
        >
          <ResourceIcon name={icon} />
        </span>
        <h3 className="flex-1 text-base font-semibold leading-snug tracking-tight text-navy">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cardClasses}>
        {content}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={cardClasses}>
      {content}
    </Link>
  );
}