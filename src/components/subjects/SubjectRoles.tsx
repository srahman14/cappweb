/**
 * "Roles you could do": sits under the hub bento (rendered by <SubjectBento />, not on its own).
 * Data comes from `roles` in src/data/<subject>.ts. Renders nothing when `roles` is empty.
 *
 * Navy cards (styled like the home page "Find your field" cards) carrying the subject's motif
 * pattern, always open. 1 column on mobile, 2 on tablet, 3 on desktop.
 */
import {
  Briefcase,
  Calculator,
  ChartColumn,
  ChartPie,
  Code,
  Cog,
  Compass,
  Construction,
  FileText,
  FlaskConical,
  Gavel,
  Building,
  Landmark,
  Leaf,
  Lightbulb,
  PenTool,
  Plane,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { SubjectMotif, SubjectRole, SubjectRoleIcon } from "@/types";
import { MotifPattern } from "./motifs";

const ICONS: Record<SubjectRoleIcon, LucideIcon> = {
  code: Code,
  chart: ChartColumn,
  sparkles: Sparkles,
  shield: ShieldCheck,
  compass: Compass,
  pen: PenTool,
  construction: Construction,
  cog: Cog,
  zap: Zap,
  flask: FlaskConical,
  plane: Plane,
  leaf: Leaf,
  briefcase: Briefcase,
  gavel: Gavel,
  scale: Scale,
  file: FileText,
  building: Building,
  landmark: Landmark,
  lightbulb: Lightbulb,
  calculator: Calculator,
  trending: TrendingUp,
  pie: ChartPie,
};

/** Alternating navy gradients, as on the home page cards. */
const GRADIENTS = ["from-indigo to-navy", "from-navy to-indigo", "from-indigo to-navy-deep", "from-navy-deep to-indigo"];

export function SubjectRoles({ subject, motif, roles }: { subject: string; motif: SubjectMotif; roles: SubjectRole[] }) {
  if (roles.length === 0) return null;

  return (
    <div className="mt-12 md:mt-16">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
        <h3 className="text-2xl font-extrabold tracking-[-0.02em] md:text-[28px]">Roles you could do</h3>
        <p className="max-w-xl text-muted md:text-right">
          {subject} covers a lot. Here is what people actually do day to day, and the usual ways in.
        </p>
      </div>

      <ul aria-label={`${subject} roles`} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {roles.map((role, i) => {
          const Icon = ICONS[role.icon];
          return (
            <li
              key={role.id}
              className={cn(
                "relative isolate flex min-h-64 min-w-0 flex-col justify-end overflow-hidden rounded-card bg-gradient-to-br p-6 text-white",
                GRADIENTS[i % GRADIENTS.length],
              )}
            >
              <MotifPattern motif={motif} tone="dark" />
              <Icon aria-hidden="true" strokeWidth={1.5} className="absolute right-5 top-5 size-10 text-gold-light" />
              <h4 className="max-w-[85%] text-2xl font-extrabold leading-[1.1] tracking-[-0.02em]">{role.title}</h4>
              <p className="mt-3 text-[15px] leading-relaxed text-on-dark">{role.body}</p>
              <p className="sr-only">Routes in:</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {role.routes.map((r) => (
                  <li key={r} className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold">
                    {r}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
