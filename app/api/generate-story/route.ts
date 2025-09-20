import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { craftType, region, artisanName, personalDetails, targetAudience, tone } = await req.json()

  const prompt = `Create an engaging story about ${artisanName}, a skilled ${craftType} artisan from ${region}. 

Personal details: ${personalDetails}

Include:
- Traditional techniques used in ${craftType}
- Cultural significance of the craft in ${region}
- Personal journey and passion for the craft
- Unique selling points of their work
- Connection to heritage and community

Target audience: ${targetAudience}
Tone: ${tone}

Keep it conversational, authentic, and culturally respectful. The story should be 200-300 words and suitable for sharing on social media or marketplace listings.`

  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),  // Updated model ID
      prompt,
      maxOutputTokens: 500,
      temperature: 0.7,
    })

    return Response.json({ story: text })
  } catch (error) {
    console.error("Story generation error:", error)
    return Response.json({ error: "Failed to generate story" }, { status: 500 })
  }
}
