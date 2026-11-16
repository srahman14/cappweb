/** Suspense fallbacks for public event sections. Decorative; one sr-only status each. */

const pulse = "animate-pulse motion-reduce:animate-none rounded-card bg-indigo-soft";

export function EventsPageSkeleton() {
  return (
    <div>
      <div aria-hidden="true" className="space-y-8">
        <div className={`h-[380px] ${pulse}`} />
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`h-[88px] ${pulse}`} />
          ))}
        </div>
      </div>
      <span role="status" className="sr-only">
        Loading events…
      </span>
    </div>
  );
}

export function EventListSkeleton() {
  return (
    <div>
      <div aria-hidden="true" className="mt-8 space-y-5">
        {[0, 1].map((i) => (
          <div key={i} className={`h-[190px] ${pulse}`} />
        ))}
      </div>
      <span role="status" className="sr-only">
        Loading events…
      </span>
    </div>
  );
}
