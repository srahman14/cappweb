"use client";

import { useState } from "react";

/**
 * Filter sidebar for the resources library: result count, search box, then grouped
 * filter options with one active option.
 *
 * Desktop (lg+): always visible, sticks under the navbar while the cards scroll.
 * Mobile: search stays visible; the filter list collapses behind a button that shows
 * the active filter, and closes again once an option is picked.
 *
 * Props:
 * - count: number of resources currently shown
 * - query / onQueryChange: controlled search text
 * - groups: sections of options, each option { key, label }
 * - activeKey / onSelect: the active option's key ("all" for everything)
 *
 * Usage: see ResourceBrowser.
 */
export interface FilterOption {
  key: string;
  label: string;
}
export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface ResourceSidebarProps {
  count: number;
  query: string;
  onQueryChange: (value: string) => void;
  groups: FilterGroup[];
  activeKey: string;
  onSelect: (key: string) => void;
}

const ALL: FilterOption = { key: "all", label: "All resources" };

export function ResourceSidebar({
  count,
  query,
  onQueryChange,
  groups,
  activeKey,
  onSelect,
}: ResourceSidebarProps) {
  const [open, setOpen] = useState(false);

  const activeLabel =
    [ALL, ...groups.flatMap((g) => g.options)].find((o) => o.key === activeKey)?.label ?? ALL.label;

  const choose = (key: string) => {
    onSelect(key);
    setOpen(false);
  };

  const optionClasses = (active: boolean) =>
    `w-full rounded-xs px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-indigo ${
      active ? "bg-indigo/10 font-medium text-navy" : "text-muted hover:bg-navy/5 hover:text-navy"
    }`;

  return (
    <aside aria-label="Search and filter resources" className="lg:sticky lg:top-24 lg:self-start">
      <p aria-live="polite" className="mb-2 text-sm text-muted">
        {count} {count === 1 ? "resource" : "resources"}
      </p>

      <div className="relative">
        <label htmlFor="resource-search" className="sr-only">
          Search all resources
        </label>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l4 4" />
        </svg>
        <input
          id="resource-search"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search all resources"
          className="w-full rounded-xs border border-line bg-white py-2.5 pl-9 pr-3 text-sm text-navy placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-indigo"
        />
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls="resource-filters"
        onClick={() => setOpen((o) => !o)}
        className="mt-3 flex w-full items-center justify-between rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-navy focus-visible:outline-2 focus-visible:outline-indigo lg:hidden"
      >
        <span>Filter: {activeLabel}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <nav
        id="resource-filters"
        aria-label="Resource filters"
        className={`${open ? "block" : "hidden"} mt-4 lg:mt-6 lg:block`}
      >
        <button
          type="button"
          aria-pressed={activeKey === ALL.key}
          onClick={() => choose(ALL.key)}
          className={optionClasses(activeKey === ALL.key)}
        >
          {ALL.label}
        </button>

        {groups.map((group) => (
          <div key={group.id} className="mt-6">
            <h3 className="px-3 text-sm font-semibold text-navy">{group.label}</h3>
            <ul className="mt-2 space-y-0.5">
              {group.options.map((option) => (
                <li key={option.key}>
                  <button
                    type="button"
                    aria-pressed={activeKey === option.key}
                    onClick={() => choose(option.key)}
                    className={optionClasses(activeKey === option.key)}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}