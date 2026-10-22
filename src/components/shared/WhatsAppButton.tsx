/**
 * "Join the WhatsApp community" button. The URL lives in lib/site.ts, so every
 * join button on the site always points to the same place.
 *
 * Usage:
 *   <WhatsAppButton />                          // default label
 *   <WhatsAppButton variant="onDark" label="Join on WhatsApp" size="sm" />
 */
import { Button, type ButtonProps } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

export interface WhatsAppButtonProps {
  label?: string;
  variant?: NonNullable<ButtonProps["variant"]>;
  size?: NonNullable<ButtonProps["size"]>;
  className?: string;
}

export function WhatsAppButton({ label = "Join the WhatsApp community", variant = "primary", size = "md", className }: WhatsAppButtonProps) {
  return (
    <Button href={SITE.whatsappUrl} variant={variant} size={size} className={className}>
      {label}
    </Button>
  );
}
