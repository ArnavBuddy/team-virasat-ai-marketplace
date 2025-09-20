"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Copy, Download, Share2 } from "lucide-react"
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

const tones = [
  { value: "warm", label: "Warm & Personal" },
  { value: "professional", label: "Professional" },
  { value: "inspiring", label: "Inspiring" },
  { value: "traditional", label: "Traditional" },
  { value: "modern", label: "Modern & Contemporary" },
]

const audiences = [
  { value: "collectors", label: "Art Collectors" },
  { value: "tourists", label: "Tourists & Travelers" },
  { value: "general", label: "General Public" },
  { value: "cultural", label: "Cultural Enthusiasts" },
  { value: "young", label: "Young Professionals" },
]

export default function StoryGenerator() {
  const [formData, setFormData] = useState({
    artisanName: "",
    craftType: "",
    region: "",
    personalDetails: "",
    targetAudience: "",
    tone: "",
  })
  const [generatedStory, setGeneratedStory] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!formData.artisanName || !formData.craftType || !formData.region) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the artisan name, craft type, and region.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      setGeneratedStory(data.story)
      toast({
        title: "Story Generated!",
        description: "Your artisan story has been created successfully.",
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate story. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedStory)
    toast({ title: "Copied!", description: "Story copied to clipboard." })
  }

  const downloadStory = () => {
    const blob = new Blob([generatedStory], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${formData.artisanName}-story.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">AI Story Generator</h1>
        <p className="text-muted-foreground">Create compelling narratives for artisan profiles and product listings</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Artisan Details</CardTitle>
            <CardDescription>Provide information about the artisan and their craft</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="artisanName">Artisan Name *</Label>
              <Input
                id="artisanName"
                placeholder="Enter artisan's name"
                value={formData.artisanName}
                onChange={(e) => setFormData((prev) => ({ ...prev, artisanName: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="craftType">Craft Type *</Label>
              <Select
                value={formData.craftType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, craftType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select craft type" />
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
              <Label htmlFor="region">Region *</Label>
              <Select
                value={formData.region}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, region: value }))}
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

            <div className="space-y-2">
              <Label htmlFor="personalDetails">Personal Details</Label>
              <Textarea
                id="personalDetails"
                placeholder="Share personal journey, family traditions, inspiration, or unique techniques..."
                value={formData.personalDetails}
                onChange={(e) => setFormData((prev) => ({ ...prev, personalDetails: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Select
                value={formData.targetAudience}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, targetAudience: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  {audiences.map((audience) => (
                    <SelectItem key={audience.value} value={audience.value}>
                      {audience.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Story Tone</Label>
              <Select
                value={formData.tone}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, tone: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select story tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((tone) => (
                    <SelectItem key={tone.value} value={tone.value}>
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Story...
                </>
              ) : (
                "Generate Story"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Story */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Story</CardTitle>
            <CardDescription>Your AI-generated artisan story will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            {generatedStory ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{generatedStory}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadStory}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Fill in the artisan details and click "Generate Story" to create a compelling narrative.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
