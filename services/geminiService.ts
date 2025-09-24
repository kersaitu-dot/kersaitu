import { GoogleGenAI, Modality, SafetyRating } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function editImage(
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<{ image: string | null; safetyRatings: SafetyRating[] | undefined; textResponse: string | null }> {
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

    let image: string | null = null;
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        image = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        break;
      }
    }

    const textResponse = response.text;
    const safetyRatings = response.candidates?.[0]?.safetyRatings;

    if (!image && textResponse) {
        console.warn(`Model returned a text response instead of an image: ${textResponse}`);
    }

    return { image, safetyRatings, textResponse };

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Gagal berkomunikasi dengan API. Silakan coba lagi.');
  }
}
