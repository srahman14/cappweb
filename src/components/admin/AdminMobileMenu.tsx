"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { ADMIN_NAV, isNavItemActive } from "./navItems";

/**
 * Phone / tablet navigation: the same full-screen menu with big links as the public
 * site's mobile navbar, on the admin's navy instead of the light surface.
 * `footer` (signed-in email, sign-out) is passed in from the server shell.
 */
export function AdminMobileMenu({ footer }: { footer: ReactNode }) {
  const pathname = usePathname();
  // Re-keying on the path closes the menu after every navigation.
  return <MenuContent key={pathname} pathname={pathname} footer={footer} />;
}

function MenuContent({ pathname, footer }: { pathname: string; footer: ReactNode }) {
  const [open, setOpen] = useState(false);

  // The sidebar takes over from lg up, so close if the window grows past it.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="focus-ring-on-dark -mr-2 inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
        >
          <Menu aria-hidden="true" className="size-6" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col bg-navy text-white outline-none data-[state=closed]:animate-menu-out data-[state=open]:animate-menu-in motion-reduce:animate-none lg:hidden"
        >
          <div className="flex h-16 shrink-0 items-center justify-between px-5 pt-[env(safe-area-inset-top)]">
            <Dialog.Title className="sr-only">Admin menu</Dialog.Title>
            <div className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <Logo size={32} />
              <span className="text-sm font-semibold">
                CAPP <span className="font-normal text-on-dark">Admin</span>
              </span>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="focus-ring-on-dark -mr-2 inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
              >
                <X aria-hidden="true" className="size-6" />
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label="Admin sections" className="flex-1 overflow-y-auto px-6 pb-8 pt-4">
            <ul className="flex flex-col gap-1">
              {ADMIN_NAV.filter((item) => item.status === "live").map((item) => {
                const active = isNavItemActive(item, pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "focus-ring-on-dark -mx-3 block rounded-xl px-3 py-2.5 text-4xl font-semibold tracking-tight transition-colors",
                        active ? "bg-white/10 text-white" : "text-on-dark hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shrink-0 space-y-3 border-t border-white/10 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            {footer}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
