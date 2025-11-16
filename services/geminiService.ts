import { GoogleGenAI, Type } from "@google/genai";

// The fileToBase64 function is removed as it relies on the Web FileReader API.
// In React Native, a library like react-native-image-picker or expo-image-picker
// can provide the base64 string directly.

export const generateClothingTags = async (base64Image: string, mimeType: string): Promise<{ category: string; color: string; style_tags: string[]; estimatedPrice: number; }> => {
    try {
        // 【已修改】讀取 Expo 的環境變數 (必須以 EXPO_PUBLIC_ 開頭)
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("API_KEY environment variable is not set in .env file.");
        }
        // 【已修改】使用變數初始化
        const ai = new GoogleGenAI({ apiKey: apiKey });

        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: mimeType,
            },
        };

        const textPart = {
            text: "您是一位時尚專家AI。請分析這張衣物圖片。識別它的類別（例如：T恤、牛仔褲、連身裙、外套），主要顏色，並提供3-5個相關的風格標籤（例如：Y2K、Gorpcore、街頭風、極簡風、復古風、波西米亞風、簡約風），並預估一個合理的二手市場價格（以新台幣 TWD 為單位，僅提供數字）。請僅用符合所提供 schema 的 JSON 物件進行回覆。",
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        category: { type: Type.STRING, description: "The category of the clothing item." },
                        color: { type: Type.STRING, description: "The primary color of the item." },
                        style_tags: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "An array of 3-5 style tags."
                        },
                        estimatedPrice: { type: Type.NUMBER, description: "The estimated secondhand price in TWD." }
                    },
                    required: ["category", "color", "style_tags", "estimatedPrice"],
                },
            },
        });
        
        const jsonString = response.text;
        const parsedJson = JSON.parse(jsonString);
        return parsedJson;

    } catch (error) {
        console.error("Error generating clothing tags:", error);
        throw new Error("AI圖片分析失敗，請重試。");
    }
};