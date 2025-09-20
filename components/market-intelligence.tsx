"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  DollarSign,
  Target,
  Users,
  BarChart3,
  PieChart,
  Loader2,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Copy,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const craftTypes = [
  "Pottery",
  "Weaving",
  "Woodcarving",
  "Metalwork",
  "Jewelry Making",
  "Embroidery",
  "Block Printing",
  "Leather Work",
  "Stone Carving",
  "Painting",
]

const regions = [
  "Rajasthan",
  "Gujarat",
  "Punjab",
  "Kerala",
  "Tamil Nadu",
  "Karnataka",
  "Maharashtra",
  "West Bengal",
  "Odisha",
  "Uttar Pradesh",
  "Madhya Pradesh",
]

const timeframes = [
  { value: "3months", label: "Last 3 Months" },
  { value: "6months", label: "Last 6 Months" },
  { value: "1year", label: "Last Year" },
  { value: "2years", label: "Last 2 Years" },
]

const analysisTypes = [
  { value: "trends", label: "Market Trends", icon: TrendingUp, description: "Current trends and patterns" },
  { value: "pricing", label: "Pricing Analysis", icon: DollarSign, description: "Price ranges and strategies" },
  { value: "opportunities", label: "Opportunities", icon: Target, description: "Growth and expansion areas" },
  { value: "competition", label: "Competition", icon: Users, description: "Competitive landscape" },
]

const skillLevels = ["Beginner", "Intermediate", "Advanced", "Master Craftsperson"]

export default function MarketIntelligence() {
  const [trendData, setTrendData] = useState({
    craftType: "",
    region: "",
    timeframe: "6months",
    analysisType: "trends",
  })

  const [pricingData, setPricingData] = useState({
    productName: "",
    craftType: "",
    materials: "",
    timeToMake: "",
    skillLevel: "",
    region: "",
    productSize: "",
    uniqueFeatures: "",
  })

  const [marketAnalysis, setMarketAnalysis] = useState("")
  const [pricingSuggestions, setPricingSuggestions] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isPricing, setIsPricing] = useState(false)
  const { toast } = useToast()

  const analyzeMarket = async () => {
    if (!trendData.craftType || !trendData.region) {
      toast({
        title: "Missing Information",
        description: "Please select craft type and region.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/market-trends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trendData),
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      setMarketAnalysis(data.analysis)
      toast({
        title: "Analysis Complete!",
        description: "Market intelligence report generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to generate market analysis. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generatePricing = async () => {
    if (!pricingData.productName || !pricingData.craftType || !pricingData.materials) {
      toast({
        title: "Missing Information",
        description: "Please fill in product name, craft type, and materials.",
        variant: "destructive",
      })
      return
    }

    setIsPricing(true)
    try {
      const response = await fetch("/api/pricing-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pricingData),
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      setPricingSuggestions(data.pricing)
      toast({
        title: "Pricing Analysis Complete!",
        description: "Pricing recommendations generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Pricing Analysis Failed",
        description: "Failed to generate pricing suggestions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPricing(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ title: "Copied!", description: "Analysis copied to clipboard." })
  }

  const selectedAnalysisType = analysisTypes.find((type) => type.value === trendData.analysisType)

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Market Intelligence</h1>
        <p className="text-muted-foreground">AI-powered market analysis and pricing insights for artisans</p>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trends">Market Analysis</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Intelligence</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Market Analysis Form */}
            <Card>
              <CardHeader>
                <CardTitle>Market Analysis Settings</CardTitle>
                <CardDescription>Configure your market intelligence analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Analysis Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {analysisTypes.map((type) => {
                      const Icon = type.icon
                      const isSelected = trendData.analysisType === type.value
                      return (
                        <Button
                          key={type.value}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTrendData((prev) => ({ ...prev, analysisType: type.value }))}
                          className="h-auto p-3 flex flex-col items-center gap-1"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-xs">{type.label}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Craft Type</Label>
                    <Select
                      value={trendData.craftType}
                      onValueChange={(value) => setTrendData((prev) => ({ ...prev, craftType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select craft" />
                      </SelectTrigger>
                      <SelectContent>
                        {craftTypes.map((craft) => (
                          <SelectItem key={craft} value={craft}>
                            {craft}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Region</Label>
                    <Select
                      value={trendData.region}
                      onValueChange={(value) => setTrendData((prev) => ({ ...prev, region: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Analysis Timeframe</Label>
                  <Select
                    value={trendData.timeframe}
                    onValueChange={(value) => setTrendData((prev) => ({ ...prev, timeframe: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeframes.map((timeframe) => (
                        <SelectItem key={timeframe.value} value={timeframe.value}>
                          {timeframe.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedAnalysisType && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <selectedAnalysisType.icon className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">{selectedAnalysisType.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{selectedAnalysisType.description}</p>
                  </div>
                )}

                <Button onClick={analyzeMarket} disabled={isAnalyzing} className="w-full">
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Market...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Generate Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Market Analysis Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedAnalysisType && <selectedAnalysisType.icon className="h-5 w-5 text-primary" />}
                  Market Intelligence Report
                </CardTitle>
                <CardDescription>AI-generated market insights and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                {marketAnalysis ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg max-h-96 overflow-y-auto">
                      <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">{marketAnalysis}</pre>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="secondary">
                          <Lightbulb className="mr-1 h-3 w-3" />
                          AI Insights
                        </Badge>
                        <Badge variant="outline">{selectedAnalysisType?.label}</Badge>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(marketAnalysis)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <TrendingUp className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Configure your analysis settings and generate market intelligence insights.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Pricing Form */}
            <Card>
              <CardHeader>
                <CardTitle>Product Pricing Analysis</CardTitle>
                <CardDescription>Get AI-powered pricing recommendations for your products</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input
                    placeholder="e.g., Handwoven Silk Saree, Ceramic Vase"
                    value={pricingData.productName}
                    onChange={(e) => setPricingData((prev) => ({ ...prev, productName: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Craft Type</Label>
                    <Select
                      value={pricingData.craftType}
                      onValueChange={(value) => setPricingData((prev) => ({ ...prev, craftType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select craft" />
                      </SelectTrigger>
                      <SelectContent>
                        {craftTypes.map((craft) => (
                          <SelectItem key={craft} value={craft}>
                            {craft}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Region</Label>
                    <Select
                      value={pricingData.region}
                      onValueChange={(value) => setPricingData((prev) => ({ ...prev, region: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Materials Used</Label>
                  <Textarea
                    placeholder="List materials, quality, source, etc."
                    value={pricingData.materials}
                    onChange={(e) => setPricingData((prev) => ({ ...prev, materials: e.target.value }))}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Time to Make</Label>
                    <Input
                      placeholder="e.g., 2 days, 1 week"
                      value={pricingData.timeToMake}
                      onChange={(e) => setPricingData((prev) => ({ ...prev, timeToMake: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Skill Level</Label>
                    <Select
                      value={pricingData.skillLevel}
                      onValueChange={(value) => setPricingData((prev) => ({ ...prev, skillLevel: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Product Size/Dimensions</Label>
                  <Input
                    placeholder="e.g., 12x8 inches, Large, Medium"
                    value={pricingData.productSize}
                    onChange={(e) => setPricingData((prev) => ({ ...prev, productSize: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Unique Features</Label>
                  <Textarea
                    placeholder="Special techniques, cultural significance, customization options..."
                    value={pricingData.uniqueFeatures}
                    onChange={(e) => setPricingData((prev) => ({ ...prev, uniqueFeatures: e.target.value }))}
                    rows={2}
                  />
                </div>

                <Button onClick={generatePricing} disabled={isPricing} className="w-full">
                  {isPricing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Pricing...
                    </>
                  ) : (
                    <>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Get Pricing Suggestions
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Pricing Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Pricing Recommendations
                </CardTitle>
                <CardDescription>AI-generated pricing analysis and suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                {pricingSuggestions ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg max-h-96 overflow-y-auto">
                      <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">{pricingSuggestions}</pre>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="secondary">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Pricing Analysis
                        </Badge>
                        <Badge variant="outline">AI Recommendations</Badge>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(pricingSuggestions)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <PieChart className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Fill in your product details to get personalized pricing recommendations.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Market Intelligence Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Trend Analysis</h4>
              <p className="text-xs text-muted-foreground">
                Use trend analysis to identify popular styles and adapt your products to market demand.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Pricing Strategy</h4>
              <p className="text-xs text-muted-foreground">
                Consider material costs, time investment, and skill level when setting prices.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Market Opportunities</h4>
              <p className="text-xs text-muted-foreground">
                Look for underserved segments and seasonal opportunities to expand your business.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
