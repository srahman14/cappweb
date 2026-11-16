"use client";

import { useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Link2Off, Pencil, Trash2 } from "lucide-react";

import {
  deleteAmbassadorAction,
  reorderAmbassadorsAction,
  setAmbassadorPublishedAction,
  type ActionState,
} from "@/app/(admin)/admin/(dashboard)/ambassadors/actions";
import { ActionMenu } from "@/components/admin/ActionMenu";
import { AdminDialog } from "@/components/admin/AdminDialog";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { cn } from "@/lib/cn";
import type { AdminAmbassador } from "@/lib/services/team.service";
import { TEAM_SUBJECT_LABELS } from "@/lib/team/constants";

import { AmbassadorForm } from "./AmbassadorForm";

/**
 * One ambassador as a card. Tap to edit; the "⋮" menu has the quick actions.
 * index / subjectIds: position within their subject and the ids of that subject in order.
 */
interface AmbassadorCardProps {
  person: AdminAmbassador;
  index: number;
  subjectIds: string[];
}

export function AmbassadorCard({ person, index, subjectIds }: AmbassadorCardProps) {
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
    const next = [...subjectIds];
    const target = index + delta;
    [next[index], next[target]] = [next[target], next[index]];
    run(() => reorderAmbassadorsAction(next));
  };

  return (
    <article id={`ambassador-${person.id}`} className="relative scroll-mt-24">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring flex h-full w-full flex-col gap-2 rounded-2xl border border-line bg-white p-4 text-left transition-colors hover:border-muted-soft"
      >
        <h3 className="line-clamp-2 pr-12 text-base font-semibold text-navy-ink">{person.name}</h3>
        <p className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-soft">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold",
              person.isPublished ? "bg-indigo-soft text-indigo" : "bg-gold-light text-gold-deep",
            )}
          >
            {person.isPublished ? "Shown" : "Hidden"}
          </span>
          {TEAM_SUBJECT_LABELS[person.subject]} · {person.role}
        </p>
        {person.oneLiner ? (
          <p className="line-clamp-2 text-sm text-muted">{person.oneLiner}</p>
        ) : (
          <p className="text-sm text-muted-soft">No one-liner</p>
        )}
        <p className="mt-auto flex items-center gap-1.5 pt-1 text-xs text-muted-soft">
          {person.linkedin ? (
            <span className="truncate">{person.linkedin.replace(/^https:\/\/(www\.)?/, "")}</span>
          ) : (
            <>
              <Link2Off aria-hidden="true" className="size-3 shrink-0" />
              No LinkedIn
            </>
          )}
        </p>
      </button>

      <ActionMenu
        label={`Actions for ${person.name}`}
        className="absolute right-2 top-2 [&>button]:border [&>button]:border-line [&>button]:shadow-none"
        items={[
          { label: "Edit", icon: Pencil, onSelect: () => setOpen(true) },
          {
            label: person.isPublished ? "Hide from team page" : "Show on team page",
            icon: person.isPublished ? EyeOff : Eye,
            onSelect: () => run(() => setAmbassadorPublishedAction(person.id, !person.isPublished)),
          },
          {
            label: "Move earlier",
            icon: ArrowUp,
            disabledReason: index === 0 ? "Already first in their subject" : undefined,
            onSelect: () => move(-1),
          },
          {
            label: "Move later",
            icon: ArrowDown,
            disabledReason: index === subjectIds.length - 1 ? "Already last in their subject" : undefined,
            onSelect: () => move(1),
          },
          {
            label: "Remove from team",
            icon: Trash2,
            danger: true,
            confirm: `Remove ${person.name} for good? This can't be undone.`,
            onSelect: () => run(() => deleteAmbassadorAction(person.id)),
          },
        ]}
      />
      {actionError ? (
        <p role="alert" className="mt-1.5 px-1 text-xs text-red-700">
          {actionError}
        </p>
      ) : null}

      <AdminDialog open={open} onOpenChange={setOpen} title="Edit team member" description={person.name}>
        <AmbassadorForm
          person={person}
          after={
            <section aria-label="More actions" className="border-t border-line pt-5">
              <ConfirmDelete
                label="Remove from team"
                onConfirm={() => run(() => deleteAmbassadorAction(person.id))}
              />
            </section>
          }
          onDone={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </AdminDialog>
    </article>
  );
}
