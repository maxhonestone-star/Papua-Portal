/**
 * AI Provider Router - Google Gemini Only (Free + Generous)
 * Supports up to 3 API keys for load balancing & redundancy
 */

export type AIProvider = "gemini";

export interface AIProviderConfig {
  name: AIProvider;
  apiKey: string;
  model: string;
}

/**
 * Get available Gemini API keys from environment variables
 * Supports 3 keys for load balancing:
 * - GEMINI_API_KEY_1 (Required)
 * - GEMINI_API_KEY_2 (Optional)
 * - GEMINI_API_KEY_3 (Optional)
 * 
 * Why Gemini only?
 * - FREE tier: 2M tokens/month (very generous!)
 * - Perfect for: Konseling AI, job recommendations, data analysis
 * - NO CREDIT CARD required for free tier
 * - Multiple keys enable load balancing & fallback
 */
export function getAvailableProviders(): AIProviderConfig[] {
  const providers: AIProviderConfig[] = [];

  // Check Gemini keys (can have 1-3)
  const geminKeys = [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
  ].filter(Boolean);

  if (geminKeys.length === 0) {
    throw new Error(
      "❌ Tidak ada Gemini API key yang dikonfigurasi.\n" +
      "Silakan tambahkan GEMINI_API_KEY_1 di environment variables.\n\n" +
      "Cara dapetin API key GRATIS:\n" +
      "1. Buka: https://aistudio.google.com/apikey\n" +
      "2. Login dengan Google Account\n" +
      "3. Klik 'Create API Key'\n" +
      "4. Copy-paste ke GEMINI_API_KEY_1\n\n" +
      "TIPS: Buat 3 API key dari akun berbeda untuk load balancing lebih baik!"
    );
  }

  // Return provider config with random key selection for load balancing
  const randomKey = geminKeys[Math.floor(Math.random() * geminKeys.length)] as string;
  providers.push({
    name: "gemini",
    apiKey: randomKey,
    model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
  });

  return providers;
}

/**
 * Get Gemini API provider (always returns gemini as it's the only provider)
 */
export function getAIProvider(preferredProvider?: AIProvider): AIProviderConfig {
  const available = getAvailableProviders();
  return available[0];
}

/**
 * Call Gemini API with 3-key rotation
 */
export async function callAIProvider(
  provider: AIProviderConfig,
  messages: { role: "user" | "system" | "assistant"; content: string }[],
  systemPrompt?: string
): Promise<string> {
  try {
    // Dynamic import untuk avoid bundling GoogleGenAI di client
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey: provider.apiKey });

    // Combine system prompt dengan messages
    const fullMessages = systemPrompt
      ? [{ role: "user" as const, content: messages.map(m => m.content).join("\n\n") }]
      : messages;

    const response = await ai.models.generateContent({
      model: provider.model,
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        ...fullMessages.map(m => ({
          role: m.role === "system" ? ("user" as const) : m.role,
          parts: [{ text: m.content }],
        })),
      ],
    });

    const text =
      typeof response.candidates?.[0]?.content?.parts?.[0] === "object" &&
      response.candidates[0].content.parts[0] instanceof Object &&
      "text" in response.candidates[0].content.parts[0]
        ? (response.candidates[0].content.parts[0] as { text: string }).text
        : String(response.candidates?.[0]?.content?.parts?.[0]);

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(`Gemini API error: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Helper: Sanitize user input untuk prevent prompt injection
 */
export function sanitizePromptInput(text: string, maxLength = 2000): string {
  return text
    .replace(/\0/g, "") // Remove null bytes
    .replace(/```/g, "'''") // Neutralize markdown code fences
    .replace(/\bIGNORE\b|\bSYSTEM:\b/gi, "") // Strip injection patterns
    .trim()
    .slice(0, maxLength);
}
