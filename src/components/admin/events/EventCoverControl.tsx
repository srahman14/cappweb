"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCw, Trash2, Upload } from "lucide-react";

import { removeCoverAction } from "@/app/(admin)/admin/(dashboard)/events/actions";
import { ACCEPTED_TYPES, ACCEPTED_TYPES_LABEL, MAX_UPLOAD_BYTES } from "@/lib/media/constants";
import type { AdminEvent } from "@/lib/services/event.service";

/**
 * Upload, replace or remove an event's cover. Uploads go through the route handler,
 * which validates the file again; a server action's body limit is too small.
 *
 * Usage: <EventCoverControl event={event} />
 */
interface EventCoverControlProps {
  event: AdminEvent;
}

const MAX_UPLOAD_MB = MAX_UPLOAD_BYTES / (1024 * 1024);

const smallButton =
  "inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:bg-indigo-soft disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo";

export function EventCoverControl({ event }: EventCoverControlProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [removing, startRemoving] = useTransition();

  const busy = uploading || removing;

  async function handleFileChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const file = changeEvent.target.files?.[0];
    if (!file) return;

    setError("");

    // Basic client-side checks for a better experience. The route validates everything itself.
    if (!(ACCEPTED_TYPES as readonly string[]).includes(file.type)) {
      setError(`Choose a ${ACCEPTED_TYPES_LABEL} image.`);
      changeEvent.target.value = "";
      return;
    }

    if (file.size === 0 || file.size > MAX_UPLOAD_BYTES) {
      setError(
        file.size === 0
          ? "This file is empty. Choose another image."
          : `This image is ${(file.size / (1024 * 1024)).toFixed(1)} MB. The limit is ${MAX_UPLOAD_MB} MB.`,
      );
      changeEvent.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("eventId", event.id);

    setUploading(true);

    try {
      const response = await fetch("/api/admin/events/cover", { method: "POST", body: formData });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setError(result?.error ?? "Upload failed. Please try again.");
        return;
      }

      router.refresh();
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);

      // Allows the same file to be selected again.
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemove() {
    setError("");
    startRemoving(async () => {
      const result = await removeCoverAction(event.id);
      if (!result.ok) setError(result.error ?? "Something went wrong.");
    });
  }

  const Icon = uploading ? Loader2 : event.coverUrl ? RefreshCw : Upload;

  return (
    <div aria-busy={busy} className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-indigo-soft sm:w-40">
        {event.coverUrl ? (
          <Image
            src={event.coverUrl}
            alt={event.coverAlt}
            fill
            sizes="(min-width: 640px) 160px, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-xs text-muted">No cover</span>
        )}
      </div>

      <div className="min-w-0 space-y-2">
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleFileChange}
          disabled={busy}
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
        />

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className={smallButton}
          >
            <Icon
              aria-hidden="true"
              className={uploading ? "size-3.5 animate-spin motion-reduce:animate-none" : "size-3.5"}
            />
            {uploading ? "Uploading…" : event.coverUrl ? "Replace cover" : "Upload cover"}
            <span className="sr-only"> for {event.title}</span>
          </button>

          {event.coverUrl ? (
            <button type="button" onClick={handleRemove} disabled={busy} className={smallButton}>
              <Trash2 aria-hidden="true" className="size-3.5" />
              {removing ? "Removing…" : "Remove cover"}
              <span className="sr-only"> from {event.title}</span>
            </button>
          ) : null}
        </div>

        <p className="text-xs text-muted">
          {ACCEPTED_TYPES_LABEL} · max {MAX_UPLOAD_MB} MB
        </p>

        <div role="alert">{error ? <p className="text-sm text-red-700">{error}</p> : null}</div>
      </div>
    </div>
  );
}
