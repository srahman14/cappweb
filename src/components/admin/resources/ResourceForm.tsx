"use client";

import { startTransition, useActionState, useEffect, useId, useRef } from "react";

import {
  createResourceAction,
  updateResourceAction,
  type ActionState,
} from "@/app/(admin)/admin/(dashboard)/resources/actions";
import { Button } from "@/components/ui/Button";
import { resourceGroups } from "@/data/resources";
import { RESOURCE_ICONS } from "@/lib/resources/constants";
import type { AdminResource } from "@/lib/services/resource.service";
import type { ResourceGroup } from "@/types";

/**
 * Create / edit form for a library resource.
 *
 * Props:
 * - resource: pass to edit an existing resource; omit to create a new one
 * - categories: existing categories, offered as suggestions (any new text is allowed)
 * - defaultGroup: group preselected when creating (e.g. when adding from inside a group)
 * - onDone: called after a successful save (e.g. to close the editor)
 * - onCancel: shows a Cancel button when provided
 *
 * Usage: <ResourceForm categories={categories} />
 *        <ResourceForm resource={r} categories={categories} onDone={close} onCancel={close} />
 */
interface ResourceFormProps {
  resource?: AdminResource;
  categories: string[];
  defaultGroup?: ResourceGroup;
  onDone?: () => void;
  onCancel?: () => void;
}

const INITIAL: ActionState = { ok: false };

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-navy-ink placeholder:text-muted-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo";

function Field({
  label,
  htmlFor,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
      </label>
      {children}
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

export function ResourceForm({
  resource,
  categories,
  defaultGroup,
  onDone,
  onCancel,
}: ResourceFormProps) {
  const isEdit = Boolean(resource);
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const action = resource ? updateResourceAction.bind(null, resource.id) : createResourceAction;
  const [state, formAction, pending] = useActionState(action, INITIAL);

  // Keep the latest callback without re-running the success effect when it changes.
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    if (!state.ok) return;
    if (!isEdit) formRef.current?.reset();
    onDoneRef.current?.();
  }, [state, isEdit]);

  const id = (name: string) => `${uid}-${name}`;

  return (
    <form
      ref={formRef}
      // Submitting through a transition (instead of the form's `action` prop) stops React
      // from clearing the fields when validation fails.
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => formAction(data));
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      <Field label="Title" htmlFor={id("title")} className="sm:col-span-2">
        <input
          id={id("title")}
          name="title"
          required
          defaultValue={resource?.title}
          placeholder="e.g. CAPP CV guide: tailoring your CV for ATS"
          className={inputClass}
        />
      </Field>

      <Field label="Description" htmlFor={id("description")} className="sm:col-span-2">
        <textarea
          id={id("description")}
          name="description"
          required
          rows={2}
          defaultValue={resource?.description}
          placeholder="One line on what this is and who it helps"
          className={inputClass}
        />
      </Field>

      <Field label="Group" htmlFor={id("group")}>
        <select
          id={id("group")}
          name="group"
          defaultValue={resource?.group ?? defaultGroup ?? "capp"}
          className={inputClass}
        >
          {resourceGroups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Category"
        htmlFor={id("category")}
        hint="Becomes a sidebar option. Type a new one to create it."
      >
        <input
          id={id("category")}
          name="category"
          required
          list={id("categories")}
          defaultValue={resource?.category}
          placeholder="e.g. CV and ATS"
          className={inputClass}
        />
        <datalist id={id("categories")}>
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </Field>

      <Field
        label="Link"
        htmlFor={id("href")}
        hint="https://… or an internal path like /events. Leave blank until it exists."
        className="sm:col-span-2"
      >
        <input
          id={id("href")}
          name="href"
          type="text"
          inputMode="url"
          defaultValue={resource?.href}
          placeholder="https://docs.google.com/…"
          className={inputClass}
        />
      </Field>

      <Field label="Icon" htmlFor={id("icon")}>
        <select
          id={id("icon")}
          name="icon"
          defaultValue={resource?.icon ?? "document"}
          className={inputClass}
        >
          {RESOURCE_ICONS.map((icon) => (
            <option key={icon} value={icon}>
              {icon.charAt(0).toUpperCase() + icon.slice(1)}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Display order"
        htmlFor={id("sortOrder")}
        hint={isEdit ? "Lower numbers appear first." : "Leave blank to add at the end of the group."}
      >
        <input
          id={id("sortOrder")}
          name="sortOrder"
          type="number"
          step={1}
          defaultValue={resource?.sortOrder}
          className={inputClass}
        />
      </Field>

      <div className="flex items-center gap-2 sm:col-span-2">
        <input
          id={id("isPublished")}
          name="isPublished"
          type="checkbox"
          defaultChecked={resource?.isPublished ?? false}
          className="size-4 rounded border-line accent-indigo"
        />
        <label htmlFor={id("isPublished")} className="text-sm text-navy">
          {isEdit ? "Published (visible on /resources)" : "Publish immediately"}
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "Saving…" : isEdit ? "Save changes" : "Create resource"}
        </Button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
          >
            Cancel
          </button>
        ) : null}

        <p role="status" aria-live="polite" className="text-sm">
          {state.error ? (
            <span role="alert" className="text-red-700">
              {state.error}
            </span>
          ) : state.ok && state.message ? (
            <span className="text-muted">{state.message}</span>
          ) : null}
        </p>
      </div>
    </form>
  );
}