import type { TeamGroup } from "@/data/team";
import { MemberAvatar } from "./MemberAvatar";

/**
 * MemberGrid: the rest of the team, grouped (e.g. Committee, Ambassadors),
 * each group a responsive grid of round avatars.
 * Props: `groups` (TeamGroup[] from data/team.ts).
 * Usage: <MemberGrid groups={teamGroups} />
 */
export function MemberGrid({ groups }: { groups: TeamGroup[] }) {
  return (
    <div className="space-y-14">
      {groups.map((group) => (
        <div key={group.id}>
          <h3 className="mb-8 text-xl font-extrabold tracking-[-0.02em] text-navy-ink">
            {group.title}
          </h3>
          <ul className="grid grid-cols-2 items-start gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {group.members.map((member) => (
              <MemberAvatar key={member.id} member={member} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
