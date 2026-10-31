import type { Metadata } from "next";
import { CTABand } from "@/components/shared/CTABand";
import { PageHeader, Section, SectionHeader, HandDrawnUnderline } from "@/components/ui";
import { content } from "@/data/get-involved";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Ways to support and contribute to the CAPP community.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Get involved" },
        ]}
        title={
          <>
            <HandDrawnUnderline rotate={-2}>Get</HandDrawnUnderline> involved
          </>
        }
        description="Support the CAPP community through volunteering, partnerships or contributions."
      />

      <Section>
        <SectionHeader
          eyebrow="WAYS TO SUPPORT"
          title="How you can get involved"
        />

        {/* Three cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {content.items.map((item) => (
            <div
              key={item.id}
              className="border border-line rounded-card bg-white p-6 shadow-card"
            >
              <h3 className="text-xl font-semibold tracking-[-0.03em] mb-3">
                {item.title}
              </h3>
              <p className="text-muted mb-4">{item.description}</p>

              {/* Use shared Button component */}
              <item.action.component
                href={item.action.href}
                variant={item.action.variant}
                size="md"
              >
                {item.action.label}
              </item.action.component>
            </div>
          ))}
        </div>
      </Section>

      <CTABand title="Ready to join the community?" />
    </>
  );
}
