/**
 * "When to apply" calendar for a subject page. Rows come from `calendar` in
 * src/data/<subject>.ts. Renders nothing when the list is empty.
 *
 * Desktop/tablet: a September-to-August timeline with a bar per row
 *   (indigo = applications open, gold = programme runs, dashed = all year).
 * Mobile: the same rows as a plain list ("Apply Oct to Jan · Runs Mar to Apr"),
 *   which reads better than a squashed timeline.
 */
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { caveat } from "@/lib/fonts";
import type { CalendarMonth, CalendarRow } from "@/types";

const MONTHS: CalendarMonth[] = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

/** Grid column span for an inclusive month range (column 1 holds the row label). */
const span = ([from, to]: [CalendarMonth, CalendarMonth]): CSSProperties => ({
  gridColumn: `${MONTHS.indexOf(from) + 2} / ${MONTHS.indexOf(to) + 3}`,
});

const range = ([from, to]: [CalendarMonth, CalendarMonth]) => (from === to ? from : `${from} to ${to}`);

const BAR = "h-3.5 self-center rounded-full mx-0.5";

export function ApplicationCalendar({ subject, rows }: { subject: string; rows: CalendarRow[] }) {
  if (rows.length === 0) return null;

  return (
    <section aria-labelledby="calendar-title" className="pb-12 md:pb-20">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-20">
        <div className="rounded-panel border border-line bg-white px-5 py-7 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-muted-soft">Application calendar</p>
              <h2 id="calendar-title" className="mt-2 text-2xl font-extrabold tracking-[-0.02em] md:text-[28px]">
                When to apply in {subject}
              </h2>
            </div>
            <ul className="hidden gap-5 text-sm text-muted md:flex" aria-hidden="true">
              <li className="flex items-center gap-2"><span className="h-2 w-5 rounded-full bg-indigo" />Applications open</li>
              <li className="flex items-center gap-2"><span className="h-2 w-5 rounded-full bg-gold" />Programme runs</li>
            </ul>
          </div>

          {/* Mobile: list */}
          <ul className="mt-6 flex flex-col md:hidden">
            {rows.map((row) => (
              <li key={row.id} className="border-t border-line py-4 last:border-b">
                <p className="font-bold">
                  {row.label} <span className="font-medium text-muted-soft">· {row.who}</span>
                </p>
                <p className="mt-1.5 flex flex-wrap gap-1.5 text-sm">
                  {row.allYear && <span className="rounded-full bg-indigo-soft px-2.5 py-1 font-semibold text-indigo">All year round</span>}
                  {row.apply && (
                    <span className="rounded-full bg-indigo-soft px-2.5 py-1 font-semibold text-indigo">Apply {range(row.apply)}</span>
                  )}
                  {row.runs && (
                    <span className="rounded-full bg-gold/15 px-2.5 py-1 font-semibold text-gold-ink">Runs {range(row.runs)}</span>
                  )}
                </p>
              </li>
            ))}
          </ul>

          {/* Tablet/desktop: timeline */}
          <div className="mt-8 hidden md:block">
            <div className="grid grid-cols-[180px_repeat(12,minmax(0,1fr))] gap-y-3.5 lg:grid-cols-[210px_repeat(12,minmax(0,1fr))]">
              <span />
              {MONTHS.map((m) => (
                <span key={m} className="border-b border-line pb-1.5 text-center font-mono text-xs text-muted-soft">{m}</span>
              ))}
              {rows.map((row, i) => {
                const line = { gridRow: i + 2 };
                return (
                  <div key={row.id} className="contents">
                    <p className="pr-3 text-[15px] font-bold" style={{ ...line, gridColumn: 1 }}>
                      {row.label}
                      <span className="block text-[13px] font-medium text-muted-soft">{row.who}</span>
                    </p>
                    {row.allYear && (
                      <span
                        className={cn(BAR, "opacity-45")}
                        style={{
                          ...line,
                          gridColumn: "2 / 14",
                          backgroundImage: "repeating-linear-gradient(90deg, var(--color-indigo) 0 8px, transparent 8px 14px)",
                        }}
                      />
                    )}
                    {row.apply && <span className={cn(BAR, "bg-indigo")} style={{ ...line, ...span(row.apply) }} title={`Apply ${range(row.apply)}`} />}
                    {row.runs && <span className={cn(BAR, "bg-gold")} style={{ ...line, ...span(row.runs) }} title={`Runs ${range(row.runs)}`} />}
                  </div>
                );
              })}
            </div>
            {/* Screen readers get the list version above via this summary instead of the bars */}
            <ul className="sr-only">
              {rows.map((row) => (
                <li key={row.id}>
                  {row.label} ({row.who}):{row.allYear && " all year round."}
                  {row.apply && ` applications ${range(row.apply)}.`}
                  {row.runs && ` Runs ${range(row.runs)}.`}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-1 text-sm text-muted md:flex-row md:items-center md:gap-4">
            <span className={cn(caveat.className, "text-2xl leading-none text-gold-ink")}>apply early, many close when full!</span>
            <span>Typical windows for large UK employers. Always check each employer&apos;s own dates.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
