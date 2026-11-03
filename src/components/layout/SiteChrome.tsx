/**
 * Marketing site chrome: Navbar, the single <main>, Footer, and the
 * max-w-7xl page width. Used by app/(marketing)/layout.tsx and by the root
 * app/not-found.tsx (which renders under the root layout only, so it has to
 * add the chrome itself). Admin routes do not use this.
 */
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import type { SocialLink } from "@/types";

const socials: SocialLink[] = [
  { platform: "tiktok", href: "#" },
  { platform: "instagram", href: "#" },
  { platform: "linkedin", href: "#" },
];

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
      <Navbar />
      {/* SiteChrome owns the single <main>; pages return their sections only. */}
      <main className="flex-1">{children}</main>
      <Footer socials={socials} />
    </div>
  );
}
