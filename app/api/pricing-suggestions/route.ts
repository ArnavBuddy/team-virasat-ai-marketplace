import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { productName, craftType, materials, timeToMake, skillLevel, region, productSize, uniqueFeatures } =
    await req.json()

  const prompt = `Provide pricing recommendations for a ${craftType} product: ${productName}

Product Details:
- Materials used: ${materials}
- Time to make: ${timeToMake}
- Skill level required: ${skillLevel}
- Region: ${region}
- Size/dimensions: ${productSize}
- Unique features: ${uniqueFeatures}

Calculate and provide:
1. Cost breakdown (materials, labor, overhead)
2. Suggested retail price range
3. Wholesale pricing (if applicable)
4. Online marketplace pricing
5. Premium pricing justification
6. Competitive price comparison
7. Profit margin analysis

Consider local market conditions, material costs, and artisan skill premium. Provide both conservative and optimistic pricing scenarios.`

  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
      maxOutputTokens: 600,
      temperature: 0.5,
    })

    return Response.json({ pricing: text })
  } catch (error) {
    console.error("Pricing suggestion error:", error)
    return Response.json({ error: "Failed to generate pricing suggestions" }, { status: 500 })
  }
}
