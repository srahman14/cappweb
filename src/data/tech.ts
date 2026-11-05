import type { SubjectPageData } from "@/types";

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
  resources: [
    { id: "leetcode", title: "LeetCode", category: "Practice", description: "Practise coding interview problems.", href: "https://leetcode.com" },
    { id: "neetcode", title: "NeetCode", category: "Practice", description: "A structured roadmap for interview prep.", href: "https://neetcode.io" },
    { id: "freecodecamp", title: "freeCodeCamp", category: "Learn", description: "Free courses to learn to code.", href: "https://www.freecodecamp.org" },
    { id: "ai-courses", title: "AI courses [TBC]", category: "AI", description: "[Short description]", href: "#" },
  ],
  ambassadors: [1, 2, 3, 4].map((n) => ({ id: `tech-amb-${n}`, name: "[NAME]", role: "Tech ambassador" })),
};