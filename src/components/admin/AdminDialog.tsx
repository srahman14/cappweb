"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Dialog for admin forms. Full screen on phones (so the keyboard and a long form
 * are comfortable), a centred card from sm up. Built on Radix, so focus is trapped,
 * Escape closes and screen readers get a proper title.
 *
 * Layout inside: a fixed header, a scrolling <DialogBody> and a pinned <DialogFooter>.
 * Clicking outside does NOT close it, so a stray tap can't throw away a half-filled form.
 *
 * Usage:
 *   <AdminDialog open={open} onOpenChange={setOpen} title="Add an event">
 *     <DialogBody>…</DialogBody>
 *     <DialogFooter>…</DialogFooter>
 *   </AdminDialog>
 */
interface AdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export function AdminDialog({ open, onOpenChange, title, description, children }: AdminDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-navy-ink/50 sm:backdrop-blur-[2px]" />
        <Dialog.Content
          {...(description ? {} : { "aria-describedby": undefined })}
          onInteractOutside={(event) => event.preventDefault()}
          className={cn(
            "fixed z-50 flex flex-col bg-white outline-none",
            // Phones: the whole screen.
            "inset-0 h-dvh",
            // Tablets and up: a centred card.
            "sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[min(90dvh,52rem)] sm:w-[calc(100vw-2rem)] sm:max-w-2xl",
            "sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:shadow-2xl",
            "data-[state=open]:animate-menu-in data-[state=closed]:animate-menu-out motion-reduce:animate-none",
          )}
        >
          <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))] sm:pt-4">
            <div className="min-w-0">
              <Dialog.Title className="text-lg font-semibold tracking-tight text-navy-ink">{title}</Dialog.Title>
              {description ? (
                <Dialog.Description className="mt-0.5 text-sm text-muted">{description}</Dialog.Description>
              ) : null}
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="focus-ring -mr-2 -mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-navy-ink"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </Dialog.Close>
          </header>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** The scrolling middle of the dialog. */
export function DialogBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 py-5", className)}>
      {children}
    </div>
  );
}

/** Pinned actions. Stacked full-width buttons on phones, a right-aligned row from sm up. */
export function DialogFooter({ children }: { children: ReactNode }) {
  return (
    <footer className="shrink-0 border-t border-line bg-white px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
      {children}
    </footer>
  );
}
