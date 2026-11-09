import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { getCappAdminStatus } from "@/lib/auth/admin";
import { eventCoverPrefix, isValidEventId } from "@/lib/events/constants";
import { validateImageUpload } from "@/lib/media/validate-upload";
import { EventServiceError, eventExists, setEventCover } from "@/lib/services/event.service";

/**
 * Uploads an event's cover image. A route handler rather than a server action
 * because of the action body limit. The event must already exist: its id is part
 * of the blob path.
 */
export async function POST(request: Request) {
  // verify authentication and administrator permissions
  const { user, isAdmin } = await getCappAdminStatus();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  if (!isAdmin) {
    return NextResponse.json({ error: "Administrator permissions required." }, { status: 403 });
  }

  // parse the submitted form.
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("file");
  const eventId = formData.get("eventId");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Please provide an image file." }, { status: 400 });
  }

  // checked before the id is used to build a blob path.
  if (!isValidEventId(eventId)) {
    return NextResponse.json({ error: "A valid event is required." }, { status: 400 });
  }

  const validation = await validateImageUpload(file);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { buffer, mime, extension } = validation.image;

  try {
    if (!(await eventExists(eventId))) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }
  } catch (error) {
    const message = error instanceof EventServiceError ? error.message : "Unable to look up the event.";
    console.error("Event lookup failed:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // upload the validated image to Vercel Blob.
  let uploadedBlob: { url: string; pathname: string };

  try {
    uploadedBlob = await put(
      `${eventCoverPrefix(eventId)}${crypto.randomUUID()}.${extension}`,
      buffer,
      {
        access: "public",
        addRandomSuffix: false,
        contentType: mime,
      },
    );
  } catch (error) {
    console.error("Blob upload failed:", error);
    return NextResponse.json({ error: "Image upload failed." }, { status: 502 });
  }

  // update Supabase only after the upload succeeds.
  try {
    await setEventCover(eventId, uploadedBlob);
  } catch (error) {
    console.error("Event cover update failed:", error);

    // remove the newly uploaded Blob if the database update fails
    try {
      await del(uploadedBlob.url);
    } catch (cleanupError) {
      console.error("Blob cleanup failed:", cleanupError);
    }

    const message = error instanceof EventServiceError ? error.message : "Unable to save the cover.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ success: true, url: uploadedBlob.url });
}
