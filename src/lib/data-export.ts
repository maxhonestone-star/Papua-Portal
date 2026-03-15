/**
 * PAPUA PORTAL - DATA EXPORT & ANALYTICS UTILITIES
 * Enterprise-grade export, reporting, and data analysis tools
 * For: CSV/JSON export, analytics dashboards, data-driven insights
 */

import { lokerData, Loker } from "../data/loker";
import { programBansos, ProgramBansos } from "../data/bansos";
import { komoditas, hargaPerKabupaten, KomoditasHarga, HargaKabupaten } from "../data/sembako";

/**
 * ===== LOKER ANALYTICS =====
 */
export interface LokerStats {
  totalJobs: number;
  byCategory: Record<string, number>;
  byType: Record<string, number>;
  urgentCount: number;
  byProvinsi: Record<string, number>;
  salaryRange: { min: number; max: number };
  averageDeadlineDays: number;
}

export function analyzeLokerData(): LokerStats {
  const stats: LokerStats = {
    totalJobs: lokerData.length,
    byCategory: {},
    byType: {},
    urgentCount: 0,
    byProvinsi: {},
    salaryRange: { min: Infinity, max: 0 },
    averageDeadlineDays: 0,
  };

  let totalDeadlineDays = 0;

  lokerData.forEach((job) => {
    // Category count
    stats.byCategory[job.kategori] = (stats.byCategory[job.kategori] || 0) + 1;
    
    // Type count
    stats.byType[job.tipe] = (stats.byType[job.tipe] || 0) + 1;
    
    // Urgent count
    if (job.urgent) stats.urgentCount++;
    
    // Province count
    stats.byProvinsi[job.provinsi] = (stats.byProvinsi[job.provinsi] || 0) + 1;
    
    // Salary range (if gaji exists and is a number)
    if (job.gaji) {
      const salaryMatch = job.gaji.match(/(\d+)/g);
      if (salaryMatch) {
        const minSalary = parseInt(salaryMatch[0]) * 1000;
        stats.salaryRange.min = Math.min(stats.salaryRange.min, minSalary);
        if (salaryMatch.length > 1) {
          const maxSalary = parseInt(salaryMatch[1]) * 1000;
          stats.salaryRange.max = Math.max(stats.salaryRange.max, maxSalary);
        }
      }
    }
    
    // Deadline days calculation
    const deadlineDate = new Date(job.deadline);
    const today = new Date();
    const daysLeft = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    totalDeadlineDays += Math.max(daysLeft, 0);
  });

  stats.averageDeadlineDays = Math.round(totalDeadlineDays / lokerData.length);
  
  return stats;
}

/**
 * ===== BANSOS ANALYTICS =====
 */
export interface BansosStats {
  totalPrograms: number;
  byCategory: Record<string, number>;
  totalEstimatedValue: string;
}

export function analyzeBansosData(): BansosStats {
  const stats: BansosStats = {
    totalPrograms: programBansos.length,
    byCategory: {},
    totalEstimatedValue: "Nilai program bervariasi, estimasi minimal Rp 50 miliar per tahun untuk Papua",
  };

  programBansos.forEach((program) => {
    stats.byCategory[program.kategori] = (stats.byCategory[program.kategori] || 0) + 1;
  });

  return stats;
}

/**
 * ===== SEMBAKO ANALYTICS =====
 */
export interface SembakoPriceAnalysis {
  totalKomoditas: number;
  totalLokasi: number;
  mostExpensiveKabupaten: string;
  cheapestKabupaten: string;
  averagePriceVariation: string;
}

export function analyzeSembakoPrices(): SembakoPriceAnalysis {
  let maxPrice = 0;
  let minPrice = Infinity;
  let expensiveKab = "";
  let cheapestKab = "";

  hargaPerKabupaten.forEach((loc) => {
    Object.values(loc.harga).forEach((price) => {
      if (price > maxPrice) {
        maxPrice = price;
        expensiveKab = loc.kabupaten;
      }
      if (price < minPrice) {
        minPrice = price;
        cheapestKab = loc.kabupaten;
      }
    });
  });

  return {
    totalKomoditas: komoditas.length,
    totalLokasi: hargaPerKabupaten.length,
    mostExpensiveKabupaten: expensiveKab,
    cheapestKabupaten: cheapestKab,
    averagePriceVariation: `Variasi harga 2-3x antara Papua Pesisir (murah) dan Papua Pegunungan (mahal) untuk produk yang sama`,
  };
}

/**
 * ===== CSV EXPORT FUNCTIONS =====
 */
export function exportLokerAsCSV(): string {
  const headers = [
    "ID", "Judul", "Perusahaan", "Lokasi", "Kategori", "Tipe", "Gaji", 
    "Deadline", "Posted Date", "Urgent"
  ].join(",");

  const rows = lokerData.map((job) =>
    [
      job.id,
      `"${job.judul}"`,
      `"${job.perusahaan}"`,
      `"${job.lokasi}"`,
      job.kategori,
      job.tipe,
      `"${job.gaji || 'N/A'}"`,
      job.deadline,
      job.postedDate,
      job.urgent ? "Yes" : "No",
    ].join(",")
  );

  return `${headers}\n${rows.join("\n")}`;
}

export function exportBansosAsCSV(): string {
  const headers = [
    "ID", "Nama", "Singkatan", "Penyelenggara", "Besaran", "Kategori", "Link Resmi"
  ].join(",");

  const rows = programBansos.map((prog) =>
    [
      prog.id,
      `"${prog.nama}"`,
      prog.singkatan,
      `"${prog.penyelenggara}"`,
      `"${prog.besaran}"`,
      prog.kategori,
      prog.link_resmi,
    ].join(",")
  );

  return `${headers}\n${rows.join("\n")}`;
}

export function exportSembakoPricesAsCSV(): string {
  const headers = ["Kabupaten", ...komoditas.map((k) => `"${k.nama}"`)].join(",");

  const rows = hargaPerKabupaten.map((loc) => {
    const rowData = [loc.kabupaten];
    komoditas.forEach((k) => {
      rowData.push(loc.harga[k.nama]?.toString() || "N/A");
    });
    return rowData.join(",");
  });

  return `${headers}\n${rows.join("\n")}`;
}

/**
 * ===== JSON EXPORT FUNCTIONS (untuk API/integration) =====
 */
export async function exportAllDataAsJSON() {
  return {
    metadata: {
      exportDate: new Date().toISOString(),
      version: "1.0",
      source: "Papua Portal",
    },
    loker: {
      data: lokerData,
      stats: analyzeLokerData(),
    },
    bansos: {
      data: programBansos,
      stats: analyzeBansosData(),
    },
    sembako: {
      komoditas: komoditas,
      prices: hargaPerKabupaten,
      stats: analyzeSembakoPrices(),
    },
  };
}

/**
 * ===== DOWNLOAD FUNCTIONS (untuk browser) =====
 */
export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadJSON(filename: string, data: unknown) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * ===== ADVANCED: MARKET INSIGHTS =====
 */
export function getMarketInsights() {
  const lokerStats = analyzeLokerData();
  const bansosStats = analyzeBansosData();
  const sembakoStats = analyzeSembakoPrices();

  return {
    employment: {
      totalOpportunities: lokerStats.totalJobs,
      topCategories: Object.entries(lokerStats.byCategory)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3),
      urgentHiring: lokerStats.urgentCount,
      provinceDistribution: lokerStats.byProvinsi,
      insightKey: `Terdapat ${lokerStats.totalJobs} lowongan kerja aktif dengan ${lokerStats.urgentCount} posisi mendesak. ${lokerStats.byCategory["Teknologi / IT"] || 0} posisi di sektor teknologi.`,
    },
    socialSupport: {
      totalPrograms: bansosStats.totalPrograms,
      coverage: bansosStats.byCategory,
      insightKey: `${bansosStats.totalPrograms} program bansos aktif melayani keluarga miskin di Papua dengan jangkauan setiap kategori kehidupan (pendidikan, kesehatan, pangan, usaha).`,
    },
    commodityPrices: {
      totalItems: sembakoStats.totalKomoditas,
      locations: sembakoStats.totalLokasi,
      priceGap: "Harga barang di Papua Pegunungan 2-3x lebih mahal dari Papua Pesisir",
      insightKey: `Monitoring ${sembakoStats.totalKomoditas} komoditas di ${sembakoStats.totalLokasi} lokasi. Keterjangkauan berbeda signifikan per region.`,
    },
  };
}

export default {
  analyzeLokerData,
  analyzeBansosData,
  analyzeSembakoPrices,
  exportLokerAsCSV,
  exportBansosAsCSV,
  exportSembakoPricesAsCSV,
  exportAllDataAsJSON,
  downloadCSV,
  downloadJSON,
  getMarketInsights,
};
