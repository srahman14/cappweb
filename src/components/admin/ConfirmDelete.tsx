"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";

/** Two-step delete: first tap asks, second tap deletes. Big enough for a thumb. */
export function ConfirmDelete({
  label,
  pending,
  onConfirm,
}: {
  label: string;
  pending?: boolean;
  onConfirm: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="focus-ring inline-flex h-11 items-center gap-2 rounded-full border border-red-200 bg-white px-4 text-sm font-semibold text-red-700 hover:bg-red-50"
      >
        <Trash2 aria-hidden="true" className="size-4" />
        {label}
      </button>
    );
  }

  return (
    <div className="space-y-2 rounded-xl border border-red-200 bg-red-50 p-3">
      <p className="text-sm text-red-800">This can&apos;t be undone. Delete it for good?</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onConfirm}
          disabled={pending}
          className="focus-ring h-11 flex-1 rounded-full bg-red-700 px-4 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-60"
        >
          {pending ? "Deleting…" : "Yes, delete"}
        </button>
        <Button type="button" variant="secondary" size="sm" className="h-11 flex-1" onClick={() => setConfirming(false)}>
          Keep it
        </Button>
      </div>
    </div>
  );
}
