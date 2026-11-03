import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { requireAdmin } from "@/lib/auth/admin";
import { getMediaSlots } from "@/lib/services/media.service";
import MediaUploadButton from "@/components/media/media-upload-button";
import { MediaImage } from "@/components/media/MediaImage";

export const metadata: Metadata = {
  title: "Media",
};

export default function AdminMediaPage() {
  return (
    <>
      <AdminPageHeader
        title="Media"
        description="Images used across the CAPP website. Uploads go live on the next page refresh."
      />
      <Suspense fallback={<p className="text-sm text-muted">Loading media…</p>}>
        <AdminMediaContent />
      </Suspense>
    </>
  );
}

async function AdminMediaContent() {
  await requireAdmin();

  const mediaSlots = await getMediaSlots();

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {mediaSlots.map((slot) => (
        <article
          key={slot.id}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white"
        >
          <div className="relative flex aspect-video items-center justify-center bg-gray-100">
            {slot.blob_url ? (
              <MediaImage
                src={slot.blob_url}
                alt={slot.alt_text ?? ""}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <span className="text-sm text-gray-500">
                No image uploaded
              </span>
            )}
          </div>

          <div className="space-y-2 p-4">
            <h2 className="font-semibold">
              {slot.label || slot.slot_key}
            </h2>

            <p className="text-sm text-gray-500">
              {slot.slot_key}
            </p>

            {slot.description && (
              <p className="text-sm text-gray-600">
                {slot.description}
              </p>
            )}

            <p className="text-xs text-gray-400">
              {slot.blob_url ? "Image configured" : "Awaiting image"}
            </p>

            <MediaUploadButton
                slotKey={slot.slot_key}
                hasImage={Boolean(slot.blob_url)}
              />
          </div>
        </article>
      ))}
    </div>
  );
}
