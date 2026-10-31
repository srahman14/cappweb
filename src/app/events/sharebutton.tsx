
"use client";

export default function ShareButton() {
  async function handleShare() {
    const shareData = {
      title: "Upcoming CAPP Event",
      text: "Check out this upcoming CAPP event!",
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
      <span aria-hidden="true">↗</span>
      Share event
    </button>
  );
}
