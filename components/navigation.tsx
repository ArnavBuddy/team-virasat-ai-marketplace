"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, LayoutDashboard, BookOpen, Camera, MessageSquare, TrendingUp, User, Settings } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Story Generator", href: "/story-generator", icon: BookOpen },
  { name: "Photo Assistant", href: "/photo-assistant", icon: Camera },
  { name: "Social Content", href: "/social-content", icon: MessageSquare },
  { name: "Market Intelligence", href: "/market-intelligence", icon: TrendingUp },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-primary">
              ArtisanAI
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      disabled={item.disabled}
                      className={cn(
                        "flex items-center gap-2",
                        isActive && "bg-secondary",
                        item.disabled && "opacity-50 cursor-not-allowed",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
