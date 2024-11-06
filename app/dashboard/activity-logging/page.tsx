'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search } from 'lucide-react'
import { format } from 'date-fns'

interface ActivityLog {
    id: string
    userId: string
    username: string
    action: string
    timestamp: Date
    details: string
}

// Mock data
const mockActivityLogs: ActivityLog[] = [
    { id: '1', userId: 'user1', username: 'John Doe', action: 'Login', timestamp: new Date('2023-11-05T08:30:00'), details: 'Successful login' },
    { id: '2', userId: 'user2', username: 'Jane Smith', action: 'Create User', timestamp: new Date('2023-11-05T09:15:00'), details: 'Created user: Alice Johnson' },
    { id: '3', userId: 'user3', username: 'Bob Brown', action: 'Update Vehicle', timestamp: new Date('2023-11-05T10:00:00'), details: 'Updated vehicle: Toyota Camry (ID: V001)' },
    { id: '4', userId: 'user1', username: 'John Doe', action: 'Delete User', timestamp: new Date('2023-11-05T11:30:00'), details: 'Deleted user: Charlie Davis' },
    { id: '5', userId: 'user4', username: 'Alice Johnson', action: 'View Report', timestamp: new Date('2023-11-05T13:45:00'), details: 'Viewed monthly usage report' },
]

export default function ActivityLogging() {
    const [logs, setLogs] = useState<ActivityLog[]>([])
    const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [actionFilter, setActionFilter] = useState<string | null>(null)
    const [dateFilter, setDateFilter] = useState<Date | null>(null)

    useEffect(() => {
        // Simulating API call with mock data
        setLogs(mockActivityLogs)
        setFilteredLogs(mockActivityLogs)
    }, [])

    useEffect(() => {
        let result = logs

        if (searchTerm) {
            result = result.filter(log =>
                log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.details.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (actionFilter) {
            result = result.filter(log => log.action === actionFilter)
        }

        if (dateFilter) {
            result = result.filter(log =>
                log.timestamp.toDateString() === dateFilter.toDateString()
            )
        }

        setFilteredLogs(result)
    }, [logs, searchTerm, actionFilter, dateFilter])

    const uniqueActions = Array.from(new Set(logs.map(log => log.action)))

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5">Activity Logging</h1>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <Input
                        placeholder="Search logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                        icon={<Search className="h-4 w-4 opacity-50" />}
                    />
                </div>
                {/* <Select value={actionFilter || ''} onValueChange={setActionFilter}>
                    <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Filter by action" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">All Actions</SelectItem>
                        {uniqueActions.map(action => (
                            <SelectItem key={action} value={action}>{action}</SelectItem>
                        ))}
                    </SelectContent>
                </Select> */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full md:w-[200px] justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateFilter ? format(dateFilter, 'PPP') : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={dateFilter || undefined}
                            onSelect={setDateFilter}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                {(actionFilter || dateFilter) && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setActionFilter(null)
                            setDateFilter(null)
                        }}
                    >
                        Clear Filters
                    </Button>
                )}
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell>{log.username}</TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell>{format(log.timestamp, 'PPP p')}</TableCell>
                            <TableCell>{log.details}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {filteredLogs.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                    No activity logs found matching the current filters.
                </div>
            )}
        </div>
    )
}