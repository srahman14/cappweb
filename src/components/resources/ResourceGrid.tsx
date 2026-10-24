/**
 * Responsive grid of <ResourceCard>s. Spacing and columns live here only.
 *
 * Usage: <ResourceGrid resources={tech.resources} columns={4} />
 */
import type { Resource } from "@/types";
import { ResourceCard } from "./ResourceCard";

/** Full class names so Tailwind can detect them. */
const COLUMNS = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" } as const;

export interface ResourceGridProps {
  resources: Resource[];
  columns?: keyof typeof COLUMNS;
}

export function ResourceGrid({ resources, columns = 4 }: ResourceGridProps) {
  return (
    <ul className={`grid gap-5 sm:grid-cols-2 ${COLUMNS[columns]}`}>
      {resources.map((r) => (
        <li key={r.id}>
          <ResourceCard resource={r} />
        </li>
      ))}
    </ul>
  );
}