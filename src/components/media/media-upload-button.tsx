"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type MediaUploadButtonProps = {
  slotKey: string;
  hasImage: boolean;
};

export default function MediaUploadButton({
  slotKey,
  hasImage,
}: MediaUploadButtonProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

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
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Choose a JPEG, PNG, WebP or GIF image.");
      event.target.value = "";
      return;
    }

    if (file.size === 0 || file.size > 5 * 1024 * 1024) {
      setError("The image must be smaller than 5 MB.");
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
        setError(result.error ?? "Image upload failed.");
        return;
      }

      setSuccess("Image uploaded successfully.");

      // Refresh server-rendered media records.
      router.refresh();
    } catch {
      setError("Unable to upload the image. Please try again.");
    } finally {
      setUploading(false);

      // Allows the same file to be selected again.
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="mt-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
        aria-label={`Choose image for ${slotKey}`}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {uploading
          ? "Uploading..."
          : hasImage
            ? "Replace image"
            : "Upload image"}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="mt-2 text-sm text-green-700">
          {success}
        </p>
      )}
    </div>
  );
}