"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { TextField } from "./TextField";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      await createClient().auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/set-password`,
      });
    } catch {
      // Deliberately ignored: the response must not reveal whether the account exists.
    } finally {
      setLoading(false);
      setSent(true);
    }
  }

  return (
    <>
      <h1 className="text-xl font-semibold text-navy-ink">Reset password</h1>
      {sent ? (
        <p role="status" className="mt-3 text-sm text-muted">
          If an admin account exists for that address, a reset link is on its way.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <TextField id="email" label="Email address" type="email" autoComplete="email" required
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit" variant="primary" size="sm" disabled={loading} className="w-full gap-2">
            {loading && <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />}
            {loading ? "Sending…" : "Send reset link"}
          </Button>
        </form>
      )}
    </>
  );
}
