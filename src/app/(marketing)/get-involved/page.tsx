import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { WayCard } from "@/components/get-involved/WayCard";
import { MediaFeatureSplit } from "@/components/shared/MediaFeatureSplit";
import { PageHeader, HandDrawnUnderline } from "@/components/ui";
import { content } from "@/data/get-involved";

export const metadata: Metadata = pageMetadata("/get-involved", "Get involved");

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

      <MediaFeatureSplit
        slotKey="about_image_1"
        alt="A CAPP community event"
        caption="From one of our events"
        {...content.intro}
      />

      <div className="grid gap-4 px-3 pb-16 md:grid-cols-3 md:gap-6 md:px-6 md:pb-24">
        {content.items.map((item) => (
          <WayCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}
