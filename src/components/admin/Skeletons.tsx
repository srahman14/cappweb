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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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

export function MediaSkeleton() {
  return (
    <div>
      <div aria-hidden="true">
        <div className={`mb-4 h-4 w-40 rounded bg-line ${pulse}`} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-line bg-white">
              <div className={`aspect-video bg-line ${pulse}`} />
              <div className="space-y-2 p-4">
                <div className={`h-3 w-32 rounded bg-line ${pulse}`} />
                <div className={`h-3 w-24 rounded bg-line ${pulse}`} />
                <div className={`h-3 w-40 rounded bg-line ${pulse}`} />
                <div className={`mt-3 h-9 rounded-full bg-line ${pulse}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <span role="status" className="sr-only">
        Loading…
      </span>
    </div>
  );
}
