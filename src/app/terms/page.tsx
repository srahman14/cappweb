import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CTABand } from "@/components/shared/CTABand";
import { HandDrawnUnderline, PageHeader, Section } from "@/components/ui";
import { terms } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "The terms for using the CAPP website and community.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Terms and conditions" },
        ]}
        title={
          <>
            <HandDrawnUnderline rotate={1}>Terms</HandDrawnUnderline> and
            conditions
          </>
        }
        description="The ground rules for using the CAPP website and taking part in the community."
      />
      <Section>
        <LegalLayout {...terms} />
      </Section>
    </>
  );
}
