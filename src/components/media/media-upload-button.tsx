"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ACCEPTED_TYPES, ACCEPTED_TYPES_LABEL, MAX_UPLOAD_BYTES } from "@/lib/media/constants";

type MediaUploadButtonProps = {
  slotKey: string;
  /** Human-readable slot name, used in the accessible name and status text. */
  slotLabel: string;
  hasImage: boolean;
};

const MAX_UPLOAD_MB = MAX_UPLOAD_BYTES / (1024 * 1024);

export default function MediaUploadButton({
  slotKey,
  slotLabel,
  hasImage,
}: MediaUploadButtonProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const hintId = `${id}-hint`;
  const feedbackId = `${id}-feedback`;

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");

    // Basic client-side checks for a better user experience.
    // The server must independently validate every uploaded file.
    if (!(ACCEPTED_TYPES as readonly string[]).includes(file.type)) {
      setError(`Choose a ${ACCEPTED_TYPES_LABEL} image.`);
      event.target.value = "";
      return;
    }

    if (file.size === 0 || file.size > MAX_UPLOAD_BYTES) {
      setError(
        file.size === 0
          ? "This file is empty. Choose another image."
          : `This image is ${(file.size / (1024 * 1024)).toFixed(1)} MB. The limit is ${MAX_UPLOAD_MB} MB.`
      );
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("slotKey", slotKey);

    setUploading(true);

    try {
      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "Upload failed. Please try again.");
        return;
      }

      setSuccess("Image updated");

      // Refresh server-rendered media records.
      router.refresh();
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);

      // Allows the same file to be selected again.
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  const Icon = uploading ? Loader2 : hasImage ? RefreshCw : Upload;

  return (
    <div aria-busy={uploading} className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />

      <Button
        type="button"
        variant={hasImage ? "secondary" : "primary"}
        size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        aria-describedby={`${hintId} ${feedbackId}`}
        className="w-full gap-2"
      >
        <Icon
          aria-hidden="true"
          className={uploading ? "size-4 animate-spin motion-reduce:animate-none" : "size-4"}
        />
        {uploading ? "Uploading…" : hasImage ? "Replace image" : "Upload image"}
        <span className="sr-only"> for {slotLabel}</span>
      </Button>

      <p id={hintId} className="text-xs text-muted">
        {ACCEPTED_TYPES_LABEL} · max {MAX_UPLOAD_MB} MB
      </p>

      {/* Always mounted so screen readers announce changes reliably. */}
      <div id={feedbackId} className="min-h-4">
        <div role="alert">
          {error && (
            <p className="flex gap-1.5 text-xs text-danger">
              <AlertCircle aria-hidden="true" className="mt-px size-3.5 shrink-0" />
              {error}
            </p>
          )}
        </div>
        <div role="status">
          {uploading && <span className="sr-only">Uploading image for {slotLabel}…</span>}
          {success && !uploading && (
            <p className="flex items-center gap-1.5 text-xs text-success">
              <CheckCircle2 aria-hidden="true" className="size-3.5 shrink-0" />
              {success}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
