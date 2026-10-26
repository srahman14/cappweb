import Image from "next/image";
import type { Director } from "@/data/team";

interface DirectorsFeatureProps {
  directors: Director[];
  image: { src?: string | ""; alt: string };
  video?: { src?: string };
  message: { title: string; paragraphs: string[]; signOff: string };
}

/**
 * DirectorsFeature: short message on the left and directors' photo on the right.
 * Stacks on mobile (photo first). No image → brand-gradient placeholder.
 * Props: `directors`, `image` ({ src?, alt }), optional `video` ({ src? }), and `message`.
 * Usage: <DirectorsFeature directors={directors} image={directorsImage} video={directorsVideo} message={directorsMessage} />
 */
export function DirectorsFeature({
  directors,
  image,
  video,
  message,
}: DirectorsFeatureProps) {
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
      <div className="flex flex-col gap-5 lg:order-2">
        <div className="relative min-h-180 flex-1 overflow-hidden rounded-panel">
          {video?.src ? (
            <video
              src={video.src}
              poster={image.src}
              controls
              playsInline
              loop
              preload="metadata"
              aria-label="Video from the directors"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : image.src ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-glow-gold"
              />
              <p className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-on-dark">
                [DIRECTORS PHOTO]
              </p>
            </>
          )}
        </div>

        {/* <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {directors.map((d) => (
            <li key={d.id}>
              <p className="font-bold text-navy-ink">{d.name}</p>
              <p className="text-sm text-muted-soft">{d.role}</p>
            </li>
          ))}
        </ul> */}
      </div>

      <div className="order-2 flex flex-col justify-start border-none bg-color-surface p-8 shadow-none lg:order-1 md:p-10">
        <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-navy-ink md:text-3xl">
          {message.title}
        </h3>
        <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
          {message.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p className="mt-6 font-bold text-navy-ink">{message.signOff}</p>
      </div>
    </div>
  );
}
