import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { craftType, region, timeframe, postFrequency, specialEvents } = await req.json()

  const prompt = `Create a ${timeframe} social media content calendar for a ${craftType} artisan from ${region}.

Posting frequency: ${postFrequency}
${specialEvents ? `Special events to include: ${specialEvents}` : ""}

For each post, provide:
- Date/timing suggestion
- Content type (product showcase, process video, story, educational, etc.)
- Brief description
- Platform recommendation (Instagram, Facebook, Twitter)
- Suggested hashtags (3-5 key ones)

Include variety:
- Product showcases (40%)
- Behind-the-scenes/process (25%)
- Cultural/educational content (20%)
- Personal stories/testimonials (10%)
- Seasonal/festival content (5%)

Consider optimal posting times and cultural festivals/seasons relevant to ${region}.`

  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
      maxOutputTokens: 1000,
      temperature: 0.6,
    })

    return Response.json({ calendar: text })
  } catch (error) {
    console.error("Content calendar generation error:", error)
    return Response.json({ error: "Failed to generate content calendar" }, { status: 500 })
  }
}
