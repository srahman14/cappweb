"use client";

import { useMemo, useState } from "react";
import { resourceGroups } from "@/data/resources";
import type { LibraryResource } from "@/types";
import { ResourceLinkCard } from "./ResourceLinkCard";
import { ResourceSidebar, type FilterGroup } from "./ResourceSidebar";

/**
 * The resources library: heading, sidebar (search + filters) on the left, cards on the right.
 *
 * Filter keys: "all" | "<group>" (everything in a section) | "<group>|<category>" (one option).
 * Search is case-insensitive over title, description and category, and combines with the filter.
 * The server renders every resource, so nothing is hidden without JavaScript.
 *
 * Props:
 * - resources: the full list (from data/resources.ts)
 * - iconPosition: "left" (default) or "right", passed to every card
 *
 * Usage: <ResourceBrowser resources={libraryResources} iconPosition="left" />
 */
interface ResourceBrowserProps {
  resources: LibraryResource[];
  iconPosition?: "left" | "right";
}

const optionKey = (group: string, category: string) => `${group}|${category}`;

/** Builds sidebar sections from the data: only groups and categories that have resources. */
function buildFilterGroups(resources: LibraryResource[]): FilterGroup[] {
  const groups: FilterGroup[] = [];
  for (const group of resourceGroups) {
    const categories = [
      ...new Set(resources.filter((r) => r.group === group.id).map((r) => r.category)),
    ];
    if (categories.length === 0) continue;
    groups.push({
      id: group.id,
      label: group.label,
      options: [
        { key: group.id, label: group.allLabel },
        ...categories.map((c) => ({ key: optionKey(group.id, c), label: c })),
      ],
    });
  }
  return groups;
}

function matchesFilter(resource: LibraryResource, key: string) {
  if (key === "all") return true;
  if (!key.includes("|")) return resource.group === key;
  return optionKey(resource.group, resource.category) === key;
}

export function ResourceBrowser({ resources, iconPosition = "left" }: ResourceBrowserProps) {
  const [query, setQuery] = useState("");
  const [activeKey, setActiveKey] = useState("all");

  const filterGroups = useMemo(() => buildFilterGroups(resources), [resources]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter(
      (r) =>
        matchesFilter(r, activeKey) &&
        (!q || [r.title, r.description, r.category].some((text) => text.toLowerCase().includes(q))),
    );
  }, [resources, query, activeKey]);

  const reset = () => {
    setQuery("");
    setActiveKey("all");
  };

  return (
    <div id="library" className="scroll-mt-24">
      <h2 className="text-center text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
        Explore all our resources
      </h2>

      <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[16rem_1fr] lg:gap-10">
        <ResourceSidebar
          count={results.length}
          query={query}
          onQueryChange={setQuery}
          groups={filterGroups}
          activeKey={activeKey}
          onSelect={setActiveKey}
        />

        {results.length > 0 ? (
          <ul className="grid content-start gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {results.map((r) => (
              <li key={r.id}>
                <ResourceLinkCard
                  title={r.title}
                  description={r.description}
                  href={r.href}
                  icon={r.icon}
                  iconPosition={iconPosition}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="self-start rounded-[20px] border border-dashed border-line bg-white p-10 text-center">
            <p className="font-medium text-navy">No resources match</p>
            <p className="mt-1 text-sm text-muted">Try a different search, or clear the filters.</p>
            <button
              type="button"
              onClick={reset}
              className="mt-5 rounded-full bg-navy px-5 py-2 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}