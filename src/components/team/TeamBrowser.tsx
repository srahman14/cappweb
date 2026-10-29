"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { TeamMember, TeamSubjectId } from "@/data/team";
import { MemberGrid } from "./MemberGrid";

interface TeamBrowserProps {
  subjects: { id: TeamSubjectId; label: string }[];
  members: TeamMember[];
}

/**
 * TeamBrowser: subject tabs (one active at a time) above the member grid.
 * The first subject is selected by default. Tabs scroll sideways on small screens.
 * Props: `subjects` (tab list), `members` (everyone; filtered by `subject`).
 * Usage: <TeamBrowser subjects={teamSubjects} members={teamMembers} />
 */
export function TeamBrowser({ subjects, members }: TeamBrowserProps) {
  const [active, setActive] = useState<TeamSubjectId>(subjects[0].id);
  const visible = members.filter((m) => m.subject === active);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter by subject"
        className="mb-8 flex gap-6 overflow-x-auto border-b border-line"
      >
        {subjects.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={active === s.id}
            onClick={() => setActive(s.id)}
            className={cn(
              "-mb-px shrink-0 border-b-2 pb-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo",
              active === s.id
                ? "border-navy-ink text-navy-ink"
                : "border-transparent text-muted hover:text-navy-ink",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "person" : "people"}
      </p>

      {visible.length > 0 ? (
        <MemberGrid members={visible} />
      ) : (
        <p className="text-muted">
          No ambassadors listed for this subject yet.
        </p>
      )}
    </div>
  );
}
