import { LegalNav } from "@/components/legal/LegalNav";
import type { LegalBlock, LegalPageData } from "@/types";

/**
 * LegalLayout: two-column layout for long legal pages (Privacy, Terms).
 * Left: sticky contents list (LegalNav, client). Right: "Last updated" line,
 * then numbered sections with headings and text, rendered on the server.
 *
 * Any [BRACKETED] text is highlighted so unfinished placeholders are easy to spot
 * in review. Remove the brackets once the real detail is confirmed.
 *
 * Props: lastUpdated, intro (optional), sections (see LegalPageData in types).
 *
 * Usage:
 *   <Section><LegalLayout {...privacyPolicy} /></Section>
 */
export function LegalLayout({ lastUpdated, intro, sections }: LegalPageData) {
  return (
    <div className="grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
      <div>
        <LegalNav sections={sections.map(({ id, title }) => ({ id, title }))} />
      </div>

      <article className="min-w-0 max-w-[68ch]">
        <p className="text-sm text-muted">
          Last updated:{" "}
          <span className="font-semibold text-navy-ink">{lastUpdated}</span>
        </p>
        {intro && (
          <p className="mt-4 text-lg leading-8 text-navy-ink">
            <Text>{intro}</Text>
          </p>
        )}

        {sections.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="mt-10 scroll-mt-28 border-t border-line pt-8"
          >
            <h2
              id={`${section.id}-heading`}
              className="text-2xl font-extrabold tracking-[-0.03em] text-navy-ink"
            >
              {i + 1}. {section.title}
            </h2>
            <div className="mt-4 space-y-4">
              {section.blocks.map((block, j) => (
                <Block key={j} block={block} />
              ))}
            </div>
          </section>
        ))}
      </article>
    </div>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "list") {
    return (
      <ul className="list-disc space-y-2 pl-5 leading-7 text-muted marker:text-gold-deep">
        {block.items.map((item, i) => (
          <li key={i}>
            <Text>{item}</Text>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="leading-7 text-muted">
      <Text>{block.text}</Text>
    </p>
  );
}

/** Highlights [BRACKETED] placeholders. */
function Text({ children }: { children: string }) {
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <mark key={i} className="rounded bg-gold-light/50 px-1 text-navy-ink">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}
