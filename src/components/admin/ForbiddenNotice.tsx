import { ShieldAlert } from "lucide-react";
import LogoutButton from "@/components/admin/logout-button";

/** Shown on /admin/login?error=forbidden to a signed-in non-admin. */
export function ForbiddenNotice({ email }: { email: string }) {
  return (
    <div>
      <div className="grid size-10 place-items-center rounded-full bg-gold/15">
        <ShieldAlert aria-hidden="true" className="size-5 text-gold-ink" />
      </div>
      <h1 className="mt-4 text-xl font-semibold text-navy-ink">No admin access</h1>
      <p className="mt-2 text-sm text-muted">
        You&apos;re signed in as <strong className="break-all font-semibold text-navy-ink">{email}</strong>, but this
        account isn&apos;t a CAPP administrator. Sign out to use a different account, or ask an existing admin to
        give you access.
      </p>
      <LogoutButton variant="primary" label="Sign out and switch account" className="mt-6 w-full" />
    </div>
  );
}
