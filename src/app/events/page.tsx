
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
    date: "TBC",
    category: "Wellbeing",
  },
  {
    id: 5,
    title: "Summer Series",
    date: "TBC",
    category: "Networking",
  },
  {
    id: 6,
    title: "Winter Series",
    date: "TBC",
    category: "Education",
  },
  {
    id: 7,
    title: "Women in Tech Panel",
    date: "TBC",
    category: "Education",
  },
  {
    id: 8,
    title: "FCA Firm Visit",
    date: "TBC",
    category: "Education",
  },
  {
    id: 9,
    title: "AC Simulation",
    date: "TBC",
    category: "Education",
  },
  {
    id: 10,
    title: "Alumni Panel",
    date: "TBC",
    category: "Education",
  },
];

function PlaceholderImage({
  large = false,
}: {
  large?: boolean;
}) {
  return (
    <div
      className={`event-placeholder ${large ? "event-placeholder-large" : ""}`}
      aria-label="Placeholder event image"
    >
      <span>IMAGE PLACEHOLDER</span>
    </div>
  );
}

export default function EventsPage() {
  return (
    <main className="events-page">
      <header className="events-heading">
        <p className="events-eyebrow">CAPP EVENTS</p>
        <h1>
          Upcoming <span>Events</span>
        </h1>
        <p className="events-intro">
          Stay connected and get involved! Explore our upcoming
          events, workshops, and community gatherings.
        </p>
      </header>

      <section className="featured-event" aria-labelledby="featured-title">
        <div className="featured-image">
          <PlaceholderImage large />
          <div className="featured-image-overlay">
            <span className="capp-mark">✳ CAPP</span>
            <p>YOUR NEXT</p>
            <p>BIG EVENT</p>
            <span className="featured-image-caption">
              LEARN / CONNECT / GROW
            </span>
          </div>
        </div>

        <div className="featured-content">
          <span className="event-badge">FEATURED EVENT</span>
          <h2 id="featured-title">Upcoming CAPP Event</h2>

          <div className="event-meta">
            <span>▦ &nbsp; Date to be announced</span>
            <span>◷ &nbsp; Time to be announced</span>
            <span>⌖ &nbsp; Location to be announced</span>
          </div>

          <p className="event-description">
            Text goes here. Add a short description of the event,
            what attendees can expect, and why they should join us.
          </p>

          <div className="event-actions">
            <a className="event-button" href="#past-events">
              Explore events <span aria-hidden="true">→</span>
            </a>

            <a className="event-text-link" href="#past-events">
              Learn more <span aria-hidden="true">→</span>
            </a>

            <ShareButton />
          </div>
        </div>
      </section>

      <section className="past-events" id="past-events">
        <div className="past-events-heading">
          <p className="events-eyebrow">LOOKING BACK</p>
          <h2>
            Event <span>Timeline</span>
          </h2>
          <p>
            Take a look at some of the events we've hosted in the
            past. Select an event to see more details.
          </p>
        </div>

        <div className="event-timeline">
          {pastEvents.map((event, index) => (
            <details
              className={`timeline-event ${
                index === 2 ? "timeline-event-featured" : ""
              }`}
              key={event.id}
              open={index === 2}
            >
              <summary className="timeline-summary">
                <span className="timeline-dot" />
                <PlaceholderImage />
                <span className="timeline-event-info">
                  <strong>{event.title}</strong>
                  <span className="timeline-date">
                    ▦ &nbsp; {event.date}
                  </span>
                </span>
                <span className="timeline-arrow" aria-hidden="true">
                  ›
                </span>
              </summary>

              <div className="timeline-details">
                <PlaceholderImage large />
                <div className="timeline-details-content">
                  <span className="event-category">
                    {event.category}
                  </span>
                  <h3>{event.title}</h3>
                  <p className="timeline-date">{event.date}</p>
                  <p>
                    Text goes here. Add details about this event,
                    what happened, and the experience of the people
                    who attended.
                  </p>
                  <div className="event-tags">
                    <span>{event.category}</span>
                    <span>CAPP Community</span>
                    <span>Past Event</span>
                  </div>
                  <a className="event-text-link" href="#past-events">
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
