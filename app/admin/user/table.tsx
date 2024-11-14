'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { toast } from "@/components/ui/use-toast"
import { Pencil, Trash2, UserPlus } from 'lucide-react'

interface User {
    user_id: string
    username: string
    email: string
    role: 'admin' | 'user'
}

// // Mock data
// const mockUsers: User[] = [
//     { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
//     { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
//     { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
//     { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'admin' },
//     { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'user' },
// ]

export default function UserTable({ users }: { users: User[] }) {
    // const [users, setUsers] = useState<User[]>([])
    const [isAddUserOpen, setIsAddUserOpen] = useState(false)
    const [isEditUserOpen, setIsEditUserOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' as 'admin' | 'user' })


    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            // Simulating API call
            const newId = (users.length + 1).toString()
            const addedUser = { ...newUser, id: newId }
            // setUsers([...users, addedUser])
            setIsAddUserOpen(false)
            setNewUser({ name: '', email: '', role: 'user' })
            // toast({
            //     title: "Success",
            //     description: "User added successfully.",
            // })
        } catch (error) {
            // toast({
            //     title: "Error",
            //     description: "Failed to add user. Please try again.",
            //     variant: "destructive",
            // })
        }
    }

    const handleEditUser = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!currentUser) return
        try {
            // Simulating API call
            const updatedUsers = users.map(user =>
                user.id === currentUser.id ? currentUser : user
            )
            setIsEditUserOpen(false)
            setCurrentUser(null)
            // toast({
            //     title: "Success",
            //     description: "User updated successfully.",
            // })
        } catch (error) {
            // toast({
            //     title: "Error",
            //     description: "Failed to update user. Please try again.",
            //     variant: "destructive",
            // })
        }
    }

    const handleDeleteUser = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return
        try {
            // Simulating API call
            const updatedUsers = users.filter(user => user.id !== id)
            // toast({
            //     title: "Success",
            //     description: "User deleted successfully.",
            // })
        } catch (error) {
            // toast({
            //     title: "Error",
            //     description: "Failed to delete user. Please try again.",
            //     variant: "destructive",
            // })
        }
    }

    return (
        <div className="container mx-auto rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
                <h1 className="text-2xl font-semibold leading-none tracking-tight">User Management</h1>
            </div>
            <div className='p-6 pt-0'>
                <div className="flex justify-between items-center mb-5">
                    <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <UserPlus className="h-4 w-4" />
                                Add User
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New User</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddUser} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="role">Role</Label>
                                    <Select
                                        value={newUser.role}
                                        onValueChange={(value: 'admin' | 'user') => setNewUser({ ...newUser, role: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" className="w-full">Add User</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.user_id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            setCurrentUser(user)
                                            setIsEditUserOpen(true)
                                        }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                        <span className="sr-only">Edit user</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete user</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                        </DialogHeader>
                        {currentUser && (
                            <form onSubmit={handleEditUser} className="space-y-4">
                                <div>
                                    <Label htmlFor="edit-name">Name</Label>
                                    <Input
                                        id="edit-name"
                                        value={currentUser.name}
                                        onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="edit-email">Email</Label>
                                    <Input
                                        id="edit-email"
                                        type="email"
                                        value={currentUser.email}
                                        onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="edit-role">Role</Label>
                                    <Select
                                        value={currentUser.role}
                                        onValueChange={(value: 'admin' | 'user') => setCurrentUser({ ...currentUser, role: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" className="w-full">Update User</Button>
                            </form>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}