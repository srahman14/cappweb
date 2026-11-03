/** Suspense fallbacks for the admin area. All decorative; one sr-only status each. */

const pulse = "animate-pulse motion-reduce:animate-none";

export function UserEmailSkeleton() {
  return (
    <div className="flex h-4 items-center">
      <div aria-hidden="true" className={`h-3 w-36 rounded bg-white/10 ${pulse}`} />
      <span className="sr-only">Loading account</span>
    </div>
  );
}

export function LoginCardSkeleton() {
  return (
    <div>
      <div aria-hidden="true" className={`h-48 rounded-lg bg-line ${pulse}`} />
      <span role="status" className="sr-only">
        Loading…
      </span>
    </div>
  );
}
