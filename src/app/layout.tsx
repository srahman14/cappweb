import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { jakarta } from "@/lib/fonts";
import { SocialLink } from "@/types";
import type { Metadata } from "next";
import "./globals.css";

const socials: SocialLink[] = [
  { platform: "tiktok", href: "#" },
  { platform: "instagram", href: "#" },
  { platform: "linkedin", href: "#" },
];

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
      <body className="flex max-w-7xl mx-auto min-h-full flex-col font-sans">
        <Navbar />
        {/* The layout owns the single <main>; pages return their sections only. */}
        <main className="flex-1">{children}</main>
        <Footer socials={socials}/>
      </body>
    </html>
  );
}