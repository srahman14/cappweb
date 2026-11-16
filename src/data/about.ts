/**
 * Content for /about. Edit this file only; no React needed.
 * Anything in [BRACKETS] is a placeholder until real content exists.
 */

export const whatCappIs = {
  eyebrow: "WHAT WE ARE",
  title: "A careers community, in one place",
  paragraphs: [
    "CAPP (Careers and People’s Progression) is a WhatsApp community that runs events and panels with industry professionals. Ambassadors for Tech, Business & Finance, Engineering and Law share events, internships, hackathons and resources, and help run what we do.",
    "WhatsApp is where the conversation happens. This site is the library and front door: a permanent home for past events, resources and the people behind CAPP.",
  ],
  facts: [
    { label: "Founded", value: "[YEAR]" },
    { label: "Subjects", value: "4" },
    { label: "Home", value: "WhatsApp" },
  ],
  foundingStory:
    "[FOUNDING STORY: who started CAPP, when, and why. Two or three sentences.]",
};

export const whoItsFor = {
  eyebrow: "WHO IT’S FOR",
  title: "Anyone building a career in these fields",
  // TODO(curator): confirm which year groups, universities or ages we welcome before stating them.
  intro:
    "CAPP is for anyone who wants to explore, prepare for and grow a career in one of our four subjects.",
  annotation: "Pick your path",
  // Draft one-liners: curator and ambassadors to confirm.
  subjects: [
    {
      id: "tech",
      title: "Tech",
      text: "Software, data and AI careers.",
      href: "/tech",
      cta: "Explore Tech",
    },
    {
      id: "business-finance",
      title: "Business & Finance",
      text: "Banking, consulting and corporate roles.",
      href: "/business-finance",
      cta: "Explore Business & Finance",
    },
    {
      id: "engineering",
      title: "Engineering",
      text: "Engineering disciplines and graduate schemes.",
      href: "/engineering",
      cta: "Explore Engineering",
    },
    {
      id: "law",
      title: "Law",
      text: "Routes into legal careers.",
      href: "/law",
      cta: "Explore Law",
    },
  ],
  general: [
    {
      id: "exploring",
      title: "Still exploring?",
      text: "Not sure which field fits? Hear from people working in them and find out before you commit.",
    },
    {
      id: "applying",
      title: "Already applying?",
      text: "Get practical help with applications, interviews and what employers look for.",
    },
  ],
};

export const motto = {
  // Draft: replace with the real motto.
  quote: "Careers are built with people, not alone.",
  cite: "CAPP",
};

export const whatWeDo = {
  eyebrow: "WHAT WE DO",
  title: "How CAPP helps",
  items: [
    {
      id: "events",
      title: "Events",
      text: "Talks and meetups announced to the whole community, then archived on this site.",
    },
    {
      id: "panels",
      title: "Panels",
      text: "Industry professionals share how they got where they are and answer your questions.",
    },
    {
      id: "workshops",
      title: "Workshops",
      text: "Practical sessions to build career skills. [CONFIRM topics.]",
    },
    {
      id: "resources",
      title: "Resources",
      text: "CV and ATS guides, interview practice and LinkedIn tips, kept in one searchable place.",
    },
    {
      id: "subject-chats",
      title: "Subject chats",
      text: "Ambassadors share events, hackathons and internships in their subject’s chat.",
    },
    {
      id: "volunteering",
      title: "Get involved",
      text: "Become an ambassador, volunteer, suggest an event or help with a panel.",
    },
  ],
};

/** "CAPP in numbers" strip under the intro. Only use figures we can stand behind. */
export const stats = [
  { id: "members", value: "~800", label: "members in the community" },
  { id: "subjects", value: "4", label: "subjects, each with its own ambassadors" },
  // Matches the company logos on the home page ("Our speakers have worked at"). Update together.
  { id: "companies", value: "9+", label: "companies our speakers have worked at" },
  // Draft: confirm CAPP is free for members before launch.
  { id: "free", value: "£0", label: "to join, always" },
];

/** "What we believe" cards. Draft, based on the directors' note: confirm with the committee. */
export const values = {
  eyebrow: "WHAT WE BELIEVE",
  title: "What CAPP stands for",
  items: [
    {
      id: "everyone",
      icon: "users",
      title: "Open to everyone",
      text: "Wherever you study and whatever your background, there is a place for you here.",
    },
    {
      id: "honest",
      icon: "message",
      title: "Honest advice",
      text: "Straight answers from people doing the job, not just what looks good on a brochure.",
    },
    {
      id: "routes",
      icon: "route",
      title: "Every route counts",
      text: "University, apprenticeships, career changes. We help you find the way in that suits you.",
    },
    {
      id: "volunteers",
      icon: "heart",
      title: "Run by volunteers",
      text: "Our directors, committee and ambassadors give their time to help the next person along.",
    },
  ],
} as const;

/** Teaser that sends people to /team. The note is taken from the directors' message in data/team.ts. */
export const teamTeaser = {
  eyebrow: "THE PEOPLE BEHIND CAPP",
  title: "Run by volunteers, for the community",
  body: "Directors, a committee and ambassadors for every subject run CAPP in their spare time. Find out who they are and who to talk to.",
  note: "We want CAPP to be a place where everyone feels welcome.",
};

/** "Where to find us" cards. Links come from SITE.whatsappUrl and `socials` in data/footer.ts. */
export const findUs = {
  eyebrow: "WHERE TO FIND US",
  title: "Come and say hello",
  whatsapp: "Where the community lives. Events, opportunities and your subject chats, all in one place.",
  // Draft one-liners: confirm what each account actually posts.
  socials: {
    instagram: "Event photos, recaps and what's coming up.",
    tiktok: "Short tips and behind the scenes at our events.",
    linkedin: "Opportunities, speakers and CAPP news.",
  },
};
