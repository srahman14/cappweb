/**
 * One resource tile: category pill, title, description. The whole card is
 * clickable (the title link stretches over the card). http(s) links open in a new tab.
 *
 * Usage: <ResourceCard resource={resource} />
 */
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import type { Resource } from "@/types";

export function ResourceCard({ resource }: { resource: Resource }) {
  const external = /^https?:\/\//.test(resource.href);
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Card className="relative flex h-full flex-col gap-2.5 p-6 transition hover:-translate-y-0.5">
      <Pill className="self-start">{resource.category}</Pill>
      <h3 className="mt-1.5 text-2xl font-bold tracking-[-0.02em]">
        {/* after:absolute after:inset-0 makes the whole card the click target */}
        <Link href={resource.href} className="after:absolute after:inset-0" {...linkProps}>
          {resource.title}
        </Link>
      </h3>
      <p className="text-base leading-normal text-muted">{resource.description}</p>
      <span className="mt-auto pt-2 text-[15px] font-semibold text-indigo">Open →</span>
    </Card>
  );
}