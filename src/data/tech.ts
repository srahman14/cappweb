import type { EventItem, SubjectPageData } from "@/types";

/** Placeholder past event. Replace these with real events (and delete this helper). */
const placeholderEvent = (n: number): EventItem => ({
  id: `tech-past-${n}`,
  title: "[PAST EVENT NAME]",
  dateLabel: "[DATE]",
  weekday: "[WEEKDAY]",
  time: "[TIME]",
  location: "[LOCATION]",
  hostName: "[HOST NAME]",
  tags: ["Panel", "Tech"],
  href: "#",
});

export const tech: SubjectPageData = {
  name: "Tech",
  description: "Software, data and AI careers made less daunting. Coding practice, hackathons and chats with engineers, curated by your Tech ambassadors.",
  channelLabel: "Join the Tech channel",
  // channelUrl: "https://chat.whatsapp.com/...", // add once the Tech channel link exists
  about: {
    eyebrow: "What Tech is about at CAPP",
    title: "Where tech careers begin",
    body: "Whether you code every day or are just curious about software, data or AI, this is a friendly place to find your feet. Swap tips on technical interviews, team up for hackathons and hear how engineers got into the industry. Ask the questions you would hesitate to ask elsewhere.",
    bullets: ["Software, data and AI pathways", "Hackathons and side projects", "Panels with industry engineers", "Technical interview and CV prep"],
  },
  nextEvent: { ...placeholderEvent(0), id: "tech-next", title: "[EVENT NAME]" },
  resources: [
    { id: "leetcode", title: "LeetCode", category: "Practice", description: "Practise coding interview problems.", href: "https://leetcode.com" },
    { id: "neetcode", title: "NeetCode", category: "Practice", description: "A structured roadmap for interview prep.", href: "https://neetcode.io" },
    { id: "freecodecamp", title: "freeCodeCamp", category: "Learn", description: "Free courses to learn to code.", href: "https://www.freecodecamp.org" },
    { id: "ai-courses", title: "AI courses [TBC]", category: "AI", description: "[Short description]", href: "#" },
  ],
  pastEvents: [1, 2, 3].map(placeholderEvent),
  bentoCards: [
    { id: "tech-interviews", title: "Technical interviews", body: "Work through coding problems and system design questions with others, so the real thing feels familiar.",
      // TESTER image: replace with a real photo (path in /public). Add the same `image` field to any other card.
      image: { src: "/team/hover-1.png", alt: "CAPP members at a technical interview workshop" } },
    { id: "tech-hackathons", title: "Hackathons and projects", body: "Team up, build something in a short space of time and add real work to your CV." },
    { id: "tech-paths", title: "Software, data and AI", body: "Not sure which direction suits you? Hear what each path involves day to day." },
  ],
  ambassadors: [1, 2, 3, 4].map((n) => ({ id: `tech-amb-${n}`, name: "[NAME]", role: "Tech ambassador" })),
};
