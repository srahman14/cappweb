import { Suspense } from "react";
import { getMediaBySlots } from "@/lib/services/media.service";
import { Section } from "@/components/ui";
import { MediaImage } from "@/components/media/MediaImage";
import { FeatureSplit, type FeatureSplitProps } from "./FeatureSplit";

interface MediaFeatureSplitProps extends FeatureSplitProps {
  slotKey: string;
  alt: string;
}

export function MediaFeatureSplit({ slotKey, alt, ...feature }: MediaFeatureSplitProps) {
  return (
    <Suspense
      fallback={
        <Section>
          <FeatureSplit {...feature} media={<MediaPlaceholder />} />
        </Section>
      }
    >
      <MediaFeatureSplitContent slotKey={slotKey} alt={alt} feature={feature} />
    </Suspense>
  );
}

async function MediaFeatureSplitContent({
  slotKey,
  alt,
  feature,
}: {
  slotKey: string;
  alt: string;
  feature: FeatureSplitProps;
}) {
  const mediaSlots = await getMediaBySlots([slotKey]);
  const image = mediaSlots.find((slot) => slot.slot_key === slotKey)?.blob_url;

  return (
    <Section>
      <FeatureSplit
        {...feature}
        media={
          <div className="relative aspect-4/3 overflow-hidden rounded-panel">
            {image ? (
              <MediaImage
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <MediaPlaceholder />
            )}
          </div>
        }
      />
    </Section>
  );
}

function MediaPlaceholder() {
  return <div aria-hidden="true" className="aspect-4/3 rounded-panel bg-navy-deep" />;
}
