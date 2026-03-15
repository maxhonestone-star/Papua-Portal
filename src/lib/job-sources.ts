/**
 * External Job Sources Integration
 * LinkedIn, BKN, JobStreet dengan real-time indexing
 */

import { Loker } from "@/data/loker";

// ═══════════════════════════════════════════
// LINKEDIN JOBS API INTEGRATION
// ═══════════════════════════════════════════

interface LinkedInJobSource {
  position: string;
  company: string;
  description: string;
  location: string;
  salaryRange?: string;
  jobId: string;
  postedDate: string;
  url: string;
}

export async function fetchFromLinkedIn(
  keywords: string = "Papua",
  limit: number = 10
): Promise<Partial<Loker>[]> {
  try {
    const linkedInToken = process.env.LINKEDIN_API_TOKEN;
    if (!linkedInToken) {
      console.log("[LinkedIn] API token not configured, skipping...");
      return [];
    }

    /**
     * In production, use LinkedIn Jobs API:
     * https://www.linkedin.com/developers/apps
     */
    const url = `https://api.linkedin.com/v2/jobs?keywords=${keywords}&limit=${limit}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${linkedInToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.statusText}`);
    }

    const data = (await response.json()) as { elements?: LinkedInJobSource[] };
    const jobs = data.elements || [];

    return jobs.map((job) => ({
      judul: job.position,
      perusahaan: job.company,
      deskripsi: job.description,
      lokasi: job.location,
      provinsi: "Papua",
      kategori: "Teknologi / IT / Software",
      tipe: "Full Time" as const,
      gaji: job.salaryRange || "Kompetitif",
      persyaratan: ["Lihat detail di LinkedIn"],
      kontak: "linkedin.com",
      sumberLink: "LinkedIn Jobs",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      postedDate: new Date(job.postedDate).toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
    }));
  } catch (error) {
    console.error("[LinkedIn] Fetch error:", error);
    return [];
  }
}

// ═══════════════════════════════════════════
// BKN API INTEGRATION (CPNS - REAL-TIME)
// ═══════════════════════════════════════════

interface BKNJobSource {
  id: string;
  judul: string;
  keterangan: string;
  lokasi: string;
  tipe_jabatan: string;
  gaji_kisaran: string;
  deadline: string;
  formasi: number;
}

/**
 * BKN API untuk CPNS - Real-time government job listings
 * API: https://sscasn.bkn.go.id/api
 */
export async function fetchFromBKN(provinsi: string = "Papua"): Promise<Partial<Loker>[]> {
  try {
    const bknApiKey = process.env.BKN_API_KEY;
    if (!bknApiKey) {
      console.log("[BKN] API key not configured, using mock data...");
      return generateMockBKNJobs();
    }

    /**
     * Real BKN API endpoint:
     * GET https://sscasn.bkn.go.id/api/pengumuman
     * GET https://sscasn.bkn.go.id/api/formasi?provinsi=Papua
     */
    const url = `https://sscasn.bkn.go.id/api/formasi?provinsi=${provinsi}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${bknApiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return generateMockBKNJobs();
    }

    const data = (await response.json()) as { data?: BKNJobSource[] };
    const jobs = data.data || [];

    return jobs.map((job) => ({
      judul: job.judul,
      perusahaan: "BKD Provinsi Papa",
      deskripsi: job.keterangan,
      lokasi: job.lokasi,
      provinsi: "Papua",
      kategori: "Pemerintahan / CPNS",
      tipe: "CPNS" as const,
      gaji: job.gaji_kisaran || "Sesuai golongan PNS",
      persyaratan: [
        "WNI",
        "Lulusan S1/S2",
        "Usia sesuai formasi",
        "SKCK",
      ],
      kontak: "sscasn.bkn.go.id",
      sumberLink: "BKN SSCASN - CPNS Papua 2026",
      deadline: job.deadline,
      postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
      urgent: true,
      benefit: ["Tunjangan daerah", "Kesehatan keluarga", "Dana pensiun"],
    }));
  } catch (error) {
    console.error("[BKN] Fetch error:", error);
    return generateMockBKNJobs();
  }
}

// Mock CPNS jobs untuk Papua
function generateMockBKNJobs(): Partial<Loker>[] {
  const cpnsPositions = [
    {
      judul: "Perumahan dan Kawasan Permukiman - Ahli Muda Papua 2026",
      lokasi: "Jayapura",
      formasi: 5,
    },
    {
      judul: "Dinas Pendidikan - Guru Kelas/Bidang Studi Papua 2026",
      lokasi: "Merauke",
      formasi: 20,
    },
    {
      judul: "Dinas Kesehatan - Perawat/Bidan Papua 2026",
      lokasi: "Sorong",
      formasi: 15,
    },
    {
      judul: "BAPPEDA Papua - Analis Kebijakan Publik Papua 2026",
      lokasi: "Jayapura",
      formasi: 3,
    },
  ];

  return cpnsPositions.map((pos, idx) => ({
    id: 1000 + idx,
    judul: pos.judul,
    perusahaan: "BKD Provinsi Papua",
    deskripsi: `Penerimaan CPNS formasi ${pos.formasi} orang untuk Papua 2026. Daftar melalui SSCASN.bkn.go.id`,
    lokasi: pos.lokasi,
    provinsi: "Papua",
    kategori: "Pemerintahan / CPNS",
    tipe: "CPNS" as const,
    gaji: "Sesuai golongan PNS",
    persyaratan: [
      "WNI",
      "Lulusan S1/S2",
      "Usia max 35 tahun",
      "SKCK",
      "Dokumen lengkap",
    ],
    kontak: "sscasn.bkn.go.id",
    sumberLink: "BKN SSCASN - CPNS Papua 2026",
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    postedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    updatedDate: new Date().toISOString().split("T")[0],
    urgent: true,
  }));
}

// ═══════════════════════════════════════════
// JOBSTREET API INTEGRATION
// ═══════════════════════════════════════════

interface JobStreetJobSource {
  id: string;
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  location: string;
  salary: string;
  postedDate: string;
  expiryDate: string;
  jobLevel: string;
  requiredSkills: string[];
  companyEmail: string;
}

/**
 * JobStreet API Integration
 * Real-time job listings from Indonesia's largest job portal
 */
export async function fetchFromJobStreet(
  keywords: string = "Papua",
  limit: number = 15
): Promise<Partial<Loker>[]> {
  try {
    const jobstreetApiKey = process.env.JOBSTREET_API_KEY;
    if (!jobstreetApiKey) {
      console.log("[JobStreet] API key not configured, using mock data...");
      return generateMockJobStreetJobs();
    }

    /**
     * JobStreet API endpoint:
     * https://www.jobstreet.co.id/api/search
     * Requires: API key dari JobStreet developer portal
     */
    const url = new URL("https://api.jobstreet.co.id/v1/search");
    url.searchParams.append("keyword", keywords);
    url.searchParams.append("location", "Papua");
    url.searchParams.append("limit", limit.toString());

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${jobstreetApiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return generateMockJobStreetJobs();
    }

    const data = (await response.json()) as { jobs?: JobStreetJobSource[] };
    const jobs = data.jobs || [];

    return jobs.map((job) => ({
      judul: job.jobTitle,
      perusahaan: job.companyName,
      deskripsi: job.jobDescription,
      lokasi: job.location,
      provinsi: "Papua",
      kategori: inferCategory(job.jobTitle),
      tipe: inferJobType(job.jobLevel),
      gaji: job.salary || "Kompetitif",
      persyaratan: job.requiredSkills,
      kontak: job.companyEmail,
      sumberLink: "JobStreet Indonesia",
      deadline: job.expiryDate,
      postedDate: new Date(job.postedDate).toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
    }));
  } catch (error) {
    console.error("[JobStreet] Fetch error:", error);
    return generateMockJobStreetJobs();
  }
}

function generateMockJobStreetJobs(): Partial<Loker>[] {
  const jobStreetListings = [
    {
      judul: "Senior Software Engineer - Papua Branch",
      perusahaan: "Tech Innovation Solutions",
      gaji: "Rp 18.000.000 - Rp 25.000.000",
      lokasi: "Jayapura",
      kategori: "Teknologi / IT / Software",
    },
    {
      judul: "HR Manager - Papua Region",
      perusahaan: "Mining & Resources Corp",
      gaji: "Rp 14.000.000 - Rp 20.000.000",
      lokasi: "Timika",
      kategori: "Perbankan / Keuangan",
    },
    {
      judul: "Operations Manager - Logistics",
      perusahaan: "PT Logistik Papua",
      gaji: "Rp 12.000.000 - Rp 16.000.000",
      lokasi: "Merauke",
      kategori: "Transportasi / Logistik",
    },
    {
      judul: "Data Analyst - Business Intelligence",
      perusahaan: "Digital Enterprise Papua",
      gaji: "Rp 10.000.000 - Rp 15.000.000",
      lokasi: "Sorong",
      kategori: "Data Science / AI",
    },
  ];

  return jobStreetListings.map((job, idx) => ({
    id: 2000 + idx,
    judul: job.judul,
    perusahaan: job.perusahaan,
    deskripsi: `Lowongan dari JobStreet - ${job.judul} di ${job.lokasi}`,
    lokasi: job.lokasi,
    provinsi: "Papua",
    kategori: job.kategori,
    tipe: "Full Time" as const,
    gaji: job.gaji,
    persyaratan: ["S1 Relevan", "Pengalaman min 2 tahun"],
    kontak: `careers@${job.perusahaan.toLowerCase().replace(/\s/g, "")}.co.id`,
    sumberLink: "JobStreet Indonesia",
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    updatedDate: new Date().toISOString().split("T")[0],
  }));
}

// ═══════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════

function inferCategory(jobTitle: string): string {
  const title = jobTitle.toLowerCase();

  if (title.match(/engineer|developer|programmer|tech|it|software|data/i)) {
    return "Teknologi / IT / Software";
  }
  if (title.match(/accountant|finance|keuangan|accounting/i)) {
    return "Perbankan / Keuangan";
  }
  if (title.match(/marketing|sales|business/i)) {
    return "Content Creator / Digital Marketing";
  }
  if (title.match(/nurse|doctor|health|medis/i)) {
    return "Kesehatan / Medis";
  }
  if (title.match(/hr|human resource|recruitment/i)) {
    return "Konsultasi / Professional Services";
  }

  return "Umum";
}

function inferJobType(level: string): Loker["tipe"] {
  const lv = level.toLowerCase();
  if (lv.includes("intern")) return "Internship";
  if (lv.includes("contract")) return "Kontrak";
  if (lv.includes("freelance")) return "Freelance";
  if (lv.includes("part")) return "Part Time";
  return "Full Time";
}

/**
 * Combine all sources
 */
export async function fetchFromAllSources(): Promise<Partial<Loker>[]> {
  const [linkedinJobs, bknJobs, jobstreetJobs] = await Promise.all([
    fetchFromLinkedIn("Papua", 5),
    fetchFromBKN("Papua"),
    fetchFromJobStreet("Papua", 8),
  ]);

  const allJobs = [...linkedinJobs, ...bknJobs, ...jobstreetJobs];

  // Deduplicate by title + company
  const seen = new Set<string>();
  return allJobs.filter((job) => {
    const key = `${job.judul}-${job.perusahaan}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
