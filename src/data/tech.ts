import type { SubjectPageData } from "@/types";

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
  resources: [
    { id: "leetcode", title: "LeetCode", category: "Practice", description: "Practise coding interview problems.", href: "https://leetcode.com" },
    { id: "neetcode", title: "NeetCode", category: "Practice", description: "A structured roadmap for interview prep.", href: "https://neetcode.io" },
    { id: "freecodecamp", title: "freeCodeCamp", category: "Learn", description: "Free courses to learn to code.", href: "https://www.freecodecamp.org" },
    { id: "ai-courses", title: "AI courses [TBC]", category: "AI", description: "[Short description]", href: "#" },
  ],
  motif: "tech",
  bentoCards: [
    { id: "tech-interviews", title: "Technical interviews", body: "Work through coding problems together, so the real thing feels familiar." },
    { id: "tech-hackathons", title: "Hackathons and projects", body: "Build something fast with a team, then put it on your CV." },
  ],
  roles: [
    { id: "swe", icon: "code", title: "Software engineer", body: "Builds and maintains the apps and systems people use. Writes code, reviews teammates' changes and fixes what breaks.", routes: ["Degree", "Apprenticeship", "Self-taught"] },
    { id: "data-analyst", icon: "chart", title: "Data analyst", body: "Turns raw data into answers a business can act on. Writes queries, builds dashboards and explains what the numbers mean.", routes: ["Any numerate degree", "Apprenticeship"] },
    { id: "data-scientist", icon: "sparkles", title: "Data scientist or ML engineer", body: "Builds models that predict, recommend or generate. More maths-heavy than most tech roles, and often needs a master's.", routes: ["Maths, stats or CS degree", "Master's"] },
    { id: "cyber", icon: "shield", title: "Cyber security analyst", body: "Keeps systems and data safe. Watches for threats, investigates incidents and tests defences before attackers do.", routes: ["Degree", "Apprenticeship", "Certifications"] },
    { id: "pm", icon: "compass", title: "Product manager", body: "Decides what gets built and why. Talks to users, sets priorities and keeps engineers and designers pointed the same way.", routes: ["Graduate PM scheme", "Move from another role"] },
    { id: "ux", icon: "pen", title: "UX or UI designer", body: "Works out what users need, then designs screens that make it easy. Runs research, sketches flows and builds prototypes.", routes: ["Design degree", "Portfolio"] },
  ],
  calendar: [
    { id: "spring", label: "Spring weeks", who: "First years", apply: ["Oct", "Jan"], runs: ["Mar", "Apr"] },
    { id: "internships", label: "Summer internships", who: "Penultimate year", apply: ["Oct", "Dec"], runs: ["Jun", "Aug"] },
    { id: "grad", label: "Graduate schemes", who: "Final year", apply: ["Oct", "Nov"] },
    { id: "apprenticeships", label: "Degree apprenticeships", who: "Year 13", apply: ["Nov", "Apr"] },
    { id: "hackathons", label: "Hackathons", who: "Anyone", allYear: true },
  ],
  faqs: [
    { id: "cs-degree", question: "Do I need a computer science degree to work in tech?", answer: "No. Plenty of engineers studied maths, physics, engineering or something unrelated. Employers care about what you can build and how you solve problems. Degree apprenticeships and self-taught routes lead to the same jobs." },
    { id: "start", question: "I've never coded. Where do I start?", answer: "Pick one language (Python is a friendly first choice) and work through a free course such as freeCodeCamp or Harvard's CS50. Then build something small you would actually use. Finishing one project teaches more than starting five tutorials." },
    { id: "spring-week", question: "What is a spring week?", answer: "A short insight programme, from one day to a week, mostly for first-year students. You see how a company works and meet its people. Some firms fast-track spring week students to a summer internship interview." },
    { id: "when", question: "When should I apply for internships?", answer: "Earlier than you think. Large firms open applications from late summer and many close by December. Most recruit on a rolling basis, so applying in the first few weeks gives you the best chance." },
    { id: "interview", question: "What happens in a technical interview?", answer: "Usually an online test with a couple of coding problems, then one or more interviews where you solve a problem while explaining your thinking out loud. Some graduate roles add system design or behavioural questions. Practise explaining as much as you practise coding." },
    { id: "maths", question: "Do I need to be good at maths?", answer: "For most software roles, clear logical thinking matters more than advanced maths. Data science and machine learning are different: they lean heavily on statistics and linear algebra." },
  ],
  ambassadors: [1, 2, 3, 4].map((n) => ({ id: `tech-amb-${n}`, name: "[NAME]", role: "Tech ambassador" })),
};
