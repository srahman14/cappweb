/**
 * CAPP's top navigation, built on <MegaNavbar>. This is the ONLY place the
 * nav items are defined. Rendered once, in app/layout.tsx.
 *
 * To add or rename pages, edit the arrays below. Dropdown items need their
 * links in BOTH places (`content` for desktop, `mobileLinks` for mobile),
 * which is why both are generated from the same array.
 */
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Logo } from "@/components/ui/Logo";
import {
  MegaNavbar,
  MegaNavbarLink,
  MegaNavbarSection,
  type MegaNavbarItem,
} from "@/components/ui/MegaNavbar";

const SUBJECT_LINKS = [
  { title: "Tech", description: "LeetCode, NeetCode, AI courses and more", href: "/tech" },
  { title: "Business & Finance", description: "Guides, events and opportunities", href: "/business-finance" },
  { title: "Engineering", description: "Guides, events and opportunities", href: "/engineering" },
  { title: "Law", description: "Guides, events and opportunities", href: "/law" },
] as const;

const ABOUT_LINKS = [
  { title: "About CAPP", description: "Our mission and how CAPP works", href: "/about" },
  { title: "Meet the team", description: "Ambassadors and who to contact", href: "/team" },
  { title: "Get involved", description: "Volunteer, speak or become an ambassador", href: "/get-involved" },
] as const;

/** Turns a links array into the plain {label, href} list the mobile menu uses. */
const toMobileLinks = (links: readonly { title: string; href: string }[]) =>
  links.map(({ title, href }) => ({ label: title, href }));

const items: MegaNavbarItem[] = [
  {
    label: "Subjects",
    mobileLinks: toMobileLinks(SUBJECT_LINKS),
    content: (
      <MegaNavbarSection title="Pick your subject" className="w-[520px] p-3">
        <div className="grid grid-cols-2 gap-1">
          {SUBJECT_LINKS.map((l) => (
            <MegaNavbarLink key={l.href} {...l} />
          ))}
        </div>
      </MegaNavbarSection>
    ),
  },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  {
    label: "About",
    mobileLinks: toMobileLinks(ABOUT_LINKS),
    content: (
      <MegaNavbarSection className="w-[320px] p-3">
        {ABOUT_LINKS.map((l) => (
          <MegaNavbarLink key={l.href} {...l} />
        ))}
      </MegaNavbarSection>
    ),
  },
];

export function Navbar() {
  return (
    <MegaNavbar
      items={items}
      logo={<Logo />}
      actions={<WhatsAppButton label="Join on WhatsApp" size="sm" />}
    />
  );
}