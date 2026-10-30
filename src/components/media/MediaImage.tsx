"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

type MediaImageProps = Omit<ImageProps, "onError" | "onLoad">;

export function MediaImage({ alt, className, ...props }: MediaImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <>
      <Image
        {...props}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 grid place-items-center bg-navy-deep transition-opacity duration-300",
          loaded && "pointer-events-none opacity-0",
        )}
      >
        {failed ? (
          <span className="text-sm text-on-dark">Image unavailable</span>
        ) : (
          <span className="size-8 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none" />
        )}
      </div>
    </>
  );
}
