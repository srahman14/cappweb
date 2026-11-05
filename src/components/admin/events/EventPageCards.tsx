import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/cn";
import { EVENT_PAGE_SCOPES, type EventPageId } from "@/lib/events/page-scopes";

/**
 * Square cards that scope /admin/events to one site page. Plain links to ?page=,
 * so they work with the keyboard and without client code. The selected card has
 * aria-current, and a tick as well as colour.
 *
 * Usage: <EventPageCards selected="tech" counts={counts} />
 */
interface EventPageCardsProps {
  selected: EventPageId;
  counts: Record<EventPageId, number>;
}

export function EventPageCards({ selected, counts }: EventPageCardsProps) {
  return (
    <nav aria-label="Show events by page">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {EVENT_PAGE_SCOPES.map((scope) => {
          const isSelected = scope.id === selected;
          const count = counts[scope.id];

          return (
            <li key={scope.id}>
              <Link
                href={`/admin/events?page=${scope.id}`}
                scroll={false}
                aria-current={isSelected ? "true" : undefined}
                className={cn(
                  "flex aspect-square flex-col justify-between rounded-[20px] border p-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo",
                  isSelected
                    ? "border-indigo bg-indigo-soft"
                    : "border-line bg-white hover:bg-indigo-soft",
                )}
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="min-w-0 text-sm font-semibold text-navy">{scope.label}</span>
                  {isSelected ? (
                    <Check aria-hidden="true" className="size-4 shrink-0 text-indigo" />
                  ) : null}
                </span>
                <span className="text-3xl font-semibold tracking-tight text-navy">
                  {count}
                  <span className="sr-only"> {count === 1 ? "event" : "events"}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
