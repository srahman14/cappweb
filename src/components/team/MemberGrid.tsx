import type { TeamMember } from "@/data/team";
import { MemberCard } from "./MemberCard";

/**
 * MemberGrid: members as connected square cards (shared hairline borders, no gaps,
 * no rounded corners). Hover backgrounds alternate hover-1, hover-2, hover-3 by position.
 * Props: `members` (TeamMember[] from data/team.ts).
 * Usage: <MemberGrid members={visibleMembers} />
 */
export function MemberGrid({ members }: { members: TeamMember[] }) {
  return (
    <ul className="grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.map((member, i) => (
        <MemberCard key={member.id} member={member} index={i} />
      ))}
    </ul>
  );
}
