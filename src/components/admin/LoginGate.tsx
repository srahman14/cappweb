import { redirect } from "next/navigation";
import { getCappAdminStatus } from "@/lib/auth/admin";
import { safeNextPath } from "@/lib/auth/safe-next";
import { AdminLoginForm } from "./AdminLoginForm";
import { ForbiddenNotice } from "./ForbiddenNotice";

type LoginSearchParams = { [key: string]: string | string[] | undefined };

/**
 * Chooses what the login card shows. The session is read ONLY for
 * ?error=forbidden, so the normal login form needs no session read.
 */
export async function LoginGate({ searchParams }: { searchParams: Promise<LoginSearchParams> }) {
  const { error, next } = await searchParams;
  const nextPath = safeNextPath(next);

  if (error === "forbidden") {
    let status: Awaited<ReturnType<typeof getCappAdminStatus>> | null = null;
    try {
      status = await getCappAdminStatus();
    } catch {
      // Permission check unavailable: fall back to the normal form.
    }

    if (status?.user && status.isAdmin) {
      redirect(nextPath);
    }

    if (status?.user) {
      return <ForbiddenNotice email={status.user.email ?? "this account"} />;
    }
    // Not signed in: the param alone never shows the message.
  }

  return <AdminLoginForm next={nextPath} />;
}
