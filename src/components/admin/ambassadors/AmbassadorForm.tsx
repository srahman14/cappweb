"use client";

import { startTransition, useActionState, useEffect, useId, useRef, type ReactNode } from "react";

import {
  createAmbassadorAction,
  updateAmbassadorAction,
  type ActionState,
} from "@/app/(admin)/admin/(dashboard)/ambassadors/actions";
import { DialogBody, DialogFooter } from "@/components/admin/AdminDialog";
import { CheckboxRow, Field, inputClass, selectClass, textareaClass } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";
import type { AdminAmbassador } from "@/lib/services/team.service";
import { TEAM_LIMITS, TEAM_SUBJECT_IDS, TEAM_SUBJECT_LABELS } from "@/lib/team/constants";
import type { TeamSubjectId } from "@/data/team";

/**
 * Add / edit form for an ambassador. Renders the body AND the pinned footer of an
 * <AdminDialog>, so it must be used directly inside one.
 *
 * Only the name and subject are required. The role, one-liner and LinkedIn link are
 * optional: people who don't want a LinkedIn link shown simply leave it blank.
 */
interface AmbassadorFormProps {
  person?: AdminAmbassador;
  defaultSubject?: TeamSubjectId;
  after?: ReactNode;
  onDone?: () => void;
  onCancel?: () => void;
}

const INITIAL: ActionState = { ok: false };

export function AmbassadorForm({ person, defaultSubject, after, onDone, onCancel }: AmbassadorFormProps) {
  const isEdit = Boolean(person);
  const uid = useId();
  const formId = `${uid}-form`;

  const action = person ? updateAmbassadorAction.bind(null, person.id) : createAmbassadorAction;
  const [state, formAction, pending] = useActionState(action, INITIAL);

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
          // A transition (instead of the form's `action` prop) stops React clearing the
          // fields when validation fails.
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            startTransition(() => formAction(data));
          }}
          className="grid gap-5"
        >
          <Field label="Name" htmlFor={id("name")}>
            <input
              id={id("name")}
              name="name"
              required
              maxLength={TEAM_LIMITS.name}
              defaultValue={person?.name}
              autoComplete="off"
              placeholder="e.g. Aisha Khan"
              className={inputClass}
            />
          </Field>

          <Field label="Subject" htmlFor={id("subject")} hint="Which tab they appear under on the team page.">
            <select
              id={id("subject")}
              name="subject"
              required
              defaultValue={person?.subject ?? defaultSubject ?? TEAM_SUBJECT_IDS[0]}
              className={selectClass}
            >
              {TEAM_SUBJECT_IDS.map((subject) => (
                <option key={subject} value={subject}>
                  {TEAM_SUBJECT_LABELS[subject]}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Role (optional)"
            htmlFor={id("role")}
            hint="Leave blank for “<Subject> Ambassador”, or write something like “Tech Lead”. Each word gets a capital letter automatically."
          >
            <input
              id={id("role")}
              name="role"
              maxLength={TEAM_LIMITS.role}
              defaultValue={person?.role}
              className={inputClass}
            />
          </Field>

          <Field
            label="One-liner (optional)"
            htmlFor={id("oneLiner")}
            hint="Why they joined CAPP, or what they love about it. Leave blank to show nothing."
          >
            <textarea
              id={id("oneLiner")}
              name="oneLiner"
              maxLength={TEAM_LIMITS.oneLiner}
              defaultValue={person?.oneLiner}
              className={textareaClass}
            />
          </Field>

          <Field
            label="LinkedIn (optional)"
            htmlFor={id("linkedin")}
            hint="Leave blank if they'd rather not share it. The LinkedIn icon then isn't shown."
          >
            <input
              id={id("linkedin")}
              name="linkedin"
              type="text"
              inputMode="url"
              autoComplete="off"
              defaultValue={person?.linkedin}
              placeholder="https://www.linkedin.com/in/…"
              className={inputClass}
            />
          </Field>

          <CheckboxRow
            id={id("isPublished")}
            name="isPublished"
            label="Show on the team page"
            defaultChecked={person?.isPublished ?? true}
          />
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
            {pending ? "Saving…" : isEdit ? "Save changes" : "Add to team"}
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}
