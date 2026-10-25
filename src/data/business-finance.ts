
import type { EventItem, SubjectPageData } from "@/types";

/** Placeholder past event. Replace with real events later. */
const placeholderEvent = (n: number): EventItem => ({
  id: `business-finance-past-${n}`,
  title: "[PAST EVENT NAME]",
  dateLabel: "[DATE]",
  weekday: "[WEEKDAY]",
  time: "[TIME]",
  location: "[LOCATION]",
  hostName: "[HOST NAME]",
  tags: ["Business", "Finance"],
  href: "#",
});

export const businessFinance: SubjectPageData = {
  name: "Business & Finance",
  description:
    "Explore careers across business and finance, discover industry opportunities and connect with professionals.",
  channelLabel: "Join the Business & Finance channel",

  about: {
    eyebrow: "What Business & Finance is about at CAPP",
    title: "Where business and finance careers begin",
    body: "[Add a short description of the Business & Finance community here.]",
    bullets: [
      "Internships and graduate schemes",
      "Careers in banking and finance",
      "Panels with industry professionals",
      "CV and interview preparation",
    ],
  },

  nextEvent: {
    ...placeholderEvent(0),
    id: "business-finance-next",
    title: "[EVENT NAME]",
  },

  resources: [],

  pastEvents: [1, 2, 3].map(placeholderEvent),

  ambassadors: [1, 2, 3, 4].map((n) => ({
    id: `business-finance-amb-${n}`,
    name: "[NAME]",
    role: "Business & Finance ambassador",
  })),
};
