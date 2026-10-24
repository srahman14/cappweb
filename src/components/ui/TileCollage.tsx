/**
 * Two tilted tiles used as a photo "collage". Shows brand gradients until you
 * pass real image paths.
 *
 * Usage: <TileCollage images={["/photos/panel.jpg", "/photos/hackathon.jpg"]} />
 */
import Image from "next/image";

export interface TileCollageProps {
  /** Optional photos (paths in /public) for the first and second tile. */
  images?: [string?, string?];
}

const TILE = "absolute overflow-hidden rounded-3xl bg-linear-to-br shadow-card";

export function TileCollage({ images = [] }: TileCollageProps) {
  return (
    <div className="relative h-[320px] w-full md:h-[380px]">
      <div className={`${TILE} left-[5%] top-5 h-[78%] w-[55%] -rotate-[4deg] from-indigo to-navy`}>
        {images[0] && <Image src={images[0]} alt="" fill sizes="30vw" className="object-cover" />}
      </div>
      <div className={`${TILE} right-[2%] top-[18%] h-[76%] w-[48%] rotate-[5deg] from-gold to-indigo`}>
        {images[1] && <Image src={images[1]} alt="" fill sizes="25vw" className="object-cover" />}
      </div>
    </div>
  );
}