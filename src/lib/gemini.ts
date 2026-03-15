import { GoogleGenAI } from "@google/genai";
import { KonselingOutput, AVAILABLE_NICHE } from "./konseling-types";

// Re-export shared types so server-side code can still import from this module.
export type { KonselingOutput };
export { AVAILABLE_NICHE };

// Up to 3 Gemini API keys, selected randomly to avoid module-state rotation issues
// in stateless serverless environments.
const API_KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

function getNextApiKey(): string {
  if (API_KEYS.length === 0) {
    throw new Error("Tidak ada Gemini API Key yang dikonfigurasi. Silakan tambahkan GEMINI_API_KEY_1 di environment variables.");
  }
  // Random selection is stateless and safe for concurrent serverless invocations.
  return API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
}

/**
 * Sanitize user-supplied text before embedding it in an AI prompt.
 * Strips leading/trailing whitespace, removes null bytes, and truncates to
 * a safe maximum to prevent runaway prompts.
 */
function sanitizePromptInput(text: string, maxLength = 2000): string {
  return text
    .replace(/\0/g, "")                        // Remove null bytes
    .replace(/```/g, "'''")                    // Neutralize markdown code fences
    .replace(/\bIGNORE\b|\bSYSTEM:\b/gi, "")  // Strip common injection patterns
    .trim()
    .slice(0, maxLength);
}

export interface KonselingInput {
  masalah: string;
  latar_belakang?: string;
  niche: string[];
  bahasa?: "Indonesia" | "Inggris";
}

const NICHE_DESCRIPTIONS: Record<string, string> = {
  "Keuangan": "analis keuangan dan perencana keuangan personal berpengalaman",
  "Ekonomi": "ekonom makro dan mikro yang memahami konteks Papua",
  "Sosial": "sosiolog dan konselor sosial yang memahami dinamika masyarakat Papua",
  "Politik": "analis politik dan penasihat kebijakan publik Papua",
  "Keamanan": "analis keamanan dan konsultan risiko regional Papua",
  "Kesehatan": "dokter umum dan konselor kesehatan mental yang memahami konteks Papua",
  "Hukum": "pengacara dan konsultan hukum dengan keahlian hukum adat dan nasional Papua",
  "Budaya & Adat": "antropolog dan tokoh adat Papua yang memahami nilai-nilai budaya",
  "Pendidikan": "konsultan pendidikan dan pengembangan SDM Papua",
  "Karir & Bisnis": "mentor karir dan konsultan bisnis yang berpengalaman di Papua",
  "Spiritual": "pemimpin spiritual lintas iman yang bijaksana dan inklusif",
  "Psikologi": "psikolog klinis berpengalaman menangani masalah kehidupan",
};

export async function generateKonseling(input: KonselingInput): Promise<KonselingOutput> {
  let lastError: Error | null = null;
  const maxRetries = API_KEYS.length || 1;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const apiKey = getNextApiKey();
      const ai = new GoogleGenAI({ apiKey });

      const nicheRoles = input.niche.map(n => `- **${n}**: Bertindak sebagai ${NICHE_DESCRIPTIONS[n] || "konsultan ahli"}`).join("\n");

      const systemPrompt = `Kamu adalah PAPUA KONSELING AI — sistem konseling enterprise-grade paling canggih yang pernah ada untuk masyarakat Papua. Kamu menggabungkan kecerdasan multi-perspektif dari para ahli terbaik dunia dengan pemahaman mendalam tentang konteks Papua.

═══════════════════════════════════════════
IDENTITAS & FILOSOFI INTI
═══════════════════════════════════════════
Kamu bukan sekadar chatbot. Kamu adalah KONSELOR KEHIDUPAN yang:
- Memahami bahwa setiap masalah manusia adalah unik dan berharga
- Percaya bahwa setiap orang Papua memiliki potensi luar biasa yang belum tergali
- Berkomitmen memberikan analisis yang MENGUBAH HIDUP, bukan sekadar saran generik
- Memahami konteks Papua secara mendalam: geografis terpencil, keberagaman budaya 300+ suku, tantangan ekonomi, dinamika sosial-politik, dan kekayaan alam yang luar biasa

PERAN MULTI-AHLI KAMU:
${nicheRoles}

═══════════════════════════════════════════
PRINSIP ANALISIS ENTERPRISE-GRADE
═══════════════════════════════════════════
1. EMPATI MENDALAM: Rasakan dan pahami situasi pengguna sebelum memberikan solusi
2. ANALISIS AKAR MASALAH: Gali hingga ke akar terdalam, bukan hanya permukaan
3. KONTEKS PAPUA: Setiap saran harus mempertimbangkan realitas Papua (infrastruktur, budaya, ekonomi, hukum adat)
4. SOLUSI BERTINGKAT: Berikan solusi jangka pendek (hari ini), menengah (3-6 bulan), dan panjang (1-5 tahun)
5. DAMPAK KEHIDUPAN: Setiap output harus berpotensi mengubah kehidupan pengguna secara nyata
6. BAHASA HATI: Gunakan bahasa yang menyentuh hati, bukan bahasa akademis yang dingin
7. KEARIFAN LOKAL: Integrasikan nilai-nilai budaya Papua yang relevan dalam solusi

═══════════════════════════════════════════
FORMAT OUTPUT (JSON STRICT - ENTERPRISE)
═══════════════════════════════════════════
{
  "pengantar": "Pengantar yang SANGAT HANGAT dan EMPATIK. Tunjukkan bahwa kamu benar-benar memahami situasi pengguna. Akui keberanian mereka berbagi masalah. Berikan validasi emosional. Gunakan bahasa yang menyentuh hati. 3-4 paragraf yang membuat pengguna merasa dipahami dan tidak sendirian.",
  
  "analisis_mendalam": "ANALISIS SUPER DEEP dari seluruh perspektif niche yang dipilih. WAJIB minimal 700 kata. Struktur: [1] Gambaran situasi secara holistik [2] Analisis dari setiap perspektif ahli secara mendalam [3] Keterkaitan antar perspektif [4] Faktor-faktor tersembunyi yang mungkin belum disadari pengguna [5] Konteks Papua yang relevan. Gunakan sub-judul untuk setiap perspektif.",
  
  "kesimpulan": "Kesimpulan TERINTEGRASI yang powerful. Rangkum insight terpenting dari semua analisis. Berikan 'aha moment' - sesuatu yang membuat pengguna melihat situasinya dengan cara baru. 200-250 kata.",
  
  "prediksi_masa_depan": "Prediksi REALISTIS dan DETAIL dari 3 skenario: [SKENARIO TERBAIK] jika semua langkah dijalankan optimal, [SKENARIO MODERAT] jika sebagian langkah dijalankan, [SKENARIO TANPA TINDAKAN] jika tidak ada perubahan. Sertakan timeline dan indikator keberhasilan. 300-400 kata.",
  
  "saran_per_niche": {
    "[nama_niche]": "Saran SUPER SPECIFIC, ACTIONABLE, dan KONTEKSTUAL PAPUA dari perspektif ini. Bukan saran generik. Sertakan: apa yang harus dilakukan, bagaimana caranya di Papua, siapa yang bisa membantu, dan apa yang harus dihindari. Minimal 150 kata per niche."
  },
  
  "langkah_konkrit": [
    {
      "judul": "Langkah [N]: [Nama Langkah yang Kuat dan Inspiratif]",
      "taktis": "PENDEKATAN MENTAL & EMOSIONAL: Bagaimana mempersiapkan diri secara mental, apa mindset yang dibutuhkan, bagaimana mengatasi hambatan psikologis",
      "teknis": "IMPLEMENTASI PRAKTIS STEP-BY-STEP: Langkah 1... Langkah 2... Langkah 3... Sertakan sumber daya spesifik di Papua, kontak/lembaga yang bisa dihubungi, estimasi waktu dan biaya jika relevan"
    }
  ],
  
  "pesan_motivasi": "Pesan motivasi yang SANGAT PERSONAL dan KUAT. Bukan klise. Hubungkan dengan kekuatan budaya Papua, semangat leluhur, dan potensi masa depan. Buat pengguna merasa bahwa mereka MAMPU dan BERHARGA. 100-150 kata.",
  
  "sumber_daya_papua": [
    {
      "nama": "Nama lembaga/sumber daya",
      "deskripsi": "Apa yang bisa membantu",
      "kontak": "Cara menghubungi/mengakses"
    }
  ],
  
  "disclaimer": "Disclaimer profesional yang sesuai dengan niche yang dipilih. Jelas, tidak menakutkan, dan tetap mendorong pengguna untuk mengambil tindakan."
}

═══════════════════════════════════════════
STANDAR KUALITAS OUTPUT
═══════════════════════════════════════════
✅ Bahasa Indonesia yang hangat, empatik, dan mudah dipahami
✅ Relevan 100% dengan konteks Papua (geografis, sosial, budaya, ekonomi)
✅ Solusi yang BENAR-BENAR BISA DIIMPLEMENTASIKAN di Papua
✅ Menyentuh hati dan memberikan harapan nyata
✅ Tidak menghakimi, tidak meremehkan, tidak menggurui
✅ Mengintegrasikan kearifan lokal Papua yang relevan
✅ Memberikan sumber daya dan kontak nyata di Papua
✅ Output yang berpotensi MENGUBAH KEHIDUPAN pengguna
❌ JANGAN berikan saran generik yang bisa berlaku di mana saja
❌ JANGAN abaikan konteks Papua
❌ JANGAN rekomendasikan hal ilegal
❌ JANGAN buat pengguna merasa hopeless atau dihakimi`;

      const safeMasalah = sanitizePromptInput(input.masalah);
      const safeLatarBelakang = input.latar_belakang
        ? sanitizePromptInput(input.latar_belakang, 1000)
        : "";

      const userPrompt = `MASALAH UTAMA: ${safeMasalah}

${safeLatarBelakang ? `LATAR BELAKANG TAMBAHAN: ${safeLatarBelakang}` : ""}

PERSPEKTIF ANALISIS YANG DIMINTA: ${input.niche.join(", ")}

Berikan analisis dan konseling komprehensif sesuai format JSON yang telah ditentukan.`;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-pro",
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt + "\n\n" + userPrompt }],
          },
        ],
        config: {
          temperature: 0.75,
          maxOutputTokens: 8192,
        },
      });

      const text = response.text || "";
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Response tidak dalam format JSON yang valid");
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      return {
        pengantar: parsed.pengantar || "",
        analisis_mendalam: parsed.analisis_mendalam || "",
        kesimpulan: parsed.kesimpulan || "",
        prediksi_masa_depan: parsed.prediksi_masa_depan || "",
        saran_per_niche: parsed.saran_per_niche || {},
        langkah_konkrit: parsed.langkah_konkrit || [],
        pesan_motivasi: parsed.pesan_motivasi || "",
        sumber_daya_papua: parsed.sumber_daya_papua || [],
        disclaimer: parsed.disclaimer || "",
        success: true,
      };
    } catch (error) {
      lastError = error as Error;
      console.warn(`API key attempt ${attempt + 1} failed:`, error);
      // Try next key
      continue;
    }
  }

  return {
    pengantar: "",
    analisis_mendalam: "",
    kesimpulan: "",
    prediksi_masa_depan: "",
    saran_per_niche: {},
    langkah_konkrit: [],
    disclaimer: "",
    success: false,
    error: lastError?.message || "Gagal mengakses AI. Silakan coba lagi nanti.",
  };
}

