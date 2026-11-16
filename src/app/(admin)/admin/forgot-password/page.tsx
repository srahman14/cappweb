import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { ForgotPasswordForm } from "@/components/admin/ForgotPasswordForm";

export const metadata: Metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return (
    <main className="relative grid min-h-dvh flex-1 place-items-center bg-panel-gradient px-4 py-12">
      <div className="relative flex w-full max-w-sm flex-col items-center">
        <Card className="w-full p-8">
          <div className="mb-6"><Logo size={40} /></div>
          <ForgotPasswordForm />
        </Card>
        <Link href="/admin/login" className="focus-ring-on-dark mt-6 rounded text-sm text-on-dark hover:text-white">
          ← Back to sign in
        </Link>
      </div>
    </main>
  );
}
