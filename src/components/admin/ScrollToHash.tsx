"use client";

import { useEffect } from "react";

/**
 * Render inside streamed (Suspense) content that contains anchor targets.
 * The router's own hash scroll can run while only the skeleton exists, so
 * this re-applies it once the real content mounts.
 */
export function ScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, []);

  return null;
}
