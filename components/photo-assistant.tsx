"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Loader2, Lightbulb, Eye, Palette, Sparkles } from "lucide-react"
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

const productTypes = [
  "Vase",
  "Bowl",
  "Jewelry",
  "Textile",
  "Sculpture",
  "Decorative Item",
  "Functional Item",
  "Art Piece",
  "Accessory",
  "Home Decor",
]

const enhancementTypes = [
  { value: "overall", label: "Overall Analysis", icon: Eye },
  { value: "lighting", label: "Lighting", icon: Lightbulb },
  { value: "composition", label: "Composition", icon: Camera },
  { value: "background", label: "Background", icon: Palette },
]

export default function PhotoAssistant() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [craftType, setCraftType] = useState("")
  const [productType, setProductType] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [suggestions, setSuggestions] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isEnhancing, setIsEnhancing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzePhoto = async () => {
    if (!selectedImage || !craftType || !productType) {
      toast({
        title: "Missing Information",
        description: "Please upload an image and select craft and product types.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageData: selectedImage,
          craftType,
          productType,
        }),
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      setAnalysis(data.analysis)
      toast({
        title: "Analysis Complete!",
        description: "Your photo has been analyzed successfully.",
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze photo. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const enhancePhoto = async (enhancementType: string) => {
    if (!selectedImage) {
      toast({
        title: "No Image",
        description: "Please upload an image first.",
        variant: "destructive",
      })
      return
    }

    setIsEnhancing(true)
    try {
      const response = await fetch("/api/enhance-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageData: selectedImage,
          enhancementType,
        }),
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      setSuggestions(data.suggestions)
      toast({
        title: "Enhancement Suggestions Ready!",
        description: "Specific improvement recommendations have been generated.",
      })
    } catch (error) {
      toast({
        title: "Enhancement Failed",
        description: "Failed to generate suggestions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsEnhancing(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Smart Photography Assistant</h1>
        <p className="text-muted-foreground">
          AI-powered photo analysis and enhancement suggestions for your craft products
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Image Upload */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Upload Product Photo</CardTitle>
            <CardDescription>Upload a photo of your craft product for analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="craftType">Craft Type</Label>
              <Select value={craftType} onValueChange={setCraftType}>
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
              <Label htmlFor="productType">Product Type</Label>
              <Select value={productType} onValueChange={setProductType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((product) => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Product Image</Label>
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedImage ? (
                  <div className="space-y-2">
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Selected product"
                      className="max-w-full h-48 object-contain mx-auto rounded"
                    />
                    <p className="text-sm text-muted-foreground">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload image</p>
                    <p className="text-xs text-muted-foreground">Max 5MB, JPG/PNG</p>
                  </div>
                )}
              </div>
              <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>

            <Button onClick={analyzePhoto} disabled={isAnalyzing || !selectedImage} className="w-full">
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Analyze Photo
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Analysis & Suggestions</CardTitle>
            <CardDescription>AI-powered recommendations to improve your product photos</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="analysis">Full Analysis</TabsTrigger>
                <TabsTrigger value="enhance">Quick Enhance</TabsTrigger>
              </TabsList>

              <TabsContent value="analysis" className="space-y-4">
                {analysis ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Photo Analysis Results</h4>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{analysis}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">
                        <Sparkles className="mr-1 h-3 w-3" />
                        AI Generated
                      </Badge>
                      <Badge variant="outline">Professional Tips</Badge>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Camera className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Upload a photo and click "Analyze Photo" to get detailed improvement suggestions.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="enhance" className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {enhancementTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <Button
                        key={type.value}
                        variant="outline"
                        onClick={() => enhancePhoto(type.value)}
                        disabled={isEnhancing || !selectedImage}
                        className="h-auto p-4 flex flex-col items-center gap-2"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm">{type.label}</span>
                      </Button>
                    )
                  })}
                </div>

                {suggestions && (
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Enhancement Suggestions</h4>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{suggestions}</p>
                  </div>
                )}

                {isEnhancing && (
                  <div className="text-center py-8">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground mt-2">Generating enhancement suggestions...</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
