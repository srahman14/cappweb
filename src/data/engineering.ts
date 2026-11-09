import type { EventItem, SubjectPageData } from "@/types";

const placeholderEvent = (n: number): EventItem => ({
  id: `engineering-past-${n}`,
  title: "[PAST EVENT NAME]",
  dateLabel: "[DATE]",
  weekday: "[WEEKDAY]",
  time: "[TIME]",
  location: "[LOCATION]",
  hostName: "[HOST NAME]",
  tags: ["Engineering"],
  href: "#",
});

export const engineering: SubjectPageData = {
  name: "Engineering",
  description:
    "From civil to electrical and everything between. Find your discipline, get graduate scheme guidance and hear from working engineers.",
  channelLabel: "Join the Engineering channel",
  about: {
    eyebrow: "What Engineering is about at CAPP",
    title: "Where engineering careers begin",
    body: "Engineering is a huge field, and this community helps you work out where you fit, from civil and mechanical to electrical and beyond. Get a head start on graduate schemes, understand what chartership involves and pick up insights from people who work on sites and in industry.",
    bullets: [
      "Placements and graduate schemes",
      "Choosing your discipline",
      "Site and industry insights",
      "Routes to chartership",
    ],
  },
  resources: [],
  nextEvent: {
    ...placeholderEvent(0),
    id: "engineering-next",
    title: "[EVENT NAME]",
  },
  pastEvents: [1, 2, 3].map(placeholderEvent),
  bentoCards: [
    { id: "eng-disciplines", title: "Find your discipline", body: "Civil, mechanical, electrical and more. Learn what each involves so you can choose with confidence." },
    { id: "eng-schemes", title: "Graduate schemes and chartership", body: "Understand how schemes work and what it takes to become a chartered engineer." },
    { id: "eng-industry", title: "Site and industry insights", body: "Hear what the work really looks like day to day from people in industry." },
  ],
  ambassadors: [1, 2, 3, 4].map((n) => ({
    id: `engineering-amb-${n}`,
    name: "[NAME]",
    role: "Engineering ambassador",
  })),
};
