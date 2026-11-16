import "server-only";

import { getSuperAdminUser } from "@/lib/auth/admin";
import { createServiceClient } from "@/lib/supabase/admin";

export class TeamServiceError extends Error {}

export type TeamMember = {
  userId: string;
  email: string;
  isSuperAdmin: boolean;
  createdAt: string;
  confirmed: boolean;
};

async function requireSuper() {
  const user = await getSuperAdminUser();
  if (!user) throw new TeamServiceError("Only super admins can manage admins.");
  return user;
}

export async function listAdmins(): Promise<TeamMember[]> {
  await requireSuper();
  const db = createServiceClient();

  const { data: rows, error } = await db
    .from("capp_admins")
    .select("user_id, is_super_admin, created_at")
    .order("created_at");
  if (error) throw new TeamServiceError("Could not load admins.");

  return Promise.all(
    (rows ?? []).map(async (row) => {
      const { data } = await db.auth.admin.getUserById(row.user_id);
      return {
        userId: row.user_id,
        email: data.user?.email ?? "(unknown)",
        isSuperAdmin: row.is_super_admin,
        createdAt: row.created_at,
        confirmed: Boolean(data.user?.email_confirmed_at ?? data.user?.last_sign_in_at),
      };
    }),
  );
}

export async function inviteAdmin(email: string, redirectTo?: string) {
  await requireSuper();
  const clean = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    throw new TeamServiceError("Enter a valid email address.");
  }

  const db = createServiceClient();
  const { data, error } = await db.auth.admin.inviteUserByEmail(clean, { redirectTo });
  if (error || !data.user) {
    console.error("[team] invite failed:", error?.status, error?.code, error?.message);
    const msg = error?.message.toLowerCase() ?? "";
    throw new TeamServiceError(
      error?.status === 429 || msg.includes("rate limit")
        ? "Email rate limit reached. Supabase's default mailer allows only a few emails an hour; wait, or set up custom SMTP."
        : msg.includes("already")
          ? "That email already has an account."
          : `Could not send the invite: ${error?.message ?? "unknown error"}`,
    );
  }

  const { error: insertError } = await db
    .from("capp_admins")
    .insert({ user_id: data.user.id, is_super_admin: false });
  if (insertError) {
    // Avoid an orphaned account that can sign in but isn't an admin.
    await db.auth.admin.deleteUser(data.user.id);
    throw new TeamServiceError("Could not add the admin. Please try again.");
  }
}

export async function revokeAdmin(userId: string) {
  const me = await requireSuper();
  if (userId === me.id) throw new TeamServiceError("You can't remove yourself.");

  const db = createServiceClient();
  const { data: target } = await db
    .from("capp_admins")
    .select("is_super_admin")
    .eq("user_id", userId)
    .maybeSingle();
  if (!target) throw new TeamServiceError("Admin not found.");
  if (target.is_super_admin) throw new TeamServiceError("Super admins can't be removed here.");

  const { error } = await db.from("capp_admins").delete().eq("user_id", userId);
  if (error) throw new TeamServiceError("Could not remove the admin.");
  await db.auth.admin.deleteUser(userId);
}
