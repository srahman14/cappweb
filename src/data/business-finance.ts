
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
    "Banking, consulting, accounting and asset management. Prepare for spring weeks and assessment centres with help from people in the industry.",
  channelLabel: "Join the Business & Finance channel",

  about: {
    eyebrow: "What Business & Finance is about at CAPP",
    title: "Where business and finance careers begin",
    body: "Business and finance covers a lot of ground, from banking and consulting to accounting and asset management. We help you make sense of it, with spring week advice, assessment centre prep and chances to meet professionals, as at our FCA visit and B&F meet and greet. Our group chats are the place to share openings and swap what you have learned.",
    bullets: [
      "Spring weeks and graduate schemes",
      "Banking, consulting and accounting",
      "Industry visits and meet and greets",
      "Assessment centre preparation",
    ],
  },

  nextEvent: {
    ...placeholderEvent(0),
    id: "business-finance-next",
    title: "[COMING SOON]",
  },

  resources: [],

  pastEvents: [
  {
    ...placeholderEvent(1),
    title: "FCA Visit",
  },
  {
    ...placeholderEvent(2),
    title: "B&F Meet and Greet",
  },
],

  bentoCards: [
    { id: "bf-spring", title: "Spring week prep", body: "Know what to expect from spring weeks and assessment centres, and how to prepare." },
    { id: "bf-sectors", title: "Banking, consulting and accounting", body: "Compare the different areas of the industry, including asset management, and find your fit." },
    { id: "bf-meet", title: "Meet professionals", body: "Visits and meet and greets that put you in the room with people working in the sector." },
  ],
  ambassadors: [1, 2, 3, 4].map((n) => ({
    id: `business-finance-amb-${n}`,
    name: "[NAME]",
    role: "Business & Finance ambassador",
  })),
};
