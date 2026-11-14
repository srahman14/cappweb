"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Eye, EyeOff, ImageOff, MapPin, Pencil, Pin, PinOff, Star, StarOff, Trash2 } from "lucide-react";

import {
  deleteEventAction,
  setFeaturedAction,
  setLandingPinnedAction,
  setPublishedAction,
  type ActionState,
} from "@/app/(admin)/admin/(dashboard)/events/actions";
import { AdminDialog } from "@/components/admin/AdminDialog";
import { ActionMenu } from "@/components/admin/ActionMenu";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { EVENT_SUBJECT_LABELS } from "@/lib/events/constants";
import type { AdminEvent } from "@/lib/services/event.service";

import { EventCoverControl } from "./EventCoverControl";
import { EventForm } from "./EventForm";

/**
 * One event as a card. Tapping it opens the edit dialog (cover, details, feature, delete).
 *
 * Usage: <EventCard event={event} />
 */
export function eventStatus(event: AdminEvent): { label: string; className: string } {
  if (!event.isPublished) return { label: "Draft", className: "bg-gold-light text-gold-deep" };
  if (event.isUpcoming) return { label: "Upcoming", className: "bg-indigo text-white" };
  return { label: "Past", className: "bg-white text-muted" };
}

export function EventCard({ event }: { event: AdminEvent }) {
  const [open, setOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [, startAction] = useTransition();
  const status = eventStatus(event);
  const eligible = event.isPublished && event.isUpcoming;

  const run = (fn: () => Promise<ActionState>) => {
    setActionError(null);
    startAction(async () => {
      const result = await fn();
      if (!result.ok) setActionError(result.error ?? "Something went wrong.");
    });
  };

  const notEligible = !event.isPublished ? "Publish it first" : "Only upcoming events";

  return (
    <article id={`event-${event.id}`} className="relative scroll-mt-24">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-left transition-colors hover:border-muted-soft"
      >
        <div className="relative aspect-video w-full bg-indigo-soft">
          {event.coverUrl ? (
            <Image
              src={event.coverUrl}
              alt=""
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-muted">
              <ImageOff aria-hidden="true" className="size-6" />
              <span className="sr-only">No cover</span>
            </span>
          )}
          <div className="absolute left-3 top-3 flex gap-1.5">
            <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm", status.className)}>
              {status.label}
            </span>
            {event.isFeatured ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gold-deep shadow-sm">
                <Star aria-hidden="true" className="size-3 fill-current" />
                Featured
              </span>
            ) : null}
            {event.isLandingPinned ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-indigo shadow-sm">
                <Pin aria-hidden="true" className="size-3 fill-current" />
                Landing
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <h3 className="line-clamp-2 text-base font-semibold text-navy-ink">{event.title}</h3>
          <p className="text-sm text-muted">{event.whenLabel}</p>
          {event.location ? (
            <p className="flex items-center gap-1.5 text-sm text-muted">
              <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
              <span className="truncate">{event.location}</span>
            </p>
          ) : null}
          <p className="mt-auto pt-2 text-xs text-muted-soft">
            {event.subjects.length > 0
              ? event.subjects.map((subject) => EVENT_SUBJECT_LABELS[subject]).join(", ")
              : "Events page only"}
          </p>
        </div>
      </button>

      <ActionMenu
        label={`Actions for ${event.title}`}
        className="absolute right-2 top-2"
        items={[
          { label: "Edit", icon: Pencil, onSelect: () => setOpen(true) },
          {
            label: event.isPublished ? "Move to drafts" : "Publish",
            icon: event.isPublished ? EyeOff : Eye,
            onSelect: () => run(() => setPublishedAction(event.id, !event.isPublished)),
          },
          {
            label: event.isLandingPinned ? "Unpin from landing page" : "Pin to landing page",
            icon: event.isLandingPinned ? PinOff : Pin,
            disabledReason: event.isLandingPinned || eligible ? undefined : notEligible,
            onSelect: () => run(() => setLandingPinnedAction(event.id, !event.isLandingPinned)),
          },
          {
            label: event.isFeatured ? "Remove from featured" : "Feature on /events",
            icon: event.isFeatured ? StarOff : Star,
            disabledReason: event.isFeatured || eligible ? undefined : notEligible,
            onSelect: () => run(() => setFeaturedAction(event.id, !event.isFeatured)),
          },
          {
            label: "Delete event",
            icon: Trash2,
            danger: true,
            confirm: "Delete this event for good? This can't be undone.",
            onSelect: () => run(() => deleteEventAction(event.id)),
          },
        ]}
      />
      {actionError ? (
        <p role="alert" className="mt-1.5 px-1 text-xs text-red-700">
          {actionError}
        </p>
      ) : null}

      <AdminDialog open={open} onOpenChange={setOpen} title="Edit event" description={event.title}>
        <EventEditor event={event} onClose={() => setOpen(false)} />
      </AdminDialog>
    </article>
  );
}

function EventEditor({ event, onClose }: { event: AdminEvent; onClose: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const run = (fn: () => Promise<ActionState>) => {
    setError(null);
    startTransition(async () => {
      const result = await fn();
      if (!result.ok) setError(result.error ?? "Something went wrong.");
    });
  };

  const canFeature = event.isFeatured || (event.isPublished && event.isUpcoming);
  const canPin = event.isLandingPinned || (event.isPublished && event.isUpcoming);

  return (
    <EventForm
      event={event}
      before={<EventCoverControl event={event} />}
      after={
        <section aria-label="More actions" className="space-y-3 border-t border-line pt-5">
          <h3 className="text-sm font-semibold text-navy-ink">More actions</h3>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {canFeature ? (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-11 gap-2"
                disabled={pending}
                onClick={() => run(() => setFeaturedAction(event.id, !event.isFeatured))}
              >
                <Star aria-hidden="true" className="size-4" />
                {event.isFeatured ? "Remove from featured" : "Feature this event"}
              </Button>
            ) : null}
            {canPin ? (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-11 gap-2"
                disabled={pending}
                onClick={() => run(() => setLandingPinnedAction(event.id, !event.isLandingPinned))}
              >
                {event.isLandingPinned ? (
                  <PinOff aria-hidden="true" className="size-4" />
                ) : (
                  <Pin aria-hidden="true" className="size-4" />
                )}
                {event.isLandingPinned ? "Unpin from landing page" : "Pin to landing page"}
              </Button>
            ) : null}
            <ConfirmDelete
              label="Delete event"
              pending={pending}
              onConfirm={() => run(() => deleteEventAction(event.id))}
            />
          </div>
          {error ? (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          ) : null}
        </section>
      }
      onDone={onClose}
      onCancel={onClose}
    />
  );
}
