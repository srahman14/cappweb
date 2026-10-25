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
    "Explore engineering careers, discover industry opportunities and connect with people working across engineering disciplines.",
  channelLabel: "Join the Engineering channel",
  about: {
    eyebrow: "What Engineering is about at CAPP",
    title: "Where engineering careers begin",
    body: "[Add a short description of the Engineering community here.]",
    bullets: [
      "Internships and graduate schemes",
      "Engineering career pathways",
      "Panels with industry professionals",
      "CV and interview preparation",
    ],
  },
  resources: [],
  nextEvent: {
    ...placeholderEvent(0),
    id: "engineering-next",
    title: "[EVENT NAME]",
  },
  pastEvents: [1, 2, 3].map(placeholderEvent),
  ambassadors: [1, 2, 3, 4].map((n) => ({
    id: `engineering-amb-${n}`,
    name: "[NAME]",
    role: "Engineering ambassador",
  })),
};