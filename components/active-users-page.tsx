"use client"

import { useState } from "react"
import {
  Users,
  FileText,
  Clock,
  Calendar,
  MoreHorizontal,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UserActivity {
  id: string
  name: string
  email: string
  avatarUrl?: string
  status: "online" | "idle" | "offline"
  lastActive: string
  duration: string
  activity: string
  documents: number
}

export function ActiveUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeFilter, setTimeFilter] = useState("today")

  // Sample data
  const activeUsers: UserActivity[] = [
    {
      id: "1",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatarUrl: "/placeholder.svg",
      status: "online",
      lastActive: "Just now",
      duration: "2h 15m",
      activity: "Editing Annual Report 2024.pdf",
      documents: 3,
    },
    {
      id: "2",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      avatarUrl: "/placeholder.svg",
      status: "online",
      lastActive: "2 minutes ago",
      duration: "45m",
      activity: "Viewing Project Presentation.pptx",
      documents: 1,
    },
    {
      id: "3",
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      avatarUrl: "/placeholder.svg",
      status: "idle",
      lastActive: "15 minutes ago",
      duration: "1h 30m",
      activity: "Uploaded Meeting Recording.mp4",
      documents: 2,
    },
    {
      id: "4",
      name: "David Miller",
      email: "david.miller@example.com",
      avatarUrl: "/placeholder.svg",
      status: "online",
      lastActive: "5 minutes ago",
      duration: "3h 10m",
      activity: "Shared Product Photos.zip",
      documents: 5,
    },
    {
      id: "5",
      name: "Lisa Taylor",
      email: "lisa.taylor@example.com",
      avatarUrl: "/placeholder.svg",
      status: "offline",
      lastActive: "1 hour ago",
      duration: "45m",
      activity: "Downloaded Company Podcast.mp3",
      documents: 1,
    },
  ]

  const filteredUsers = activeUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.activity.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  // Stats for the cards
  const stats = {
    activeUsers: 12,
    activeUsersChange: 3,
    documentsViewed: 47,
    documentsViewedChange: -5,
    averageSessionTime: "28m",
    averageSessionTimeChange: 4,
    totalSessions: 86,
    totalSessionsChange: 12,
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Active Users</h1>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {stats.activeUsersChange > 0 ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={stats.activeUsersChange > 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(stats.activeUsersChange)}
                </span>
                &nbsp;since yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents Viewed</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.documentsViewed}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {stats.documentsViewedChange > 0 ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={stats.documentsViewedChange > 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(stats.documentsViewedChange)}
                </span>
                &nbsp;since yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageSessionTime}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {stats.averageSessionTimeChange > 0 ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={stats.averageSessionTimeChange > 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(stats.averageSessionTimeChange)}
                </span>
                &nbsp;since yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSessions}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {stats.totalSessionsChange > 0 ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={stats.totalSessionsChange > 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(stats.totalSessionsChange)}
                </span>
                &nbsp;since yesterday
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Charts */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Documents
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Activity Overview</CardTitle>
                <CardDescription>
                  User activity across the platform for{" "}
                  {timeFilter === "today"
                    ? "today"
                    : timeFilter === "yesterday"
                      ? "yesterday"
                      : timeFilter === "week"
                        ? "this week"
                        : "this month"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] flex items-end justify-between gap-2 pt-6">
                  {[40, 25, 60, 75, 45, 65, 80].map((height, i) => (
                    <div key={i} className="relative w-full">
                      <div className="bg-primary/90 rounded-md w-full" style={{ height: `${height}%` }}></div>
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                        {timeFilter === "today" || timeFilter === "yesterday"
                          ? `${i + 9}${i + 9 < 12 ? "am" : i + 9 === 12 ? "pm" : i + 9 - 12 + "pm"}`
                          : timeFilter === "week"
                            ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]
                            : ["W1", "W2", "W3", "W4", "W5", "W6", "W7"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Activity Timeline</CardTitle>
                <CardDescription>Activity trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Activity timeline chart would be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Interactions</CardTitle>
                <CardDescription>Most viewed and edited documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Document interactions chart would be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Active Users Table */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users or activities..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Currently Active Users</CardTitle>
              <CardDescription>Users who have been active in the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Session Duration</TableHead>
                    <TableHead>Current Activity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No active users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatarUrl} alt={user.name} />
                              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${getStatusColor(user.status)}`}></span>
                            <span className="capitalize">{user.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell>{user.duration}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {user.documents} docs
                            </Badge>
                            <span className="text-sm truncate max-w-[150px]">{user.activity}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>View Activity</DropdownMenuItem>
                              <DropdownMenuItem>Send Message</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

