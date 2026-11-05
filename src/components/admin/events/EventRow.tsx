"use client";

import { useState, useTransition } from "react";
import { Pencil, Star, Trash2 } from "lucide-react";

import {
  deleteEventAction,
  setFeaturedAction,
  setPublishedAction,
  type ActionState,
} from "@/app/(admin)/admin/(dashboard)/events/actions";
import { EVENT_SUBJECT_LABELS } from "@/lib/events/constants";
import type { AdminEvent } from "@/lib/services/event.service";

import { EventCoverControl } from "./EventCoverControl";
import { EventForm } from "./EventForm";

/**
 * One event in the admin list: status, date, and actions
 * (edit, publish / unpublish, feature / unfeature, delete with confirmation).
 * Events are ordered by date, so there is nothing to reorder.
 *
 * Usage: <EventRow event={event} />
 */
interface EventRowProps {
  event: AdminEvent;
}

const smallButton =
  "inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:bg-indigo-soft disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo";

export function EventRow({ event }: EventRowProps) {
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const run = (fn: () => Promise<ActionState>) => {
    setError(null);
    startTransition(async () => {
      const result = await fn();
      if (!result.ok) setError(result.error ?? "Something went wrong.");
    });
  };

  if (editing) {
    return (
      <div className="space-y-4 rounded-[20px] border border-indigo/30 bg-white p-4 sm:p-5">
        <EventCoverControl event={event} />
        <div className="border-t border-line pt-4">
          <EventForm
            event={event}
            onDone={() => setEditing(false)}
            onCancel={() => setEditing(false)}
          />
        </div>
      </div>
    );
  }

  const canFeature = event.isPublished && event.isUpcoming;

  return (
    <div className="rounded-[20px] border border-line bg-white p-4 sm:p-5">
      {/* Stacked on mobile (details, then actions); side by side from sm up. */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-navy">{event.title}</h3>
            <span
              className={
                event.isPublished
                  ? "rounded-full bg-indigo-soft px-2.5 py-0.5 text-xs font-medium text-indigo"
                  : "rounded-full bg-gold-light/50 px-2.5 py-0.5 text-xs font-medium text-gold-deep"
              }
            >
              {event.isPublished ? "Published" : "Draft"}
            </span>
            {event.isFeatured ? (
              <span className="rounded-full bg-gold-light/50 px-2.5 py-0.5 text-xs font-medium text-gold-deep">
                {event.isUpcoming ? "Featured" : "Featured (ended)"}
              </span>
            ) : null}
            {event.tags[0] ? (
              <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                {event.tags[0]}
              </span>
            ) : null}
          </div>

          <p className="mt-1 text-sm text-muted">
            {[event.whenLabel, event.location].filter(Boolean).join(" · ")}
          </p>

          <p className="mt-2 text-xs text-muted-soft">
            {event.subjects.length > 0
              ? event.subjects.map((subject) => EVENT_SUBJECT_LABELS[subject]).join(", ")
              : "No subject pages"}
            {event.coverUrl ? " · Has a cover" : " · No cover yet"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => run(() => setPublishedAction(event.id, !event.isPublished))}
            disabled={pending}
            className={smallButton}
          >
            {event.isPublished ? "Unpublish" : "Publish"}
          </button>

          {event.isFeatured || canFeature ? (
            <button
              type="button"
              onClick={() => run(() => setFeaturedAction(event.id, !event.isFeatured))}
              disabled={pending}
              className={smallButton}
            >
              <Star aria-hidden="true" className="size-3.5" />
              {event.isFeatured ? "Unfeature" : "Feature"}
            </button>
          ) : null}

          <button type="button" onClick={() => setEditing(true)} className={smallButton}>
            <Pencil aria-hidden="true" className="size-3.5" />
            Edit
          </button>

          {confirmingDelete ? (
            <span className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={() => run(() => deleteEventAction(event.id))}
                disabled={pending}
                className="rounded-full bg-red-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-800 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
              >
                {pending ? "Deleting…" : "Confirm delete"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                className="text-xs font-medium text-muted hover:text-navy"
              >
                Cancel
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              aria-label={`Delete ${event.title}`}
              className={smallButton}
            >
              <Trash2 aria-hidden="true" className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
