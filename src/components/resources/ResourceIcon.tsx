import type { ReactNode } from "react";
import type { ResourceIconName } from "@/types";

/**
 * Small line icons for resource cards.
 *
 * Props:
 * - name: one of ResourceIconName (defaults to "document")
 * - className: size/colour classes (defaults to "size-5"); colour follows `currentColor`
 *
 * Usage: <ResourceIcon name="code" className="size-6 text-indigo" />
 *
 * Decorative only (aria-hidden): the card title carries the meaning.
 */
const paths: Record<ResourceIconName, ReactNode> = {
  document: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M9.5 12h5M9.5 16h5" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  network: (
    <>
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="18" cy="7" r="2.5" />
      <circle cx="12" cy="17" r="2.5" />
      <path d="M8 8.5l3 6M16 8.5l-3 6" />
    </>
  ),
  code: <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />,
  chart: <path d="M5 20V10M12 20V4M19 20v-7" />,
  cog: (
    <>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M6 20h12M5 7h14" />
      <path d="M5 7l-2.5 6a3 3 0 005 0zM19 7l-2.5 6a3 3 0 005 0z" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M9 3v4M15 3v4" />
    </>
  ),
};

interface ResourceIconProps {
  name?: ResourceIconName;
  className?: string;
}

export function ResourceIcon({ name = "document", className = "size-5" }: ResourceIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}