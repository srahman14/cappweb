import type { EventItem, SubjectPageData } from "@/types";

/** Placeholder past event. Replace these with real events (and delete this helper). */
const placeholderEvent = (n: number): EventItem => ({
  id: `law-past-${n}`,
  title: "[PAST EVENT NAME]",
  dateLabel: "[DATE]",
  weekday: "[WEEKDAY]",
  time: "[TIME]",
  location: "[LOCATION]",
  hostName: "[HOST NAME]",
  tags: ["Panel", "Law"],
  href: "#",
});

export const law: SubjectPageData = {
  name: "Law",
  description: "Solicitor or barrister? Get clear on the routes into law with case studies, workshops and conversations with legal professionals.",
  channelLabel: "Join the Law channel",
  // channelUrl: "https://chat.whatsapp.com/...", // add once the Law channel link exists
  about: {
    eyebrow: "What Law is about at CAPP",
    title: "Where Law careers begin",
    body: "Law has more than one way in, and it can be hard to know where to start. Here you can compare the solicitor and barrister routes, get to grips with vacation schemes and training contracts, and build your commercial awareness. Try your hand at mock trials and case studies alongside people on the same path.",
    bullets: [
      "Solicitor and barrister routes",
      "Case studies and mock trials",
      "Commercial awareness",
      "Vacation scheme and training contract applications",]
    },
  nextEvent: { ...placeholderEvent(0), id: "law-next", title: "[EVENT NAME]" },
  resources: [
    {
      id: "law-society",
      title: "The Law Society",
      category: "Learn",
      description: "Guidance on legal careers, training routes and professional development.",
      href: "https://www.lawsociety.org.uk",
    },
    {
      id: "bar-council",
      title: "Bar Council",
      category: "Learn",
      description: "Information on becoming a barrister and opportunities for students.",
      href: "https://www.barcouncil.org.uk",
    },
    {
      id: "legal-cheek",
      title: "Legal Cheek",
      category: "Careers",
      description: "News, firm profiles and career insights for aspiring lawyers.",
      href: "https://www.legalcheek.com",
    },
    {
      id: "law-courses",
      title: "Law courses [TBC]",
      category: "Learn",
      description: "[Short description]",
      href: "#",
    },
  ],
  pastEvents: [1, 2, 3].map(placeholderEvent),
  bentoCards: [
    { id: "law-routes", title: "Solicitor or barrister?", body: "Compare the two routes, what each day looks like and how to decide which suits you." },
    { id: "law-vac", title: "Vacation schemes", body: "Get to know how applications work and how to make yours stand out." },
    { id: "law-practice", title: "Mock trials", body: "Practise arguing a case and thinking on your feet, working through scenarios with other students." },
  ],
  ambassadors: [1, 2, 3, 4].map((n) => ({ id: `law-amb-${n}`, name: "[NAME]", role: "Law ambassador" })),
};
