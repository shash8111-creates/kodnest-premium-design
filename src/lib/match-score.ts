import { Job } from "@/data/jobs";
import { Preferences } from "@/hooks/use-preferences";

/**
 * Deterministic match score engine.
 *
 * +25 if any roleKeyword appears in job.title (case-insensitive)
 * +15 if any roleKeyword appears in job.description
 * +15 if job.location matches any preferredLocation
 * +10 if job.mode matches any preferredMode
 * +10 if job.experience matches experienceLevel
 * +15 if any overlap between job.skills and user skills
 * +5  if postedDaysAgo <= 2
 * +5  if source is LinkedIn
 *
 * Capped at 100.
 */
export function computeMatchScore(job: Job, prefs: Preferences): number {
  let score = 0;

  const roleKeywords = prefs.roleKeywords
    .split(",")
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean);

  const userSkills = prefs.skills
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  // +25: roleKeyword in title
  if (roleKeywords.length > 0) {
    const titleLower = job.title.toLowerCase();
    if (roleKeywords.some((kw) => titleLower.includes(kw))) {
      score += 25;
    }
  }

  // +15: roleKeyword in description
  if (roleKeywords.length > 0) {
    const descLower = job.description.toLowerCase();
    if (roleKeywords.some((kw) => descLower.includes(kw))) {
      score += 15;
    }
  }

  // +15: location match
  if (prefs.preferredLocations.length > 0) {
    if (prefs.preferredLocations.includes(job.location)) {
      score += 15;
    }
  }

  // +10: mode match
  if (prefs.preferredMode.length > 0) {
    if (prefs.preferredMode.includes(job.mode)) {
      score += 10;
    }
  }

  // +10: experience match
  if (prefs.experienceLevel && prefs.experienceLevel === job.experience) {
    score += 10;
  }

  // +15: skills overlap
  if (userSkills.length > 0) {
    const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
    if (userSkills.some((us) => jobSkillsLower.some((js) => js.includes(us) || us.includes(js)))) {
      score += 15;
    }
  }

  // +5: recent
  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5: LinkedIn source
  if (job.source === "LinkedIn") {
    score += 5;
  }

  return Math.min(score, 100);
}

export type ScoreTier = "excellent" | "good" | "fair" | "low";

export function getScoreTier(score: number): ScoreTier {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "fair";
  return "low";
}
