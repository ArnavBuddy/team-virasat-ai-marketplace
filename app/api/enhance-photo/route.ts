import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { imageData, enhancementType } = await req.json()

  let prompt = ""

  switch (enhancementType) {
    case "lighting":
      prompt =
        "Analyze the lighting in this product photo and provide specific recommendations to improve brightness, contrast, and shadow balance for better product visibility."
      break
    case "composition":
      prompt =
        "Evaluate the composition of this product photo and suggest improvements for better visual appeal, including positioning, angles, and framing."
      break
    case "background":
      prompt =
        "Assess the background in this product photo and recommend improvements or alternatives that would make the product stand out better."
      break
    case "overall":
      prompt =
        "Provide a comprehensive analysis of this product photo with actionable suggestions for overall improvement including lighting, composition, styling, and technical quality."
      break
    default:
      prompt = "Analyze this product photo and provide general enhancement suggestions."
  }

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
      maxOutputTokens: 400,
      temperature: 0.6,
    })

    return Response.json({ suggestions: text })
  } catch (error) {
    console.error("Photo enhancement error:", error)
    return Response.json({ error: "Failed to generate enhancement suggestions" }, { status: 500 })
  }
}
