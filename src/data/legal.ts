import type { LegalPageData } from "@/types";

/**
 * Content for /privacy and /terms. Edit the words here, never in the page files.
 * Anything in [BRACKETS] is unconfirmed and shows highlighted on the page.
 * Resolve every bracket (and have the committee read it) before launch.
 *
 * Move CONTACT_EMAIL into lib/site.ts (SITE) once we have the real address.
 */
const CONTACT_EMAIL = "[CAPP CONTACT EMAIL]";
const LAST_UPDATED = "[DD Month YYYY]";

export const privacyPolicy: LegalPageData = {
  lastUpdated: LAST_UPDATED,
  intro:
    "This policy is mainly for people who apply to be a CAPP ambassador or join the committee. It explains what we collect, why, who sees it and how long we keep it.",
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      blocks: [
        {
          type: "paragraph",
          text: "CAPP (Careers and People’s Progression) is a careers community that runs events and panels with industry professionals. We are the controller of the personal information described here, which means we decide how and why it is used. [CONFIRM LEGAL NAME AND STATUS OF CAPP]",
        },
        {
          type: "paragraph",
          text: `Questions about this policy or your information: ${CONTACT_EMAIL}.`,
        },
      ],
    },
    {
      id: "what-this-covers",
      title: "What this policy covers",
      blocks: [
        {
          type: "paragraph",
          text: "It covers information you give us when you apply for an ambassador or committee role, and, in section 10, what happens when you simply visit this website. It does not cover WhatsApp, which has its own privacy policy.",
        },
      ],
    },
    {
      id: "what-we-collect",
      title: "What we collect from applicants",
      blocks: [
        { type: "paragraph", text: "Depending on the role, we may collect:" },
        {
          type: "list",
          items: [
            "Contact details: your name, email address and [WHATSAPP / PHONE NUMBER].",
            "Background: your university, course and year of study.",
            "The role and subject you are applying for (Tech, Business & Finance, Engineering or Law, or a committee role).",
            "Your answers: why you want the role, your experience and your availability.",
            "Anything you choose to attach or link, such as [CV / LINKEDIN PROFILE].",
            "If you are shortlisted: notes from your interview and how we scored it.",
            "The outcome of your application and any feedback we give you.",
          ],
        },
        {
          type: "paragraph",
          text: "We only ask for what we need to choose people fairly. Please do not include sensitive details (such as health, religion or ethnicity) unless a question asks for them and explains why. [CHECK THIS LIST AGAINST THE REAL APPLICATION FORM BEFORE PUBLISHING]",
        },
      ],
    },
    {
      id: "how-we-collect",
      title: "How we collect it",
      blocks: [
        {
          type: "paragraph",
          text: "Directly from you: through our application form ([GOOGLE FORM / OTHER]), by email or message if you get in touch, and during interviews. Interview notes are written by the committee members who speak to you.",
        },
      ],
    },
    {
      id: "why-we-use-it",
      title: "Why we use it",
      blocks: [
        { type: "paragraph", text: "We use applicant information to:" },
        {
          type: "list",
          items: [
            "Read and compare applications fairly.",
            "Contact you and arrange interviews.",
            "Keep a record of how decisions were made.",
            "Set up the people we appoint, for example adding them to team chats and handover materials.",
            "Answer your questions about your application.",
          ],
        },
        {
          type: "paragraph",
          text: "Our lawful basis is legitimate interests: we need this information to run volunteer roles fairly, and we have weighed this against your rights. Where we ask for something extra, such as showing your name, photo or bio on the Team or subject pages, we ask for your consent separately. You can withdraw it at any time.",
        },
      ],
    },
    {
      id: "who-sees-it",
      title: "Who sees it",
      blocks: [
        {
          type: "list",
          items: [
            "Only the committee members involved in selection ([E.G. DIRECTORS AND THE RELEVANT SUBJECT LEAD]).",
            "Our tools, such as [GOOGLE WORKSPACE] for forms and spreadsheets. These providers process information on our behalf.",
          ],
        },
        {
          type: "paragraph",
          text: "We do not sell your information, and we do not share it with employers, universities, sponsors or speakers. We may disclose it if the law requires us to.",
        },
      ],
    },
    {
      id: "how-long-we-keep-it",
      title: "How long we keep it",
      blocks: [
        {
          type: "list",
          items: [
            "Unsuccessful applications: deleted within [X MONTHS] of the decision.",
            "Successful applications: kept while you hold the role and for [X MONTHS] after you step down.",
            "After that we may keep a minimal record (your name, role and dates) so future teams have a handover trail. [CONFIRM]",
            "Withdrawn applications: deleted when you ask.",
          ],
        },
        {
          type: "paragraph",
          text: "If your name, photo or bio appears on the website, we remove it within [X DAYS] of you leaving the role or asking us to.",
        },
      ],
    },
    {
      id: "storage-and-security",
      title: "Where it is stored and how we protect it",
      blocks: [
        {
          type: "paragraph",
          text: "Application information is stored in [GOOGLE WORKSPACE — CONFIRM]. Access is limited to the named committee members who need it, and [WE REVIEW WHO HAS ACCESS AT THE START OF EACH TERM].",
        },
        {
          type: "paragraph",
          text: "Our providers may process data outside the UK. Where they do, the safeguards required by UK law apply. No system is completely secure. If a breach puts your rights at risk, we will tell you and the Information Commissioner’s Office (ICO) where the law requires it.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      blocks: [
        {
          type: "paragraph",
          text: "Under UK data protection law you can ask us to:",
        },
        {
          type: "list",
          items: [
            "Give you a copy of the information we hold about you.",
            "Correct anything that is wrong.",
            "Delete your information.",
            "Restrict how we use it, or object to us using it.",
            "Give you your information in a portable format.",
            "Stop using it where we rely on your consent.",
          ],
        },
        {
          type: "paragraph",
          text: `Email ${CONTACT_EMAIL} and we will reply within one month. There is normally no charge. If you are unhappy with how we handle your information, you can complain to the ICO at ico.org.uk. We would appreciate the chance to put things right first.`,
        },
      ],
    },
    {
      id: "website-visitors",
      title: "Website visitors",
      blocks: [
        {
          type: "paragraph",
          text: "This website has no accounts or logins, and it does not ask visitors for personal information. [CONFIRM: WE DO NOT CURRENTLY USE ANALYTICS OR ADVERTISING COOKIES. IF THIS CHANGES, UPDATE THIS SECTION BEFORE SWITCHING THEM ON.]",
        },
        {
          type: "paragraph",
          text: "Our hosting provider may log technical details such as your IP address to keep the site running and secure. Links to WhatsApp, Google, social media and other sites take you to places with their own privacy policies.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        {
          type: "paragraph",
          text: "We will update the date at the top when we change this policy. If a change affects people with a live application, we will tell them directly.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      blocks: [
        {
          type: "paragraph",
          text: `Email ${CONTACT_EMAIL} for anything in this policy, including requests to see or delete your information.`,
        },
      ],
    },
  ],
};

export const terms: LegalPageData = {
  lastUpdated: LAST_UPDATED,
  intro:
    "These terms cover your use of the CAPP website and community. They are short on purpose. Please read them before you use the site.",
  sections: [
    {
      id: "about-these-terms",
      title: "About these terms",
      blocks: [
        {
          type: "paragraph",
          text: "By using this website you agree to these terms. If you do not agree, please do not use it. “We” and “CAPP” mean Careers and People’s Progression. [CONFIRM LEGAL NAME AND STATUS OF CAPP]",
        },
      ],
    },
    {
      id: "what-capp-is",
      title: "What CAPP is",
      blocks: [
        {
          type: "paragraph",
          text: "CAPP is a careers community that runs events and panels with industry professionals. The community runs on WhatsApp. This website is the library and front door: it holds our events, resources, team and ways to get involved.",
        },
        {
          type: "paragraph",
          text: "CAPP is not an employer, a recruitment agency or a provider of regulated advice.",
        },
      ],
    },
    {
      id: "information-and-advice",
      title: "Information, not advice",
      blocks: [
        {
          type: "paragraph",
          text: "Everything on the site is general information shared in good faith. It is not professional career, legal, financial or other advice, including on the Law and Business & Finance pages. Please check important details with the original source.",
        },
        {
          type: "paragraph",
          text: "Events, resources and deadlines can change. We try to keep them accurate but cannot promise they are complete or up to date. Taking part in CAPP does not guarantee an interview, internship or job.",
        },
      ],
    },
    {
      id: "links-and-logos",
      title: "Links and company names",
      blocks: [
        {
          type: "paragraph",
          text: "We link to websites and resources we do not run, and we are not responsible for their content or policies.",
        },
        {
          type: "paragraph",
          text: "Company names and logos show that someone from that organisation has spoken at a CAPP panel. They do not mean the company endorses CAPP or is partnered with us. [CONFIRM LOGO PERMISSIONS]",
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      blocks: [
        {
          type: "paragraph",
          text: "When you use the website or the community, you agree not to:",
        },
        {
          type: "list",
          items: [
            "Break the law or harass, discriminate against or abuse anyone.",
            "Try to get into parts of the site or our systems you are not meant to access.",
            "Disrupt the site, for example with automated scraping that slows it down.",
            "Pretend to be an ambassador, committee member or speaker, or otherwise claim a connection to CAPP you do not have.",
            "Post spam or misleading opportunities.",
          ],
        },
        {
          type: "paragraph",
          text: "We may remove people from the community if they break these rules.",
        },
      ],
    },
    {
      id: "ambassador-and-committee-roles",
      title: "Ambassador and committee roles",
      blocks: [
        {
          type: "paragraph",
          text: "Ambassador and committee roles are voluntary. They are not employment, and they come with no pay or contract of employment. Applying does not guarantee you a role, and we decide who to appoint. Roles can end if someone steps down or no longer meets the expectations of the role.",
        },
        {
          type: "paragraph",
          text: "How we handle your application information is explained in our Privacy policy.",
        },
      ],
    },
    {
      id: "events-and-panels",
      title: "Events and panels",
      blocks: [
        {
          type: "paragraph",
          text: "Speakers share their own views, which are not CAPP’s. [IF WE PHOTOGRAPH OR RECORD EVENTS, SAY SO HERE AND HOW ATTENDEES CAN OPT OUT]",
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Content and ownership",
      blocks: [
        {
          type: "paragraph",
          text: "The site’s design, text and the CAPP name and logo belong to CAPP [CONFIRM]. Company and speaker logos belong to their owners. You may link to our pages and share them, but please do not copy the site wholesale.",
        },
        {
          type: "paragraph",
          text: "If you suggest a resource or send us content, you confirm you are allowed to share it and give us permission to use it on the site.",
        },
      ],
    },
    {
      id: "liability",
      title: "Our responsibility",
      blocks: [
        {
          type: "paragraph",
          text: "We provide the website and community as they are, and we are not liable for losses from using the site, relying on its content or using linked sites, so far as the law allows. Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud, or for anything else the law does not allow us to limit.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to the site and these terms",
      blocks: [
        {
          type: "paragraph",
          text: "We may change or pause the website at any time. We may update these terms and will change the date at the top when we do. If you keep using the site after an update, you accept the new terms.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      blocks: [
        {
          type: "paragraph",
          text: "These terms are governed by the law of England and Wales, and the courts of England and Wales can hear any dispute. [CONFIRM]",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      blocks: [
        {
          type: "paragraph",
          text: `Questions about these terms: ${CONTACT_EMAIL}.`,
        },
      ],
    },
  ],
};
