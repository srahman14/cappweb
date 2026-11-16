import { Suspense } from "react";

import LogoutButton from "@/components/admin/logout-button";
import { Logo } from "@/components/ui/Logo";
import { AdminMobileMenu } from "./AdminMobileMenu";
import { AdminUserEmail } from "./AdminUserEmail";
import { UserEmailSkeleton } from "./Skeletons";

/** Slim top bar for screens without the sidebar (<lg). The menu opens full screen. */
export function AdminMobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between bg-navy px-4 text-white lg:hidden">
      <div className="flex items-center gap-2">
        <Logo size={28} />
        <span className="text-sm font-semibold">
          CAPP <span className="font-normal text-on-dark">Admin</span>
        </span>
      </div>
      <AdminMobileMenu
        footer={
          <>
            <Suspense fallback={<UserEmailSkeleton />}>
              <AdminUserEmail />
            </Suspense>
            <LogoutButton className="h-11 w-full" />
          </>
        }
      />
    </header>
  );
}
