"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import { ADMIN_NAV, isNavItemActive } from "./navItems";

type AdminNavProps = {
  orientation?: "vertical" | "horizontal";
};

export function AdminNav({ orientation = "vertical" }: AdminNavProps) {
  const pathname = usePathname();
  const vertical = orientation === "vertical";

  return (
    <nav aria-label="Admin sections">
      <ul
        className={cn(
          vertical
            ? "flex flex-col gap-1"
            : "flex gap-1 overflow-x-auto px-2 pb-2 [scrollbar-width:none]",
        )}
      >
        {ADMIN_NAV.map((item) => {
          const Icon = item.icon;
          const base = cn(
            "relative flex items-center gap-3 rounded-lg px-3 text-sm font-medium text-on-dark transition-colors",
            vertical ? "py-2" : "shrink-0 py-2.5",
          );

          if (item.status === "soon") {
            return (
              <li key={item.href} className={cn(!vertical && "shrink-0")}>
                <span aria-disabled="true" className={cn(base, "cursor-default")}>
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  {item.label}
                  <Pill tone="glass" className="ml-auto px-1.5 py-0 text-[11px]">
                    Soon
                  </Pill>
                </span>
              </li>
            );
          }

          const active = isNavItemActive(item, pathname);
          return (
            <li key={item.href} className={cn(!vertical && "shrink-0")}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  base,
                  "focus-ring focus-visible:outline-gold-light hover:bg-white/5 hover:text-white",
                  "aria-[current=page]:bg-white/10 aria-[current=page]:text-white",
                  vertical
                    ? "aria-[current=page]:before:absolute aria-[current=page]:before:inset-y-2 aria-[current=page]:before:left-0 aria-[current=page]:before:w-0.5 aria-[current=page]:before:rounded-full aria-[current=page]:before:bg-gold"
                    : "aria-[current=page]:shadow-[inset_0_-2px_0_var(--color-gold)]",
                )}
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
