"use client";

import { startTransition, useActionState, useEffect, useId, useRef, type ReactNode } from "react";

import {
  createEventAction,
  updateEventAction,
  type ActionState,
} from "@/app/(admin)/admin/(dashboard)/events/actions";
import { DialogBody, DialogFooter } from "@/components/admin/AdminDialog";
import { CheckboxRow, Field, inputClass, textareaClass } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";
import { EVENT_LIMITS, EVENT_SUBJECT_IDS, EVENT_SUBJECT_LABELS } from "@/lib/events/constants";
import type { AdminEvent } from "@/lib/services/event.service";

/**
 * Create / edit form for an event. Renders the body AND the pinned footer of an
 * <AdminDialog>, so it must be used directly inside one. Covers are managed by
 * <EventCoverControl />, passed as `before`, because the event has to exist first.
 *
 * Props:
 * - event: pass to edit an existing event; omit to create a new one
 * - before / after: extra content above / below the fields (cover, delete, …)
 * - onDone: called after a successful save (e.g. to close the dialog)
 * - onCancel: closes the dialog without saving
 */
interface EventFormProps {
  event?: AdminEvent;
  before?: ReactNode;
  after?: ReactNode;
  onDone?: () => void;
  onCancel?: () => void;
}

const INITIAL: ActionState = { ok: false };

export function EventForm({ event, before, after, onDone, onCancel }: EventFormProps) {
  const isEdit = Boolean(event);
  const uid = useId();
  const formId = `${uid}-form`;

  const action = event ? updateEventAction.bind(null, event.id) : createEventAction;
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
        {before}

        <form
          id={formId}
          // Submitting through a transition (instead of the form's `action` prop) stops React
          // from clearing the fields when validation fails.
          onSubmit={(submitEvent) => {
            submitEvent.preventDefault();
            const data = new FormData(submitEvent.currentTarget);
            startTransition(() => formAction(data));
          }}
          className="grid gap-5 sm:grid-cols-2"
        >
          <Field label="Title" htmlFor={id("title")} className="sm:col-span-2">
            <input
              id={id("title")}
              name="title"
              required
              maxLength={EVENT_LIMITS.title}
              defaultValue={event?.title}
              placeholder="e.g. Tech Panel 2026"
              className={inputClass}
            />
          </Field>

          <Field label="Description" htmlFor={id("description")} className="sm:col-span-2">
            <textarea
              id={id("description")}
              name="description"
              maxLength={EVENT_LIMITS.description}
              defaultValue={event?.description}
              placeholder="What attendees can expect, or how it went"
              className={textareaClass}
            />
          </Field>

          <Field label="Start date" htmlFor={id("startsOn")} hint="Leave blank if it's still to be announced.">
            <input id={id("startsOn")} name="startsOn" type="date" defaultValue={event?.startsOn} className={inputClass} />
          </Field>

          <Field label="End date" htmlFor={id("endsOn")} hint="Only for events that run over several days.">
            <input id={id("endsOn")} name="endsOn" type="date" defaultValue={event?.endsOn} className={inputClass} />
          </Field>

          <Field label="Start time" htmlFor={id("startTime")} hint="UK time.">
            <input id={id("startTime")} name="startTime" type="time" defaultValue={event?.startTime} className={inputClass} />
          </Field>

          <Field label="End time" htmlFor={id("endTime")} hint="UK time.">
            <input id={id("endTime")} name="endTime" type="time" defaultValue={event?.endTime} className={inputClass} />
          </Field>

          <Field
            label="Date label"
            htmlFor={id("dateLabel")}
            hint="Optional. Replaces the date shown on the site, e.g. July 2026. The dates above still decide when it moves to past."
            className="sm:col-span-2"
          >
            <input
              id={id("dateLabel")}
              name="dateLabel"
              maxLength={EVENT_LIMITS.dateLabel}
              defaultValue={event?.dateLabel}
              className={inputClass}
            />
          </Field>

          <Field label="Location" htmlFor={id("location")}>
            <input
              id={id("location")}
              name="location"
              maxLength={EVENT_LIMITS.location}
              defaultValue={event?.location}
              placeholder="e.g. Online"
              className={inputClass}
            />
          </Field>

          <Field label="Host" htmlFor={id("hostName")} hint="Defaults to CAPP.">
            <input
              id={id("hostName")}
              name="hostName"
              maxLength={EVENT_LIMITS.hostName}
              defaultValue={event?.hostName}
              placeholder="CAPP"
              className={inputClass}
            />
          </Field>

          <Field
            label="Tags"
            htmlFor={id("tags")}
            hint="Separate with commas. The first one acts as the category."
            className="sm:col-span-2"
          >
            <input
              id={id("tags")}
              name="tags"
              defaultValue={event?.tags.join(", ")}
              placeholder="e.g. Panel, Careers"
              className={inputClass}
            />
          </Field>

          <fieldset className="sm:col-span-2">
            <legend className="mb-1.5 block text-sm font-medium text-navy-ink">Subject pages</legend>
            <div className="grid grid-cols-2 gap-2">
              {EVENT_SUBJECT_IDS.map((subject) => (
                <CheckboxRow
                  key={subject}
                  id={id(`subject-${subject}`)}
                  name="subjects"
                  value={subject}
                  label={EVENT_SUBJECT_LABELS[subject]}
                  defaultChecked={event?.subjects.includes(subject) ?? false}
                />
              ))}
            </div>
            <p className="mt-1.5 text-xs text-muted">Every published event also appears on /events.</p>
          </fieldset>

          <Field
            label="Sign-up link"
            htmlFor={id("signupUrl")}
            hint="Shown while the event is upcoming. https://… or an internal path like /events."
          >
            <input
              id={id("signupUrl")}
              name="signupUrl"
              type="text"
              inputMode="url"
              maxLength={EVENT_LIMITS.url}
              defaultValue={event?.signupUrl}
              placeholder="https://lu.ma/…"
              className={inputClass}
            />
          </Field>

          <Field
            label="Recap link"
            htmlFor={id("recapUrl")}
            hint="Shown once the event has ended. https://… or an internal path."
          >
            <input
              id={id("recapUrl")}
              name="recapUrl"
              type="text"
              inputMode="url"
              maxLength={EVENT_LIMITS.url}
              defaultValue={event?.recapUrl}
              className={inputClass}
            />
          </Field>

          {isEdit ? (
            <Field
              label="Cover description"
              htmlFor={id("coverAlt")}
              hint="Alt text for people using screen readers."
              className="sm:col-span-2"
            >
              <input
                // Reset when the cover changes, which clears its description on the server.
                key={event?.coverUrl ?? "no-cover"}
                id={id("coverAlt")}
                name="coverAlt"
                maxLength={EVENT_LIMITS.coverAlt}
                defaultValue={event?.coverAlt}
                className={inputClass}
              />
            </Field>
          ) : (
            <p className="text-xs text-muted sm:col-span-2">You can add a cover image once the event is created.</p>
          )}

          <div className="sm:col-span-2">
            <CheckboxRow
              id={id("isPublished")}
              name="isPublished"
              label={isEdit ? "Published (visible on /events)" : "Publish immediately"}
              defaultChecked={event?.isPublished ?? false}
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
            {pending ? "Saving…" : isEdit ? "Save changes" : "Create event"}
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}
