/**
 * Admin navigation: the single source for the sidebar, the mobile tabs and
 * the Overview. To ship Resources/Events, add the route and flip `status`.
 */
import { CalendarDays, FileText, Images, LayoutDashboard, type LucideIcon } from "lucide-react";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  match: "exact" | "prefix";
  status: "live" | "soon";
};

export const ADMIN_NAV: AdminNavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, match: "exact", status: "live" },
  { label: "Media", href: "/admin/media", icon: Images, match: "prefix", status: "live" },
  { label: "Resources", href: "/admin/resources", icon: FileText, match: "prefix", status: "soon" },
  { label: "Events", href: "/admin/events", icon: CalendarDays, match: "prefix", status: "soon" },
];

export function isNavItemActive(item: AdminNavItem, pathname: string) {
  return item.match === "exact"
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
}
