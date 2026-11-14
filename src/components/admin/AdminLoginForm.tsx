"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { TextField } from "./TextField";

const ERROR_ID = "login-error";

export function AdminLoginForm({ next }: { next: string }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError("Invalid email or password.");
        return;
      }

      // `next` is validated on the server (safeNextPath).
      router.replace(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const invalid = Boolean(error);

  return (
    <>
      <h1 className="text-xl font-semibold text-navy-ink">CAPP Admin</h1>
      <p className="mt-1 text-sm text-muted">Sign in to manage the website.</p>

      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        <TextField
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          invalid={invalid}
          aria-describedby={invalid ? ERROR_ID : undefined}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          invalid={invalid}
          aria-describedby={invalid ? ERROR_ID : undefined}
        />

        {/* Persistent live region so the alert is announced reliably. */}
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
          {loading ? "Signing in…" : "Sign in"}
        </Button>

        <p className="text-center text-sm">
          <Link href="/admin/forgot-password" className="focus-ring rounded text-indigo hover:underline">
            Forgot password?
          </Link>
        </p>
      </form>
    </>
  );
}
