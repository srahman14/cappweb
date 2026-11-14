"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Pin, Plus, X } from "lucide-react";

import { AdminDialog } from "@/components/admin/AdminDialog";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { FilterMenu, type FilterGroup } from "@/components/admin/FilterMenu";
import { Button } from "@/components/ui/Button";
import { LANDING_EVENT_LIMIT } from "@/lib/events/format";
import { EVENT_PAGE_SCOPES, filterEventsForPage, type EventPageId } from "@/lib/events/page-scopes";
import { cn } from "@/lib/cn";
import type { AdminEvent } from "@/lib/services/event.service";

import { EventCard } from "./EventCard";
import { EventForm } from "./EventForm";

type StatusFilter = "all" | "published" | "drafts" | "upcoming" | "past";

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "drafts", label: "Drafts" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
];

const matchesStatus = (event: AdminEvent, status: StatusFilter) => {
  switch (status) {
    case "published":
      return event.isPublished;
    case "drafts":
      return !event.isPublished;
    case "upcoming":
      return event.isPublished && event.isUpcoming;
    case "past":
      return event.isPublished && !event.isUpcoming;
    default:
      return true;
  }
};

/**
 * The events admin: filters, an Add button and a grid of event cards.
 * Everything is filtered in the browser, so changing a filter is instant.
 */
export function EventsBrowser({ events }: { events: AdminEvent[] }) {
  const [page, setPage] = useState<EventPageId>("events");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [adding, setAdding] = useState(false);

  const scoped = useMemo(() => filterEventsForPage(events, page), [events, page]);
  const visible = useMemo(() => scoped.filter((event) => matchesStatus(event, status)), [scoped, status]);

  const groups: FilterGroup[] = [
    {
      id: "page",
      label: "Shown on",
      value: page,
      defaultValue: "events",
      options: EVENT_PAGE_SCOPES.map((scope) => ({
        value: scope.id,
        label: scope.label,
        count: filterEventsForPage(events, scope.id).length,
      })),
    },
    {
      id: "status",
      label: "Status",
      value: status,
      defaultValue: "all",
      options: STATUS_OPTIONS.map((option) => ({
        ...option,
        count: scoped.filter((event) => matchesStatus(event, option.value)).length,
      })),
    },
  ];

  const clear = () => {
    setPage("events");
    setStatus("all");
  };

  const pageLabel = EVENT_PAGE_SCOPES.find((scope) => scope.id === page)?.label;
  const statusLabel = STATUS_OPTIONS.find((option) => option.value === status)?.label;
  const published = events.filter((event) => event.isPublished).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" size="sm" className="h-11 flex-1 gap-2 sm:flex-none" onClick={() => setAdding(true)}>
          <Plus aria-hidden="true" className="size-4" />
          Add event
        </Button>
        <FilterMenu
          groups={groups}
          onChange={(groupId, value) =>
            groupId === "page" ? setPage(value as EventPageId) : setStatus(value as StatusFilter)
          }
          onClear={clear}
        />
        <p className="w-full text-sm text-muted sm:ml-auto sm:w-auto">
          {events.length} {events.length === 1 ? "event" : "events"} · {published} published ·{" "}
          {events.length - published} {events.length - published === 1 ? "draft" : "drafts"}
        </p>
      </div>

      {page !== "events" || status !== "all" ? (
        <div className="flex flex-wrap items-center gap-2">
          {page !== "events" ? <Chip label={pageLabel ?? page} onRemove={() => setPage("events")} /> : null}
          {status !== "all" ? <Chip label={statusLabel ?? status} onRemove={() => setStatus("all")} /> : null}
          <button type="button" onClick={clear} className="focus-ring rounded px-1 text-sm font-medium text-indigo hover:underline">
            Clear all
          </button>
        </div>
      ) : null}

      <LandingStrip
        events={events}
        active={page === "landing"}
        onToggle={() => {
          setStatus("all");
          setPage(page === "landing" ? "events" : "landing");
        }}
      />

      {events.length === 0 ? (
        <AdminEmptyState
          icon={CalendarDays}
          title="No events yet"
          description="Add your first event. It stays a draft until you publish it."
          action={
            <Button type="button" size="sm" className="h-11 gap-2" onClick={() => setAdding(true)}>
              <Plus aria-hidden="true" className="size-4" />
              Add event
            </Button>
          }
        />
      ) : visible.length === 0 ? (
        <AdminEmptyState
          icon={CalendarDays}
          title="No events match"
          description="Try a different filter."
          action={
            <Button type="button" variant="secondary" size="sm" className="h-11" onClick={clear}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      )}

      <AdminDialog
        open={adding}
        onOpenChange={setAdding}
        title="Add an event"
        description="It stays a draft unless you publish it now."
      >
        <EventForm onDone={() => setAdding(false)} onCancel={() => setAdding(false)} />
      </AdminDialog>
    </div>
  );
}

/**
 * What the landing page shows right now. Pinned events come first; any free slots fill
 * automatically with the soonest upcoming events.
 */
function LandingStrip({
  events,
  active,
  onToggle,
}: {
  events: AdminEvent[];
  active: boolean;
  onToggle: () => void;
}) {
  const shown = filterEventsForPage(events, "landing");
  const pinned = shown.filter((event) => event.isLandingPinned).length;

  return (
    <section aria-label="Landing page" className="rounded-2xl border border-line bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold text-navy-ink">
            <Pin aria-hidden="true" className="size-4 text-indigo" />
            On the landing page now
            <span className="rounded-full bg-indigo-soft px-2 py-0.5 text-xs font-semibold text-indigo">
              {pinned}/{LANDING_EVENT_LIMIT} pinned
            </span>
          </h2>
          <p className="mt-1 text-xs text-muted">
            Tap the pin on an upcoming event to show it here. Free slots fill with the soonest events.
          </p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={active}
          className={cn(
            "focus-ring h-10 rounded-full border px-4 text-sm font-semibold transition-colors",
            active ? "border-navy-ink bg-navy-ink text-white" : "border-line text-navy-ink hover:border-muted-soft",
          )}
        >
          {active ? "Show all events" : "Show only these"}
        </button>
      </div>

      {shown.length === 0 ? (
        <p className="mt-3 text-sm text-muted">No upcoming published events yet, so the landing page is empty.</p>
      ) : (
        <ol className="mt-3 grid gap-2 sm:grid-cols-3">
          {shown.map((event) => (
            <li key={event.id} className="rounded-xl bg-surface px-3 py-2.5">
              <p className="truncate text-sm font-medium text-navy-ink">{event.title}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                {event.isLandingPinned ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-indigo">
                    <Pin aria-hidden="true" className="size-3 fill-current" />
                    Pinned
                  </span>
                ) : (
                  <span>Automatic</span>
                )}
                <span aria-hidden="true">·</span>
                <span className="truncate">{event.whenLabel}</span>
              </p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex h-9 items-center gap-1 rounded-full bg-indigo-soft pl-3 pr-1 text-sm font-medium text-indigo">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter: ${label}`}
        className="focus-ring grid size-7 place-items-center rounded-full hover:bg-white/60"
      >
        <X aria-hidden="true" className="size-3.5" />
      </button>
    </span>
  );
}
