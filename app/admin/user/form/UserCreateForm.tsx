'use client'

import { useForm } from 'react-hook-form'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from 'lucide-react' // Add this import


interface User {
    user_id: string
    username: string
    email: string
    role: 'admin' | 'user'
}

interface UserCreateFormProps {
    handleAddUser: (data: { email: string; username: string; role: 'admin' | 'user' }) => void
    isLoading: boolean
}

export default function UserCreateForm({ handleAddUser, isLoading }: UserCreateFormProps) {

    const { register, setValue, handleSubmit, formState: { errors }, ...form } = useForm()

    const onSubmit = (data: any) => {
        console.log(data)
        handleAddUser(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="username">Name</Label>
                <Input
                    id="username"
                    {...register("username", { required: 'username is required' })}
                />
                {errors.name && <span>This field is required</span>}
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    {...register("email", { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })}
                />
            </div>
            <div>
                <Label htmlFor="role">Role</Label>
                <Select
                    {...register("role")}
                    onValueChange={(value: 'admin' | 'user') => setValue('role', value, { shouldValidate: true })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
                {errors.role && <span>This field is required</span>}
            </div>
            <Button type="submit" className="w-full">
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                    </>
                ) : (
                    'Create User'
                )}
            </Button>
        </form>);
}