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

type StatGroupItem = { label: string; value: number; href?: string; attention?: boolean };

/** One area's numbers (e.g. Media) as a compact column inside a shared stats card. */
export function StatGroup({
  title,
  items,
  status,
}: {
  title: string;
  items: StatGroupItem[];
  /** Short note beside the title, e.g. "All filled". */
  status?: ReactNode;
}) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</h2>
        {status && <div className="text-xs">{status}</div>}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {items.map((item) => {
          const value = (
            <p
              className={cn(
                "text-2xl font-semibold tabular-nums",
                item.attention ? "text-gold-ink" : "text-navy-ink",
              )}
            >
              {item.value}
            </p>
          );
          const label = <p className="text-xs text-muted">{item.label}</p>;
          return item.href ? (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "focus-ring -m-1 rounded-lg p-1 transition-colors hover:bg-surface",
                item.attention && "bg-gold/10",
              )}
            >
              {label}
              {value}
            </Link>
          ) : (
            <div key={item.label}>
              {label}
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
