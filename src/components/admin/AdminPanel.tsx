import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type AdminPanelProps = {
  title?: string;
  /** Small right-aligned text in the header, e.g. a progress count. */
  meta?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** Flat admin panel: rounded-xl, hairline border, no shadow. */
export function AdminPanel({ title, meta, footer, className, children }: AdminPanelProps) {
  return (
    <section className={cn("rounded-xl border border-line bg-white", className)}>
      {title && (
        <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <h2 className="text-sm font-semibold text-navy-ink">{title}</h2>
          {meta && <span className="text-xs font-medium tabular-nums text-muted">{meta}</span>}
        </header>
      )}
      {children}
      {footer && <footer className="border-t border-line px-4 py-3">{footer}</footer>}
    </section>
  );
}
