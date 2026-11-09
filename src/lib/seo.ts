import type { Metadata } from "next";
import ogImage from "@/app/opengraph-image.png";
import { PAGE_SEO, type PublicPath } from "@/data/seo";
import { SITE } from "@/lib/site";

/**
 * Builds the metadata for a public page: unique description from PAGE_SEO,
 * canonical set to the page's own path, and Open Graph fields that match the
 * page (a page-level `openGraph` replaces the root one, so url/title/
 * description must be repeated). A page-level `openGraph` also drops the
 * file-based image Next injects at the layout, so the same
 * app/opengraph-image.png is re-referenced here (dimensions read from the file).
 *
 * @param path - Route path, a key of PAGE_SEO (e.g. "/about").
 * @param title - Page title. Omit for the home page (uses the root default).
 */
export function pageMetadata(path: PublicPath, title?: string): Metadata {
  const { description } = PAGE_SEO[path];
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} | ${SITE.fullName}`;
  const images = [
    { url: "/opengraph-image.png", width: ogImage.width, height: ogImage.height, alt: `${SITE.name}: ${SITE.fullName}` },
  ];
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE.name,
      locale: "en_GB",
      type: "website",
      images,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  };
}
