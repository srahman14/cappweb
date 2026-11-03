import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

/** The page's single h1. Static, so it renders outside the page's Suspense. */
export function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-navy-ink">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
    </header>
  );
}
