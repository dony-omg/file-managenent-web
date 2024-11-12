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

// Mock data for the vehicle
const vehicleData = {
    id: 1,
    registrationNumber: "ABC 123",
    type: "Car",
    brand: "Toyota",
    model: "Camry",
    color: "Silver",
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

// Mock data for documents
const initialDocuments = [
    { id: 1, name: 'Vehicle Registration Document', type: 'pdf', uploadDate: '2023-01-01' },
    { id: 2, 'name': 'Vehicle Insurance', type: 'pdf', uploadDate: '2023-01-01' },
    { id: 3, name: 'Inspection Certificate', type: 'pdf', uploadDate: '2023-01-01' },
    { id: 4, name: 'Sales Invoice', type: 'jpg', uploadDate: '2023-01-01' },
]

// Mock data for activity history
const activityHistory = [
    { id: 1, action: 'Registration Renewed', date: '2023-01-01', details: 'Annual registration renewal' },
    { id: 2, action: 'Document Added', date: '2023-01-01', details: 'Added new insurance document' },
    { id: 3, action: 'Information Updated', date: '2022-12-15', details: 'Updated owner contact information' },
    { id: 4, action: 'Initial Registration', date: '2022-01-01', details: 'Vehicle initially registered' },
]

export default function VehicleDetail() {
    const [documents, setDocuments] = useState(initialDocuments)
    const [reminderEnabled, setReminderEnabled] = useState(false)

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-500"><CheckCircle className="w-4 h-4 mr-1" /> Active</Badge>
            case 'expiring':
                return <Badge className="bg-yellow-500"><AlertTriangle className="w-4 h-4 mr-1" /> Expiring Soon</Badge>
            case 'expired':
                return <Badge className="bg-red-500"><AlertTriangle className="w-4 h-4 mr-1" /> Expired</Badge>
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
                        <Button variant="outline"><Pencil className="w-4 h-4 mr-2" /> Edit Info</Button>
                        <Button variant="outline" className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4 mr-2" /> Delete Vehicle</Button>
                        <Button>Renew Registration</Button>
                    </div>
                </div>
                {getStatusBadge(vehicleData.registration.status)}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Registration Number</Label>
                                <div>{vehicleData.registrationNumber}</div>
                            </div>
                            <div>
                                <Label>Vehicle Type</Label>
                                <div>{vehicleData.type}</div>
                            </div>
                            <div>
                                <Label>Brand</Label>
                                <div>{vehicleData.brand}</div>
                            </div>
                            <div>
                                <Label>Model</Label>
                                <div>{vehicleData.model}</div>
                            </div>
                            <div>
                                <Label>Color</Label>
                                <div>{vehicleData.color}</div>
                            </div>
                            <div>
                                <Label>Year of Manufacture</Label>
                                <div>{vehicleData.year}</div>
                            </div>
                            <div className="col-span-2">
                                <Label>Owner</Label>
                                <div>{vehicleData.owner.name} - {vehicleData.owner.contact}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Registration Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div>
                                <Label>Registration Date</Label>
                                <div>{vehicleData.registration.date}</div>
                            </div>
                            <div>
                                <Label>Expiry Date</Label>
                                <div>{vehicleData.registration.expiry}</div>
                            </div>
                            <div>
                                <Label>Status</Label>
                                <div>{getStatusBadge(vehicleData.registration.status)}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="reminder"
                                    checked={reminderEnabled}
                                    onCheckedChange={setReminderEnabled}
                                />
                                <Label htmlFor="reminder">Renewal Reminder</Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Related Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Document Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Upload Date</TableHead>
                                    <TableHead>Actions</TableHead>
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
                            <PlusCircle className="w-4 h-4 mr-2" /> Add Document
                        </Button>
                    </CardContent>
                </Card>

                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Registration and Activity History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Details</TableHead>
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