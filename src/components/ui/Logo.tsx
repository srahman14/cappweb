/**
 * CAPP logo. Put the file in /public (currently expects /capp-logo.webp).
 *
 * Usage: <Logo size={40} />
 */
import Image from "next/image";
import Link from "next/link";

export interface LogoProps {
  /** Width/height in px (the logo is square). */
  size?: number;
}

export function Logo({ size = 40 }: LogoProps) {
  return (
    <Link href="/" aria-label="CAPP home" className="inline-block shrink-0">
      <Image src="/brand/capp-logo.webp" alt="CAPP logo" width={size} height={size} className="rounded-[10px] object-cover" priority />
    </Link>
  );
}
