/**
 * Root layout: document shell only (html/body, font, global CSS, base
 * metadata). Marketing chrome lives in app/(marketing)/layout.tsx via
 * <SiteChrome>; the admin area has its own layouts under app/(admin).
 */
import { jakarta } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";
import "./globals.css";

const DEFAULT_TITLE = `${SITE.name} | ${SITE.fullName}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  appleWebApp: { title: DEFAULT_TITLE },
  openGraph: {
    title: DEFAULT_TITLE,
    description: SITE.description,
    url: "/",
    siteName: SITE.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      {/* font-sans maps to --font-jakarta (see app/globals.css) */}
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
