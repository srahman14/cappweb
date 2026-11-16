import { socials } from "@/data/footer";
import { SITE } from "@/lib/site";

/** Real profile URLs only: skips the "#" placeholders still in data/footer.ts. */
const sameAs = socials.map((s) => s.href).filter((href) => /^https?:\/\//.test(href));

/**
 * Organization structured data (schema.org JSON-LD) for the home page.
 * Server component. Uses only existing site data; `sameAs` is omitted until
 * the social links in data/footer.ts are real URLs. `<` is escaped so the
 * serialised JSON can never close the script tag.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    alternateName: SITE.fullName,
    url: SITE.url,
    logo: `${SITE.url}/brand/capp-logo.webp`,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
