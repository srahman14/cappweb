
import type { SubjectPageData } from "@/types";

export const businessFinance: SubjectPageData = {
  name: "Business & Finance",
  description:
    "Explore careers across business and finance, discover industry opportunities and connect with professionals.",
  channelLabel: "Join the Business & Finance channel",

  about: {
    eyebrow: "What Business & Finance is about at CAPP",
    title: "Where business and finance careers begin",
    body: "The Business & Finance community at CAPP is dedicated to helping students explore career opportunities, develop valuable skills and prepare for their future careers. We aim to bridge the gap between university and industry by providing access to opportunities, useful resources, assessment guidance and insights from professionals across the sector. Our community is built on collaboration and support, with active group chats where members can share opportunities, ask questions and learn from one another. Whether you're exploring your career options or preparing to take your next step, we're here to help you along the way.",
    bullets: [
      "Internships and graduate schemes",
      "Careers in banking and finance",
      "Panels with industry professionals",
      "CV and interview preparation",
    ],
  },

  resources: [],

  ambassadors: [1, 2, 3, 4].map((n) => ({
    id: `business-finance-amb-${n}`,
    name: "[NAME]",
    role: "Business & Finance ambassador",
  })),
};
