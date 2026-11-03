"use client";

import { startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AdminPanel } from "@/components/admin/AdminPanel";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AdminPanel>
      {/* Never render error.message: it could leak server internals. */}
      <div role="alert" className="flex flex-col items-start gap-3 p-6">
        <div className="flex items-center gap-2">
          <AlertCircle aria-hidden="true" className="size-5 text-danger" />
          <h2 className="text-base font-semibold text-navy-ink">Couldn&apos;t load this page</h2>
        </div>
        <p className="text-sm text-muted">
          Something went wrong while loading data from the server. Your images are safe; nothing was changed.
        </p>
        {error.digest && <p className="font-mono text-xs text-muted">Ref: {error.digest}</p>}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              startTransition(() => {
                router.refresh();
                reset();
              })
            }
          >
            Try again
          </Button>
          {pathname !== "/admin" && (
            <Button variant="secondary" size="sm" href="/admin">
              Go to overview
            </Button>
          )}
        </div>
      </div>
    </AdminPanel>
  );
}
