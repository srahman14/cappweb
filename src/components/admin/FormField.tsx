import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Shared look for admin form controls. 44px tall and 16px text, so they are easy to
 * hit with a thumb and iOS doesn't zoom the page when one is focused.
 */
const control =
  "block w-full min-w-0 rounded-xl border border-muted-soft bg-white px-3.5 text-base text-navy-ink placeholder:text-muted-soft transition-colors focus-visible:border-indigo focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-indigo/30 disabled:bg-surface disabled:opacity-70";

export const inputClass = cn(control, "h-11");
export const selectClass = cn(control, "h-11 pr-8");
export const textareaClass = cn(control, "min-h-28 py-3 leading-relaxed");

export function Field({
  label,
  htmlFor,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy-ink">
        {label}
      </label>
      {children}
      {hint ? <p className="mt-1.5 text-xs leading-relaxed text-muted">{hint}</p> : null}
    </div>
  );
}

/** A checkbox as a full-width, easy-to-tap row. */
export function CheckboxRow({
  id,
  name,
  label,
  value,
  defaultChecked,
}: {
  id: string;
  name: string;
  label: string;
  value?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-line bg-white px-3.5 text-sm text-navy-ink has-[:checked]:border-indigo/40 has-[:checked]:bg-indigo-soft"
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        value={value}
        defaultChecked={defaultChecked}
        className="size-5 shrink-0 accent-indigo"
      />
      {label}
    </label>
  );
}
