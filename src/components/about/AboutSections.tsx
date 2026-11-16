/**
 * Sections for /about (content lives in src/data/about.ts):
 *
 *   <StatStrip />      "CAPP in numbers": 4 big figures in one hairline card (2x2 on mobile)
 *   <ValuesGrid />     "What CAPP stands for": 4 big-statement cards on soft brand gradients
 *   <TeamTeaser />     short pitch for the volunteers, with a link to /team (sits directly under <ValuesGrid />)
 *   <WhereToFindUs />  WhatsApp (featured, navy) + one card per social account
 */
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button, Container, Section, SectionHeader } from "@/components/ui";
import { SOCIAL_ICONS } from "@/components/ui/SocialIcons";
import { findUs, stats, teamTeaser, values } from "@/data/about";
import { socials } from "@/data/footer";
import { directorsMessage } from "@/data/team";
import { cn } from "@/lib/cn";
import { caveat } from "@/lib/fonts";
import { SITE } from "@/lib/site";

const FOCUS = "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo";

export function StatStrip() {
  return (
    // Not <Section>: no top padding, so the strip sits close under the intro split.
    <Container className="pb-12 md:pb-20">
      <h2 className="sr-only">CAPP in numbers</h2>
      <dl className="grid grid-cols-2 overflow-hidden rounded-card border border-line bg-white lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              "flex flex-col gap-1 p-6 md:p-8",
              i % 2 === 1 && "border-l border-line",
              i >= 2 && "border-t border-line lg:border-t-0",
              i === 2 && "lg:border-l",
            )}
          >
            <dt className="order-2 text-sm leading-snug text-muted md:text-[15px]">{s.label}</dt>
            <dd className="order-1 text-4xl font-extrabold tracking-[-0.04em] text-navy-ink md:text-5xl">{s.value}</dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}

export function ValuesGrid() {
  return (
    // Not <Section>: no bottom padding, because <TeamTeaser /> follows straight on.
    <Container className="pt-12 md:pt-20">
      <SectionHeader eyebrow={values.eyebrow} title={values.title} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {values.items.map((v) => (
          <li
            key={v.id}
            className={cn(
              "flex min-h-40 items-end rounded-card border border-line bg-gradient-to-br p-6 md:min-h-52 md:p-7",
              v.tint,
            )}
          >
            <h3 className="text-[32px] font-extrabold leading-[1.02] tracking-[-0.035em] text-navy-ink md:text-[40px]">
              {v.title}
            </h3>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export function TeamTeaser() {
  return (
    // Not <Section>: small top gap so it reads as part of the values block above.
    <Container className="pb-12 pt-4 md:pb-20 md:pt-5">
      <div className="grid gap-10 rounded-panel border border-line bg-white p-6 md:p-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-16">
        <div className="flex flex-col items-start gap-4">
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-muted-soft">{teamTeaser.eyebrow}</p>
          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[40px]">{teamTeaser.title}</h2>
          <p className="max-w-xl text-lg leading-relaxed text-muted">{teamTeaser.body}</p>
          <Button href="/team" className="mt-2">Meet the team</Button>
        </div>
        <figure className="rounded-card bg-surface p-6 md:p-8">
          <blockquote className="text-xl font-semibold leading-snug tracking-[-0.01em] text-navy-ink md:text-2xl">
            &ldquo;{teamTeaser.note}&rdquo;
          </blockquote>
          <figcaption className={cn(caveat.className, "mt-4 text-2xl leading-none text-gold-ink")}>
            {directorsMessage.signOff}, directors
          </figcaption>
        </figure>
      </div>
    </Container>
  );
}

export function WhereToFindUs() {
  return (
    <Section>
      <SectionHeader eyebrow={findUs.eyebrow} title={findUs.title} />
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        <a
          href={SITE.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group relative isolate flex min-h-56 flex-col gap-3 overflow-hidden rounded-card bg-panel-gradient p-6 text-white md:col-span-3 md:p-8 lg:min-h-64",
            FOCUS,
          )}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-glow-gold" />
          <span aria-hidden="true" className="grid size-12 place-items-center rounded-xl bg-white/10 text-gold-light">
            <MessageCircle size={24} />
          </span>
          <h3 className="mt-auto text-2xl font-extrabold tracking-[-0.02em] md:text-3xl">WhatsApp community</h3>
          <p className="max-w-xl text-on-dark">{findUs.whatsapp}</p>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-gold-light group-hover:underline">
            Join on WhatsApp <ArrowUpRight aria-hidden="true" size={16} />
          </span>
        </a>

        {socials.map(({ platform, href }) => (
          <a
            key={platform}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex flex-col gap-3 rounded-card border border-line bg-white p-6 transition-colors hover:border-muted-soft motion-reduce:transition-none",
              FOCUS,
            )}
          >
            <span aria-hidden="true" className="grid size-11 place-items-center rounded-xl bg-indigo-soft text-indigo">
              {SOCIAL_ICONS[platform].icon}
            </span>
            <h3 className="text-xl font-extrabold tracking-[-0.02em]">{SOCIAL_ICONS[platform].label}</h3>
            <p className="text-[15px] leading-relaxed text-muted">{findUs.socials[platform]}</p>
            <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-bold text-indigo group-hover:underline">
              Follow us <ArrowUpRight aria-hidden="true" size={16} />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
