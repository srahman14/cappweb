/**
 * Admin area root (login + dashboard). Metadata only — it must never read
 * the session, because it also wraps /admin/login.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "CAPP Admin",
    template: "%s · CAPP Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
