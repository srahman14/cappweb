"use client";
/* eslint-disable @next/next/no-img-element */
/**
 * MegaNavbar: top bar with hover/tap dropdown panels (desktop) and a
 * full-screen menu with big text (mobile).
 *
 * Desktop: logo left, items CENTRED, actions right (3-column grid). Items with
 * `content` open a panel that glides and resizes between items; items with `href`
 * are plain links.
 *
 * Mobile: the bar shows a menu button that opens a full-screen dialog. For items
 * with `content` (dropdowns) pass `mobileLinks`: they are shown as big links under
 * the item's label. Items with only `href` appear as one big link.
 *
 * CAPP changes vs the original component:
 *  - shadcn tokens (bg-background, bg-muted...) mapped to our tokens (see app/globals.css)
 *  - next/link instead of <a> (client-side navigation)
 *  - bar width/padding matches <Container>
 *
 * Don't build your own navbar elsewhere: edit the items in components/layout/Navbar.tsx.
 */

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/cn";

export interface MegaNavbarItem {
  label: string;
  /** Plain link. Leave `content` empty. */
  href?: string;
  /** Desktop dropdown panel content. Makes the item a menu trigger. */
  content?: React.ReactNode;
  /** Mobile only: the links shown (as big text) for an item that has `content`. */
  mobileLinks?: { label: string; href: string }[];
}

export interface MegaNavbarProps extends React.HTMLAttributes<HTMLElement> {
  items: MegaNavbarItem[];
  /** Left side, e.g. your logo. */
  logo?: React.ReactNode;
  /** Right side, e.g. the WhatsApp button. */
  actions?: React.ReactNode;
}

/** Small stroke icon so we don't need an icon library. */
function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={d} />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <Icon
      d="m6 9 6 6 6-6"
      className={cn("size-3.5 shrink-0 transition-transform duration-200 motion-reduce:transition-none", open && "rotate-180")}
    />
  );
}

/* ---------------------------- mobile (full screen) ---------------------------- */

function MobileMenu({ items, logo, actions }: Pick<MegaNavbarProps, "items" | "logo" | "actions">) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // close after navigating (also covers back/forward)
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // close if the window grows past the mobile breakpoint
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /** One big link style; the current page is highlighted. */
  const linkClass = (href: string) =>
    cn(
      "-mx-3 block rounded-xl px-3 py-2 text-4xl font-semibold tracking-tight transition-colors",
      pathname === href ? "bg-black/5 text-navy-ink" : "text-muted hover:text-navy-ink",
    );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-black/5 hover:text-navy-ink md:hidden"
        >
          <Icon d="M4 6h16M4 12h16M4 18h16" className="size-5" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col bg-surface data-[state=closed]:animate-menu-out data-[state=open]:animate-menu-in motion-reduce:animate-none md:hidden"
        >
          <div className="flex h-16 shrink-0 items-center justify-between px-5">
            <Dialog.Title className="sr-only">Site menu</Dialog.Title>
            {/* clicking the logo goes home, so close the menu too */}
            <div onClick={() => setOpen(false)}>{logo}</div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-black/5 hover:text-navy-ink"
              >
                <Icon d="M18 6 6 18M6 6l12 12" className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pb-10 pt-4">
            <ul className="flex flex-col gap-8">
              {items.map((item, i) =>
                item.content ? (
                  // dropdown item: small label, then its links as big text
                  <li key={i} className="flex flex-col gap-0.5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-soft">{item.label}</p>
                    {item.mobileLinks?.map((l) => (
                      <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={linkClass(l.href)}>
                        {l.label}
                      </Link>
                    ))}
                  </li>
                ) : (
                  <li key={i}>
                    <Link href={item.href ?? "#"} onClick={() => setOpen(false)} className={linkClass(item.href ?? "")}>
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {actions && <div className="shrink-0 border-t border-line p-6 [&_a]:w-full">{actions}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ------------------------------- desktop bar ------------------------------- */

export function MegaNavbar({ items, logo, actions, className, ...props }: MegaNavbarProps) {
  const id = React.useId();
  const headerRef = React.useRef<HTMLElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);
  const triggerRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const contentRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const closeTimer = React.useRef<number | undefined>(undefined);
  const lastInput = React.useRef("mouse");
  const prevActive = React.useRef<number | null>(null);

  const [active, setActive] = React.useState<number | null>(null);
  const [box, setBox] = React.useState({ left: 0, width: 0, height: 0 });
  const [snap, setSnap] = React.useState(true);

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setActive(null), 150);
  };
  const openItem = (i: number) => {
    cancelClose();
    setActive(i);
  };

  // size and position the panel for the active item
  React.useEffect(() => {
    if (active === null) {
      prevActive.current = null;
      return;
    }
    const content = contentRefs.current[active];
    const trigger = triggerRefs.current[active];
    const bar = barRef.current;
    if (!content || !trigger || !bar) return;

    // opening from closed snaps into place; switching items glides
    setSnap(prevActive.current === null);
    prevActive.current = active;

    const measure = () => {
      const width = content.offsetWidth;
      const height = content.offsetHeight;
      const barRect = bar.getBoundingClientRect();
      const triggerRect = trigger.getBoundingClientRect();
      const centered = triggerRect.left + triggerRect.width / 2 - width / 2 - barRect.left;
      const left = Math.max(0, Math.min(centered, barRect.width - width));
      setBox({ left, width, height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [active]);

  // tap or click outside closes the panel
  React.useEffect(() => {
    if (active === null) return;
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setActive(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [active]);

  React.useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <header
      ref={headerRef}
      className={cn("relative z-40 w-full border-b border-line bg-surface", className)}
      {...props}
      onKeyDown={(e) => {
        lastInput.current = "keyboard";
        if (e.key === "Escape" && active !== null) {
          triggerRefs.current[active]?.focus();
          setActive(null);
        }
      }}
      onBlur={(e) => {
        if (lastInput.current === "keyboard" && !e.currentTarget.contains(e.relatedTarget)) {
          setActive(null);
        }
      }}
    >
      {/*
        3-column grid: logo | items | actions. The middle column is `auto` and the
        outer two are `1fr`, which is what keeps the items truly centred.
        (On mobile the nav is hidden, so the actions are pinned to column 3.)
      */}
      <div
        ref={barRef}
        className="relative mx-auto grid h-16 w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-5 md:px-10 lg:px-20"
      >
        <div className="flex items-center justify-self-start">{logo}</div>

        <nav
          aria-label="Main"
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") scheduleClose();
          }}
          className="hidden h-full items-center gap-1 md:flex"
        >
          {items.map((item, i) =>
            item.content ? (
              <button
                key={i}
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                type="button"
                aria-expanded={active === i}
                aria-controls={`${id}-panel-${i}`}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") openItem(i);
                }}
                onPointerDown={(e) => {
                  lastInput.current = e.pointerType;
                }}
                onClick={() => {
                  cancelClose();
                  setActive((prev) => (prev === i && lastInput.current !== "mouse" ? null : i));
                }}
                className={cn(
                  "inline-flex h-9 items-center gap-1 rounded-full px-3 text-sm font-medium tracking-tight transition-colors",
                  active === i ? "bg-black/5 text-navy-ink" : "text-muted hover:text-navy-ink",
                )}
              >
                {item.label}
                <Chevron open={active === i} />
              </button>
            ) : (
              <Link
                key={i}
                href={item.href ?? "#"}
                onPointerEnter={() => {
                  cancelClose();
                  setActive(null);
                }}
                className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium tracking-tight text-muted transition-colors hover:text-navy-ink"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="col-start-3 flex items-center gap-2 justify-self-end">
          {actions && <div className="hidden items-center gap-2 md:flex">{actions}</div>}
          <MobileMenu items={items} logo={logo} actions={actions} />
        </div>

        {/* desktop panel: one box that glides and resizes between items */}
        <div
          inert={active === null}
          onPointerEnter={cancelClose}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") scheduleClose();
          }}
          style={{ left: box.left, transitionProperty: snap ? "opacity" : undefined }}
          className={cn(
            "absolute top-full z-50 hidden pt-2 transition-[left,opacity] duration-300 ease-out motion-reduce:transition-none md:block",
            active === null ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        >
          <div
            style={{ width: box.width, height: box.height, transitionProperty: snap ? "none" : undefined }}
            className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-xl transition-[width,height] duration-300 ease-out motion-reduce:transition-none"
          >
            {items.map((item, i) =>
              item.content ? (
                <div
                  key={i}
                  id={`${id}-panel-${i}`}
                  ref={(el) => {
                    contentRefs.current[i] = el;
                  }}
                  inert={active !== i}
                  className={cn(
                    "absolute left-0 top-0 w-max max-w-[calc(100vw-2rem)] transition-opacity duration-200 motion-reduce:transition-none",
                    active === i ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  {item.content}
                </div>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- building blocks for panel content ---------- */

export function MegaNavbarSection({ title, className, children }: { title?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {title && <p className="px-2 pb-1 text-xs font-medium uppercase tracking-wider text-muted-soft">{title}</p>}
      {children}
    </div>
  );
}

export function MegaNavbarLink({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href} className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-black/5">
      {icon && (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-navy-ink [&_svg]:size-4">
          {icon}
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-sm font-medium tracking-tight">{title}</span>
        {description && <span className="mt-0.5 block text-xs text-muted-soft">{description}</span>}
      </span>
    </Link>
  );
}

export function MegaNavbarCard({ title, description, image, href }: { title: string; description?: string; image?: string; href: string }) {
  return (
    <Link href={href} className="flex flex-col overflow-hidden rounded-xl border border-line bg-black/[0.03] transition-colors hover:bg-black/5">
      {image && <img src={image} alt="" className="aspect-video w-full object-cover" />}
      <span className="p-3">
        <span className="block text-sm font-medium tracking-tight">{title}</span>
        {description && <span className="mt-0.5 block text-xs text-muted-soft">{description}</span>}
      </span>
    </Link>
  );
}