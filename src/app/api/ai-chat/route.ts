/**
 * AI Chat API Endpoint - Google Gemini Only
 * Konseling AI & website assistant using Gemini with 3-key rotation
 * 
 * POST /api/ai-chat
 * Body: { message: string }
 */

import { NextRequest, NextResponse } from "next/server";

interface AIChatRequest {
  message: string;
}

// System prompt for AI to understand Papua Portal
const SYSTEM_PROMPT = `
You are an AI assistant for Papua Portal - a comprehensive information platform for Papua, Indonesia.

Papua Portal provides:
1. Job Listings (Loker): 10+ job opportunities updated for 2026 in various sectors (IT, Mining, Healthcare, Tourism, Government)
2. Social Assistance (Bansos): 10 government assistance programs with eligibility checks
3. Commodity Prices (Sembako): 60+ food items with regional price tracking for 5 provinces
4. Deep Link Directory: Quick access to popular websites and services
5. AI Counseling (Konseling): Mental health support using geopolitical analysis

Your responsibilities:
- Answer questions about the website and its features
- Help users understand job opportunities, assistance programs, and prices
- Analyze website data and provide insights
- Suggest improvements for data accuracy and user experience
- Execute auto-maintenance tasks (update data, verify prices, check job listings)
- Provide fraud warnings for social assistance scams

Papua Provinces with Specific Data:
- Kota Jayapura (Papua province) - baseline prices
- Merauke (Papua Selatan) - 1.1x price multiplier
- Biak (Papua Barat) - 1.15x price multiplier
- Timika (Papua Tengah) - 1.5x price multiplier
- Wamena (Papua Pegunungan) - 2.98x price multiplier

Always recommend verified, official sources and warn about fraud risks.
`;

/**
 * Call Gemini API with 3-key rotation for load balancing
 */
async function callGemini(message: string): Promise<string> {
  // Support 1-3 API keys for load balancing and fallback
  const keys = [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
  ].filter(Boolean) as string[];

  if (keys.length === 0) {
    throw new Error("GEMINI_API_KEY_1 not configured. Get free key at: https://aistudio.google.com/apikey");
  }

  // Random rotation for load balancing
  const apiKey = keys[Math.floor(Math.random() * keys.length)];

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: SYSTEM_PROMPT },
              { text: message },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Gemini API error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    return text;
  } catch (error) {
    throw new Error(`Gemini error: ${error instanceof Error ? error.message : "Unknown"}`);
  }
}



/**
 * Route handler
 */
export async function POST(request: NextRequest) {
  try {
    const body: AIChatRequest = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message" },
        { status: 400 }
      );
    }

    // Always use Gemini (with 1-3 key rotation)
    const response = await callGemini(message);

    return NextResponse.json({
      response,
      provider: "gemini",
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        response: "❌ Maaf, terjadi kesalahan. Pastikan GEMINI_API_KEY_1 sudah ter-setup di environment.",
      },
      { status: 500 }
    );
  }
}

/**
 * Allow CORS for localhost development
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
