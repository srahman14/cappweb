/**
 * White bordered card with the soft shadow. The base for event rows,
 * resource cards, step cards, etc.
 *
 * Usage: <Card className="p-6">...</Card>
 */
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-card border border-line bg-white shadow-card", className)} {...props} />;
}
