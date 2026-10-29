import type { TeamMember } from "@/data/team";

/** Hover backgrounds, cycled by position so neighbouring cards differ. Full class names so Tailwind finds them. */
const HOVER_BGS = [
  "bg-[url('/team/hover-1.png')]",
  "bg-[url('/team/hover-2.png')]",
  "bg-[url('/team/hover-3.png')]",
];

/**
 * MemberCard: one square, white by default, with a gradient image that fades in
 * on hover or keyboard focus. Name top-left (large), role, optional one-liner,
 * optional LinkedIn icon. Square corners; borders are drawn by MemberGrid so cards connect.
 * Props: `member` (TeamMember from data/team.ts), `index` (position in the grid; picks hover-1/2/3 in turn).
 * Usage: <MemberCard member={member} />  (render inside MemberGrid)
 */
export function MemberCard({
  member,
  index = 0,
}: {
  member: TeamMember;
  index?: number;
}) {
  return (
    <li className="group relative flex min-h-64 flex-col border-r border-b border-line bg-white p-6 sm:aspect-square md:p-7">
      {/* Hover background: a pre-made gradient image (public/team/member-hover.png), faded in. Decorative. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${HOVER_BGS[index % HOVER_BGS.length]} bg-cover bg-center opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none`}
      />

      <div className="relative flex h-full flex-col">
        <h3 className="text-2xl font-extrabold leading-tight tracking-[-0.03em] text-navy-ink md:text-3xl">
          {member.name}
        </h3>
        <p className="mt-1.5 text-sm font-semibold text-muted">{member.role}</p>
        {member.oneLiner && (
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {member.oneLiner}
          </p>
        )}

        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="mt-auto inline-flex size-9 items-center justify-center self-start text-navy-ink transition-colors hover:text-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
        )}
      </div>
    </li>
  );
}
