/**
 * FAQ block for a subject page: heading + "ask in the channel" button on the left,
 * the shared <Accordion /> on the right (stacked on mobile). Data comes from `faqs`
 * in src/data/<subject>.ts. Renders nothing when the list is empty.
 */
import { Accordion, Button } from "@/components/ui";
import type { SubjectFAQ as FAQ } from "@/types";

export function SubjectFAQ({
  subject,
  faqs,
  channelUrl,
}: {
  subject: string;
  faqs: FAQ[];
  channelUrl: string;
}) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-title" className="pb-12 md:pb-20">
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 md:px-10 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:px-20">
        <div className="flex flex-col items-start gap-4 lg:sticky lg:top-24 lg:self-start">
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-muted-soft">Questions</p>
          <h2 id="faq-title" className="text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] md:text-[40px]">
            Things people ask about {subject}
          </h2>
          <p className="text-lg text-muted">Can&apos;t see yours? Ask in the {subject} channel and an ambassador will answer.</p>
          <Button href={channelUrl} variant="secondary" size="sm">
            Ask in the {subject} channel
          </Button>
        </div>
        <Accordion
          items={faqs.map((f) => ({ id: f.id, title: f.question, content: f.answer }))}
          defaultOpenId={faqs[0].id}
        />
      </div>
    </section>
  );
}
