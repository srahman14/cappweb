import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
  id: string;
  label: string;
  invalid?: boolean;
};

/** Labelled input for admin forms. No hooks, so usable from server or client. */
export function TextField({ id, label, invalid, ...inputProps }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-ink">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={invalid || undefined}
        className={cn(
          "h-11 w-full rounded-xl border bg-white px-3.5 text-base text-navy-ink placeholder:text-muted",
          "focus-ring focus-visible:border-indigo",
          // cn() only concatenates: pick exactly one border colour.
          invalid ? "border-danger" : "border-muted-soft",
        )}
        {...inputProps}
      />
    </div>
  );
}
