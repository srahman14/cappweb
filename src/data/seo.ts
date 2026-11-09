/**
 * Per-page SEO copy, keyed by route path. One unique description (~150 chars)
 * per public page, written from content that already exists on that page.
 * `lastModified` feeds app/sitemap.ts; bump it when a page's content changes.
 */
export interface PageSeo {
  description: string;
  /** ISO date (YYYY-MM-DD) the page content last meaningfully changed. */
  lastModified: string;
}

export const PAGE_SEO = {
  "/": {
    description:
      "CAPP is a careers community running events, industry panels and resources for Tech, Business & Finance, Engineering and Law.",
    lastModified: "2026-11-09",
  },
  "/about": {
    description:
      "CAPP is a careers community that runs events and panels with industry professionals across Tech, Business & Finance, Engineering and Law.",
    lastModified: "2026-11-09",
  },
  "/events": {
    description:
      "Discover upcoming CAPP events and industry panels, and look back at past events and recaps from the careers community.",
    lastModified: "2026-11-09",
  },
  "/resources": {
    description:
      "The CAPP resource library: CV and interview guides, plus curated resources for Tech, Business & Finance, Engineering and Law.",
    lastModified: "2026-11-09",
  },
  "/tech": {
    description:
      "Software, data and AI careers. Practice resources, hackathons and panels with engineers, all curated by CAPP's Tech ambassadors.",
    lastModified: "2026-11-09",
  },
  "/business-finance": {
    description:
      "Explore business and finance careers with CAPP: industry opportunities, events and connections with professionals across the sector.",
    lastModified: "2026-11-09",
  },
  "/engineering": {
    description:
      "Explore engineering careers with CAPP: industry opportunities and connections with people working across engineering disciplines.",
    lastModified: "2026-11-09",
  },
  "/law": {
    description:
      "Legal systems, rights and justice. Case studies, workshops and panels with legal professionals, curated by CAPP's Law ambassadors.",
    lastModified: "2026-11-09",
  },
  "/team": {
    description:
      "Meet the directors, committee and ambassadors who run CAPP, the careers community for Tech, Business & Finance, Engineering and Law.",
    lastModified: "2026-11-09",
  },
  "/get-involved": {
    description:
      "Volunteer, help run a panel or become a CAPP ambassador. Find out how to support and contribute to the careers community.",
    lastModified: "2026-11-09",
  },
  "/privacy": {
    description:
      "How CAPP collects and uses the personal information of people who apply to be an ambassador or join the committee.",
    lastModified: "2026-11-09",
  },
  "/terms": {
    description:
      "The terms for using the CAPP website and community, the careers community for Tech, Business & Finance, Engineering and Law.",
    lastModified: "2026-11-09",
  },
} as const satisfies Record<string, PageSeo>;

export type PublicPath = keyof typeof PAGE_SEO;
