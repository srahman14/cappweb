"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { TextField } from "./TextField";

const ERROR_ID = "set-password-error";
const MIN_LENGTH = 12;

export function SetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<"checking" | "ready" | "invalid">("checking");

  // Invite links return #access_token&refresh_token; reset links may return ?code=.
  useEffect(() => {
    async function establishSession() {
      const supabase = createClient();
      const hash = new URLSearchParams(window.location.hash.slice(1));
      const code = new URLSearchParams(window.location.search).get("code");
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");

      try {
        if (accessToken && refreshToken) {
          const { error: e } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (e) throw e;
        } else if (code) {
          const { error: e } = await supabase.auth.exchangeCodeForSession(code);
          if (e) throw e;
        }
        // Remove tokens from the address bar / history.
        window.history.replaceState(null, "", window.location.pathname);

        const { data } = await supabase.auth.getUser();
        setSession(data.user ? "ready" : "invalid");
      } catch {
        setSession("invalid");
      }
    }
    void establishSession();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < MIN_LENGTH) {
      setError(`Password must be at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await createClient().auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const invalid = Boolean(error);

  if (session === "checking") {
    return <p role="status" className="text-sm text-muted">Checking your link…</p>;
  }
  if (session === "invalid") {
    return (
      <>
        <h1 className="text-xl font-semibold text-navy-ink">Link expired</h1>
        <p className="mt-2 text-sm text-muted">
          This link is invalid or has already been used. Ask a super admin to invite you again, or{" "}
          <a href="/admin/forgot-password" className="text-indigo hover:underline">reset your password</a>.
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-xl font-semibold text-navy-ink">Set your password</h1>
      <p className="mt-1 text-sm text-muted">Choose a password of at least {MIN_LENGTH} characters.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <TextField id="password" label="New password" type="password" autoComplete="new-password" required
          value={password} onChange={(e) => setPassword(e.target.value)} invalid={invalid}
          aria-describedby={invalid ? ERROR_ID : undefined} />
        <TextField id="confirm" label="Confirm password" type="password" autoComplete="new-password" required
          value={confirm} onChange={(e) => setConfirm(e.target.value)} invalid={invalid}
          aria-describedby={invalid ? ERROR_ID : undefined} />

        <div role="alert" id={ERROR_ID}>
          {error && (
            <p className="flex gap-2 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
              <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {error}
            </p>
          )}
        </div>

        <Button type="submit" variant="primary" size="sm" disabled={loading} className="w-full gap-2">
          {loading && <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />}
          {loading ? "Saving…" : "Save password"}
        </Button>
      </form>
    </>
  );
}
