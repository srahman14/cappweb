/**
 * Signed-in admin shell. Static: it is NOT the access check (layouts don't
 * re-run on client navigation). Every page calls requireAdmin() itself.
 */
import { AdminShell } from "@/components/admin/AdminShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
