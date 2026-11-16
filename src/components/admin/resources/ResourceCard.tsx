"use client";

import { useState, useTransition } from "react";
import { ArrowDown, ArrowUp, ExternalLink, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";

import {
  deleteResourceAction,
  reorderResourcesAction,
  setPublishedAction,
  type ActionState,
} from "@/app/(admin)/admin/(dashboard)/resources/actions";
import { AdminDialog } from "@/components/admin/AdminDialog";
import { ActionMenu } from "@/components/admin/ActionMenu";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { Button } from "@/components/ui/Button";
import { resourceGroups } from "@/data/resources";
import { cn } from "@/lib/cn";
import type { AdminResource } from "@/lib/services/resource.service";

import { ResourceForm } from "./ResourceForm";

/**
 * One resource as a card. Tapping it opens the edit dialog (details, order, delete).
 *
 * Props:
 * - index: position within its group
 * - groupIds: ids of every resource in the same group, in display order (used to reorder)
 */
interface ResourceCardProps {
  resource: AdminResource;
  index: number;
  groupIds: string[];
  categories: string[];
}

const groupLabel = (id: string) => resourceGroups.find((group) => group.id === id)?.label ?? id;

export function ResourceCard({ resource, index, groupIds, categories }: ResourceCardProps) {
  const [open, setOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [, startAction] = useTransition();

  const run = (fn: () => Promise<ActionState>) => {
    setActionError(null);
    startAction(async () => {
      const result = await fn();
      if (!result.ok) setActionError(result.error ?? "Something went wrong.");
    });
  };

  const move = (delta: -1 | 1) => {
    const next = [...groupIds];
    const target = index + delta;
    [next[index], next[target]] = [next[target], next[index]];
    run(() => reorderResourcesAction(next));
  };

  return (
    <article id={`resource-${resource.id}`} className="relative scroll-mt-24">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring flex h-full w-full flex-col gap-2 rounded-2xl border border-line bg-white p-4 text-left transition-colors hover:border-muted-soft"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 pr-12 text-base font-semibold text-navy-ink">{resource.title}</h3>
        </div>
        <p className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-soft">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold",
              resource.isPublished ? "bg-indigo-soft text-indigo" : "bg-gold-light text-gold-deep",
            )}
          >
            {resource.isPublished ? "Published" : "Draft"}
          </span>
          {groupLabel(resource.group)} · {resource.category}
        </p>
        <p className="line-clamp-2 text-sm text-muted">{resource.description}</p>
        <p className="mt-auto flex items-center gap-1.5 pt-1 text-xs text-muted-soft">
          {resource.href ? (
            <>
              <ExternalLink aria-hidden="true" className="size-3 shrink-0" />
              <span className="truncate">{resource.href}</span>
            </>
          ) : (
            "No link yet"
          )}
        </p>
      </button>

      <ActionMenu
        label={`Actions for ${resource.title}`}
        className="absolute right-2 top-2 [&>button]:border [&>button]:border-line [&>button]:shadow-none"
        items={[
          { label: "Edit", icon: Pencil, onSelect: () => setOpen(true) },
          {
            label: resource.isPublished ? "Move to drafts" : "Publish",
            icon: resource.isPublished ? EyeOff : Eye,
            onSelect: () => run(() => setPublishedAction(resource.id, !resource.isPublished)),
          },
          {
            label: "Move earlier",
            icon: ArrowUp,
            disabledReason: index === 0 ? "Already first in its group" : undefined,
            onSelect: () => move(-1),
          },
          {
            label: "Move later",
            icon: ArrowDown,
            disabledReason: index === groupIds.length - 1 ? "Already last in its group" : undefined,
            onSelect: () => move(1),
          },
          {
            label: "Delete resource",
            icon: Trash2,
            danger: true,
            confirm: "Delete this resource for good? This can't be undone.",
            onSelect: () => run(() => deleteResourceAction(resource.id)),
          },
        ]}
      />
      {actionError ? (
        <p role="alert" className="mt-1.5 px-1 text-xs text-red-700">
          {actionError}
        </p>
      ) : null}

      <AdminDialog open={open} onOpenChange={setOpen} title="Edit resource" description={resource.title}>
        <ResourceEditor
          resource={resource}
          index={index}
          groupIds={groupIds}
          categories={categories}
          onClose={() => setOpen(false)}
        />
      </AdminDialog>
    </article>
  );
}

function ResourceEditor({
  resource,
  index,
  groupIds,
  categories,
  onClose,
}: ResourceCardProps & { onClose: () => void }) {
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

  return (
    <ResourceForm
      resource={resource}
      categories={categories}
      after={
        <section aria-label="More actions" className="space-y-3 border-t border-line pt-5">
          <h3 className="text-sm font-semibold text-navy-ink">More actions</h3>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="h-11 gap-2"
              disabled={pending || index === 0}
              onClick={() => move(-1)}
            >
              <ArrowUp aria-hidden="true" className="size-4" />
              Move earlier in {groupLabel(resource.group)}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="h-11 gap-2"
              disabled={pending || index === groupIds.length - 1}
              onClick={() => move(1)}
            >
              <ArrowDown aria-hidden="true" className="size-4" />
              Move later
            </Button>
            <ConfirmDelete
              label="Delete resource"
              pending={pending}
              onConfirm={() => run(() => deleteResourceAction(resource.id))}
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
