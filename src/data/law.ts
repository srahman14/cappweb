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
  // Placeholder for now, so the hub shows the plain "Events" card. Uncomment and fill in once a real event is booked.
  // nextEvent: { ...placeholderEvent(0), id: "law-next", title: "[EVENT NAME]" },
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
  motif: "law",
  bentoCards: [
    { id: "law-routes", title: "Solicitor or barrister?", body: "Compare the two routes and what each day looks like, then decide which suits you." },
    { id: "law-vac", title: "Vacation schemes", body: "How applications work, what happens on a scheme and how to make yours stand out." },
  ],
  roles: [
    { id: "solicitor", icon: "briefcase", title: "Solicitor", body: "Advises clients, drafts contracts and runs cases, usually in a law firm or a company's in-house team.", routes: ["Any degree + SQE", "Solicitor apprenticeship"] },
    { id: "barrister", icon: "gavel", title: "Barrister", body: "A specialist advocate who represents clients in court and gives expert legal opinions. Most are self-employed.", routes: ["Law degree or conversion", "Bar course + pupillage"] },
    { id: "cilex", icon: "scale", title: "Chartered legal executive", body: "A qualified lawyer who specialises in one area of law and trains while working, without needing a degree.", routes: ["CILEx qualification", "Apprenticeship"] },
    { id: "paralegal", icon: "file", title: "Paralegal", body: "Supports lawyers with research, documents and case preparation. A common first step into the profession.", routes: ["Any degree", "Apprenticeship"] },
    { id: "in-house", icon: "building", title: "In-house lawyer", body: "Works inside one company as its own legal adviser, on everything from contracts to disputes.", routes: ["Qualify first", "Then move in-house"] },
    { id: "compliance", icon: "shield", title: "Compliance analyst", body: "Makes sure a business follows the rules that apply to it. A big area in banks and financial firms.", routes: ["Any degree", "Graduate scheme"] },
  ],
  calendar: [
    { id: "insight", label: "First-year schemes", who: "First years", apply: ["Jan", "Mar"], runs: ["Apr", "Jun"] },
    { id: "vac", label: "Vacation schemes", who: "Penultimate year (law)", apply: ["Oct", "Jan"], runs: ["Jun", "Jul"] },
    { id: "tc", label: "Direct training contracts", who: "Final year and graduates", apply: ["Jun", "Jul"] },
    { id: "pupillage", label: "Pupillage Gateway", who: "Bar students", apply: ["Jan", "Feb"] },
    { id: "apprenticeships", label: "Solicitor apprenticeships", who: "Year 13", apply: ["Nov", "Apr"] },
  ],
  faqs: [
    { id: "law-degree", question: "Do I need a law degree to become a lawyer?", answer: "No. Solicitors can qualify through the SQE with a degree in any subject. Future barristers without a law degree take a conversion course first. Many trainees at large firms studied something else." },
    { id: "sqe", question: "What is the SQE?", answer: "The Solicitors Qualifying Exam, the main route to becoming a solicitor in England and Wales. You pass SQE1 and SQE2, complete two years of qualifying work experience, and meet the character and suitability requirements." },
    { id: "vac-scheme", question: "What is a vacation scheme?", answer: "A one to four week placement at a law firm, usually in spring or summer. You work on real tasks, meet lawyers and often interview for a training contract at the end. Many firms hire most of their trainees this way." },
    { id: "barrister", question: "How do I become a barrister?", answer: "Complete a law degree or a conversion course, join one of the four Inns of Court, pass the Bar course, then secure a pupillage, which is a year of training in chambers. Pupillages are very competitive, so mooting and mini-pupillages help." },
    { id: "commercial", question: "What does commercial awareness actually mean?", answer: "Understanding how businesses make money and how news affects them. Law firms want to see that you can think about a client's problem as a business problem. Reading business news regularly is the best way to build it." },
    { id: "apprenticeship", question: "Can I become a solicitor without going to university?", answer: "Yes. A solicitor apprenticeship takes around six years. You work at a firm, earn a salary, study towards a degree-level qualification and sit the SQE, with your employer covering the costs." },
  ],
  ambassadors: [1, 2, 3, 4].map((n) => ({ id: `law-amb-${n}`, name: "[NAME]", role: "Law ambassador" })),
};
