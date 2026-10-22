/**
 * Top navigation: logo, links, and the WhatsApp join button.
 * On small screens the links collapse into a native <details> menu
 * (no JavaScript needed, so this stays a server component).
 *
 * Usage: <Navbar links={[{ label: "Events", href: "/events" }]} />
 */
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import type { NavLink } from "@/types";

export function Navbar({ links }: { links: NavLink[] }) {
  return (
    <header className="border-b border-line bg-surface/90 backdrop-blur">
      <Container className="flex items-center justify-between py-5">
        <Logo />

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden gap-9 text-[15px] font-medium text-muted md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-navy-ink">{l.label}</Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton label="Join on WhatsApp" size="sm" />
        </div>

        {/* Mobile menu */}
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-line px-4 py-2 text-sm font-semibold">Menu</summary>
          <div className="absolute right-0 z-10 mt-2 flex w-56 flex-col gap-3 rounded-card border border-line bg-white p-4 shadow-card">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="font-medium">{l.label}</Link>
            ))}
            <WhatsAppButton label="Join on WhatsApp" size="sm" />
          </div>
        </details>
      </Container>
    </header>
  );
}
