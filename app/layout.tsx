import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import Navigation from "@/components/navigation"
import ErrorBoundary from "@/components/error-boundary"
import LoadingSpinner from "@/components/loading-spinner"
import { Toaster } from "react-hot-toast"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "ArtisanAI - AI-Powered Marketplace Assistant",
  description: "Empowering Indian artisans with AI tools for digital marketing, storytelling, and business growth",
  generator: "v0.app",
  keywords: "artisan, AI, marketplace, crafts, India, digital marketing, storytelling",
  authors: [{ name: "ArtisanAI Team" }],
  openGraph: {
    title: "ArtisanAI - AI-Powered Marketplace Assistant",
    description: "Empowering Indian artisans with AI tools for digital marketing and storytelling",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner size="lg" text="Loading ArtisanAI..." />}>
            <Navigation />
            <main>{children}</main>
            <Toaster />
          </Suspense>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
