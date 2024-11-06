'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Car, ActivitySquare, BarChart3, TrendingUp, TrendingDown } from 'lucide-react'
import Link from 'next/link'

// Mock data
const mockData = {
    totalUsers: 1250,
    activeUsers: 876,
    totalVehicles: 85,
    availableVehicles: 62,
    totalActivities: 3750,
    recentActivities: 120,
}

export default function Page() {
    const [data, setData] = useState(mockData)
    const [userProgress, setUserProgress] = useState(0)
    const [vehicleProgress, setVehicleProgress] = useState(0)

    useEffect(() => {
        setUserProgress((data.activeUsers / data.totalUsers) * 100)
        setVehicleProgress((data.availableVehicles / data.totalVehicles) * 100)
    }, [data])

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            {data.activeUsers} active users
                        </p>
                        <Progress value={userProgress} className="mt-2" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
                        <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.totalVehicles}</div>
                        <p className="text-xs text-muted-foreground">
                            {data.availableVehicles} available vehicles
                        </p>
                        <Progress value={vehicleProgress} className="mt-2" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                        <ActivitySquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.totalActivities}</div>
                        <p className="text-xs text-muted-foreground">
                            {data.recentActivities} in the last 24 hours
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Status</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Operational</div>
                        <p className="text-xs text-muted-foreground">
                            All systems running smoothly
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Tabs defaultValue="summary" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="summary">Summary</TabsTrigger>
                                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                                <TabsTrigger value="reports">Reports</TabsTrigger>
                            </TabsList>
                            <TabsContent value="summary" className="space-y-4">
                                <div className="flex items-center">
                                    <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                                    <span className="text-sm font-medium">User growth is positive this month</span>
                                </div>
                                <div className="flex items-center">
                                    <TrendingDown className="h-4 w-4 mr-2 text-red-500" />
                                    <span className="text-sm font-medium">Vehicle usage has slightly decreased</span>
                                </div>
                            </TabsContent>
                            <TabsContent value="analytics">
                                <p className="text-sm text-muted-foreground">Detailed analytics view coming soon.</p>
                            </TabsContent>
                            <TabsContent value="reports">
                                <p className="text-sm text-muted-foreground">Report generation feature coming soon.</p>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activities</CardTitle>
                        <CardDescription>You have {data.recentActivities} activities in the last 24 hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <span className="relative flex h-2 w-2 mr-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                                </span>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">New user registered</p>
                                    <p className="text-sm text-muted-foreground">2 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="relative flex h-2 w-2 mr-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Vehicle check-out completed</p>
                                    <p className="text-sm text-muted-foreground">15 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="relative flex h-2 w-2 mr-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                                </span>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Maintenance scheduled</p>
                                    <p className="text-sm text-muted-foreground">1 hour ago</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                <Button asChild>
                    <Link href="/user-management">Manage Users</Link>
                </Button>
                <Button asChild>
                    <Link href="/vehicle-management">Manage Vehicles</Link>
                </Button>
                <Button asChild>
                    <Link href="/activity-logging">View All Activities</Link>
                </Button>
            </div>
        </div>
    )
}