/**
 * Tiny class-name joiner. Skips falsy values so you can write conditionals:
 *
 *   cn("px-4", isActive && "bg-navy", className)
 *
 * (If you later need smart de-duplication of conflicting Tailwind classes,
 * swap the body for `twMerge(clsx(classes))`; call sites won't change.)
 */
export type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
