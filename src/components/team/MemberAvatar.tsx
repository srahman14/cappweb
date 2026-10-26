import Image from "next/image";
import type { TeamMember } from "@/data/team";

/** Up to two initials from a name; strips [BRACKETS] from placeholders. */
export function getInitials(name: string): string {
  return name
    .replace(/[\[\]]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/**
 * MemberAvatar: a Discord-style round avatar with name, role and an optional bio.
 * Props: `member` (see TeamMember in data/team.ts). No image → gold initials avatar.
 * Usage: <MemberAvatar member={member} />  (render inside a <ul>)
 */
export function MemberAvatar({ member }: { member: TeamMember }) {
  return (
    <li className="flex flex-col items-center text-center">
      <div className="relative size-20 overflow-hidden rounded-full border border-line bg-gold-gradient shadow-card md:size-24">
        {member.image ? (
          <Image
            src={member.image}
            alt={`Photo of ${member.name}`}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-full place-items-center text-xl font-extrabold text-navy-ink md:text-2xl"
          >
            {getInitials(member.name)}
          </span>
        )}
      </div>
      <p className="mt-3 text-base font-bold tracking-[-0.01em] text-navy-ink">
        {member.name}
      </p>
      <p className="text-sm text-muted-soft">{member.role}</p>
      {member.bio && (
        <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted">
          {member.bio}
        </p>
      )}
    </li>
  );
}
