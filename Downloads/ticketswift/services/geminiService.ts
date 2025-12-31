
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { Message, GroundingLink } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  private initChat() {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });
  }

  async sendMessageStream(
    message: string,
    onChunk: (text: string) => void,
    onComplete: (fullText: string, links?: GroundingLink[]) => void
  ) {
    if (!this.chat) {
      this.initChat();
    }

    try {
      const result = await this.chat!.sendMessageStream({ message });
      let fullText = '';
      let groundingLinks: GroundingLink[] = [];

      for await (const chunk of result) {
        const textChunk = chunk.text || '';
        fullText += textChunk;
        onChunk(fullText);

        // Check for grounding metadata in the response
        const candidate = chunk.candidates?.[0];
        if (candidate?.groundingMetadata?.groundingChunks) {
          const chunks = candidate.groundingMetadata.groundingChunks;
          groundingLinks = chunks
            .filter((c: any) => c.web)
            .map((c: any) => ({
              title: c.web.title || 'Source',
              uri: c.web.uri
            }));
        }
      }

      onComplete(fullText, groundingLinks.length > 0 ? groundingLinks : undefined);
    } catch (error) {
      console.error("Gemini API Error:", error);
      onComplete("I apologize, but I encountered an error while processing your request. Please try again or contact our human support team if the issue persists.", []);
    }
  }

  resetChat() {
    this.initChat();
  }
}

export const geminiService = new GeminiService();
