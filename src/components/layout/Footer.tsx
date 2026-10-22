/**
 * Site footer: logo, copyright and social icons.
 *
 * Usage: <Footer socials={[{ platform: "instagram", href: "https://..." }]} />
 */
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { SITE } from "@/lib/site";
import type { SocialLink } from "@/types";

export function Footer({ socials }: { socials: SocialLink[] }) {
  return (
    <footer className="mt-12 border-t border-line">
      <Container className="flex flex-col items-center justify-between gap-5 py-8 text-sm text-muted-soft md:flex-row">
        <div className="flex items-center gap-3.5">
          <Logo size={36} />
          <span>© 2026 {SITE.name} · {SITE.fullName}</span>
        </div>
        <SocialIcons links={socials} />
      </Container>
    </footer>
  );
}
