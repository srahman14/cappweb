import { Logo } from "@/components/ui/Logo";
import LogoutButton from "@/components/admin/logout-button";
import { AdminNav } from "./AdminNav";

export function AdminMobileHeader() {
  return (
    <header className="sticky top-0 z-30 bg-navy text-white lg:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span className="text-sm font-semibold">
            CAPP <span className="font-normal text-on-dark">Admin</span>
          </span>
        </div>
        <LogoutButton />
      </div>
      <AdminNav orientation="horizontal" />
    </header>
  );
}
