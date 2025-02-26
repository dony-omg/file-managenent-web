"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Loader2, Moon, Sun, BellRing, Bell, Palette } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [isSaving, setIsSaving] = useState(false)
  const [theme, setTheme] = useState("system")

  // Account settings state
  const [accountSettings, setAccountSettings] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    language: "english",
    timezone: "america_new_york",
  })

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    documentUpdates: true,
    vehicleRecordUpdates: true,
    accountActivity: true,
    marketingEmails: false,
  })

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30_minutes",
  })

  // Appearance settings state
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system",
    density: "comfortable",
    sidebarCollapsed: false,
  })

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAccountSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setAccountSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSecuritySelectChange = (name: string, value: string) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleAppearanceChange = (name: string, value: any) => {
    setAppearanceSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationToggle = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSecurityToggle = (name: string, checked: boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would typically send the data to your API
    console.log("Saving settings:", {
      account: accountSettings,
      notifications: notificationSettings,
      security: securitySettings,
      appearance: appearanceSettings,
    })

    setIsSaving(false)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* Account Settings Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" value={accountSettings.name} onChange={handleAccountChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={accountSettings.email}
                        onChange={handleAccountChange}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Regional Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={accountSettings.language}
                        onValueChange={(value) => handleSelectChange("language", value)}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Time Zone</Label>
                      <Select
                        value={accountSettings.timezone}
                        onValueChange={(value) => handleSelectChange("timezone", value)}
                      >
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america_new_york">America/New York (UTC-5)</SelectItem>
                          <SelectItem value="america_los_angeles">America/Los Angeles (UTC-8)</SelectItem>
                          <SelectItem value="europe_london">Europe/London (UTC+0)</SelectItem>
                          <SelectItem value="europe_paris">Europe/Paris (UTC+1)</SelectItem>
                          <SelectItem value="asia_tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationToggle("emailNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BellRing className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="pushNotifications">Push Notifications</Label>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) => handleNotificationToggle("pushNotifications", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="documentUpdates" className="font-medium">
                          Document Updates
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when documents are added or updated
                        </p>
                      </div>
                      <Switch
                        id="documentUpdates"
                        checked={notificationSettings.documentUpdates}
                        onCheckedChange={(checked) => handleNotificationToggle("documentUpdates", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="vehicleRecordUpdates" className="font-medium">
                          Vehicle Record Updates
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about vehicle inspection records
                        </p>
                      </div>
                      <Switch
                        id="vehicleRecordUpdates"
                        checked={notificationSettings.vehicleRecordUpdates}
                        onCheckedChange={(checked) => handleNotificationToggle("vehicleRecordUpdates", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="accountActivity" className="font-medium">
                          Account Activity
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about account logins and security events
                        </p>
                      </div>
                      <Switch
                        id="accountActivity"
                        checked={notificationSettings.accountActivity}
                        onCheckedChange={(checked) => handleNotificationToggle("accountActivity", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketingEmails" className="font-medium">
                          Marketing Emails
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) => handleNotificationToggle("marketingEmails", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and authentication options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactorAuth" className="font-medium">
                        Enable Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      id="twoFactorAuth"
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSecurityToggle("twoFactorAuth", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Session Settings</h3>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout</Label>
                    <Select
                      value={securitySettings.sessionTimeout}
                      onValueChange={(value) => handleSecuritySelectChange("sessionTimeout", value)}
                    >
                      <SelectTrigger id="sessionTimeout">
                        <SelectValue placeholder="Select timeout period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15_minutes">15 minutes</SelectItem>
                        <SelectItem value="30_minutes">30 minutes</SelectItem>
                        <SelectItem value="1_hour">1 hour</SelectItem>
                        <SelectItem value="4_hours">4 hours</SelectItem>
                        <SelectItem value="8_hours">8 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="outline">Clear All Sessions</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <RadioGroup
                    defaultValue={appearanceSettings.theme}
                    onValueChange={(value) => handleAppearanceChange("theme", value)}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="light" id="light" className="sr-only" />
                      <Label
                        htmlFor="light"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <Sun className="mb-3 h-6 w-6" />
                        Light
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="dark" id="dark" className="sr-only" />
                      <Label
                        htmlFor="dark"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <Moon className="mb-3 h-6 w-6" />
                        Dark
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="system" id="system" className="sr-only" />
                      <Label
                        htmlFor="system"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <Palette className="mb-3 h-6 w-6" />
                        System
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Density</h3>
                  <div className="space-y-2">
                    <Label htmlFor="density">Interface Density</Label>
                    <Select
                      value={appearanceSettings.density}
                      onValueChange={(value) => handleAppearanceChange("density", value)}
                    >
                      <SelectTrigger id="density">
                        <SelectValue placeholder="Select density" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sidebar</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sidebarCollapsed" className="font-medium">
                        Collapsed Sidebar by Default
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Start with a collapsed sidebar for more screen space
                      </p>
                    </div>
                    <Switch
                      id="sidebarCollapsed"
                      checked={appearanceSettings.sidebarCollapsed}
                      onCheckedChange={(checked) => handleAppearanceChange("sidebarCollapsed", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

