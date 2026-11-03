/**
 * Validates the ?next= post-login destination (open-redirect guard).
 * Only same-site admin paths are allowed; anything else falls back.
 */
export function safeNextPath(value: unknown, fallback = "/admin") {
  if (typeof value !== "string") return fallback;
  // Same segment check as the proxy: "/admin" or "/admin/…", not "/administrator".
  if (value !== "/admin" && !value.startsWith("/admin/") && !value.startsWith("/admin?")) return fallback;
  if (value.startsWith("//") || value.includes("\\")) return fallback;
  if (value === "/admin/login" || value.startsWith("/admin/login?") || value.startsWith("/admin/login/")) {
    return fallback;
  }
  return value;
}
