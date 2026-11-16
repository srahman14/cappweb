import { SITE } from "@/lib/site";
import type { LegalPageData } from "@/types";

/**
 * Content for /privacy and /terms. Edit the words here, never in the page files.
 * Anything in [BRACKETS] is unconfirmed and shows highlighted on the page.
 *
 * The contact address comes from SITE.contactEmail (lib/site.ts). Change it there.
 * Update LAST_UPDATED whenever either page changes.
 */
const CONTACT_EMAIL = SITE.contactEmail;
const LAST_UPDATED = "16 November 2026";

export const privacyPolicy: LegalPageData = {
  lastUpdated: LAST_UPDATED,
  intro:
    "CAPP only collects personal information when you apply for a role with us or offer to speak at an event, and we only use it for that. This policy explains what we collect, why, who sees it and how long we keep it.",
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      blocks: [
        {
          type: "paragraph",
          text: `CAPP (${SITE.fullName}) is a volunteer-run careers community that runs events and panels with industry professionals. We decide how and why the information described here is used, which makes us its controller under UK data protection law.`,
        },
        {
          type: "paragraph",
          text: "CAPP has no employees. Ambassador and committee roles are voluntary, and we do not keep employment or HR records about anyone.",
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
        { type: "paragraph", text: "This policy covers information about:" },
        {
          type: "list",
          items: [
            "People who apply to be an ambassador or join the committee.",
            "People who offer to speak at one of our events.",
            "Ambassadors, committee members and speakers who appear on this website.",
            "People who visit this website.",
          ],
        },
        {
          type: "paragraph",
          text: "Our community chats run on WhatsApp, and our application forms run on Google Forms. Those services have their own privacy policies, which also apply when you use them.",
        },
      ],
    },
    {
      id: "what-we-collect",
      title: "What we collect",
      blocks: [
        {
          type: "paragraph",
          text: "If you apply to be an ambassador or join the committee, the application form asks for:",
        },
        {
          type: "list",
          items: [
            "Your name and contact details, such as your email address and phone number.",
            "Where and what you study, and your year of study.",
            "The role and subject you are applying for (Tech, Business & Finance, Engineering, Law or a committee role).",
            "Your answers to the questions on the form, such as why you want the role, your experience and your availability.",
            "Anything else you choose to share, such as a LinkedIn profile.",
          ],
        },
        {
          type: "paragraph",
          text: "If you offer to speak at an event, we keep your name, contact details, job title and organisation, and the messages we exchange to arrange the event.",
        },
        {
          type: "paragraph",
          text: "We only ask for what we need. Please do not share sensitive details, such as information about your health, religion or ethnicity. We do not need them.",
        },
      ],
    },
    {
      id: "why-we-use-it",
      title: "Why we use it",
      blocks: [
        {
          type: "paragraph",
          text: "We use your information only for the application or event you contacted us about. That means we use it to:",
        },
        {
          type: "list",
          items: [
            "Read and compare applications fairly.",
            "Contact you about your application or event, and arrange a chat if needed.",
            "Tell you the outcome.",
            "Set up the people we appoint, for example by adding them to team chats.",
            "Plan and promote events with speakers who have agreed to take part.",
          ],
        },
        {
          type: "paragraph",
          text: "We do not use it for marketing, we do not sell it, and we do not use it to make automated decisions about you.",
        },
        {
          type: "paragraph",
          text: "Our lawful basis is legitimate interests: we need this information to choose volunteers and run events, and we have weighed this against your rights. Showing your name, photo or profile on the website is optional, and we only do it with your consent, which you can withdraw at any time.",
        },
      ],
    },
    {
      id: "on-the-website",
      title: "People shown on the website",
      blocks: [
        {
          type: "paragraph",
          text: "With their agreement, we show ambassadors and committee members on the Team and subject pages. This can include their name, role, photo and a link to their LinkedIn profile. We may also name speakers and their organisation on event pages.",
        },
        {
          type: "paragraph",
          text: "We sometimes take photos at events and use them on this website and our social media. If you would rather not appear, tell an organiser on the day, or email us and we will remove the photo.",
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
            "Only the committee members involved in choosing people for a role, or in organising the event.",
            "The services we use to run CAPP: Google (application forms and the spreadsheets that hold the answers), WhatsApp (messages), and Vercel and Supabase (hosting this website and storing what appears on it). They process information on our behalf.",
          ],
        },
        {
          type: "paragraph",
          text: "We do not share your information with employers, universities, sponsors or other speakers. We would only disclose it if the law required us to.",
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
            "Unsuccessful applications: deleted within 6 months of the decision.",
            "Successful applications: kept while you hold the role, and deleted within 12 months of you stepping down.",
            "Withdrawn applications: deleted as soon as you ask.",
            "Speaker details: kept while we are arranging the event, and for up to 12 months afterwards in case we invite you back.",
            "Your name, photo or profile on the website: removed within 14 days of you leaving the role or asking us to.",
          ],
        },
      ],
    },
    {
      id: "storage-and-security",
      title: "Where it is stored and how we protect it",
      blocks: [
        {
          type: "paragraph",
          text: "Application answers are stored in Google Forms and Google Sheets. Only the committee members who need them have access, and we remove access when someone leaves the committee.",
        },
        {
          type: "paragraph",
          text: "Our providers may process data outside the UK. Where they do, the safeguards required by UK law apply. No system is completely secure. If a breach puts your rights at risk, we will tell you, and the Information Commissioner’s Office (ICO) where the law requires it.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      blocks: [
        { type: "paragraph", text: "Under UK data protection law you can ask us to:" },
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
          text: `Email ${CONTACT_EMAIL} and we will reply within one month. There is no charge. If you are unhappy with how we handle your information, you can complain to the ICO at ico.org.uk, but we would appreciate the chance to put things right first.`,
        },
      ],
    },
    {
      id: "website-visitors",
      title: "Website visitors and cookies",
      blocks: [
        {
          type: "paragraph",
          text: "You do not need an account to use this website, and it does not ask visitors for personal information. We do not use analytics, advertising or tracking cookies.",
        },
        {
          type: "paragraph",
          text: "The only cookies are strictly necessary ones that keep committee members signed in to the private area where they update the site. Our hosting provider may log technical details, such as your IP address, to keep the site running and secure.",
        },
        {
          type: "paragraph",
          text: "Links to WhatsApp, Google Forms, social media and other websites take you to services with their own privacy policies.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        {
          type: "paragraph",
          text: "We will update the date at the top whenever we change this policy. If a change affects people with an open application, we will tell them directly.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      blocks: [
        {
          type: "paragraph",
          text: `Email ${CONTACT_EMAIL} about anything in this policy, including requests to see or delete your information.`,
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
          text: `By using this website you agree to these terms. If you do not agree, please do not use it. “We”, “us” and “CAPP” mean ${SITE.fullName}, a volunteer-run careers community.`,
        },
      ],
    },
    {
      id: "what-capp-is",
      title: "What CAPP is",
      blocks: [
        {
          type: "paragraph",
          text: "CAPP is a careers community that runs events and panels with industry professionals. The community itself runs on WhatsApp. This website is our front door: it holds our events, resources, team and ways to get involved.",
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
          text: "Everything on the site is general information shared in good faith. It is not professional careers, legal, financial or other advice, and that includes the Law and Business & Finance pages. Please check important details, such as application deadlines and entry requirements, with the original source.",
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
          text: "Company names and logos on the site show that someone from that organisation has spoken at a CAPP event. They do not mean the company endorses or partners with CAPP. If you represent a company and want its name or logo removed, contact us and we will take it down.",
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      blocks: [
        { type: "paragraph", text: "When you use the website or the community, you agree not to:" },
        {
          type: "list",
          items: [
            "Break the law, or harass, discriminate against or abuse anyone.",
            "Try to get into parts of the site or our systems you are not meant to access.",
            "Disrupt the site, for example with automated scraping that slows it down.",
            "Pretend to be an ambassador, committee member or speaker, or claim a connection to CAPP you do not have.",
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
          text: "Ambassador and committee roles are voluntary. They are not employment and come with no pay or employment contract. Applying does not guarantee a role, and we decide who to appoint. A role can end if someone steps down or no longer meets what the role expects.",
        },
        {
          type: "paragraph",
          text: "How we handle the information in your application is explained in our Privacy policy.",
        },
      ],
    },
    {
      id: "events-and-panels",
      title: "Events and panels",
      blocks: [
        {
          type: "paragraph",
          text: "Speakers share their own views, which are not necessarily CAPP’s. We sometimes take photos at events and use them on this website and our social media. If you would rather not appear, tell an organiser on the day, or contact us and we will remove the photo.",
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Content and ownership",
      blocks: [
        {
          type: "paragraph",
          text: "The site’s design and text, and the CAPP name and logo, belong to CAPP. Company and speaker logos belong to their owners. You are welcome to link to and share our pages, but please do not copy the site or its content wholesale.",
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
          text: "We provide the website and community as they are. So far as the law allows, we are not liable for losses from using the site, relying on its content or using linked sites. Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud, or for anything else the law does not allow us to limit.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to the site and these terms",
      blocks: [
        {
          type: "paragraph",
          text: "We may change or pause the website at any time. We may also update these terms, and will change the date at the top when we do. If you keep using the site after an update, you accept the new terms.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      blocks: [
        {
          type: "paragraph",
          text: "These terms are governed by the law of England and Wales, and the courts of England and Wales can hear any dispute.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      blocks: [{ type: "paragraph", text: `Questions about these terms: ${CONTACT_EMAIL}.` }],
    },
  ],
};
