// Shared types and constants for the konseling feature.
// This file MUST NOT import any server-side or Node.js-only modules
// so it can be safely imported by both Client and Server components.

export interface SumberDayaPapua {
  nama: string;
  deskripsi: string;
  kontak: string;
}

export interface KonselingOutput {
  pengantar: string;
  analisis_mendalam: string;
  kesimpulan: string;
  prediksi_masa_depan: string;
  saran_per_niche: Record<string, string>;
  langkah_konkrit: Array<{ judul: string; taktis: string; teknis: string }>;
  pesan_motivasi?: string;
  sumber_daya_papua?: SumberDayaPapua[];
  disclaimer: string;
  success: boolean;
  error?: string;
}

export const AVAILABLE_NICHE: string[] = [
  "Keuangan",
  "Ekonomi",
  "Sosial",
  "Politik",
  "Keamanan",
  "Kesehatan",
  "Hukum",
  "Budaya & Adat",
  "Pendidikan",
  "Karir & Bisnis",
  "Spiritual",
  "Psikologi",
];
