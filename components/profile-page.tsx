"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  FileText,
  Clock,
  Upload,
  Pencil,
  Loader2,
  CheckCircle,
  AlertCircle,
  FileCheck,
  Eye,
} from "lucide-react"

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    department: "IT Department",
    location: "New York, USA",
    bio: "Senior system administrator with over 10 years of experience in document management systems and IT infrastructure.",
    joinDate: "January 15, 2020",
    avatarUrl: "/placeholder.svg",
  })

  // Mock activity data
  const recentActivity = [
    {
      id: 1,
      action: "Approved vehicle record",
      item: "Toyota Camry (ABC-123)",
      time: "Today at 10:30 AM",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    },
    {
      id: 2,
      action: "Added new document",
      item: "Q1 Financial Report 2024.pdf",
      time: "Yesterday at 3:45 PM",
      icon: <FileText className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 3,
      action: "Updated user permissions",
      item: "Sarah Williams",
      time: "Yesterday at 11:20 AM",
      icon: <Shield className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 4,
      action: "Flagged vehicle record for review",
      item: "Honda Accord (DEF-456)",
      time: "Feb 24, 2024 at 9:15 AM",
      icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
    },
    {
      id: 5,
      action: "Viewed document",
      item: "Vehicle Inspection Guidelines.docx",
      time: "Feb 23, 2024 at 2:30 PM",
      icon: <Eye className="h-4 w-4 text-gray-500" />,
    },
  ]

  // Mock statistics
  const statistics = [
    {
      title: "Documents Processed",
      value: "247",
      icon: <FileCheck className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Vehicles Inspected",
      value: "128",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Hours Active",
      value: "386",
      icon: <Clock className="h-5 w-5 text-purple-500" />,
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would typically send the data to your API
    console.log("Saving profile data:", userData)

    setIsSaving(false)
    setIsEditing(false)
  }

  const handleAvatarUpload = () => {
    // In a real application, this would open a file picker
    // and handle the image upload
    console.log("Avatar upload clicked")
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">My Profile</h1>

        {/* Profile Overview Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-2 border-border">
                    <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                    <AvatarFallback className="text-3xl">
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 rounded-full"
                      onClick={handleAvatarUpload}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="text-xs">
                    {userData.role}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveProfile} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  )}
                </div>

                {!isEditing ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span>{userData.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{userData.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Member since {userData.joinDate}</span>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">{userData.bio}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={userData.name} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          name="department"
                          value={userData.department}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" value={userData.location} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" value={userData.bio} onChange={handleInputChange} rows={3} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-3">
              {statistics.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">Lifetime total</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions and activities in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentActivity.map((activity, index) => (
                    <div key={activity.id} className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                          {activity.icon}
                        </div>
                        {index < recentActivity.length - 1 && <div className="w-0.5 bg-border grow my-2"></div>}
                      </div>
                      <div className="pt-2 pb-8">
                        <div className="flex flex-col">
                          <span className="font-medium">{activity.action}</span>
                          <span className="text-sm">{activity.item}</span>
                          <span className="text-xs text-muted-foreground mt-1">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>My Documents</CardTitle>
                <CardDescription>Documents you've created or modified recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No recent documents</h3>
                  <p className="text-sm max-w-md mx-auto">
                    You haven't created or modified any documents recently. Documents you work with will appear here.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create New Document</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

