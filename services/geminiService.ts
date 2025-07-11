
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';

if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set. Using a mock response.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "mock_key" });

const recommendationSchema = {
    type: Type.OBJECT,
    properties: {
        recommended_products: {
            type: Type.ARRAY,
            description: "An array of products that match the user's query.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: {
                        type: Type.INTEGER,
                        description: "The unique ID of the recommended product."
                    }
                },
                required: ["id"],
            },
        },
    },
    required: ["recommended_products"],
};

const getProductContext = (products: Product[]): string => {
    return products.map(p => 
        `ID: ${p.id}, Nombre: ${p.name}, Descripción: ${p.description}, Categoría: ${p.category}`
    ).join('\n');
};

export const getRecommendedProductIds = async (query: string, allProducts: Product[]): Promise<number[]> => {
    if (!process.env.API_KEY) {
        // Mock logic for environments without an API key
        console.warn("Using mock recommendation logic.");
        if (query.toLowerCase().includes('dulce')) {
            return [1, 2];
        }
        if (query.toLowerCase().includes('salado') || query.toLowerCase().includes('picada')) {
            return [3, 4, 9];
        }
        if (query.toLowerCase().includes('bajas en calorías') || query.toLowerCase().includes('saludable')) {
            return [5, 6, 10];
        }
        if (query.toLowerCase().includes('asado')) {
            return [7, 8];
        }
        // Return a random subset if no match
        return allProducts.map(p => p.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    }
    
    const productContext = getProductContext(allProducts);
    const prompt = `
      Eres un asistente de recomendaciones de comida para un marketplace online. Tu objetivo es sugerir platos de nuestro inventario basándote en la solicitud del usuario.
      
      INVENTARIO DISPONIBLE:
      ${productContext}
      
      SOLICITUD DEL USUARIO:
      "${query}"
      
      Basado en la solicitud del usuario, analiza el inventario y devuelve una lista de los IDs de los productos más relevantes en formato JSON. Solo devuelve productos del inventario.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recommendationSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);

        if (result && result.recommended_products && Array.isArray(result.recommended_products)) {
            return result.recommended_products.map((p: { id: number }) => p.id);
        }

        console.error("Unexpected JSON structure from API:", result);
        return [];
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("No pudimos obtener recomendaciones. Inténtalo de nuevo.");
    }
};
