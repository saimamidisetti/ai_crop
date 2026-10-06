const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const getAdvisoryFromGemini = async (cropData) => {
  const prompt = `
You are CropCare AI, a responsible agricultural advisory assistant.

Provide educational and practical crop-care guidance based on the information provided.

Analyze the crop, growth stage, location, and symptoms.

Crop Name: ${cropData.cropName}
Growth Stage: ${cropData.growthStage}
Location: ${cropData.location}
Weather Condition: ${cropData.weatherCondition || 'Not specified'}
Soil Type: ${cropData.soilType || 'Not specified'}
Problem Description: ${cropData.problemDescription}
Additional Information: ${cropData.additionalInformation || 'None'}

Provide:
1. Problem analysis
2. Possible causes
3. Recommended actions
4. Prevention tips
5. Important warning

Do not claim certainty when information is insufficient.
Do not claim to have physically inspected the crop.
Do not guarantee crop recovery.
Avoid unsafe chemical recommendations.
When discussing pesticides or chemicals, advise users to follow local agricultural authority guidance and product labels.
Return only valid JSON.

Gemini response must follow exactly:
{
  "analysis": "string",
  "possibleCauses": [
    "string"
  ],
  "recommendedActions": [
    "string"
  ],
  "preventionTips": [
    "string"
  ],
  "warning": "string"
}

Do not return Markdown or code fences.
`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });
    
    const text = response.text;
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error('Failed to generate AI advisory');
  }
};

module.exports = { getAdvisoryFromGemini };
