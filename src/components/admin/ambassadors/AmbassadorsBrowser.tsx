"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Users } from "lucide-react";

import { AdminDialog } from "@/components/admin/AdminDialog";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { FilterMenu, type FilterGroup } from "@/components/admin/FilterMenu";
import { inputClass } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { TeamSubjectId } from "@/data/team";
import type { AdminAmbassador } from "@/lib/services/team.service";
import { TEAM_SUBJECT_IDS, TEAM_SUBJECT_LABELS } from "@/lib/team/constants";

import { AmbassadorCard } from "./AmbassadorCard";
import { AmbassadorForm } from "./AmbassadorForm";

type SubjectFilter = "all" | TeamSubjectId;
type StatusFilter = "all" | "shown" | "hidden";

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "shown", label: "Shown on the team page" },
  { value: "hidden", label: "Hidden" },
];

const matchesStatus = (person: AdminAmbassador, status: StatusFilter) =>
  status === "all" || (status === "shown" ? person.isPublished : !person.isPublished);

/** The ambassadors admin: one Add button, search, subject pills, filters and a grid of cards. */
export function AmbassadorsBrowser({ people }: { people: AdminAmbassador[] }) {
  const [subject, setSubject] = useState<SubjectFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);

  // Display order within each subject, used by the "move" actions.
  const idsBySubject = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const person of people) map.set(person.subject, [...(map.get(person.subject) ?? []), person.id]);
    return map;
  }, [people]);

  const search = query.trim().toLowerCase();
  const scoped = people.filter(
    (person) =>
      (subject === "all" || person.subject === subject) &&
      (!search || [person.name, person.role, person.oneLiner].some((text) => text.toLowerCase().includes(search))),
  );
  const visible = scoped.filter((person) => matchesStatus(person, status));

  const filters: FilterGroup[] = [
    {
      id: "status",
      label: "Status",
      value: status,
      defaultValue: "all",
      options: STATUS_OPTIONS.map((option) => ({
        ...option,
        count: scoped.filter((person) => matchesStatus(person, option.value)).length,
      })),
    },
  ];

  const clearAll = () => {
    setSubject("all");
    setStatus("all");
    setQuery("");
  };

  const shown = people.filter((person) => person.isPublished).length;
  const hidden = people.length - shown;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" size="sm" className="h-11 flex-1 gap-2 sm:flex-none" onClick={() => setAdding(true)}>
          <Plus aria-hidden="true" className="size-4" />
          Add team member
        </Button>
        <FilterMenu groups={filters} onChange={(_id, value) => setStatus(value as StatusFilter)} onClear={() => setStatus("all")} />
        <p className="w-full text-sm text-muted sm:ml-auto sm:w-auto">
          {people.length} {people.length === 1 ? "person" : "people"} · {shown} shown · {hidden} hidden
        </p>
      </div>

      <div className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name or role"
          aria-label="Search the team"
          className={cn(inputClass, "pl-10")}
        />
      </div>

      <div
        role="group"
        aria-label="Filter by subject"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {[{ id: "all" as const, label: "All" }, ...TEAM_SUBJECT_IDS.map((id) => ({ id, label: TEAM_SUBJECT_LABELS[id] }))].map((item) => {
          const selected = subject === item.id;
          const count = people.filter((person) => item.id === "all" || person.subject === item.id).length;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setSubject(item.id)}
              className={cn(
                "focus-ring inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                selected ? "border-navy-ink bg-navy-ink text-white" : "border-line bg-white text-navy-ink hover:border-muted-soft",
              )}
            >
              {item.label}
              <span className={cn("text-xs tabular-nums", selected ? "text-white/70" : "text-muted")}>{count}</span>
            </button>
          );
        })}
      </div>

      {people.length === 0 ? (
        <AdminEmptyState
          icon={Users}
          title="No team members yet"
          description="Add your first ambassador. They appear under “Meet the team” on the team page."
          action={
            <Button type="button" size="sm" className="h-11 gap-2" onClick={() => setAdding(true)}>
              <Plus aria-hidden="true" className="size-4" />
              Add team member
            </Button>
          }
        />
      ) : visible.length === 0 ? (
        <AdminEmptyState
          icon={Users}
          title="No one matches"
          description="Try a different search or filter."
          action={
            <Button type="button" variant="secondary" size="sm" className="h-11" onClick={clearAll}>
              Clear everything
            </Button>
          }
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((person) => {
            const ids = idsBySubject.get(person.subject) ?? [];
            return (
              <li key={person.id}>
                <AmbassadorCard person={person} index={ids.indexOf(person.id)} subjectIds={ids} />
              </li>
            );
          })}
        </ul>
      )}

      <AdminDialog
        open={adding}
        onOpenChange={setAdding}
        title="Add a team member"
        description="Only the name and subject are needed. Everything else is optional."
      >
        <AmbassadorForm
          defaultSubject={subject === "all" ? undefined : subject}
          onDone={() => setAdding(false)}
          onCancel={() => setAdding(false)}
        />
      </AdminDialog>
    </div>
  );
}
