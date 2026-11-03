import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Returns the signed-in user and whether they are a CAPP admin.
 *
 * Wrapped in React `cache()` so the shell's email line and the page's
 * `requireAdmin()` share one `getUser()` + RPC per render pass. In route
 * handlers there is no render pass, so it simply runs each time.
 */
export const getCappAdminStatus = cache(async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      user: null,
      isAdmin: false,
    };
  }

  // Then check administrator membership in the database.
  const { data: isAdmin, error: adminError } =
    await supabase.rpc("is_capp_admin");

  // Fail closed if the permission check cannot be completed.
  if (adminError) {
    throw new Error("Unable to verify administrator permissions.");
  }

  return {
    user,
    isAdmin: isAdmin === true,
  };
});

/**
 * The access check for admin pages. Call it at the top of every
 * `(dashboard)` page's request-time content. Layouts are NOT a security
 * boundary (they don't re-run on client navigation), and the proxy redirect
 * is only a convenience. API routes check `getCappAdminStatus()` themselves.
 */
export async function requireAdmin() {
  const { user, isAdmin } = await getCappAdminStatus();

  if (!user) {
    redirect("/admin/login");
  }

  if (!isAdmin) {
    redirect("/admin/login?error=forbidden");
  }

  return user;
}
