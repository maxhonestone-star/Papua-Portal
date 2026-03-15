/**
 * User Profile & Job Recommendation Engine
 * Smart job matching berbasis user profile
 */

import { Loker } from "@/data/loker";

// ═══════════════════════════════════════════
// USER PROFILE SCHEMA
// ═══════════════════════════════════════════

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  education: {
    level: "SMA" | "D3" | "S1" | "S2" | "S3";
    field: string;
    university?: string;
    year?: number;
  };
  experience: {
    years: number;
    currentRole: string;
    industry: string;
  };
  skills: string[];
  preferredJobTypes?: Loker["tipe"][];
  preferredCategories?: string[];
  salaryExpectation?: {
    min: number;
    max: number;
  };
  location: string;
  jobSearchStatus: "actively_looking" | "open_to_offers" | "passive";
  createdAt: string;
  updatedAt: string;
}

export interface JobRecommendation {
  job: Loker;
  matchScore: number; // 0-100
  matchReasons: string[];
  skillGaps?: string[];
  salaryGap?: {
    status: "below" | "match" | "above";
    difference: number;
  };
}

// ═══════════════════════════════════════════
// RECOMMENDATION ENGINE
// ═══════════════════════════════════════════

export class JobRecommendationEngine {
  /**
   * Main recommendation function
   * Returns job listings ranked by fit to user profile
   */
  static recommendJobs(
    jobs: Loker[],
    userProfile: UserProfile,
    limit: number = 10
  ): JobRecommendation[] {
    // Score each job
    type RecommendationItem = {
      job: Loker;
      matchScore: number;
      matchReasons: string[];
      skillGaps?: string[];
      salaryGap?: { status: "below" | "match" | "above"; difference: number };
    };

    const scoredJobs = jobs.map((job) => {
      const recommendation: RecommendationItem = {
        job,
        matchScore: 0,
        matchReasons: [],
        skillGaps: [],
      };
      return {
        recommendation,
        scores: {
          categoryScore: 0,
          typeScore: 0,
          locationScore: 0,
          salaryScore: 0,
          skillScore: 0,
          experienceScore: 0,
        },
      };
    });

    // Score each job against profile
    for (const item of scoredJobs) {
      const job = item.recommendation.job;
      const scores = item.scores;

      // 1. Category Match (20 points max)
      if (userProfile.preferredCategories?.length) {
        if (userProfile.preferredCategories.includes(job.kategori)) {
          scores.categoryScore = 20;
          item.recommendation.matchReasons.push("Kategori sesuai preferensi");
        } else {
          scores.categoryScore = 0;
        }
      } else {
        scores.categoryScore = 10; // Neutral if no preference
      }

      // 2. Job Type Match (15 points max)
      if (userProfile.preferredJobTypes?.length) {
        if (userProfile.preferredJobTypes.includes(job.tipe)) {
          scores.typeScore = 15;
          item.recommendation.matchReasons.push(`Tipe pekerjaan ${job.tipe}`);
        } else {
          scores.typeScore = 0;
        }
      } else {
        scores.typeScore = 8;
      }

      // 3. Location Match (15 points max)
      if (
        job.lokasi.toLowerCase().includes(userProfile.location.toLowerCase()) ||
        job.provinsi.toLowerCase().includes(userProfile.location.toLowerCase())
      ) {
        scores.locationScore = 15;
        item.recommendation.matchReasons.push(`Lokasi: ${job.lokasi}`);
      } else if (job.remote) {
        scores.locationScore = 10;
        item.recommendation.matchReasons.push("Posisi remote/flexible");
      } else {
        scores.locationScore = 5;
      }

      // 4. Salary Match (15 points max)
      const salaryRange = this.parseSalaryRange(job.gaji || "");
      if (
        userProfile.salaryExpectation &&
        salaryRange.min &&
        salaryRange.max
      ) {
        const midpoint = (salaryRange.min + salaryRange.max) / 2;
        const userMidpoint =
          (userProfile.salaryExpectation.min +
            userProfile.salaryExpectation.max) /
          2;

        const difference = Math.abs(midpoint - userMidpoint);
        const percentageDiff = (difference / userMidpoint) * 100;

        if (percentageDiff < 10) {
          scores.salaryScore = 15; // Perfect match
          item.recommendation.matchReasons.push(
            `Gaji sesuai ekspektasi: ${job.gaji}`
          );
        } else if (percentageDiff < 20) {
          scores.salaryScore = 12;
          item.recommendation.matchReasons.push(
            `Gaji kompetitif: ${job.gaji}`
          );
        } else if (midpoint > userMidpoint) {
          scores.salaryScore = 10;
          item.recommendation.matchReasons.push(
            `Gaji di atas ekspektasi: ${job.gaji}`
          );
          item.recommendation.salaryGap = {
            status: "above",
            difference: Math.round(((midpoint - userMidpoint) / userMidpoint) * 100),
          };
        } else {
          scores.salaryScore = 5;
          item.recommendation.salaryGap = {
            status: "below",
            difference: Math.round(((userMidpoint - midpoint) / userMidpoint) * 100),
          };
        }
      } else {
        scores.salaryScore = 8; // Neutral
      }

      // 5. Skill Match (20 points max)
      const jobSkillsRequired = job.persyaratan || [];
      const matchedSkills = userProfile.skills.filter((skill) =>
        jobSkillsRequired.some((req) =>
          req.toLowerCase().includes(skill.toLowerCase())
        )
      );

      const skillMatchPercentage = (matchedSkills.length / Math.max(jobSkillsRequired.length, userProfile.skills.length)) * 100;

      if (skillMatchPercentage >= 80) {
        scores.skillScore = 20;
        item.recommendation.matchReasons.push(
          `Skills match: ${matchedSkills.length}/${jobSkillsRequired.length} persyaratan`
        );
      } else if (skillMatchPercentage >= 50) {
        scores.skillScore = 12;
        item.recommendation.matchReasons.push(`Sebagian skills sesuai`);
      } else if (skillMatchPercentage >= 20) {
        scores.skillScore = 6;
        item.recommendation.skillGaps = jobSkillsRequired.filter(
          (req) =>
            !userProfile.skills.some((skill) =>
              req.toLowerCase().includes(skill.toLowerCase())
            )
        );
      } else {
        scores.skillScore = 2;
      }

      // 6. Experience Match (15 points max)
      const experienceRequired = this.inferExperienceLevel(job.judul);
      if (userProfile.experience.years >= experienceRequired) {
        scores.experienceScore = 15;
        item.recommendation.matchReasons.push(
          `${userProfile.experience.years} tahun pengalaman`
        );
      } else if (userProfile.experience.years >= experienceRequired - 1) {
        scores.experienceScore = 10;
      } else {
        scores.experienceScore = Math.max(0, 5 - (experienceRequired - userProfile.experience.years) * 2);
      }

      // Calculate total score (normalize to 0-100)
      const totalScore =
        scores.categoryScore +
        scores.typeScore +
        scores.locationScore +
        scores.salaryScore +
        scores.skillScore +
        scores.experienceScore;

      item.recommendation.matchScore = Math.min(100, totalScore);
    }

    // Sort by score and return top N
    return scoredJobs
      .sort((a, b) => b.recommendation.matchScore - a.recommendation.matchScore)
      .slice(0, limit)
      .map((item) => item.recommendation);
  }

  /**
   * Parse salary range from string like "Rp 10-15 Juta" or "Rp 10.000.000 - Rp 15.000.000"
   */
  private static parseSalaryRange(
    salaryText: string
  ): { min: number; max: number } {
    if (!salaryText) return { min: 0, max: 0 };

    const text = salaryText.toLowerCase();

    // Handle "Rp X-Y Juta" format
    const jutaMatch = text.match(/rp\s*([\d.]+)\s*[-–]\s*([\d.]+)\s*juta/i);
    if (jutaMatch) {
      return {
        min: parseInt(jutaMatch[1].replace(/\./g, "")) * 1000000,
        max: parseInt(jutaMatch[2].replace(/\./g, "")) * 1000000,
      };
    }

    // Handle "Rp X.000.000 - Rp Y.000.000" format
    const numberMatch = text.match(/rp\s*([\d.]+)\s*[-–]\s*rp\s*([\d.]+)/i);
    if (numberMatch) {
      return {
        min: parseInt(numberMatch[1].replace(/\./g, "")),
        max: parseInt(numberMatch[2].replace(/\./g, "")),
      };
    }

    return { min: 0, max: 0 };
  }

  /**
   * Infer years of experience required from job title
   */
  private static inferExperienceLevel(jobTitle: string): number {
    const title = jobTitle.toLowerCase();

    if (title.match(/^(intern|magang|junior|entry)/)) return 0;
    if (title.match(/^\w+\s+(coordinator|specialist|analyst)/)) return 1;
    if (title.match(/(senior|lead|head|manager)/)) return 3;
    if (title.match(/(director|cfo|ceo|executive)/)) return 7;

    // Default: extract from "min X tahun" pattern
    const match = title.match(/min\s*(\d+)\s*tahun/i);
    return match ? parseInt(match[1]) : 2;
  }

  /**
   * Get detailed recommendation explanation
   */
  static getDetailedExplanation(
    recommendation: JobRecommendation
  ): string {
    const { job, matchScore, matchReasons, skillGaps, salaryGap } =
      recommendation;

    let explanation = `## ${job.judul} - Skor Match: ${matchScore}%\n\n`;
    explanation += `**${job.perusahaan}** | ${job.lokasi}\n\n`;

    explanation += `### Alasan Cocok:\n`;
    matchReasons.forEach((reason) => {
      explanation += `- ✅ ${reason}\n`;
    });

    if (skillGaps && skillGaps.length > 0) {
      explanation += `\n### Skills yang Perlu Dikembangkan:\n`;
      skillGaps.forEach((gap) => {
        explanation += `- 📚 ${gap}\n`;
      });
    }

    if (salaryGap) {
      const gapText =
        salaryGap.status === "above"
          ? `${salaryGap.difference}% lebih tinggi dari ekspektasi`
          : `${salaryGap.difference}% lebih rendah dari ekspektasi`;
      explanation += `\n**Catatan Gaji**: ${gapText}\n`;
    }

    return explanation;
  }
}

/**
 * Parse user profile dari request
 */
export function parseUserProfile(data: unknown): UserProfile | null {
  try {
    const body = data as Record<string, unknown>;
    
    if (!body.email || !body.location) return null;

    return {
      id: Math.random().toString(36).substr(2, 9),
      name: (body.name as string) || "Anonymous",
      email: body.email as string,
      education: (body.education as UserProfile["education"]) || {
        level: "S1",
        field: "General",
      },
      experience: (body.experience as UserProfile["experience"]) || {
        years: 0,
        currentRole: "Job Seeker",
        industry: "Technology",
      },
      skills: (body.skills as string[]) || [],
      preferredJobTypes: (body.preferredJobTypes as Loker["tipe"][]) || [],
      preferredCategories: (body.preferredCategories as string[]) || [],
      salaryExpectation: (body.salaryExpectation as UserProfile["salaryExpectation"]) || {
        min: 3000000,
        max: 10000000,
      },
      location: body.location as string,
      jobSearchStatus: (body.jobSearchStatus as UserProfile["jobSearchStatus"]) || "open_to_offers",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    return null;
  }
}
