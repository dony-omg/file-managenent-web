'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Car, FileText, Pencil, Trash2, AlertTriangle, CheckCircle, Download, Eye, PlusCircle, Activity } from "lucide-react"

// Dữ liệu giả lập cho xe
const vehicleData = {
    id: 1,
    registrationNumber: "ABC 123",
    type: "Xe hơi",
    brand: "Toyota",
    model: "Camry",
    color: "Bạc",
    year: 2022,
    owner: {
        name: "John Doe",
        contact: "+1 234 567 8900"
    },
    registration: {
        date: "2023-01-01",
        expiry: "2024-01-01",
        status: "active"
    }
}

// Dữ liệu giả lập cho tài liệu
const initialDocuments = [
    { id: 1, name: 'Giấy đăng ký xe', type: 'pdf', uploadDate: '2023-01-01' },
    { id: 2, name: 'Bảo hiểm xe', type: 'pdf', uploadDate: '2023-01-01' },
    { id: 3, name: 'Giấy chứng nhận kiểm định', type: 'pdf', uploadDate: '2023-01-01' },
    { id: 4, name: 'Hóa đơn bán hàng', type: 'jpg', uploadDate: '2023-01-01' },
]

// Dữ liệu giả lập cho lịch sử hoạt động
const activityHistory = [
    { id: 1, action: 'Gia hạn đăng ký', date: '2023-01-01', details: 'Gia hạn đăng ký hàng năm' },
    { id: 2, action: 'Thêm tài liệu', date: '2023-01-01', details: 'Thêm tài liệu bảo hiểm mới' },
    { id: 3, action: 'Cập nhật thông tin', date: '2022-12-15', details: 'Cập nhật thông tin liên hệ của chủ xe' },
    { id: 4, action: 'Đăng ký ban đầu', date: '2022-01-01', details: 'Đăng ký xe ban đầu' },
]

export default function VehicleDetail() {
    const [documents, setDocuments] = useState(initialDocuments)
    const [reminderEnabled, setReminderEnabled] = useState(false)

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-500"><CheckCircle className="w-4 h-4 mr-1" /> Hoạt động</Badge>
            case 'expiring':
                return <Badge className="bg-yellow-500"><AlertTriangle className="w-4 h-4 mr-1" /> Sắp hết hạn</Badge>
            case 'expired':
                return <Badge className="bg-red-500"><AlertTriangle className="w-4 h-4 mr-1" /> Hết hạn</Badge>
            default:
                return null
        }
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">{vehicleData.registrationNumber}</h1>
                    <div className="flex space-x-2">
                        <Button variant="outline"><Pencil className="w-4 h-4 mr-2" /> Chỉnh sửa thông tin</Button>
                        <Button variant="outline" className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4 mr-2" /> Xóa xe</Button>
                        <Button>Gia hạn đăng ký</Button>
                    </div>
                </div>
                {getStatusBadge(vehicleData.registration.status)}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Thông tin cơ bản</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Số đăng ký</Label>
                                <div>{vehicleData.registrationNumber}</div>
                            </div>
                            <div>
                                <Label>Loại xe</Label>
                                <div>{vehicleData.type}</div>
                            </div>
                            <div>
                                <Label>Hãng</Label>
                                <div>{vehicleData.brand}</div>
                            </div>
                            <div>
                                <Label>Model</Label>
                                <div>{vehicleData.model}</div>
                            </div>
                            <div>
                                <Label>Màu sắc</Label>
                                <div>{vehicleData.color}</div>
                            </div>
                            <div>
                                <Label>Năm sản xuất</Label>
                                <div>{vehicleData.year}</div>
                            </div>
                            <div className="col-span-2">
                                <Label>Chủ sở hữu</Label>
                                <div>{vehicleData.owner.name} - {vehicleData.owner.contact}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin đăng ký</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div>
                                <Label>Ngày đăng ký</Label>
                                <div>{vehicleData.registration.date}</div>
                            </div>
                            <div>
                                <Label>Ngày hết hạn</Label>
                                <div>{vehicleData.registration.expiry}</div>
                            </div>
                            <div>
                                <Label>Trạng </Label>
                                <div>{getStatusBadge(vehicleData.registration.status)}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="reminder"
                                    checked={reminderEnabled}
                                    onCheckedChange={setReminderEnabled}
                                />
                                <Label htmlFor="reminder">Nhắc nhở gia hạn</Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Tài liệu liên quan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tên tài liệu</TableHead>
                                    <TableHead>Loại</TableHead>
                                    <TableHead>Ngày tải lên</TableHead>
                                    <TableHead>Hành động</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {documents.map((doc) => (
                                    <TableRow key={doc.id}>
                                        <TableCell>{doc.name}</TableCell>
                                        <TableCell>{doc.type.toUpperCase()}</TableCell>
                                        <TableCell>{doc.uploadDate}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm"><Download className="w-4 h-4" /></Button>
                                                <Button variant="outline" size="sm"><Eye className="w-4 h-4" /></Button>
                                                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Button className="mt-4">
                            <PlusCircle className="w-4 h-4 mr-2" /> Thêm tài liệu
                        </Button>
                    </CardContent>
                </Card>

                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Lịch sử đăng ký và hoạt động</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ngày</TableHead>
                                    <TableHead>Hành động</TableHead>
                                    <TableHead>Chi tiết</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activityHistory.map((activity) => (
                                    <TableRow key={activity.id}>
                                        <TableCell>{activity.date}</TableCell>
                                        <TableCell>{activity.action}</TableCell>
                                        <TableCell>{activity.details}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}