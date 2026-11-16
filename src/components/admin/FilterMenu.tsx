"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Funnel } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  value: string;
  /** The "no filter" value; a group is active when `value` differs from it. */
  defaultValue: string;
  options: FilterOption[];
}

/**
 * A "Filters" button that opens a panel of single-choice lists. Under the button on
 * larger screens, a bottom sheet on phones. State lives in the parent.
 *
 * Usage: <FilterMenu groups={groups} onChange={(groupId, value) => …} onClear={…} />
 */
export function FilterMenu({
  groups,
  onChange,
  onClear,
}: {
  groups: FilterGroup[];
  onChange: (groupId: string, value: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const active = groups.filter((group) => group.value !== group.defaultValue).length;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
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

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "focus-ring inline-flex h-11 items-center gap-2 rounded-full border bg-white px-4 text-sm font-semibold text-navy-ink transition-colors hover:border-muted-soft",
          active > 0 ? "border-indigo" : "border-line",
        )}
      >
        <Funnel aria-hidden="true" className="size-4" />
        Filters
        {active > 0 ? (
          <span className="grid size-5 place-items-center rounded-full bg-indigo text-xs font-semibold text-white">
            {active}
            <span className="sr-only"> active</span>
          </span>
        ) : null}
      </button>

      {open ? (
        <>
          <div aria-hidden="true" className="fixed inset-0 z-40 bg-navy-ink/40 sm:hidden" />
          <div
            id={panelId}
            className={cn(
              "z-50 flex max-h-[80dvh] flex-col bg-white shadow-2xl",
              "fixed inset-x-0 bottom-0 rounded-t-2xl",
              "sm:absolute sm:inset-x-auto sm:bottom-auto sm:left-0 sm:top-full sm:mt-2 sm:w-80 sm:rounded-2xl sm:border sm:border-line",
            )}
          >
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain p-4">
              {groups.map((group) => (
                <fieldset key={group.id}>
                  <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    {group.label}
                  </legend>
                  <div className="space-y-1">
                    {group.options.map((option) => (
                      <label
                        key={option.value}
                        className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm text-navy-ink hover:bg-surface has-[:checked]:bg-indigo-soft has-[:checked]:font-semibold"
                      >
                        <input
                          type="radio"
                          name={`${panelId}-${group.id}`}
                          checked={group.value === option.value}
                          onChange={() => onChange(group.id, option.value)}
                          className="size-4 shrink-0 accent-indigo"
                        />
                        <span className="flex-1">{option.label}</span>
                        {option.count !== undefined ? (
                          <span className="text-xs tabular-nums text-muted">{option.count}</span>
                        ) : null}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={onClear}
                disabled={active === 0}
                className="focus-ring h-11 rounded-full px-4 text-sm font-medium text-muted hover:text-navy-ink disabled:opacity-40"
              >
                Clear all
              </button>
              <Button type="button" size="sm" className="h-11" onClick={() => setOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
