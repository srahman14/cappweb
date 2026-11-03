import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type AdminPanelProps = {
  title?: string;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** Flat admin panel: rounded-xl, hairline border, no shadow. */
export function AdminPanel({ title, footer, className, children }: AdminPanelProps) {
  return (
    <section className={cn("rounded-xl border border-line bg-white", className)}>
      {title && (
        <header className="border-b border-line px-4 py-3">
          <h2 className="text-sm font-semibold text-navy-ink">{title}</h2>
        </header>
      )}
      {children}
      {footer && <footer className="border-t border-line px-4 py-3">{footer}</footer>}
    </section>
  );
}
