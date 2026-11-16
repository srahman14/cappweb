import type { EventItem, SubjectPageData } from "@/types";

const placeholderEvent = (n: number): EventItem => ({
  id: `engineering-past-${n}`,
  title: "[PAST EVENT NAME]",
  dateLabel: "[DATE]",
  weekday: "[WEEKDAY]",
  time: "[TIME]",
  location: "[LOCATION]",
  hostName: "[HOST NAME]",
  tags: ["Engineering"],
  href: "#",
});

export const engineering: SubjectPageData = {
  name: "Engineering",
  description:
    "From civil to electrical and everything between. Find your discipline, get graduate scheme guidance and hear from working engineers.",
  channelLabel: "Join the Engineering channel",
  about: {
    eyebrow: "What Engineering is about at CAPP",
    title: "Where engineering careers begin",
    body: "Engineering is a huge field, and this community helps you work out where you fit, from civil and mechanical to electrical and beyond. Get a head start on graduate schemes, understand what chartership involves and pick up insights from people who work on sites and in industry.",
    bullets: [
      "Placements and graduate schemes",
      "Choosing your discipline",
      "Site and industry insights",
      "Routes to chartership",
    ],
  },
  resources: [],
  // Placeholder for now, so the hub shows the plain "Events" card. Uncomment and fill in once a real event is booked.
  // nextEvent: {
  //   ...placeholderEvent(0),
  //   id: "engineering-next",
  //   title: "[EVENT NAME]",
  // },
  pastEvents: [1, 2, 3].map(placeholderEvent),
  motif: "engineering",
  bentoCards: [
    { id: "eng-disciplines", title: "Find your discipline", body: "Learn what each branch involves day to day, so you can choose with confidence." },
    { id: "eng-schemes", title: "Graduate schemes and chartership", body: "How schemes work, and what it takes to become a chartered engineer." },
  ],
  roles: [
    { id: "civil", icon: "construction", title: "Civil engineer", body: "Designs and builds the things a country runs on: roads, bridges, railways, tunnels and water systems.", routes: ["BEng or MEng", "Degree apprenticeship"] },
    { id: "mechanical", icon: "cog", title: "Mechanical engineer", body: "Designs, tests and improves anything with moving parts, from car engines to medical devices.", routes: ["BEng or MEng", "Degree apprenticeship"] },
    { id: "electrical", icon: "zap", title: "Electrical or electronic engineer", body: "Works on power networks, circuits and the electronics inside almost every product.", routes: ["BEng or MEng", "Degree apprenticeship"] },
    { id: "chemical", icon: "flask", title: "Chemical engineer", body: "Scales up processes that turn raw materials into fuel, food, medicines and everyday products.", routes: ["BEng or MEng"] },
    { id: "aerospace", icon: "plane", title: "Aerospace engineer", body: "Designs and tests aircraft, satellites and their systems, often in defence or space companies.", routes: ["BEng or MEng", "Degree apprenticeship"] },
    { id: "energy", icon: "leaf", title: "Renewable energy engineer", body: "Plans and builds wind, solar and other low-carbon systems, and connects them to the grid.", routes: ["BEng or MEng", "Degree apprenticeship"] },
  ],
  calendar: [
    { id: "insight", label: "Insight days", who: "First years", apply: ["Nov", "Feb"], runs: ["Mar", "Apr"] },
    { id: "internships", label: "Summer internships", who: "Penultimate year", apply: ["Oct", "Jan"], runs: ["Jun", "Aug"] },
    { id: "placements", label: "Placement years", who: "Second years", apply: ["Oct", "Feb"] },
    { id: "grad", label: "Graduate schemes", who: "Final year", apply: ["Oct", "Jan"] },
    { id: "apprenticeships", label: "Degree apprenticeships", who: "Year 13", apply: ["Nov", "Apr"] },
  ],
  faqs: [
    { id: "which", question: "How do I choose which type of engineering to study?", answer: "Start with the problems you find interesting: buildings and infrastructure point to civil, machines to mechanical, power and circuits to electrical. Many universities share a common first year, so you can try a few areas before you specialise." },
    { id: "beng-meng", question: "BEng or MEng, what's the difference?", answer: "A BEng is a three-year bachelor's degree. An MEng is an integrated four-year master's. An accredited MEng covers the full academic requirement for chartered engineer status, while a BEng usually needs some further learning later on." },
    { id: "chartered", question: "What does being chartered mean?", answer: "Chartered Engineer (CEng) is a professional title from the Engineering Council, awarded through a body such as the ICE, IMechE or IET. You show your knowledge and several years of experience at work. It is a mark of competence and helps with senior roles and pay." },
    { id: "placement", question: "Is a placement year worth it?", answer: "Usually, yes. A year in industry gives you real experience, often comes with a salary, and many students return to the same company for their graduate job. It does add a year to your degree." },
    { id: "apprenticeship", question: "Can I become an engineer without going to university?", answer: "Yes. Engineering apprenticeships run from Level 3 up to degree level (Level 6), and a degree apprenticeship gives you the same degree while you earn a salary and your employer pays the fees." },
    { id: "maths-physics", question: "Do I need maths and physics A-levels?", answer: "For most engineering degrees, maths is essential and physics is strongly preferred. Chemistry matters more for chemical engineering. Check the entry requirements for each course, as some offer a foundation year if you don't have them." },
  ],
  ambassadors: [1, 2, 3, 4].map((n) => ({
    id: `engineering-amb-${n}`,
    name: "[NAME]",
    role: "Engineering ambassador",
  })),
};
