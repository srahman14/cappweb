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
  description: "Legal systems, rights and justice. Case studies, workshops and panels with legal professionals, all curated by your Law ambassadors.",
  channelLabel: "Join the Law channel",
  // channelUrl: "https://chat.whatsapp.com/...", // add once the Law channel link exists
  about: {
    eyebrow: "What Law is about at CAPP",
    title: "Where Law careers begin",
    body: "[Two or three sentences on what the Law community does, who it is for and what members get out of it.]",
    bullets: [
      "Insight into legal careers",
      "Case studies and mock trials",
      "Panels with solicitors and barristers",
      "Application and CV preparation",]
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
  ambassadors: [1, 2, 3, 4].map((n) => ({ id: `law-amb-${n}`, name: "[NAME]", role: "Law ambassador" })),
};