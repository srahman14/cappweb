/**
 * Responsive grid of <PersonCard>s (ambassador sections, the team page).
 *
 * Usage: <PersonGrid people={tech.ambassadors} />
 */
import type { Person } from "@/types";
import { PersonCard } from "./PersonCard";

export function PersonGrid({ people }: { people: Person[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {people.map((p) => (
        <li key={p.id}>
          <PersonCard person={p} />
        </li>
      ))}
    </ul>
  );
}