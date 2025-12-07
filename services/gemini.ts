import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

export const getAIClient = (): GoogleGenAI => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const createChatSession = (): Chat => {
  const client = getAIClient();
  return client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are an expert Docusaurus consultant and React engineer. 
      Your goal is to help users install, configure, and customize Docusaurus websites.
      
      Guidelines:
      1. Provide clear, copy-pasteable code snippets (bash for commands, JS/TS for config).
      2. Explain complex concepts like 'swizzling' or 'versioning' simply.
      3. If the user asks about specific plugins, provide their npm install commands and config usage.
      4. Assume the user is using the latest Docusaurus version (3.x).
      5. Format responses using Markdown.`,
      thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster chat response
    },
  });
};

export const generateConfigExplanation = async (configJson: string): Promise<string> => {
    const client = getAIClient();
    try {
        const response: GenerateContentResponse = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Explain what this Docusaurus configuration does briefly and highlight any potential missing best practices: \n\n\`\`\`json\n${configJson}\n\`\`\``
        });
        return response.text || "Could not generate explanation.";
    } catch (error) {
        console.error("Error generating explanation:", error);
        return "Failed to analyze configuration.";
    }
}
