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

// Mock data with Vietnamese content
const mockActivityLogs: ActivityLog[] = [
    { id: '1', userId: 'user1', username: 'Nguyễn Văn A', action: 'Đăng nhập', timestamp: new Date('2023-11-05T08:30:00'), details: 'Đăng nhập thành công' },
    { id: '2', userId: 'user2', username: 'Trần Thị B', action: 'Tạo người dùng', timestamp: new Date('2023-11-05T09:15:00'), details: 'Đã tạo người dùng: Lê Văn C' },
    { id: '3', userId: 'user3', username: 'Phạm Văn D', action: 'Cập nhật xe', timestamp: new Date('2023-11-05T10:00:00'), details: 'Đã cập nhật xe: Toyota Camry (ID: V001)' },
    { id: '4', userId: 'user1', username: 'Nguyễn Văn A', action: 'Xóa người dùng', timestamp: new Date('2023-11-05T11:30:00'), details: 'Đã xóa người dùng: Trần Văn E' },
    { id: '5', userId: 'user4', username: 'Lê Thị F', action: 'Xem báo cáo', timestamp: new Date('2023-11-05T13:45:00'), details: 'Đã xem báo cáo sử dụng hàng tháng' },
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


    return (
        <div className="container mx-auto rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
                <h1 className="text-2xl font-semibold leading-none tracking-tight">Nhật Ký Hoạt Động</h1>
            </div>

            <div className='p-6 pt-0'>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <Input
                            placeholder="Tìm kiếm nhật ký..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    {/* <Select value={actionFilter || ''} onValueChange={setActionFilter}>
                    <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Lọc theo hành động" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">Tất cả hành động</SelectItem>
                        {uniqueActions.map(action => (
                            <SelectItem key={action} value={action}>{action}</SelectItem>
                        ))}
                    </SelectContent>
                </Select> */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full md:w-[200px] justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateFilter ? format(dateFilter, 'PPP') : <span>Chọn ngày</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={dateFilter || undefined}
                                // onSelect={setDateFilter}
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
                            Xóa bộ lọc
                        </Button>
                    )}
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Người dùng</TableHead>
                            <TableHead>Hành động</TableHead>
                            <TableHead>Thời gian</TableHead>
                            <TableHead>Chi tiết</TableHead>
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
                        Không tìm thấy nhật ký hoạt động phù hợp với bộ lọc hiện tại.
                    </div>
                )}
            </div>
        </div>
    )
}