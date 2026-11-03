/**
 * Root layout: document shell only (html/body, font, global CSS, base
 * metadata). Marketing chrome lives in app/(marketing)/layout.tsx via
 * <SiteChrome>; the admin area has its own layouts under app/(admin).
 */
import { jakarta } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CAPP | Careers and People's Progression",
    template: "%s | CAPP",
  },
  description:
    "Events, industry panels and resources for Tech, Business & Finance, Engineering and Law.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      {/* font-sans maps to --font-jakarta (see app/globals.css) */}
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
