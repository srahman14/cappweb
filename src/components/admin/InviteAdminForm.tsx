"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { inviteAdminAction, type ActionState } from "@/app/(admin)/admin/(dashboard)/team/actions";
import { TextField } from "./TextField";

export function InviteAdminForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(inviteAdminAction, { ok: false });

  return (
    <form action={formAction} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:p-5">
      <div className="flex-1">
        <TextField id="invite-email" name="email" label="Email address" type="email" required
          invalid={Boolean(state.error)} />
      </div>
      <Button type="submit" variant="primary" size="sm" disabled={pending} className="h-11 gap-2 sm:min-w-36">
        {pending && <Loader2 aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />}
        Send invite
      </Button>
      <div role="status" className="text-sm sm:basis-full">
        {state.error && <p className="text-danger">{state.error}</p>}
        {state.message && <p className="text-muted">{state.message}</p>}
      </div>
    </form>
  );
}
