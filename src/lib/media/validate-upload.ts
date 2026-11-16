import "server-only";

import { fileTypeFromBuffer } from "file-type";
import sharp from "sharp";

import { ACCEPTED_TYPES, MAX_UPLOAD_BYTES } from "@/lib/media/constants";

const MAX_IMAGE_PIXELS = 40_000_000;

const ALLOWED_TYPES = new Set<string>(ACCEPTED_TYPES);

const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export type ValidatedImage = {
  buffer: Buffer;
  mime: string;
  extension: string;
};

export type ImageValidationResult =
  | { ok: true; image: ValidatedImage }
  | { ok: false; error: string };

/**
 * Server-side checks for an uploaded image, shared by every upload route.
 * Trusts nothing from the browser: checks the size, detects the real format from
 * the bytes, requires the declared type to agree, and fully decodes the pixels.
 */
export async function validateImageUpload(file: File): Promise<ImageValidationResult> {
  // validate file size.
  if (file.size === 0 || file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: "Images must be between 1 byte and 4 MB." };
  }

  // read the file and detect its actual format.
  let buffer: Buffer;

  try {
    buffer = Buffer.from(await file.arrayBuffer());
  } catch {
    return { ok: false, error: "Unable to read the uploaded image." };
  }

  const detectedType = await fileTypeFromBuffer(buffer);

  if (!detectedType || !ALLOWED_TYPES.has(detectedType.mime)) {
    return { ok: false, error: "The file contents are not a supported image format." };
  }

  // the browser-provided MIME type must agree with the detected format.
  if (file.type !== detectedType.mime) {
    return { ok: false, error: "The declared file type does not match its contents." };
  }

  // attempt to decode the image and enforce a pixel limit.
  try {
    const image = sharp(buffer, {
      limitInputPixels: MAX_IMAGE_PIXELS,
    });

    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      return { ok: false, error: "The uploaded file has invalid image dimensions." };
    }

    if (metadata.width * metadata.height > MAX_IMAGE_PIXELS) {
      return { ok: false, error: "The image dimensions are too large." };
    }

    // force Sharp to decode pixel data rather than relying only on headers
    await image.stats();
  } catch {
    return { ok: false, error: "The image is corrupted or cannot be decoded." };
  }

  return {
    ok: true,
    image: {
      buffer,
      mime: detectedType.mime,
      extension: EXTENSION_BY_TYPE[detectedType.mime],
    },
  };
}
