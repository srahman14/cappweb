
import type { Metadata } from "next";
import ShareButton from "./sharebutton";

export const metadata: Metadata = {
  title: "Events | CAPP",
  description: "Discover upcoming CAPP events and explore events from the past.",
};

const pastEvents = [
  {
    id: 1,
    title: "Tech Panel 2026",
    date: "Oct 22, 2026",
    category: "Community",
  },
  {
    id: 2,
    title: "Meet and Greet",
    date: "Oct 16, 2026",
    category: "Careers",
  },
  {
    id: 3,
    title: "Banking Panel 2026",
    date: "Oct 15, 2026",
    category: "Volunteering",
  },
  {
    id: 4,
    title: "CAPP Socials",
    date: "19/20 Sep, 2026",
    category: "Wellbeing",
  },
  {
    id: 5,
    title: "Summer Series",
    date: "July, 2026",
    category: "Networking",
  },
  {
    id: 6,
    title: "FCA Firm Visit",
    date: "23 April, 2026",
    category: "Education",
  },
  {
    id: 7,
    title: "Women in Tech Panel",
    date: "10 Feb, 2026",
    category: "Education",
  },
  {
    id: 8,
    title: "Alumni Panel",
    date: "5 Feb, 2026",
    category: "Education",
  },
  {
    id: 9,
    title: "AC Simulation",
    date: "22 Jan, 2026",
    category: "Education",
  },
  {
    id: 10,
    title: "Winter Series",
    date: "19 Dec 2025 - 9 Jan 2026",
    category: "Education",
  },
  {
    id: 11,
    title: "Business and Finance Meet and Greet",
    date: "29 Jan, 2025",
    category: "Education",
  },
  {
    id: 12,
    title: "Tech Meet and Greet",
    date: "27 Jan, 2025",
    category: "Education",
  },
];

function PlaceholderImage({ large = false }: { large?: boolean }) {
  return (
    <div
      aria-label="Placeholder event image"
      className={`flex items-center justify-center overflow-hidden rounded-[7px] bg-indigo-soft text-[11px] font-extrabold tracking-[1.3px] text-muted ${
        large
          ? "min-h-[280px] w-full bg-navy text-on-dark"
          : "min-h-[82px]"
      }`}
    >
      <span>IMAGE PLACEHOLDER</span>
    </div>
  );
}

export default function EventsPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-[18px] pb-[56px] pt-[28px] text-navy-ink sm:px-[4%] sm:pb-[80px] sm:pt-[38px]">
      {/* Page heading */}
      <header className="mb-[26px] max-w-[650px]">
        <p className="mb-[8px] text-[13px] font-extrabold tracking-[1.5px] text-navy">
          CAPP EVENTS
        </p>

        <h1 className="text-[clamp(36px,5vw,54px)] font-extrabold leading-[1.1] tracking-[-1.8px]">
          Upcoming <span className="text-indigo">Events</span>
        </h1>

        <p className="mt-3 max-w-[500px] text-[16px] leading-[1.65] text-muted">
          Stay connected and get involved! Explore our upcoming
          events, workshops, and community gatherings.
        </p>
      </header>

      {/* Featured event */}
      <section
        className="grid grid-cols-1 items-center gap-[18px] rounded-card border border-line bg-white p-4 sm:grid-cols-2 sm:gap-[30px]"
        aria-labelledby="featured-title"
      >
        <div className="relative min-w-0 overflow-hidden rounded-[9px] bg-navy">
          <div className="[&>div]:!min-h-[230px] sm:[&>div]:!min-h-[330px]">
            <PlaceholderImage large />
          </div>

          <div className="absolute inset-0 flex flex-col items-start justify-center bg-[linear-gradient(90deg,var(--color-navy-deep),transparent)] p-5 text-white sm:p-[28px]">
            <span className="mb-[28px] text-[19px] font-extrabold">
              ✳ CAPP
            </span>

            <p className="text-[clamp(27px,4vw,46px)] font-black leading-[1.08] tracking-[-1px]">
              YOUR NEXT
            </p>

            <p className="text-[clamp(27px,4vw,46px)] font-black leading-[1.08] tracking-[-1px]">
              BIG EVENT
            </p>

            <span className="mt-[22px] text-[10px] font-extrabold tracking-[1.4px]">
              LEARN / CONNECT / GROW
            </span>
          </div>
        </div>

        <div className="p-2 sm:py-3 sm:pr-4 sm:pl-0">
          <span className="inline-block rounded-[30px] bg-navy px-[14px] py-2 text-[11px] font-extrabold tracking-[0.5px] text-white">
            FEATURED EVENT
          </span>

          <h2
            id="featured-title"
            className="my-[17px] text-[clamp(25px,3vw,34px)] font-bold leading-[1.2] tracking-[-0.7px]"
          >
            Upcoming CAPP Event
          </h2>

          <div className="flex flex-wrap gap-x-[18px] gap-y-3 text-[13px] text-muted">
            <span>▦ &nbsp; Date to be announced</span>
            <span>◷ &nbsp; Time to be announced</span>
            <span>⌖ &nbsp; Location to be announced</span>
          </div>

          <p className="my-6 text-[14px] leading-[1.8] text-muted">
            Text goes here. Add a short description of the event,
            what attendees can expect, and why they should join us.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              className="inline-flex items-center gap-[18px] rounded-[7px] bg-indigo px-[19px] py-[13px] text-[13px] font-bold text-white no-underline transition-colors hover:bg-navy"
              href="#past-events"
            >
              Explore events <span aria-hidden="true">→</span>
            </a>

            <a
              className="text-[13px] font-extrabold text-indigo no-underline hover:underline"
              href="#past-events"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>

            <ShareButton />
          </div>
        </div>
      </section>

      {/* Past events */}
      <section
        className="mt-8 border-t border-line pt-7"
        id="past-events"
      >
        <div className="mb-6">
          <p className="mb-[8px] text-[13px] font-extrabold tracking-[1.5px] text-navy">
            LOOKING BACK
          </p>

          <h2 className="text-[clamp(36px,5vw,54px)] font-extrabold leading-[1.1] tracking-[-1.8px]">
            Event <span className="text-indigo">Timeline</span>
          </h2>

          <p className="mb-0 mt-3 max-w-[500px] text-[16px] leading-[1.65] text-muted">
            Take a look at some of the events we've hosted in the
            past. Select an event to see more details.
          </p>
        </div>

        <div className="relative ml-3 border-l-2 border-indigo">
          {pastEvents.map((event, index) => (
            <details
              className={`group relative ml-5 border-b border-line ${
                index === 2
                  ? "group/featured [&[open]]:mb-[6px] [&[open]]:mt-[6px] [&[open]]:rounded-[9px] [&[open]]:border [&[open]]:border-indigo"
                  : ""
              }`}
              key={event.id}
              open={index === 2}
            >
              {/* Timeline dot */}
              <span className="absolute top-7 left-[-28px] h-3 w-3 rounded-full border-2 border-white bg-indigo shadow-[0_0_0_1px_var(--color-indigo)]" />

              {/* Expandable event heading */}
              <summary
                className={`flex min-h-[88px] cursor-pointer list-none items-center gap-3 py-[10px] pr-3 [&::-webkit-details-marker]:hidden sm:gap-[18px] ${
                  index === 2
                    ? "group-open/featured:bg-indigo-soft"
                    : ""
                }`}
              >
                <div className="w-[76px] min-w-[76px] sm:w-[125px] sm:min-w-[125px]">
                  <div className="[&>div]:!min-h-[58px] sm:[&>div]:!min-h-[68px]">
                    <PlaceholderImage />
                  </div>
                </div>

                <span className="flex flex-1 flex-col gap-[9px] text-[12px] sm:text-[14px]">
                  <strong>{event.title}</strong>

                  <span className="text-[12px] text-muted">
                    ▦ &nbsp; {event.date}
                  </span>
                </span>

                <span
                  className="text-[27px] text-navy transition-transform duration-200 group-open:rotate-90"
                  aria-hidden="true"
                >
                  ›
                </span>
              </summary>

              {/* Expanded event details */}
              <div className="grid grid-cols-1 gap-[14px] px-4 pb-[18px] sm:grid-cols-[minmax(180px,0.9fr)_1fr] sm:gap-6">
                <div className="[&>div]:!min-h-[180px] sm:[&>div]:!min-h-[210px]">
                  <PlaceholderImage large />
                </div>

                <div>
                  <span className="inline-block text-[12px] font-extrabold text-indigo">
                    {event.category}
                  </span>

                  <h3 className="my-2 text-[21px] font-bold">
                    {event.title}
                  </h3>

                  <p className="text-[12px] text-muted">
                    {event.date}
                  </p>

                  <p className="text-[13px] leading-[1.7] text-muted">
                    Text goes here. Add details about this event,
                    what happened, and the experience of the people
                    who attended.
                  </p>

                  <div className="my-[14px] flex flex-wrap gap-2">
                    <span className="rounded-[20px] bg-indigo-soft px-[11px] py-[7px] text-[11px] text-navy">
                      {event.category}
                    </span>

                    <span className="rounded-[20px] bg-indigo-soft px-[11px] py-[7px] text-[11px] text-navy">
                      CAPP Community
                    </span>

                    <span className="rounded-[20px] bg-indigo-soft px-[11px] py-[7px] text-[11px] text-navy">
                      Past Event
                    </span>
                  </div>

                  <a
                    className="text-[13px] font-extrabold text-indigo no-underline hover:underline"
                    href="#past-events"
                  >
                    Event details <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
