import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { HandDrawnUnderline, PageHeader, Section } from "@/components/ui";
import { privacyPolicy } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How CAPP uses the personal information of people who apply for a role, speak at an event or visit this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]}
        title={
          <>
            <HandDrawnUnderline rotate={-1}>Privacy</HandDrawnUnderline> policy
          </>
        }
        description="What we collect when you apply for a role or offer to speak, why, who sees it and how long we keep it."
      />
      <Section>
        <LegalLayout {...privacyPolicy} />
      </Section>
    </>
  );
}
