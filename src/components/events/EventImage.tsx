import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  className?: string;
  sizes: string;
};

/** Event image (next/image) or the dark placeholder when no image is set. */
export function EventImage({ src, alt = "", className = "", sizes }: Props) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-[9px] bg-navy text-[11px] font-extrabold tracking-[1.3px] text-on-dark ${className}`}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <span role="img" aria-label="Placeholder event image">
          IMAGE PLACEHOLDER
        </span>
      )}
    </div>
  );
}
