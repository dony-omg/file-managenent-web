'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from '@/hooks/use-toast'
import { createClient } from '@/utils/supabase/client'
import { Pencil, Trash2, User, UserPlus } from 'lucide-react'
import { useState } from 'react'
import UserCreateForm from './form/UserCreateForm'
import { Loader2 } from 'lucide-react'

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
    const supabase = createClient()
    const { toast } = useToast()

    const [isAddUserOpen, setIsAddUserOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const handleAddUser = async (formData: { email: string; username: string; role: 'admin' | 'user' }) => {
        setIsLoading(true)
        try {

            const { error } = await supabase.from('users').insert([
                {
                    email: formData.email,
                    password_hash: 'admin',
                    username: formData.username,
                    role: formData.role,
                }
            ])
            if (error) {
                console.log(error)
                toast({
                    title: "Error",
                    description: error.message || "Failed to add user. Please try again.",
                    variant: "destructive",
                })
            }

            setIsAddUserOpen(false)
            toast({
                title: "Success",
                description: "User added successfully.",
            })
            window.location.reload()
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add user. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleEditUser = async (e: React.FormEvent) => {

    }

    const handleDeleteUser = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return
        try {
            // Simulating API call
            // const updatedUsers = users.filter(user => user.id !== id)
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
                            <Button className="flex items-center gap-2" disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <UserPlus className="h-4 w-4" />
                                )}
                                Add User
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New User</DialogTitle>
                            </DialogHeader>
                            <UserCreateForm handleAddUser={handleAddUser} isLoading={isLoading} />
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
                                            // setCurrentUser(user)
                                            // setIsEditUserOpen(true)
                                        }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                        <span className="sr-only">Edit user</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                    // onClick={() => handleDeleteUser(user.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete user</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}