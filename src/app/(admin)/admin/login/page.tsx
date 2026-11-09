import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { LoginGate } from "@/components/admin/LoginGate";
import { LoginCardSkeleton } from "@/components/admin/Skeletons";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage({ searchParams }: PageProps<"/admin/login">) {
  return (
    <main className="relative grid min-h-dvh flex-1 place-items-center bg-panel-gradient px-4 py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-glow-indigo" />

      <div className="relative flex w-full max-w-sm flex-col items-center">
        <Card className="w-full p-8">
          <div className="mb-6">
            <Logo size={40} />
          </div>
          <Suspense fallback={<LoginCardSkeleton />}>
            <LoginGate searchParams={searchParams} />
          </Suspense>
        </Card>

        <Link
          href="/"
          className="focus-ring-on-dark mt-6 rounded text-sm text-on-dark hover:text-white"
        >
          ← Back to CAPP website
        </Link>
      </div>
    </main>
  );
}
