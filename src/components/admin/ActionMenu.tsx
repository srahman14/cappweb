"use client";

import { useEffect, useId, useRef, useState, type ComponentType } from "react";
import { EllipsisVertical } from "lucide-react";

import { cn } from "@/lib/cn";

export interface ActionMenuItem {
  label: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  onSelect: () => void;
  /** Greyed out when set; shown under the label so people know why. */
  disabledReason?: string;
  danger?: boolean;
  /** Asks "are you sure?" inside the menu before running onSelect. */
  confirm?: string;
}

/**
 * A "⋮" button that opens a list of quick actions. Under the button on larger screens,
 * a bottom sheet on phones. Closes on outside tap, Escape or after an action runs.
 *
 * Usage: <ActionMenu label="Actions for Tech Panel" items={[…]} className="absolute right-2 top-2" />
 */
export function ActionMenu({
  label,
  items,
  className,
}: {
  label: string;
  items: ActionMenuItem[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState<ActionMenuItem | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const close = () => {
    setOpen(false);
    setConfirming(null);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const choose = (item: ActionMenuItem) => {
    if (item.disabledReason) return;
    if (item.confirm && confirming !== item) {
      setConfirming(item);
      return;
    }
    close();
    item.onSelect();
  };

  return (
    <div ref={wrapperRef} className={className}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={label}
        onClick={() => (open ? close() : setOpen(true))}
        className="focus-ring grid size-11 place-items-center rounded-full bg-white/95 text-navy-ink shadow-sm transition-colors hover:bg-white"
      >
        <EllipsisVertical aria-hidden="true" className="size-5" />
      </button>

      {open ? (
        <>
          <div aria-hidden="true" className="fixed inset-0 z-40 bg-navy-ink/40 sm:hidden" />
          <div
            id={menuId}
            role="menu"
            aria-label={label}
            className={cn(
              "z-50 bg-white p-2 shadow-2xl",
              "fixed inset-x-0 bottom-0 rounded-t-2xl pb-[max(0.5rem,env(safe-area-inset-bottom))]",
              "sm:absolute sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-full sm:mt-2 sm:w-64 sm:rounded-2xl sm:border sm:border-line sm:pb-2",
            )}
          >
            {confirming ? (
              <div className="space-y-3 p-2">
                <p className="text-sm text-navy-ink">{confirming.confirm}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => choose(confirming)}
                    className="focus-ring h-11 flex-1 rounded-full bg-red-700 px-4 text-sm font-semibold text-white hover:bg-red-800"
                  >
                    {confirming.label}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirming(null)}
                    className="focus-ring h-11 flex-1 rounded-full border border-line px-4 text-sm font-semibold text-navy-ink hover:bg-surface"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              items.map((item) => {
                const Icon = item.icon;
                const disabled = Boolean(item.disabledReason);
                return (
                  <button
                    key={item.label}
                    type="button"
                    role="menuitem"
                    aria-disabled={disabled || undefined}
                    onClick={() => choose(item)}
                    className={cn(
                      "focus-ring flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium",
                      disabled
                        ? "cursor-not-allowed text-muted-soft"
                        : item.danger
                          ? "text-red-700 hover:bg-red-50"
                          : "text-navy-ink hover:bg-surface",
                    )}
                  >
                    <Icon aria-hidden="true" className="size-4 shrink-0" />
                    <span className="min-w-0">
                      <span className="block">{item.label}</span>
                      {item.disabledReason ? (
                        <span className="block text-xs font-normal">{item.disabledReason}</span>
                      ) : null}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
