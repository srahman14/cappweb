import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StatTileProps = {
  label: string;
  value: number;
  caption?: ReactNode;
  tone?: "default" | "attention";
  href?: string;
};

export function StatTile({ label, value, caption, tone = "default", href }: StatTileProps) {
  const attention = tone === "attention";
  const className = cn(
    "block rounded-xl border p-4",
    attention ? "border-gold/60 bg-gold/10" : "border-line bg-white",
    href && "focus-ring transition-colors hover:border-gold",
  );

  const content = (
    <>
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className={cn("mt-1 text-2xl font-semibold tabular-nums", attention ? "text-gold-ink" : "text-navy-ink")}>
        {value}
      </p>
      {caption && <div className="mt-1 text-xs">{caption}</div>}
    </>
  );

  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
