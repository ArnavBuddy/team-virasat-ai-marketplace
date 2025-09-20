import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { craftType, region, timeframe, analysisType } = await req.json()

  let prompt = ""

  if (analysisType === "trends") {
    prompt = `Analyze current market trends for ${craftType} artisans in ${region} over the ${timeframe} timeframe.

Provide insights on:
1. Popular product categories and styles
2. Seasonal demand patterns
3. Emerging design trends
4. Customer preferences and demographics
5. Price range analysis
6. Competition landscape
7. Market opportunities

Focus on actionable insights that can help artisans adapt their products and marketing strategies.`
  } else if (analysisType === "pricing") {
    prompt = `Provide pricing analysis and recommendations for ${craftType} products in ${region}.

Include:
1. Average price ranges for different product categories
2. Factors affecting pricing (materials, complexity, size)
3. Competitive pricing strategies
4. Premium pricing opportunities
5. Seasonal pricing adjustments
6. Online vs offline pricing differences
7. Pricing recommendations for new artisans

Consider local market conditions and customer purchasing power.`
  } else if (analysisType === "opportunities") {
    prompt = `Identify market opportunities for ${craftType} artisans in ${region}.

Analyze:
1. Underserved market segments
2. Emerging customer needs
3. Seasonal opportunities
4. Export potential
5. Collaboration opportunities
6. Digital marketing gaps
7. Product innovation areas

Provide specific, actionable recommendations for business growth.`
  } else if (analysisType === "competition") {
    prompt = `Analyze the competitive landscape for ${craftType} artisans in ${region}.

Cover:
1. Key competitors and their strategies
2. Market positioning opportunities
3. Differentiation strategies
4. Pricing comparison
5. Marketing approach analysis
6. Strengths and weaknesses
7. Competitive advantages to leverage

Help artisans understand how to position themselves effectively.`
  }

  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
      maxOutputTokens: 1000,
      temperature: 0.6,
    })

    return Response.json({ analysis: text })
  } catch (error) {
    console.error("Market analysis error:", error)
    return Response.json({ error: "Failed to generate market analysis" }, { status: 500 })
  }
}
