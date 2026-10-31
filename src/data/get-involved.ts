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
        variant: "primary",
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
        variant: "primary",
      },
    },
    {
      id: "donate",
      title: "Donate",
      description:
        "Help us grow and reach more people by contributing resources.",
      action: {
        label: "Donate",
        href: "#",
        component: Button,
        variant: "gold",
      },
    },
  ],
};
