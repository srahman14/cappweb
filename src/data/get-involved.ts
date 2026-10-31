import { Button } from "@/components/ui";

export const content = {
  items: [
    {
      id: "volunteer",
      title: "Volunteer",
      description:
        "Support events, outreach and community projects by joining our volunteer team.",
      action: {
        label: "Sign up",
        href: "#",
        component: Button,
        className: "bg-primary text-white", 
      },
    },
    {
      id: "partner",
      title: "Partner with us",
      description:
        "Collaborate with CAPP on initiatives that uplift and empower communities.",
      action: {
        label: "Contact us",
        href: "#",
        component: Button,
        className: "bg-primary text-white", 
      },
    },
    {
      id: "guest-speaker",
      title: "Volunteer as Guest Speaker",
      description:
        "Share your expertise and inspire others by speaking at our events.",
      action: {
        label: "Apply",
        href: "#",
        component: Button,
        className: "bg-[#6C47FF] text-white",
      },
    },
  ],
};
