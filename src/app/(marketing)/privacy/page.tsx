import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CTABand } from "@/components/shared/CTABand";
import { HandDrawnUnderline, PageHeader, Section } from "@/components/ui";
import { privacyPolicy } from "@/data/legal";

export const metadata: Metadata = pageMetadata("/privacy", "Privacy policy");

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
        description="What we collect when you apply to be an ambassador or join the committee, why, who sees it and how long we keep it."
      />
      <Section>
        <LegalLayout {...privacyPolicy} />
      </Section>
    </>
  );
}
