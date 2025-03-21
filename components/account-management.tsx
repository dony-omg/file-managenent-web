"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/utils/supabase/client"
import {
  Search,
  MoreHorizontal,
  UserPlus,
  Shield,
  User,
  UserCog,
  Mail,
  Key,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"

// Types for our accounts
type AccountStatus = "active" | "inactive" | "pending"
type UserRole = "admin" | "editor" | "viewer"

interface Account {
  id: string
  name: string
  email: string
  role: UserRole
  status: AccountStatus
  lastActive: string
  avatarUrl?: string
}

export function AccountManagement() {
  const [activeTab, setActiveTab] = useState("users")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newAccount, setNewAccount] = useState({
    name: "",
    email: "",
    role: "viewer" as UserRole,
    password: "",
    confirmPassword: "",
  })

  const { toast } = useToast()
  const [adminAccounts, setAdminAccounts] = useState<Account[]>([])
  const [userAccounts, setUserAccounts] = useState<Account[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      const supabase = createClient()
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const admins = users ? users.filter(user => user.role === 'admin') : []
      const regularUsers = users ? users.filter(user => user.role !== 'admin') : []

      setAdminAccounts(admins)
      setUserAccounts(regularUsers)
    } catch (error) {
      console.error('Error fetching accounts:', error)
      toast({
        title: "Error",
        description: "Failed to load accounts. Please try again later.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAccount((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setNewAccount((prev) => ({ ...prev, role: value as UserRole }))
  }

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate input
      if (!newAccount.name.trim()) {
        throw new Error('Name is required')
      }
      if (!newAccount.email.trim()) {
        throw new Error('Email is required')
      }
      if (!newAccount.password.trim()) {
        throw new Error('Password is required')
      }
      if (newAccount.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      if (newAccount.password !== newAccount.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      const supabase = createClient()
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: newAccount.email,
        password: newAccount.password,
        options: {
          data: {
            name: newAccount.name,
            role: newAccount.role
          }
        }
      })

      if (signUpError) throw signUpError
      if (!data.user) throw new Error('Failed to create user')

      const { error: insertError } = await supabase
        .from('users')
        .insert([{
          id: data.user.id,
          email: newAccount.email,
          name: newAccount.name,
          role: newAccount.role,
          status: 'pending'
        }])

      if (insertError) throw insertError

      toast({
        title: "Success",
        description: "Account created successfully. User will receive an email to confirm their account."
      })

      setIsCreating(false)
      setNewAccount({
        name: "",
        email: "",
        role: "viewer",
        password: "",
        confirmPassword: "",
      })
      fetchAccounts()
    } catch (error) {
      console.error('Error creating account:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status: AccountStatus) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Inactive
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Pending
          </Badge>
        )
      default:
        return null
    }
  }

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Admin
          </Badge>
        )
      case "editor":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Editor
          </Badge>
        )
      case "viewer":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Viewer
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredAdmins = adminAccounts.filter(
    (account) =>
      (account?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (account?.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()),
  )

  const filteredUsers = userAccounts.filter(
    (account) =>
      (account?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (account?.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Account Management</h1>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Create Account
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleCreateAccount}>
                <DialogHeader>
                  <DialogTitle>Create New Account</DialogTitle>
                  <DialogDescription>
                    Create a new user or admin account. They'll receive an email to set up their password.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={newAccount.name} 
                      onChange={handleInputChange} 
                      required 
                      disabled={isSubmitting}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newAccount.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select 
                      value={newAccount.role} 
                      onValueChange={handleRoleChange} 
                      disabled={isSubmitting}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={newAccount.password}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Enter password"
                      minLength={6}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={newAccount.confirmPassword}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Confirm password"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreating(false)} 
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>Create Account</>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search accounts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Administrators
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow key="loading-row">
                      <TableCell colSpan={6} className="h-24 text-center">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                      </TableCell>
                    </TableRow>
                  ) : filteredUsers.length === 0 ? (
                    <TableRow key="empty-row">
                      <TableCell colSpan={6} className="h-24 text-center">
                        No user accounts found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={account.avatarUrl} alt={account.name} />
                              <AvatarFallback>{account.name ? account.name.substring(0, 2).toUpperCase() : "--"}</AvatarFallback>
                            </Avatar>
                            {account.name}
                          </div>
                        </TableCell>
                        <TableCell>{account.email}</TableCell>
                        <TableCell>{getRoleBadge(account.role)}</TableCell>
                        <TableCell>{getStatusBadge(account.status)}</TableCell>
                        <TableCell>{account.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <UserCog className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Key className="mr-2 h-4 w-4" />
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {account.status === "active" ? (
                                <DropdownMenuItem className="text-amber-600">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Deactivate Account
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Activate Account
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-destructive">Delete Account</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="admins" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : filteredAdmins.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No admin accounts found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAdmins.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={account.avatarUrl} alt={account.name} />
                              <AvatarFallback>{account.name ? account.name.substring(0, 2).toUpperCase() : "--"}</AvatarFallback>
                            </Avatar>
                            {account.name}
                          </div>
                        </TableCell>
                        <TableCell>{account.email}</TableCell>
                        <TableCell>{getStatusBadge(account.status)}</TableCell>
                        <TableCell>{account.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <UserCog className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Key className="mr-2 h-4 w-4" />
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {account.status === "active" ? (
                                <DropdownMenuItem className="text-amber-600">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Deactivate Account
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Activate Account
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-destructive">Delete Account</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

