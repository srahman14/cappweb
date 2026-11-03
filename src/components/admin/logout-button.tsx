"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { createClient } from "@/lib/supabase/client";

type LogoutButtonProps = {
  /** "outlineOnDark" for the navy shell, "primary" on light cards. */
  variant?: "outlineOnDark" | "primary";
  label?: string;
  className?: string;
};

export default function LogoutButton({
  variant = "outlineOnDark",
  label = "Sign out",
  className,
}: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      setLoading(false);
      console.error("Logout failed:", error.message);
      return;
    }

    // Plain /admin/login also drops any ?error=forbidden.
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <Button
      type="button"
      variant={variant}
      size="sm"
      onClick={handleLogout}
      disabled={loading}
      className={cn("gap-2", variant === "outlineOnDark" && "focus-visible:outline-gold-light", className)}
    >
      <LogOut aria-hidden="true" className="size-4" />
      {loading ? "Signing out…" : label}
    </Button>
  );
}
