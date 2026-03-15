import { NextRequest, NextResponse } from "next/server";
import { generateKonseling, KonselingInput } from "@/lib/gemini";
import { getAIProvider, callAIProvider, sanitizePromptInput } from "@/lib/ai-provider";

export async function POST(req: NextRequest) {
  try {
    const body: KonselingInput = await req.json();
    const preferredProvider = req.headers.get("x-ai-provider") as "gemini" | "deepseek" | "openrouter" | null;

    if (!body.masalah || body.masalah.trim().length < 20) {
      return NextResponse.json(
        { error: "Deskripsi masalah terlalu singkat. Minimal 20 karakter." },
        { status: 400 }
      );
    }

    if (!body.niche || body.niche.length === 0) {
      return NextResponse.json(
        { error: "Pilih minimal 1 perspektif analisis." },
        { status: 400 }
      );
    }

    try {
      // Try using original Gemini implementation first (has detailed system prompt)
      const result = await generateKonseling(body);

      if (!result.success) {
        // If Gemini fails, fallback to multi-provider
        return await generateKonselingWithMultiProvider(body, preferredProvider);
      }

      return NextResponse.json(result);
    } catch (geminError) {
      console.warn("Gemini failed, falling back to multi-provider:", geminError);
      
      // Fallback to multi-provider if Gemini fails
      return await generateKonselingWithMultiProvider(body, preferredProvider);
    }
  } catch (error) {
    console.error("Konseling API error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Terjadi kesalahan server. Silakan coba lagi.",
        hint: "Pastikan API keys sudah dikonfigurasi di Vercel environment variables"
      },
      { status: 500 }
    );
  }
}

/**
 * Fallback konseling dengan multi-provider
 */
async function generateKonselingWithMultiProvider(
  input: KonselingInput,
  preferredProvider?: string | null
) {
  try {
    const provider = getAIProvider(preferredProvider as any);
    
    const nicheRoles = input.niche
      .map(n => `- ${n}`)
      .join("\n");

    const systemPrompt = `Kamu adalah PAPUA KONSELING AI. Analisis masalah dari perspektif: ${nicheRoles}.
    
Berikan respons dalam format JSON dengan struktur:
{
  "pengantar": "Pengantar empati 3-4 paragraf",
  "analisis_mendalam": "Analisis akar masalah 5-7 paragraf",
  "saran_per_niche": {"[niche]": "saran spesifik dari perspektif ini"},
  "prediksi_masa_depan": "Prediksi jika ada aksi sekarang vs tidak 3-4 paragraf",
  "langkah_konkrit": "Langkah praktis hari ini, bulan depan, 1 tahun 5-7 items",
  "kesimpulan": "Kesimpulan inspiratif 2-3 paragraf"
}`;

    const userMessage = `
MASALAH: ${sanitizePromptInput(input.masalah)}
${input.latar_belakang ? `LATAR BELAKANG: ${sanitizePromptInput(input.latar_belakang)}` : ""}
PERSPEKTIF ANALISIS: ${input.niche.join(", ")}

Analisis masalah ini secara mendalam dan berikan solusi konkrit untuk Papua.
`;

    const response = await callAIProvider(
      provider,
      [{ role: "user", content: userMessage }],
      systemPrompt
    );

    // Parse JSON response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from AI provider");
    }

    const result = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      ...result,
      provider: provider.name,
      success: true,
    });
  } catch (error) {
    console.error("Multi-provider fallback error:", error);
    throw error;
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
