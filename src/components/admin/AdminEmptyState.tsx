import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type AdminEmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
};

export function AdminEmptyState({ icon: Icon, title, description, action }: AdminEmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-muted-soft bg-white px-6 py-12 text-center">
      <Icon aria-hidden="true" className="size-6 text-muted" />
      <h2 className="mt-3 text-sm font-semibold text-navy-ink">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
