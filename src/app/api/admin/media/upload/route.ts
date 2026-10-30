import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { fileTypeFromBuffer } from "file-type";
import sharp from "sharp";

import { createClient } from "@/lib/supabase/server";
import { getCappAdminStatus } from "@/lib/auth/admin";

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const MAX_IMAGE_PIXELS = 40_000_000;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

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

  // validate file size.
  if (file.size === 0 || file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Images must be between 1 byte and 4 MB." },
      { status: 400 }
    );
  }

  // read the file and detect its actual format.
  let buffer: Buffer;

  try {
    buffer = Buffer.from(await file.arrayBuffer());
  } catch {
    return NextResponse.json(
      { error: "Unable to read the uploaded image." },
      { status: 400 }
    );
  }

  const detectedType = await fileTypeFromBuffer(buffer);

  if (!detectedType || !ALLOWED_TYPES.has(detectedType.mime)) {
    return NextResponse.json(
      { error: "The file contents are not a supported image format." },
      { status: 400 }
    );
  }

  // the browser-provided MIME type must agree with the detected format.
  if (file.type !== detectedType.mime) {
    return NextResponse.json(
      { error: "The declared file type does not match its contents." },
      { status: 400 }
    );
  }

  // attempt to decode the image and enforce a pixel limit.
  try {
    const image = sharp(buffer, {
      limitInputPixels: MAX_IMAGE_PIXELS,
    });

    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      return NextResponse.json(
        { error: "The uploaded file has invalid image dimensions." },
        { status: 400 }
      );
    }

    if (metadata.width * metadata.height > MAX_IMAGE_PIXELS) {
      return NextResponse.json(
        { error: "The image dimensions are too large." },
        { status: 400 }
      );
    }

    // force Sharp to decode pixel data rather than relying only on headers
    await image.stats();
  } catch {
    return NextResponse.json(
      { error: "The image is corrupted or cannot be decoded." },
      { status: 400 }
    );
  }

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
    const extension = EXTENSION_BY_TYPE[detectedType.mime];

    uploadedBlob = await put(
      `capp-media/${slot.slot_key}/${crypto.randomUUID()}.${extension}`,
      buffer,
      {
        access: "public",
        addRandomSuffix: false,
        contentType: detectedType.mime,
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