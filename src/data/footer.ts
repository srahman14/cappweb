import type { FooterColumn, SocialLink } from "@/types";

/**
 * Footer link columns. Add a column or link here; the Footer renders whatever is
 * listed. (A "Connect" column is added automatically from `socials` below.)
 */
export const footerColumns: FooterColumn[] = [
  {
    title: "CAPP",
    links: [
      { label: "About", href: "/about" },
      { label: "Meet the team", href: "/team" },
      { label: "Events", href: "/events" },
      { label: "Resources", href: "/resources" },
      { label: "Get involved", href: "/get-involved" },
    ],
  },
  {
    title: "Subjects",
    links: [
      { label: "Tech", href: "/tech" },
      { label: "Business & Finance", href: "/business-finance" },
      { label: "Engineering", href: "/engineering" },
      { label: "Law", href: "/law" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms and conditions", href: "/terms" },
    ],
  },
];

/** Replace the "#" placeholders with the real profile URLs. */
export const socials: SocialLink[] = [
  { platform: "tiktok", href: "#" },
  { platform: "instagram", href: "#" },
  { platform: "linkedin", href: "#" },
];