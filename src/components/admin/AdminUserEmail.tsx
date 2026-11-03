import { getCappAdminStatus } from "@/lib/auth/admin";

/** Signed-in email for the sidebar. Display only — not an access check. */
export async function AdminUserEmail() {
  let email: string | undefined;
  try {
    const { user } = await getCappAdminStatus();
    email = user?.email ?? undefined;
  } catch {
    // The shell sits above (dashboard)/error.tsx, so never throw from here.
    // The page's own requireAdmin() surfaces the failure.
    return null;
  }

  if (!email) return null;

  return (
    <p className="flex h-4 items-center text-xs text-on-dark">
      <span className="sr-only">Signed in as </span>
      <span className="truncate" title={email}>
        {email}
      </span>
    </p>
  );
}
