/**
 * Skills are grouped by *where they have been used*, not by a self-rated
 * percentage. Adjust each `level` so it matches your real experience.
 * Group titles and level labels are translated in src/i18n/dictionaries.
 */

export type SkillLevel = "applied" | "deepening" | "foundation";

export const levelDots: Record<SkillLevel, 1 | 2 | 3> = {
  applied: 3,
  deepening: 2,
  foundation: 1,
};

export type SkillGroupId = "frontend" | "backend" | "database" | "other";

export type SkillGroup = {
  id: SkillGroupId;
  skills: { name: string; level: SkillLevel }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    skills: [
      { name: "React", level: "applied" },
      { name: "Next.js", level: "applied" },
      { name: "JavaScript", level: "applied" },
      { name: "TypeScript", level: "deepening" },
      { name: "HTML", level: "applied" },
      { name: "CSS", level: "applied" },
      { name: "Tailwind CSS", level: "applied" },
    ],
  },
  {
    id: "backend",
    skills: [
      { name: "Node.js", level: "deepening" },
      { name: "Express.js", level: "deepening" },
      { name: "PHP", level: "applied" },
      { name: "REST APIs", level: "deepening" },
    ],
  },
  {
    id: "database",
    skills: [
      { name: "PostgreSQL", level: "applied" },
      { name: "Supabase", level: "applied" },
      { name: "MySQL", level: "applied" },
      { name: "MongoDB", level: "foundation" },
    ],
  },
  {
    id: "other",
    skills: [
      { name: "Git", level: "applied" },
      { name: "GitHub", level: "applied" },
      { name: "Flutter", level: "applied" },
      { name: "IoT", level: "applied" },
      { name: "Python", level: "foundation" },
      { name: "Java", level: "foundation" },
      { name: "C", level: "foundation" },
    ],
  },
];
