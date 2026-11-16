import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { SetPasswordForm } from "@/components/admin/SetPasswordForm";

export const metadata: Metadata = { title: "Set password" };

export default function SetPasswordPage() {
  // No server-side session check: the session arrives in the URL (fragment or
  // ?code=) and is established in the browser by SetPasswordForm. updateUser()
  // still needs a valid session, so nothing is exposed without one.
  return (
    <main className="relative grid min-h-dvh flex-1 place-items-center bg-panel-gradient px-4 py-12">
      <div className="relative w-full max-w-sm">
        <Card className="w-full p-8">
          <div className="mb-6"><Logo size={40} /></div>
          <SetPasswordForm />
        </Card>
      </div>
    </main>
  );
}
