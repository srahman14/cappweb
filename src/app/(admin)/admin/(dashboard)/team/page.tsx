import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { InviteAdminForm } from "@/components/admin/InviteAdminForm";
import { Button } from "@/components/ui/Button";
import { getSuperAdminUser, requireAdmin } from "@/lib/auth/admin";
import { listAdmins } from "@/lib/services/admin-team.service";
import { revokeAdminAction } from "./actions";

export const metadata: Metadata = { title: "Admins" };

export default function AdminTeamPage() {
  return (
    <>
      <AdminPageHeader title="Admins" description="Invite people to the admin area. They set their own password from the emailed link." />
      <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
        <TeamContent />
      </Suspense>
    </>
  );
}

async function TeamContent() {
  await connection();
  await requireAdmin();

  if (!(await getSuperAdminUser())) {
    return <p className="text-sm text-muted">Only super admins can manage admins.</p>;
  }

  const admins = await listAdmins();

  return (
    <div className="space-y-6">
      <AdminPanel title="Invite an admin">
        <InviteAdminForm />
      </AdminPanel>

      <AdminPanel title={`Admins (${admins.length})`}>
        <ul className="divide-y divide-line">
          {admins.map((a) => (
            <li key={a.userId} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-navy-ink">{a.email}</p>
                <p className="text-xs text-muted">
                  {a.isSuperAdmin ? "Super admin" : "Admin"}
                  {!a.confirmed && " · invite pending"}
                </p>
              </div>
              {!a.isSuperAdmin && (
                <form action={revokeAdminAction}>
                  <input type="hidden" name="userId" value={a.userId} />
                  <Button type="submit" variant="secondary" size="sm">Remove</Button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </AdminPanel>
    </div>
  );
}
