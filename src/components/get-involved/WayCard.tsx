import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface WayCardProps {
  title: string;
  description: string;
  href: string;
  image: string;
  tint: string;
}

export function WayCard({ title, description, href, image, tint }: WayCardProps) {
  const external = /^(https?:|mailto:)/.test(href);
  const className = cn(
    "group relative flex min-h-64 flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br p-6 md:min-h-80 md:p-8",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo",
    "transition-transform motion-safe:hover:-translate-y-1 motion-reduce:transition-none",
    tint,
  );
  const inner = (
    <>
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-navy-deep/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
      />
      <ArrowUpRight
        aria-hidden="true"
        size={28}
        className="absolute right-6 top-6 text-indigo opacity-100 transition-opacity group-hover:text-white md:right-8 md:top-8 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100"
      />
      <div className="relative">
        <h3 className="text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] transition-colors group-hover:text-white group-focus-visible:text-white md:text-4xl">
          {title}
          {external && <span className="sr-only"> (opens in a new tab)</span>}
        </h3>
        <p className="mt-3 text-muted transition-colors group-hover:text-white group-focus-visible:text-white">
          {description}
        </p>
      </div>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}
