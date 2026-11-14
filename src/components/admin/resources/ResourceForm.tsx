"use client";

import { startTransition, useActionState, useEffect, useId, useRef, type ReactNode } from "react";

import {
  createResourceAction,
  updateResourceAction,
  type ActionState,
} from "@/app/(admin)/admin/(dashboard)/resources/actions";
import { DialogBody, DialogFooter } from "@/components/admin/AdminDialog";
import { CheckboxRow, Field, inputClass, selectClass, textareaClass } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";
import { resourceGroups } from "@/data/resources";
import { RESOURCE_ICONS } from "@/lib/resources/constants";
import type { AdminResource } from "@/lib/services/resource.service";
import type { ResourceGroup } from "@/types";

/**
 * Create / edit form for a library resource. Renders the body AND the pinned footer of
 * an <AdminDialog>, so it must be used directly inside one.
 *
 * Props:
 * - resource: pass to edit an existing resource; omit to create a new one
 * - categories: existing categories, offered as suggestions (any new text is allowed)
 * - defaultGroup: group preselected when creating
 * - after: extra content below the fields (reorder, delete, …)
 * - onDone: called after a successful save (e.g. to close the dialog)
 * - onCancel: closes the dialog without saving
 */
interface ResourceFormProps {
  resource?: AdminResource;
  categories: string[];
  defaultGroup?: ResourceGroup;
  after?: ReactNode;
  onDone?: () => void;
  onCancel?: () => void;
}

const INITIAL: ActionState = { ok: false };

export function ResourceForm({ resource, categories, defaultGroup, after, onDone, onCancel }: ResourceFormProps) {
  const isEdit = Boolean(resource);
  const uid = useId();
  const formId = `${uid}-form`;

  const action = resource ? updateResourceAction.bind(null, resource.id) : createResourceAction;
  const [state, formAction, pending] = useActionState(action, INITIAL);

  // Keep the latest callback without re-running the success effect when it changes.
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    if (state.ok) onDoneRef.current?.();
  }, [state]);

  const id = (name: string) => `${uid}-${name}`;

  return (
    <>
      <DialogBody>
        <form
          id={formId}
          // Submitting through a transition (instead of the form's `action` prop) stops React
          // from clearing the fields when validation fails.
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            startTransition(() => formAction(data));
          }}
          className="grid gap-5 sm:grid-cols-2"
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
              defaultValue={resource?.description}
              placeholder="One line on what this is and who it helps"
              className={textareaClass}
            />
          </Field>

          <Field label="Group" htmlFor={id("group")}>
            <select
              id={id("group")}
              name="group"
              defaultValue={resource?.group ?? defaultGroup ?? "capp"}
              className={selectClass}
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
            hint="Pick an existing one or type a new one."
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
            <select id={id("icon")} name="icon" defaultValue={resource?.icon ?? "document"} className={selectClass}>
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
              inputMode="numeric"
              step={1}
              defaultValue={resource?.sortOrder}
              className={inputClass}
            />
          </Field>

          <div className="sm:col-span-2">
            <CheckboxRow
              id={id("isPublished")}
              name="isPublished"
              label={isEdit ? "Published (visible on /resources)" : "Publish immediately"}
              defaultChecked={resource?.isPublished ?? false}
            />
          </div>
        </form>

        {after}
      </DialogBody>

      <DialogFooter>
        <p role="status" aria-live="polite" className="mb-2 min-h-5 text-sm">
          {state.error ? (
            <span role="alert" className="text-red-700">
              {state.error}
            </span>
          ) : state.ok && state.message ? (
            <span className="text-muted">{state.message}</span>
          ) : null}
        </p>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {onCancel ? (
            <Button type="button" variant="secondary" size="sm" className="h-11" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
          <Button type="submit" form={formId} size="sm" className="h-11 sm:min-w-36" disabled={pending}>
            {pending ? "Saving…" : isEdit ? "Save changes" : "Create resource"}
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}
