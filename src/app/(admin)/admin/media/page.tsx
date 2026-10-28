import { connection } from "next/server";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCappAdminStatus } from "@/lib/auth/admin";
import { getMediaSlots } from "@/lib/services/media.service";
import LogoutButton from "@/components/admin/logout-button";


export default function AdminMediaPage() {
  return (
    <Suspense
      fallback={
        <main className="p-8">
          <p>Loading media management...</p>
        </main>
      }
    >
      <AdminMediaContent />
    </Suspense>
  );
}

async function AdminMediaContent() {
  await connection();

  const { user, isAdmin } = await getCappAdminStatus();

  // Unauthenticated visitors must sign in.
  if (!user) {
    redirect("/admin/login");
  }

  // A signed-in user is not necessarily an administrator.
  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-3xl p-8">
        <h1 className="text-2xl font-semibold">
          Access denied
        </h1>

        <p className="mt-2 text-gray-600">
          Your account does not have permission to manage CAPP media.
        </p>
      </main>
    );
  }

  const mediaSlots = await getMediaSlots();

  return (
    <main className="mx-auto max-w-6xl p-8">
      <header className="mb-8">
        <p className="text-sm text-gray-500">
          CAPP / Administration
        </p>

        <h1 className="mt-2 text-3xl font-semibold">
          Media management
        </h1>

        <p className="mt-2 text-gray-600">
          Manage the images used across the CAPP website.
        </p>
      </header>

      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Signed in as {user.email}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {mediaSlots.length} media slots configured
        </p>

        <LogoutButton />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mediaSlots.map((slot) => (
          <article
            key={slot.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            <div className="flex aspect-video items-center justify-center bg-gray-100">
              {slot.blob_url ? (
                <img
                  src={slot.blob_url}
                  alt={slot.alt_text ?? ""}
                  className="h-full w-full object-cover"
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
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}