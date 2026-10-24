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
  description: "Software, data and AI. Practice resources, hackathons and panels with engineers, all curated by your Tech ambassadors.",
  channelLabel: "Join the Tech channel",
  // channelUrl: "https://chat.whatsapp.com/...", // add once the Tech channel link exists
  about: {
    eyebrow: "What Tech is about at CAPP",
    title: "Where tech careers begin",
    body: "[Two or three sentences on what the Tech community does, who it is for and what members get out of it.]",
    bullets: ["Internships and graduate schemes", "Hackathons and projects", "Panels with industry engineers", "Interview and CV preparation"],
  },
  nextEvent: { ...placeholderEvent(0), id: "tech-next", title: "[EVENT NAME]" },
  resources: [
    { id: "leetcode", title: "LeetCode", category: "Practice", description: "Practise coding interview problems.", href: "https://leetcode.com" },
    { id: "neetcode", title: "NeetCode", category: "Practice", description: "A structured roadmap for interview prep.", href: "https://neetcode.io" },
    { id: "freecodecamp", title: "freeCodeCamp", category: "Learn", description: "Free courses to learn to code.", href: "https://www.freecodecamp.org" },
    { id: "ai-courses", title: "AI courses [TBC]", category: "AI", description: "[Short description]", href: "#" },
  ],
  pastEvents: [1, 2, 3].map(placeholderEvent),
  ambassadors: [1, 2, 3, 4].map((n) => ({ id: `tech-amb-${n}`, name: "[NAME]", role: "Tech ambassador" })),
};