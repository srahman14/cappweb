import type { FooterColumn, SocialLink } from "@/types";

export const footerColumns: FooterColumn[] = [
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
    title: "Explore",
    links: [
      { label: "Events", href: "/events" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Meet the team", href: "/team" },
      { label: "Get involved", href: "/get-involved" },
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
  { platform: "tiktok", href: "https://www.tiktok.com/@capp.tok?_r=1&_t=zn-99g0f3eupw6" },
  { platform: "instagram", href: "https://www.instagram.com/cappgram?igsh=MWVqM3NwcWE1bmlmYQ%3D%3D&utm_source=qr" },
  { platform: "linkedin", href: "https://www.linkedin.com/company/careers-and-people-progression/" },
];