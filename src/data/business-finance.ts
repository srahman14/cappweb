
import type { SubjectPageData } from "@/types";

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

  resources: [],

  motif: "business",
  bentoCards: [
    { id: "bf-spring", title: "Spring week prep", body: "Know what to expect from each stage of the process, and how to prepare." },
    { id: "bf-meet", title: "Meet professionals", body: "Visits and meet and greets that put you in the room with people in the industry." },
  ],
  roles: [
    { id: "ib", icon: "landmark", title: "Investment banking analyst", body: "Helps companies raise money, buy other businesses or merge. Builds financial models and client presentations.", routes: ["Any degree", "Spring week → internship"] },
    { id: "consulting", icon: "lightbulb", title: "Management consultant", body: "Helps organisations solve problems, from cutting costs to launching new products. Lots of research and presenting.", routes: ["Any degree", "Graduate scheme"] },
    { id: "accountant", icon: "calculator", title: "Accountant or auditor", body: "Prepares and checks financial accounts. You train for a professional qualification like the ACA or ACCA while you work.", routes: ["Any degree", "School leaver programme", "Apprenticeship"] },
    { id: "am", icon: "pie", title: "Asset manager", body: "Researches companies and decides where to invest money on behalf of pension funds, insurers and individuals.", routes: ["Any degree", "Internship"] },
    { id: "markets", icon: "trending", title: "Sales and trading", body: "Buys and sells shares, bonds and currencies for clients, and helps them manage risk. Fast-paced and numbers-heavy.", routes: ["Numerate degree", "Spring week → internship"] },
    { id: "actuary", icon: "chart", title: "Actuary", body: "Uses maths and statistics to measure risk for insurers and pension schemes. Qualify through professional exams while working.", routes: ["Maths-heavy degree", "Apprenticeship"] },
  ],
  calendar: [
    { id: "spring", label: "Spring weeks", who: "First years", apply: ["Sep", "Jan"], runs: ["Mar", "Apr"] },
    { id: "internships", label: "Summer internships", who: "Penultimate year", apply: ["Sep", "Dec"], runs: ["Jun", "Aug"] },
    { id: "grad", label: "Graduate schemes", who: "Final year", apply: ["Sep", "Nov"] },
    { id: "school-leaver", label: "School leaver programmes", who: "Year 13", apply: ["Oct", "Mar"] },
  ],
  faqs: [
    { id: "degree", question: "Do I need to study economics or finance?", answer: "No. Banks, consultancies and accountancy firms hire from every degree. They look for strong numbers, clear communication and real interest in the industry. A maths-heavy degree helps most for trading and actuarial roles." },
    { id: "spring-week", question: "What is a spring week?", answer: "A short insight programme for first-year students, usually over the Easter break. You learn how a firm works and meet its people. Many banks use spring weeks to fast-track students to a summer internship." },
    { id: "when", question: "When should I apply?", answer: "As early as possible. Banks often open applications in late summer or early autumn, and most recruit on a rolling basis. Some roles fill weeks before the published deadline." },
    { id: "assessment", question: "What happens at an assessment centre?", answer: "Usually a mix of group exercises, a case study or presentation, and interviews. Firms want to see how you work with others, think under pressure and explain your reasoning, as well as what you know." },
    { id: "accounting", question: "Can I go into accounting without a degree?", answer: "Yes. Most large accountancy firms run school leaver programmes and apprenticeships. You work, earn a salary and study for a professional qualification such as the ACA or ACCA, with fees paid by your employer." },
    { id: "news", question: "How do I keep up with financial news?", answer: "Pick one or two sources and read them regularly, such as the Financial Times, BBC Business or a daily newsletter. Follow a few stories over time so you can talk about why they matter, not just what happened." },
  ],
  ambassadors: [1, 2, 3, 4].map((n) => ({
    id: `business-finance-amb-${n}`,
    name: "[NAME]",
    role: "Business & Finance ambassador",
  })),
};
