/**
 * Site footer.
 *
 * Top: logo, one-line description and the WhatsApp join button, then the link
 * columns from src/data/footer.ts (Subjects, Explore, Company, Legal).
 * Bottom: copyright and social icons.
 *
 * Mobile: brand block first, then the columns in a 2-column grid.
 * Desktop: brand block on the left, the four columns on the right.
 *
 * Usage: <Footer socials={socials} />
 */
import Link from "next/link";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { footerColumns } from "@/data/footer";
import { SITE } from "@/lib/site";
import type { SocialLink } from "@/types";

export function Footer({ socials }: { socials: SocialLink[] }) {
  return (
    <footer className="mt-12 border-t border-line">
      <Container className="grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)] lg:gap-16">
        <div className="flex flex-col items-start gap-5">
          <Logo size={44} />
          <p className="max-w-xs text-[15px] leading-relaxed text-muted">
            {SITE.fullName}. A careers community connecting students with people working in Tech, Business &amp; Finance,
            Engineering and Law.
          </p>
          <WhatsAppButton size="sm" label="Join on WhatsApp" />
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-muted-soft">{col.title}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] font-semibold text-navy-ink hover:text-indigo hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
                    >
                      {link.label}
                    </Link>
                    {link.badge && (
                      <span className="ml-2 rounded-full bg-gold/15 px-2 py-0.5 text-xs font-bold text-gold-ink">{link.badge}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col items-start justify-between gap-4 py-6 text-sm text-muted-soft sm:flex-row sm:items-center">
          <span>
            {/* Hard-coded year: `new Date()` isn't allowed in prerendered components with cacheComponents on. */}
            © 2026 {SITE.name} · {SITE.fullName}
          </span>
          <SocialIcons links={socials} />
        </Container>
      </div>
    </footer>
  );
}
