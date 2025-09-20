"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Camera, MessageSquare, Calendar, TrendingUp, Heart, BookOpen, Settings, Bell, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for dashboard
const engagementData = [
  { month: "Jan", posts: 12, likes: 340, shares: 45, comments: 67 },
  { month: "Feb", posts: 15, likes: 420, shares: 62, comments: 89 },
  { month: "Mar", posts: 18, likes: 580, shares: 78, comments: 124 },
  { month: "Apr", posts: 22, likes: 720, shares: 95, comments: 156 },
  { month: "May", posts: 25, likes: 890, shares: 112, comments: 198 },
  { month: "Jun", posts: 28, likes: 1050, shares: 134, comments: 234 },
]

const platformData = [
  { name: "Instagram", value: 45, color: "#E4405F" },
  { name: "Facebook", value: 30, color: "#1877F2" },
  { name: "Twitter", value: 15, color: "#1DA1F2" },
  { name: "Website", value: 10, color: "#10B981" },
]

const recentActivities = [
  { type: "story", title: "Generated story for Ceramic Vase", time: "2 hours ago", status: "completed" },
  { type: "photo", title: "Analyzed product photos", time: "5 hours ago", status: "completed" },
  { type: "social", title: "Created Instagram content series", time: "1 day ago", status: "completed" },
  { type: "calendar", title: "Generated monthly content calendar", time: "2 days ago", status: "completed" },
]

const quickStats = [
  { label: "Stories Generated", value: 24, change: "+12%", icon: BookOpen },
  { label: "Photos Analyzed", value: 18, change: "+8%", icon: Camera },
  { label: "Social Posts Created", value: 45, change: "+23%", icon: MessageSquare },
  { label: "Engagement Rate", value: "4.2%", change: "+0.8%", icon: Heart },
]

export default function ArtisanDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Artisan Dashboard</h1>
          <p className="text-muted-foreground">Manage your digital presence and AI tools</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change} from last month</p>
                  </div>
                  <Icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* AI Tools Quick Access */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI Tools</CardTitle>
            <CardDescription>Quick access to your AI-powered marketing tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/story-generator">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Story Generator</h3>
                        <p className="text-sm text-muted-foreground">Create compelling craft narratives</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/photo-assistant">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Camera className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Photo Assistant</h3>
                        <p className="text-sm text-muted-foreground">AI-powered photo enhancement</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/social-content">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Social Content</h3>
                        <p className="text-sm text-muted-foreground">Generate posts and captions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Card className="cursor-pointer hover:shadow-md transition-shadow opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <TrendingUp className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-muted-foreground">Market Intelligence</h3>
                      <p className="text-sm text-muted-foreground">Coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest AI tool usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  {activity.type === "story" && <BookOpen className="h-4 w-4 text-green-600" />}
                  {activity.type === "photo" && <Camera className="h-4 w-4 text-green-600" />}
                  {activity.type === "social" && <MessageSquare className="h-4 w-4 text-green-600" />}
                  {activity.type === "calendar" && <Calendar className="h-4 w-4 text-green-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {activity.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <Tabs defaultValue="engagement" className="w-full">
        <TabsList>
          <TabsTrigger value="engagement">Engagement Analytics</TabsTrigger>
          <TabsTrigger value="platforms">Platform Distribution</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
              <CardDescription>Track your social media performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="likes" stroke="#E4405F" strokeWidth={2} />
                    <Line type="monotone" dataKey="comments" stroke="#1877F2" strokeWidth={2} />
                    <Line type="monotone" dataKey="shares" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Where your audience engages most</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>Engagement rates by platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {platformData.map((platform, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{platform.name}</span>
                      <span className="text-sm text-muted-foreground">{platform.value}%</span>
                    </div>
                    <Progress value={platform.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>Monthly content creation and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="posts" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
          <CardDescription>Complete your artisan profile to maximize AI tool effectiveness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Profile Completion</span>
              <span className="text-sm text-muted-foreground">75%</span>
            </div>
            <Progress value={75} className="h-2" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Basic Info Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Craft Details Added</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Portfolio Images Needed</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-4 bg-transparent">
              <Plus className="mr-2 h-4 w-4" />
              Complete Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
