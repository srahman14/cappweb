import { Suspense } from "react";
import { Logo } from "@/components/ui/Logo";
import LogoutButton from "@/components/admin/logout-button";
import { AdminNav } from "./AdminNav";
import { AdminUserEmail } from "./AdminUserEmail";
import { UserEmailSkeleton } from "./Skeletons";

export function AdminSidebar() {
  return (
    <aside
      aria-label="Admin"
      className="sticky top-0 hidden h-dvh flex-col bg-navy px-3 py-5 text-white lg:flex"
    >
      <div className="flex items-center gap-3 px-3">
        <Logo size={32} />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">CAPP</span>
          <span className="text-xs text-on-dark">Admin</span>
        </div>
      </div>

      <div className="mt-8 flex-1">
        <AdminNav orientation="vertical" />
      </div>

      <div className="space-y-3 border-t border-white/10 px-3 pt-4">
        <Suspense fallback={<UserEmailSkeleton />}>
          <AdminUserEmail />
        </Suspense>
        <LogoutButton className="w-full" />
      </div>
    </aside>
  );
}
