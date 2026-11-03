/**
 * Static admin chrome: skip link, navy sidebar (lg+), sticky mobile header
 * (<lg) and the single <main>. The only session-dependent part is the
 * sidebar email line, streamed in its own Suspense boundary.
 */
import type { ReactNode } from "react";
import { AdminMobileHeader } from "./AdminMobileHeader";
import { AdminSidebar } from "./AdminSidebar";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex-1 bg-surface lg:grid lg:grid-cols-[15rem_1fr]">
      <a
        href="#admin-main"
        className="sr-only focus-ring focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-ink"
      >
        Skip to content
      </a>
      <AdminSidebar />
      <div className="min-w-0">
        <AdminMobileHeader />
        <main id="admin-main" tabIndex={-1} className="min-w-0 px-4 py-6 outline-none sm:px-6 lg:px-10 lg:py-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
