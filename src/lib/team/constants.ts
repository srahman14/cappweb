import { teamSubjects, type TeamSubjectId } from "@/data/team";

/**
 * Shared ambassador constants. Safe to import from client components
 * (unlike team.service.ts, which is server-only).
 */

/** Must match the CHECK constraint on team_members.subject. */
export const TEAM_SUBJECT_IDS: TeamSubjectId[] = teamSubjects.map((subject) => subject.id);

export const TEAM_SUBJECT_LABELS = Object.fromEntries(
  teamSubjects.map((subject) => [subject.id, subject.label]),
) as Record<TeamSubjectId, string>;

/** Must match the CHECK constraints on team_members. */
export const TEAM_LIMITS = { name: 80, role: 80, oneLiner: 200 } as const;

export const isTeamSubject = (value: string): value is TeamSubjectId =>
  (TEAM_SUBJECT_IDS as string[]).includes(value);

/**
 * Capitalises the first letter of every word ("tech lead" -> "Tech Lead", "co-lead" ->
 * "Co-Lead"). Other letters are left alone, so "CEO" or "B&F" aren't mangled.
 */
export const capitaliseWords = (text: string) =>
  text.replace(/(^|[\s\-/&])(\p{L})/gu, (_match, before: string, letter: string) => before + letter.toUpperCase());

/** What an ambassador's role defaults to when the field is left blank. */
export const defaultRoleFor = (subject: TeamSubjectId) => `${TEAM_SUBJECT_LABELS[subject]} ambassador`;
