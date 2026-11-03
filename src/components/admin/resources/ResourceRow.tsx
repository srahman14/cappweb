"use client";

import { useState, useTransition } from "react";
import { ArrowDown, ArrowUp, ExternalLink, Pencil, Trash2 } from "lucide-react";

import {
  deleteResourceAction,
  reorderResourcesAction,
  setPublishedAction,
  type ActionState,
} from "@/app/(admin)/admin/(dashboard)/resources/actions";
import type { AdminResource } from "@/lib/services/resource.service";

import { ResourceForm } from "./ResourceForm";

/**
 * One resource in the admin list: status, link, and actions
 * (edit, publish / unpublish, move up / down, delete with confirmation).
 *
 * Props:
 * - resource: the resource to show
 * - index: its position within its group
 * - groupIds: ids of every resource in the same group, in display order (used to reorder)
 * - categories: existing categories, passed through to the edit form
 *
 * Usage: <ResourceRow resource={r} index={i} groupIds={ids} categories={categories} />
 */
interface ResourceRowProps {
  resource: AdminResource;
  index: number;
  groupIds: string[];
  categories: string[];
}

const smallButton =
  "inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:bg-indigo-soft disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo";

export function ResourceRow({ resource, index, groupIds, categories }: ResourceRowProps) {
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

  const move = (delta: -1 | 1) => {
    const next = [...groupIds];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    run(() => reorderResourcesAction(next));
  };

  if (editing) {
    return (
      <div className="rounded-[20px] border border-indigo/30 bg-white p-4 sm:p-5">
        <ResourceForm
          resource={resource}
          categories={categories}
          onDone={() => setEditing(false)}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="rounded-[20px] border border-line bg-white p-4 sm:p-5">
      {/* Stacked on mobile (details, then actions); side by side from sm up. */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-navy">{resource.title}</h3>
            <span
              className={
                resource.isPublished
                  ? "rounded-full bg-indigo-soft px-2.5 py-0.5 text-xs font-medium text-indigo"
                  : "rounded-full bg-gold-light/50 px-2.5 py-0.5 text-xs font-medium text-gold-deep"
              }
            >
              {resource.isPublished ? "Published" : "Draft"}
            </span>
            <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
              {resource.category}
            </span>
          </div>

          <p className="mt-1 text-sm text-muted">{resource.description}</p>

          <p className="mt-2 text-xs text-muted-soft">
            {resource.href ? (
              <a
                href={resource.href}
                target={resource.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="inline-flex max-w-full items-center gap-1 text-indigo hover:underline"
              >
                <span className="truncate">{resource.href}</span>
                <ExternalLink aria-hidden="true" className="size-3 shrink-0" />
              </a>
            ) : (
              "No link yet"
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={pending || index === 0}
            aria-label={`Move ${resource.title} up`}
            className={smallButton}
          >
            <ArrowUp aria-hidden="true" className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={pending || index === groupIds.length - 1}
            aria-label={`Move ${resource.title} down`}
            className={smallButton}
          >
            <ArrowDown aria-hidden="true" className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={() => run(() => setPublishedAction(resource.id, !resource.isPublished))}
            disabled={pending}
            className={smallButton}
          >
            {resource.isPublished ? "Unpublish" : "Publish"}
          </button>

          <button type="button" onClick={() => setEditing(true)} className={smallButton}>
            <Pencil aria-hidden="true" className="size-3.5" />
            Edit
          </button>

          {confirmingDelete ? (
            <span className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={() => run(() => deleteResourceAction(resource.id))}
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
              aria-label={`Delete ${resource.title}`}
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