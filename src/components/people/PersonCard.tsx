/**
 * One ambassador/team member: round photo (or gold gradient placeholder),
 * name, role and optional LinkedIn link.
 *
 * Usage: <PersonCard person={person} />
 */
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import type { Person } from "@/types";

export function PersonCard({ person }: { person: Person }) {
  return (
    <Card className="flex flex-col gap-1.5 p-6">
      <div className="relative mb-2 size-16 overflow-hidden rounded-full bg-gold-gradient">
        {person.photoSrc && <Image src={person.photoSrc} alt={person.name} fill sizes="64px" className="object-cover" />}
      </div>
      <h3 className="text-lg font-bold">{person.name}</h3>
      <p className="text-[15px] text-muted">{person.role}</p>
      {person.linkedinUrl && (
        <a href={person.linkedinUrl} target="_blank" rel="noopener noreferrer" className="mt-1 text-[15px] font-semibold text-indigo hover:underline">
          LinkedIn →
        </a>
      )}
    </Card>
  );
}