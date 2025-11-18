// services/geminiService.ts

import { GoogleGenAI, Type } from "@google/genai";
import Constants from 'expo-constants'; // 👈 關鍵：匯入 Constants

/**
 * 讀取我們在 app.config.js 'extra' 欄位中設定的環境變數
 */
const getEnvVariable = (varName: string): string => {
    // 檢查 app.config.js 的 "extra" 欄位
    const key = Constants.expoConfig?.extra?.[varName];

    if (typeof key === 'string') {
        return key;
    }
    
    // 如果找不到，拋出一個明確的錯誤
    throw new Error(`環境變數 ${varName} 未在 app.config.js 的 'extra' 欄位中設定。`);
};

export const generateClothingTags = async (base64Image: string, mimeType: string): Promise<{ category: string; color: string; style_tags: string[]; estimatedPrice: number; }> => {
    
    try {
        // 👇 關鍵：使用 Constants 讀取金鑰，而不是 process.env
        const apiKey = getEnvVariable('EXPO_PUBLIC_GEMINI_API_KEY');

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
            model: "gemini-2.5-flash-lite",
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
        // 拋出原始錯誤，這樣我們才能在 Alert 中看到它
        throw error; 
    }
};