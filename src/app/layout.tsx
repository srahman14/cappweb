import type { Metadata } from "next";
import "./globals.css";
import { jakarta } from "@/lib/fonts"; 
import { Navbar } from "@/components/layout/Navbar"; 
import { Footer } from "@/components/layout/Footer"; 
import { NavLink, SocialLink } from "@/types";

const navLinks: NavLink[] = [
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Team", href: "/team" },
  { label: "Get involved", href: "/get-involved" },
];

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
        <Navbar links={navLinks}/>
        {/* The layout owns the single <main>; pages return their sections only. */}
        <main className="flex-1">{children}</main>
        <Footer socials={socials}/>
      </body>
    </html>
  );
}