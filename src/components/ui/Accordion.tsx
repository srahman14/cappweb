"use client";
/**
 * Full-width accordion (FAQ, etc.). Each row has the title on the left and the
 * arrow on the far right (justify-between). Opens/closes with a smooth height
 * animation, is keyboard accessible, and hides closed content from screen readers.
 *
 *   single (default true)  opening one row closes the others
 *   defaultOpenId          row open on first render
 *
 * Usage:
 *   <Accordion items={faqItems} />
 *   <Accordion items={faqItems} single={false} defaultOpenId="join" />
 */
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import type { AccordionItem } from "@/types";

export interface AccordionProps {
  items: AccordionItem[];
  single?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({ items, single = true, defaultOpenId, className }: AccordionProps) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (single) return isOpen ? [] : [id];
      return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
    });

  return (
    <div className={cn("w-full border-t border-line", className)}>
      {items.map((item) => {
        const open = openIds.includes(item.id);
        const buttonId = `${baseId}-btn-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;
        return (
          <div key={item.id} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold tracking-[-0.01em] md:text-xl"
              >
                <span>{item.title}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn("size-5 shrink-0 text-muted transition-transform duration-300 motion-reduce:transition-none", open && "rotate-180")}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </h3>
            {/* Height animates from 0fr to 1fr; `inert` keeps closed content out of the tab order */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="max-w-3xl pb-6 text-base leading-relaxed text-muted md:text-lg">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}