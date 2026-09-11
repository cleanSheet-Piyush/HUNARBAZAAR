/**
 * Gemini AI client for HUNARBAZAAR — simple, clean, reliable.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const MODEL = "gemini-3.5-flash-lite";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_INSTRUCTION = `You are HUNARBAZAAR AI, the 24/7 support assistant for HUNARBAZAAR — India's artisan marketplace connecting rural craftspeople directly with buyers.

Platform facts:
- Zero commission: 100% payment goes to artisan's bank directly.
- Delivery: 2-4 business days, insured express courier from artisan clusters.
- 7-day damage/authenticity replacement. COD (Cash on Delivery) available.
- Artisans can register and speak in Hindi/regional language via voice cataloging — AI auto-creates listings.
- Products: GI-tagged handicrafts (Madhubani, Pattachitra, Warli, Gond, Sambalpuri Handloom, etc.)
- Helpline: +91 6207443800 | support@hunarbazaar.com

Rules:
- Always give COMPLETE answers. Never cut off mid-sentence.
- Be warm and helpful (3-5 complete sentences).
- Give clear steps when relevant.
- If query is in Hindi or Hinglish, reply in friendly Hindi/Hinglish.
- No markdown symbols (no **, ##). Plain readable text only.`;

/**
 * Send a message to Gemini and return the reply.
 * @param {string} userMessage
 * @param {string} language - "hi" | "en"
 * @param {string} role - "artisan" | "buyer"
 * @param {AbortSignal} signal
 * @returns {Promise<string>}
 */
export async function askGemini(userMessage, language = "en", role = "buyer", signal) {
  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
      contents: [{
        role: "user",
        parts: [{ text: `User role: ${role}. ${language === "hi" ? "Reply in Hindi/Hinglish." : "Reply in English."}\n\nQuestion: ${userMessage}` }]
      }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 600,
        candidateCount: 1,
      }
    }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${resp.status}`);
  }

  const data = await resp.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error("Empty response from Gemini");
  return text;
}
