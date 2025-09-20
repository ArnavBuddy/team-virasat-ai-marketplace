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
  Instagram,
  Facebook,
  Twitter,
  Copy,
  Calendar,
  Hash,
  MessageSquare,
  Loader2,
  Sparkles,
  Clock,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const platforms = [
  { value: "instagram", label: "Instagram", icon: Instagram, color: "text-pink-600" },
  { value: "facebook", label: "Facebook", icon: Facebook, color: "text-blue-600" },
  { value: "twitter", label: "Twitter", icon: Twitter, color: "text-sky-500" },
]

const contentTypes = [
  { value: "caption", label: "Post Caption", icon: MessageSquare },
  { value: "story", label: "Story Post", icon: Clock },
  { value: "hashtags", label: "Hashtag Set", icon: Hash },
  { value: "content-series", label: "Content Series", icon: Calendar },
]

const tones = ["Professional", "Friendly", "Inspiring", "Educational", "Storytelling", "Promotional"]

const occasions = [
  "Diwali",
  "Holi",
  "Eid",
  "Christmas",
  "New Year",
  "Independence Day",
  "Product Launch",
  "Festival Season",
  "Wedding Season",
  "Custom",
]

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

export default function SocialContentGenerator() {
  const [formData, setFormData] = useState({
    platform: "",
    contentType: "",
    productName: "",
    craftType: "",
    region: "",
    tone: "",
    occasion: "",
    targetAudience: "",
    customPrompt: "",
  })

  const [calendarData, setCalendarData] = useState({
    timeframe: "monthly",
    postFrequency: "3-4 times per week",
    specialEvents: "",
  })

  const [generatedContent, setGeneratedContent] = useState("")
  const [generatedCalendar, setGeneratedCalendar] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingCalendar, setIsGeneratingCalendar] = useState(false)
  const { toast } = useToast()

  const generateContent = async () => {
    if (!formData.platform || !formData.contentType || !formData.craftType) {
      toast({
        title: "Missing Information",
        description: "Please fill in platform, content type, and craft type.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-social-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      setGeneratedContent(data.content)
      toast({
        title: "Content Generated!",
        description: "Your social media content is ready.",
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateCalendar = async () => {
    if (!formData.craftType || !formData.region) {
      toast({
        title: "Missing Information",
        description: "Please fill in craft type and region for calendar generation.",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingCalendar(true)
    try {
      const response = await fetch("/api/content-calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...calendarData,
          craftType: formData.craftType,
          region: formData.region,
        }),
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      setGeneratedCalendar(data.calendar)
      toast({
        title: "Calendar Generated!",
        description: "Your content calendar is ready.",
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate calendar. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingCalendar(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ title: "Copied!", description: "Content copied to clipboard." })
  }

  const selectedPlatform = platforms.find((p) => p.value === formData.platform)
  const selectedContentType = contentTypes.find((c) => c.value === formData.contentType)

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Social Media Content Generator</h1>
        <p className="text-muted-foreground">Create engaging social media content and plan your posting strategy</p>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">Content Generator</TabsTrigger>
          <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Content Form */}
            <Card>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
                <CardDescription>Specify your content requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Platform</Label>
                    <Select
                      value={formData.platform}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, platform: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((platform) => {
                          const Icon = platform.icon
                          return (
                            <SelectItem key={platform.value} value={platform.value}>
                              <div className="flex items-center gap-2">
                                <Icon className={`h-4 w-4 ${platform.color}`} />
                                {platform.label}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Content Type</Label>
                    <Select
                      value={formData.contentType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, contentType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypes.map((type) => {
                          const Icon = type.icon
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input
                    placeholder="e.g., Handwoven Silk Saree, Ceramic Vase"
                    value={formData.productName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, productName: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Craft Type</Label>
                    <Select
                      value={formData.craftType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, craftType: value }))}
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tone</Label>
                    <Select
                      value={formData.tone}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, tone: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((tone) => (
                          <SelectItem key={tone} value={tone}>
                            {tone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Occasion (Optional)</Label>
                    <Select
                      value={formData.occasion}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, occasion: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        {occasions.map((occasion) => (
                          <SelectItem key={occasion} value={occasion}>
                            {occasion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Input
                    placeholder="e.g., Art collectors, Young professionals, Tourists"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Additional Context (Optional)</Label>
                  <Textarea
                    placeholder="Any specific details, themes, or requirements..."
                    value={formData.customPrompt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, customPrompt: e.target.value }))}
                    rows={3}
                  />
                </div>

                <Button onClick={generateContent} disabled={isGenerating} className="w-full">
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedPlatform && <selectedPlatform.icon className={`h-5 w-5 ${selectedPlatform.color}`} />}
                  {selectedContentType && <selectedContentType.icon className="h-5 w-5" />}
                  Generated Content
                </CardTitle>
                <CardDescription>Your AI-generated social media content</CardDescription>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">{generatedContent}</pre>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="secondary">
                          <Sparkles className="mr-1 h-3 w-3" />
                          AI Generated
                        </Badge>
                        {selectedPlatform && (
                          <Badge variant="outline" className={selectedPlatform.color}>
                            {selectedPlatform.label}
                          </Badge>
                        )}
                      </div>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedContent)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Fill in the details and click "Generate Content" to create social media posts.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Calendar Form */}
            <Card>
              <CardHeader>
                <CardTitle>Content Calendar Settings</CardTitle>
                <CardDescription>Plan your social media posting strategy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Timeframe</Label>
                  <Select
                    value={calendarData.timeframe}
                    onValueChange={(value) => setCalendarData((prev) => ({ ...prev, timeframe: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Posting Frequency</Label>
                  <Select
                    value={calendarData.postFrequency}
                    onValueChange={(value) => setCalendarData((prev) => ({ ...prev, postFrequency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="3-4 times per week">3-4 times per week</SelectItem>
                      <SelectItem value="2-3 times per week">2-3 times per week</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Special Events (Optional)</Label>
                  <Textarea
                    placeholder="Mention any festivals, product launches, or special occasions to include..."
                    value={calendarData.specialEvents}
                    onChange={(e) => setCalendarData((prev) => ({ ...prev, specialEvents: e.target.value }))}
                    rows={3}
                  />
                </div>

                <Button onClick={generateCalendar} disabled={isGeneratingCalendar} className="w-full">
                  {isGeneratingCalendar ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Calendar...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Generate Calendar
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Content Calendar</CardTitle>
                <CardDescription>Your personalized posting schedule</CardDescription>
              </CardHeader>
              <CardContent>
                {generatedCalendar ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg max-h-96 overflow-y-auto">
                      <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">{generatedCalendar}</pre>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        <Calendar className="mr-1 h-3 w-3" />
                        {calendarData.timeframe} Plan
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedCalendar)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Calendar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Configure your settings and generate a content calendar for strategic posting.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
