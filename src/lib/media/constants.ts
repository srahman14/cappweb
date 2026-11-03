/**
 * Upload limits shared by the client upload button and the upload API route
 * so they can't drift. No `server-only`: imported by client code too.
 * The route still validates everything itself (signature, decoding, pixels).
 */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // 4 MiB (fits Vercel Functions' body limit)

export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;

export const ACCEPTED_TYPES_LABEL = "JPEG, PNG, WebP or GIF";
