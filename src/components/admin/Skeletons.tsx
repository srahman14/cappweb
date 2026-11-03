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

export function OverviewSkeleton() {
  return (
    <div>
      <div aria-hidden="true">
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[84px] rounded-xl border border-line bg-white p-4">
              <div className={`h-3 w-20 rounded bg-line ${pulse}`} />
              <div className={`mt-2 h-7 w-10 rounded bg-line ${pulse}`} />
            </div>
          ))}
        </div>
        <div className="mt-6 h-56 max-w-2xl space-y-3 rounded-xl border border-line bg-white p-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-10 rounded-lg bg-line ${pulse}`} />
          ))}
        </div>
      </div>
      <span role="status" className="sr-only">
        Loading…
      </span>
    </div>
  );
}
