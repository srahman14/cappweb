
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
          alert("Unable to share the link. Please copy the page URL from your browser.");
        }
      }
    }
  }

  return (
    <button
      type="button"
      className="event-share-button"
      onClick={handleShare}
    >
      <span aria-hidden="true">↗</span>
      Share event
    </button>
  );
}
