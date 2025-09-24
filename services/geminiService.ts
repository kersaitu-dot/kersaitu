import { GoogleGenAI, Modality, SafetyRating, FinishReason } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function editImage(
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<{ image: string; safetyRatings: SafetyRating[] | undefined; textResponse: string | null }> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    const candidate = response.candidates?.[0];
    if (!candidate) {
        throw new Error("API tidak memberikan respons yang valid.");
    }

    let image: string | null = null;
    for (const part of candidate.content?.parts || []) {
      if (part.inlineData) {
        image = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        break;
      }
    }

    const textResponse = response.text;
    const safetyRatings = candidate.safetyRatings;

    if (!image) {
      if (candidate.finishReason === FinishReason.SAFETY) {
        console.warn("Image generation blocked for safety reasons.", { safetyRatings });
        throw new Error("Gambar tidak dapat dibuat karena melanggar kebijakan keamanan. Coba prompt atau gambar yang berbeda.");
      }
      if (textResponse) {
        console.warn(`Model returned text instead of an image: ${textResponse}`);
        throw new Error(`Model gagal membuat gambar. Respons: ${textResponse}`);
      }
      throw new Error("Model gagal membuat gambar dan tidak memberikan penjelasan.");
    }

    return { image, safetyRatings, textResponse };

  } catch (error) {
    console.error('Error calling Gemini API:', error);

    if (error instanceof Error && (
        error.message.includes("kebijakan keamanan") ||
        error.message.includes("Model gagal membuat gambar") ||
        error.message.includes("respons yang valid")
    )) {
        throw error; // Re-throw our custom, user-friendly errors
    }

    // For other errors (network, API key, etc.), provide a more general message.
    throw new Error('Gagal berkomunikasi dengan API. Periksa koneksi internet Anda dan coba lagi.');
  }
}
