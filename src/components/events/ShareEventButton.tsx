
"use client";

import { ArrowUpRight } from "lucide-react";

export interface ShareEventButtonProps {
  title: string;
}

export function ShareEventButton({ title }: ShareEventButtonProps) {
  async function handleShare() {
    const shareData = {
      title,
      text: `Check out ${title} from CAPP!`,
      url: `${window.location.origin}/events`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Event link copied to clipboard!");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(shareData.url);
          alert("Event link copied to clipboard!");
        } catch {
          alert(
            "Unable to share the link. Please copy the page URL from your browser."
          );
        }
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex cursor-pointer items-center gap-[6px] border-0 bg-transparent p-0 font-sans text-[13px] font-extrabold leading-normal text-indigo hover:underline"
    >
      <ArrowUpRight size={16} aria-hidden="true" />
      Share event
    </button>
  );
}
