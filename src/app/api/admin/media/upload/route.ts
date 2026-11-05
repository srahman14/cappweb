import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getCappAdminStatus } from "@/lib/auth/admin";
import { validateImageUpload } from "@/lib/media/validate-upload";

export async function POST(request: Request) {
  // verify authentication and administrator permissions
  const { user, isAdmin } = await getCappAdminStatus();

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  if (!isAdmin) {
    return NextResponse.json(
      { error: "Administrator permissions required." },
      { status: 403 }
    );
  }

  // parse the submitted form.
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid form data." },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  const slotKey = formData.get("slotKey");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Please provide an image file." },
      { status: 400 }
    );
  }

  if (typeof slotKey !== "string" || !slotKey.trim()) {
    return NextResponse.json(
      { error: "A media slot is required." },
      { status: 400 }
    );
  }

  // validate the file itself.
  const validation = await validateImageUpload(file);

  if (!validation.ok) {
    return NextResponse.json(
      { error: validation.error },
      { status: 400 }
    );
  }

  const { buffer, mime, extension } = validation.image;

  // look up the requested media slot
  const supabase = await createClient();

  const { data: slot, error: slotError } = await supabase
    .from("media_assets")
    .select("id, slot_key")
    .eq("slot_key", slotKey)
    .maybeSingle();

  if (slotError) {
    console.error("Media slot lookup failed:", slotError.message);

    return NextResponse.json(
      { error: "Unable to look up the media slot." },
      { status: 500 }
    );
  }

  if (!slot) {
    return NextResponse.json(
      { error: "Media slot not found." },
      { status: 404 }
    );
  }

  // upload the validated image to Vercel Blob.
  let uploadedBlob: { url: string; pathname: string };

  try {
    uploadedBlob = await put(
      `capp-media/${slot.slot_key}/${crypto.randomUUID()}.${extension}`,
      buffer,
      {
        access: "public",
        addRandomSuffix: false,
        contentType: mime,
      }
    );
  } catch (error) {
    console.error("Blob upload failed:", error);

    return NextResponse.json(
      { error: "Image upload failed." },
      { status: 502 }
    );
  }

  // update Supabase only after the upload succeeds.
  const { error: updateError } = await supabase
    .from("media_assets")
    .update({
      blob_url: uploadedBlob.url,
      blob_pathname: uploadedBlob.pathname,
      updated_by: user.id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", slot.id);

  if (updateError) {
    console.error("Media record update failed:", updateError.message);

    // remove the newly uploaded Blob if the database update fails
    try {
      await del(uploadedBlob.url);
    } catch (cleanupError) {
      console.error("Blob cleanup failed:", cleanupError);
    }

    return NextResponse.json(
      {
        error: "Image uploaded, but the media record could not be updated.",
      },
      { status: 500 }
    );
  }

  // return the updated media details.
  return NextResponse.json({
    success: true,
    slotKey: slot.slot_key,
    url: uploadedBlob.url,
    pathname: uploadedBlob.pathname,
  });
}