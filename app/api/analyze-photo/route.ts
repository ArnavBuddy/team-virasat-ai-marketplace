import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { imageData, craftType, productType } = await req.json()

  const prompt = `Analyze this product photo for a ${craftType} artisan selling ${productType}. 

Provide specific suggestions for:
1. Composition improvements (rule of thirds, angles, framing)
2. Lighting recommendations (natural vs artificial, shadows, highlights)
3. Background suggestions (clean, culturally appropriate, professional)
4. Styling tips (props, arrangement, color coordination)
5. Technical improvements (focus, clarity, color balance)

Focus on making the product appealing to potential buyers while maintaining cultural authenticity. Provide 3-5 actionable suggestions in a friendly, helpful tone.`

  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image",
              image: imageData,
            },
          ],
        },
      ],
      maxOutputTokens: 600,
      temperature: 0.7,
    })

    return Response.json({ analysis: text })
  } catch (error) {
    console.error("Photo analysis error:", error)
    return Response.json({ error: "Failed to analyze photo" }, { status: 500 })
  }
}
