import type { MetadataRoute } from "next";
import { PAGE_SEO, type PublicPath } from "@/data/seo";
import { SITE } from "@/lib/site";

/** Lists every public route (see PAGE_SEO). Admin, API and 404 are never included. */
export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(PAGE_SEO) as PublicPath[]).map((path) => ({
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    lastModified: PAGE_SEO[path].lastModified,
  }));
}
