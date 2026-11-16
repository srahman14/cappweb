import { Suspense } from "react";
import { connection } from "next/server";
import { getMediaBySlots } from "@/lib/services/media.service";
import { ImageCaption, Section } from "@/components/ui";
import { MediaImage } from "@/components/media/MediaImage";
import { FeatureSplit, type FeatureSplitProps } from "./FeatureSplit";

interface MediaFeatureSplitProps extends FeatureSplitProps {
  slotKey: string;
  alt: string;
  /** Handwritten caption + squiggly arrow under the image, e.g. "From our Tech panel". */
  caption?: string;
}

export function MediaFeatureSplit({ slotKey, alt, caption, ...feature }: MediaFeatureSplitProps) {
  return (
    <Suspense
      fallback={
        <Section>
          <FeatureSplit {...feature} media={<MediaPlaceholder />} />
        </Section>
      }
    >
      <MediaFeatureSplitContent slotKey={slotKey} alt={alt} caption={caption} feature={feature} />
    </Suspense>
  );
}

async function MediaFeatureSplitContent({
  slotKey,
  alt,
  caption,
  feature,
}: {
  slotKey: string;
  alt: string;
  caption?: string;
  feature: FeatureSplitProps;
}) {
  await connection();

  const mediaSlots = await getMediaBySlots([slotKey]);
  const image = mediaSlots.find((slot) => slot.slot_key === slotKey)?.blob_url;

  return (
    <Section>
      <FeatureSplit
        {...feature}
        media={
          <div>
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
            {caption && <ImageCaption>{caption}</ImageCaption>}
          </div>
        }
      />
    </Section>
  );
}

function MediaPlaceholder() {
  return <div aria-hidden="true" className="aspect-4/3 rounded-panel bg-navy-deep" />;
}
