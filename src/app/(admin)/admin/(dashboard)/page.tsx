import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { requireAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = {
  title: "Overview",
};

export default function AdminOverviewPage() {
  return (
    <>
      <AdminPageHeader title="Overview" description="The state of the website's managed content." />
      <Suspense fallback={null}>
        <OverviewContent />
      </Suspense>
    </>
  );
}

async function OverviewContent() {
  await requireAdmin();
  // Filled in by the next commit (summariseMedia + tiles).
  return null;
}
