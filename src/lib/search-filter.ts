/**
 * ADVANCED SEARCH & FILTERING ENGINE
 * For Loker, Bansos, Sembako with:
 * - Multi-field search
 * - Advanced filters
 * - Fuzzy matching
 * - Sorting & pagination
 * - Full-text search capability
 */

import lokerData from "@/data/loker";
import { programBansos } from "@/data/bansos";
import { hargaPerKabupaten, komoditas } from "@/data/sembako";

/**
 * ===== LOKER SEARCH & FILTER =====
 */
export interface LokerFilterOptions {
  search?: string; // Fuzzy search across title, company, location
  kategori?: string[];
  tipe?: string[];
  provinces?: string[]; // Multi-province filter
  minSalary?: number;
  maxSalary?: number;
  urgent?: boolean;
  sortBy?: "newest" | "oldest" | "salary-asc" | "salary-desc" | "deadline-soon";
  page?: number;
  limit?: number;
}

export function searchLoker(options: LokerFilterOptions) {
  let results = [...lokerData];

  // Text search (fuzzy matching)
  if (options.search) {
    const searchTerm = options.search.toLowerCase();
    results = results.filter((job) => {
      const searchFields = [
        job.judul,
        job.perusahaan,
        job.lokasi,
        job.provinsi,
        job.kategori,
      ].join(" ").toLowerCase();

      // Fuzzy score (simple: check if all characters are present in order)
      return fuzzyMatch(searchFields, searchTerm) > 0.6;
    });
  }

  // Category filter
  if (options.kategori?.length) {
    results = results.filter((job) =>
      options.kategori!.includes(job.kategori)
    );
  }

  // Job type filter
  if (options.tipe?.length) {
    results = results.filter((job) => options.tipe!.includes(job.tipe));
  }

  // Province multi-filter
  if (options.provinces?.length) {
    results = results.filter((job) =>
      options.provinces!.includes(job.provinsi)
    );
  }

  // Salary range filter
  if (options.minSalary || options.maxSalary) {
    results = results.filter((job) => {
      const salary = extractNumericSalary(job.gaji);
      if (options.minSalary && salary < options.minSalary) return false;
      if (options.maxSalary && salary > options.maxSalary) return false;
      return true;
    });
  }

  // Urgent filter
  if (options.urgent) {
    results = results.filter((job) => job.urgent === true);
  }

  // Sorting
  switch (options.sortBy) {
    case "newest":
      results.sort(
        (a, b) =>
          new Date(b.postedDate).getTime() -
          new Date(a.postedDate).getTime()
      );
      break;
    case "oldest":
      results.sort(
        (a, b) =>
          new Date(a.postedDate).getTime() -
          new Date(b.postedDate).getTime()
      );
      break;
    case "salary-asc":
      results.sort(
        (a, b) => extractNumericSalary(a.gaji) - extractNumericSalary(b.gaji)
      );
      break;
    case "salary-desc":
      results.sort(
        (a, b) => extractNumericSalary(b.gaji) - extractNumericSalary(a.gaji)
      );
      break;
    case "deadline-soon":
      results.sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
      break;
  }

  // Pagination
  const page = options.page || 1;
  const limit = options.limit || 20;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: results.slice(start, end),
    total: results.length,
    page,
    limit,
    pages: Math.ceil(results.length / limit),
  };
}

/**
 * ===== BANSOS SEARCH & FILTER =====
 */
export interface BansosFilterOptions {
  search?: string;
  kategori?: string[];
  minBesaran?: number;
  sortBy?: "newest" | "largest-besaran" | "smallest-besaran";
  page?: number;
  limit?: number;
}

export function searchBansos(options: BansosFilterOptions) {
  let results = [...programBansos];

  // Text search
  if (options.search) {
    const searchTerm = options.search.toLowerCase();
    results = results.filter((program) => {
      const searchFields = [
        program.nama,
        program.singkatan,
        program.penyelenggara,
      ].join(" ").toLowerCase();
      return fuzzyMatch(searchFields, searchTerm) > 0.6;
    });
  }

  // Category filter
  if (options.kategori?.length) {
    results = results.filter((program) =>
      options.kategori!.includes(program.kategori)
    );
  }

  // Minimum besaran filter
  if (options.minBesaran) {
    results = results.filter((program) => {
      const besaran = extractNumericSalary(program.besaran);
      return besaran >= options.minBesaran!;
    });
  }

  // Sorting
  switch (options.sortBy) {
    case "largest-besaran":
      results.sort(
        (a, b) => extractNumericSalary(b.besaran) - extractNumericSalary(a.besaran)
      );
      break;
    case "smallest-besaran":
      results.sort(
        (a, b) => extractNumericSalary(a.besaran) - extractNumericSalary(b.besaran)
      );
      break;
  }

  // Pagination
  const page = options.page || 1;
  const limit = options.limit || 20;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: results.slice(start, end),
    total: results.length,
    page,
    limit,
    pages: Math.ceil(results.length / limit),
  };
}

/**
 * ===== SEMBAKO PRICE COMPARISON =====
 */
export interface SembakoFilterOptions {
  komoditas: string; // e.g., "Beras" or "Daging Sapi"
  sortBy?: "price-asc" | "price-desc" | "name-asc";
  includeRegions?: string[];
  excludeRegions?: string[];
}

export function compareSembakoPrices(options: SembakoFilterOptions) {
  const { komoditas, sortBy, includeRegions, excludeRegions } = options;

  const results = Object.entries(hargaPerKabupaten)
    .filter(([kabupaten]) => {
      if (includeRegions?.length && !includeRegions.includes(kabupaten)) {
        return false;
      }
      if (excludeRegions?.length && excludeRegions.includes(kabupaten)) {
        return false;
      }
      return true;
    })
    .map(([kabupaten, harga]) => ({
      kabupaten,
      harga: harga[komoditas as keyof typeof harga] || null,
    }))
    .filter((item) => item.harga !== null)
    .map((item) => ({
      ...item,
      harga: typeof item.harga === 'number' ? item.harga : Object.values(item.harga as Record<string, number>)?.[0] || 0,
    }));

  // Sort
  if (sortBy === "price-asc") {
    results.sort((a, b) => (a.harga || 0) - (b.harga || 0));
  } else if (sortBy === "price-desc") {
    results.sort((a, b) => (b.harga || 0) - (a.harga || 0));
  } else if (sortBy === "name-asc") {
    results.sort((a, b) => a.kabupaten.localeCompare(b.kabupaten));
  }

  const priceRange = {
    min: Math.min(...results.map((r) => r.harga || 0)),
    max: Math.max(...results.map((r) => r.harga || 0)),
    avg: Math.round(
      results.reduce((sum, r) => sum + (r.harga || 0), 0) / results.length
    ),
  };

  return {
    komoditas,
    data: results,
    priceRange,
    regions: results.length,
  };
}

/**
 * ===== REGIONAL ANALYSIS =====
 * Compare job/bansos/prices across provinces
 */
export function analyzeRegional(provinsi: string) {
  return {
    loker: {
      count: lokerData.filter((job) => job.provinsi === provinsi).length,
      categories: groupBy(
        lokerData.filter((job) => job.provinsi === provinsi),
        "kategori"
      ),
      avgSalary: calculateAvgSalary(
        lokerData.filter((job) => job.provinsi === provinsi)
      ),
    },
    bansos: {
      count: programBansos.length,
      programs: groupBy(
        programBansos,
        "kategori"
      ),
    },
  };
}

/**
 * ===== GET ALL UNIQUE VALUES FOR FILTERS =====
 */
export function getFilterOptions() {
  return {
    loker: {
      categories: [...new Set(lokerData.map((job) => job.kategori))],
      types: [...new Set(lokerData.map((job) => job.tipe))],
      provinces: [...new Set(lokerData.map((job) => job.provinsi))],
      salaryRange: {
        min: Math.min(...lokerData.map((job) => extractNumericSalary(job.gaji))),
        max: Math.max(...lokerData.map((job) => extractNumericSalary(job.gaji))),
      },
    },
    bansos: {
      categories: [...new Set(programBansos.map((p) => p.kategori))],
    },
    sembako: {
      commodities: komoditas,
      regions: Object.keys(hargaPerKabupaten),
      priceRange: {
        min: Math.min(
          ...Object.values(hargaPerKabupaten).map((h) =>
            Math.min(...Object.values(h))
          )
        ),
        max: Math.max(
          ...Object.values(hargaPerKabupaten).map((h) =>
            Math.max(...Object.values(h))
          )
        ),
      },
    },
  };
}

/**
 * ===== HELPER FUNCTIONS =====
 */

function fuzzyMatch(text: string, query: string): number {
  let score = 0;
  let queryIndex = 0;

  for (let i = 0; i < text.length && queryIndex < query.length; i++) {
    if (text[i] === query[queryIndex]) {
      score++;
      queryIndex++;
    }
  }

  return queryIndex === query.length ? score / text.length : 0;
}

function extractNumericSalary(salaryStr: string | undefined): number {
  if (!salaryStr) return 0;
  const match = salaryStr.match(/(\d+)/);
  return match ? parseInt(match[1]) * 1000000 : 0; // Assume in millions
}

function groupBy<T>(
  arr: T[],
  key: keyof T
): Record<string, T[]> {
  return arr.reduce(
    (result, item) => {
      const keyValue = String(item[key]);
      result[keyValue] = result[keyValue] || [];
      result[keyValue].push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
}

function calculateAvgSalary(jobs: typeof lokerData): number {
  if (!jobs.length) return 0;
  const total = jobs.reduce(
    (sum, job) => sum + extractNumericSalary(job.gaji),
    0
  );
  return Math.round(total / jobs.length);
}

export default {
  searchLoker,
  searchBansos,
  compareSembakoPrices,
  analyzeRegional,
  getFilterOptions,
};
