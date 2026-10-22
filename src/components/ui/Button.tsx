/**
 * The ONLY button/link-button in the site. Pick a `variant`; don't restyle it.
 *
 *   primary        navy, for light backgrounds
 *   secondary      outlined, for light backgrounds
 *   onDark         white, for navy panels
 *   outlineOnDark  outlined white, for navy panels
 *   gold           gold gradient accent
 *
 * Pass `href` to get a link (internal = next/link, http(s) = new-tab <a>),
 * or omit it to get a real <button>.
 *
 * Usage:
 *   <Button href="/events" variant="secondary">See events</Button>
 */
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "onDark" | "outlineOnDark" | "gold";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-navy-ink text-white hover:bg-navy",
  secondary: "border border-line bg-white text-navy-ink hover:border-muted-soft",
  onDark: "bg-white text-navy-ink hover:bg-white/90",
  outlineOnDark: "border border-white/30 text-white hover:bg-white/10",
  gold: "bg-gold-gradient text-navy-ink hover:brightness-105",
};
const SIZES: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3.5 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}
type LinkProps = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;
type NativeProps = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;
export type ButtonProps = LinkProps | NativeProps;

export function Button({ variant = "primary", size = "md", className, children, ...rest }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-semibold transition",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest as Omit<LinkProps, keyof CommonProps>;
    const external = /^https?:\/\//.test(href);
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...anchorProps}>{children}</a>
    ) : (
      <Link href={href} className={classes} {...anchorProps}>{children}</Link>
    );
  }
  return <button className={classes} {...(rest as Omit<NativeProps, keyof CommonProps>)}>{children}</button>;
}
