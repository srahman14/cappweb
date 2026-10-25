/**
 * Row of round social icon buttons (TikTok, Instagram, LinkedIn).
 * Driven by an array, so adding a platform means adding one entry to ICONS below.
 *
 * Usage:
 *   <SocialIcons links={[{ platform: "instagram", href: "https://..." }]} />
 */
import type { ReactNode } from "react";
import type { SocialLink } from "@/types";

/** Shared SVG attributes so every icon is sized the same. */
const svgBase = { width: 18, height: 18, viewBox: "0 0 24 24", "aria-hidden": true } as const;

/** Display names for each platform (also used by the footer's "Connect" column). */
export const SOCIAL_LABELS: Record<SocialLink["platform"], string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  linkedin: "LinkedIn",
};

const ICONS: Record<SocialLink["platform"], { label: string; icon: ReactNode }> = {
  tiktok: {
    label: "TikTok",
    icon: (
      <svg {...svgBase} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 3c.3 2.6 2 4.4 5 4.6" />
      </svg>
    ),
  },
  instagram: {
    label: "Instagram",
    icon: (
      <svg {...svgBase} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  linkedin: {
    label: "LinkedIn",
    icon: (
      <svg {...svgBase} fill="currentColor">
        <rect x="3" y="9" width="4" height="12" /><circle cx="5" cy="5" r="2.2" />
        <path d="M10 9h3.8v1.8c.6-1.1 1.9-2.1 3.9-2.1 3.6 0 4.3 2.4 4.3 5.4V21h-4v-5.8c0-1.4 0-3.1-1.9-3.1s-2.1 1.5-2.1 3V21h-4z" />
      </svg>
    ),
  },
};

/**
 * variant="outline" (default): round bordered buttons, for light backgrounds.
 * variant="plain": bare icons, for use on a coloured bar.
 */
export function SocialIcons({ links, variant = "outline" }: { links: SocialLink[]; variant?: "outline" | "plain" }) {
  return (
    <ul className="flex gap-3">
      {links.map(({ platform, href }) => (
        <li key={platform}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ICONS[platform].label}
            className={
              variant === "plain"
                ? "flex h-10 w-10 items-center justify-center text-navy-ink transition hover:opacity-70"
                : "flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-muted transition hover:text-navy-ink"
            }
          >
            {ICONS[platform].icon}
          </a>
        </li>
      ))}
    </ul>
  );
}