import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { platform, contentType, productName, craftType, region, tone, occasion, targetAudience, customPrompt } =
    await req.json()

  let prompt = ""

  if (contentType === "caption") {
    prompt = `Create an engaging ${platform} caption for a ${craftType} artisan from ${region} showcasing their ${productName}.

Platform: ${platform}
Tone: ${tone}
Target Audience: ${targetAudience}
${occasion ? `Occasion: ${occasion}` : ""}

Requirements:
- Include relevant hashtags (8-15 for Instagram, 3-5 for Facebook, 2-3 for Twitter)
- Mention cultural significance and craftsmanship
- Include a call-to-action
- Keep within platform character limits
- Make it authentic and engaging
${customPrompt ? `Additional context: ${customPrompt}` : ""}

Format the response with the caption text followed by hashtags on separate lines.`
  } else if (contentType === "story") {
    prompt = `Create a compelling social media story post for a ${craftType} artisan from ${region}.

Product: ${productName}
Platform: ${platform}
Tone: ${tone}

Create a short, engaging story (1-2 sentences) that would work well as an Instagram/Facebook story with an image. Focus on the craft process, cultural heritage, or artisan's passion.`
  } else if (contentType === "hashtags") {
    prompt = `Generate relevant hashtags for a ${craftType} artisan from ${region} posting about ${productName} on ${platform}.

Include:
- Craft-specific hashtags
- Regional/cultural hashtags  
- Product-specific hashtags
- General artisan/handmade hashtags
- Trending relevant hashtags

Provide 15-20 hashtags total, mix of popular and niche tags.`
  } else if (contentType === "content-series") {
    prompt = `Create a 5-post content series for a ${craftType} artisan from ${region} to showcase their ${productName} and craft process.

Each post should have:
- A compelling caption (2-3 sentences)
- 5-8 relevant hashtags
- A clear theme/focus

Series themes:
1. Behind the scenes - craft process
2. Cultural heritage and tradition
3. Product showcase and details
4. Artisan's personal story
5. Customer testimonial/usage

Tone: ${tone}
Platform: ${platform}`
  }

  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
      maxOutputTokens: 800,
      temperature: 0.7,
    })

    return Response.json({ content: text })
  } catch (error) {
    console.error("Social content generation error:", error)
    return Response.json({ error: "Failed to generate social content" }, { status: 500 })
  }
}
