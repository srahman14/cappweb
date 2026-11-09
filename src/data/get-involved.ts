import { SITE } from "@/lib/site";

export const content = {
  intro: {
    eyebrow: "WHY GET INVOLVED",
    title: "Help us open doors for the next student",
    body: "CAPP runs events and shares careers guidance with students. However you choose to help, you will be helping more people reach it.",
    bullets: [
      "Share your experience with students who are finding their way",
      "Support events and careers guidance for students",
      "Choose a way to help that fits around your life",
    ],
  },
  items: [
    {
      id: "volunteer-speaker",
      title: "Volunteer for an event (as a speaker)",
      description:
        "Share your career story and practical advice with students at one of our events.",
      href: SITE.whatsappUrl,
      image: "/team/hover-1.png",
      tint: "from-indigo-soft to-white",
    },
    {
      id: "partner",
      title: "Partner with us",
      description:
        "Work with CAPP on initiatives that open up opportunities for our community.",
      href: SITE.whatsappUrl,
      image: "/team/hover-2.png",
      tint: "from-gold-light/40 to-white",
    },
    {
      id: "join-team",
      title: "Join the team",
      description:
        "Help us run CAPP day to day and shape what we do next. Meet the team and find out how to apply.",
      href: "/team",
      image: "/team/hover-3.png",
      tint: "from-indigo-soft via-white to-gold-light/30",
    },
  ],
};
