"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { inviteAdmin, revokeAdmin, TeamServiceError } from "@/lib/services/admin-team.service";

export type ActionState = { ok: boolean; error?: string; message?: string };

function fail(err: unknown): ActionState {
  if (err instanceof TeamServiceError) return { ok: false, error: err.message };
  console.error("[team actions] unexpected error:", err);
  return { ok: false, error: "Something went wrong. Please try again." };
}

export async function inviteAdminAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const email = String(formData.get("email") ?? "");
    const origin = (await headers()).get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;
    await inviteAdmin(email, origin ? `${origin}/admin/set-password` : undefined);
    revalidatePath("/admin/team");
    return { ok: true, message: `Invite sent to ${email.trim().toLowerCase()}.` };
  } catch (err) {
    return fail(err);
  }
}

export async function revokeAdminAction(formData: FormData): Promise<void> {
  try {
    await revokeAdmin(String(formData.get("userId") ?? ""));
  } catch (err) {
    console.error("[team actions] revoke failed:", err);
  }
  revalidatePath("/admin/team");
}
