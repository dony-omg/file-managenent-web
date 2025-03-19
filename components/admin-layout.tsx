"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Bell, ChevronDown, LayoutDashboard, LogOut, Menu, Moon, Sun, Users, Activity, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const pathname = usePathname()

  const navigation = [
    // { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Vehicles", href: "/vehicles", icon: Car },
    { name: "Accounts", href: "/accounts", icon: Users },
    { name: "Active Users", href: "/active-users", icon: Activity },
  ]

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-0 z-40 h-screen w-64 transform border-r bg-background transition-transform duration-200 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <nav className="space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </a>
              )
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className={`flex flex-col ${sidebarOpen ? "lg:pl-64" : ""} min-h-screen`}>
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className={sidebarOpen ? "lg:hidden" : ""}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-4 ml-auto">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="mr-2">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button variant="ghost" size="icon" className="mr-2">
                <Bell className="h-5 w-5" />
              </Button>

              <Separator orientation="vertical" className="h-8" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-medium hidden lg:block">Admin User</div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <a href="/profile">Profile</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/settings">Settings</a>
                  </DropdownMenuItem>
                  <Separator className="my-1" />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}

