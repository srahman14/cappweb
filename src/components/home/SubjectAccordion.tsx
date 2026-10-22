"use client";
/**
 * Horizontal subject cards: hover (or focus / tap) one and it opens while the
 * others shrink. The first subject is open by default and again whenever the
 * mouse leaves the group.
 *
 * Client component because it holds "which card is open" state. All visuals
 * live in <SubjectPanel>.
 *
 * Usage: <SubjectAccordion subjects={subjects} />
 */
import { useState } from "react";
import type { Subject } from "@/types";
import { SubjectPanel } from "./SubjectPanel";

export function SubjectAccordion({ subjects }: { subjects: Subject[] }) {
  const defaultId = subjects[0]?.id;
  const [activeId, setActiveId] = useState(defaultId);

  return (
    <div className="flex flex-col gap-4 md:h-[460px] md:flex-row" onMouseLeave={() => setActiveId(defaultId)}>
      {subjects.map((subject, i) => (
        <SubjectPanel key={subject.id} subject={subject} index={i} active={subject.id === activeId} onActivate={() => setActiveId(subject.id)} />
      ))}
    </div>
  );
}
