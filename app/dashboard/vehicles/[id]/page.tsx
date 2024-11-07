'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, FileText, Car, Activity, Image as ImageIcon, File, FileImage } from "lucide-react"

// Mock data for the vehicle
const vehicleData = {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2022,
    licensePlate: "ABC123",
    vin: "1HGBH41JXMN109186",
    currentMileage: 15000,
    media: [
        { type: 'image', url: "/placeholder.svg?height=200&width=300&text=Front+View" },
        { type: 'image', url: "/placeholder.svg?height=200&width=300&text=Side+View" },
        { type: 'image', url: "/placeholder.svg?height=200&width=300&text=Interior" },
        { type: 'image', url: "/placeholder.svg?height=200&width=300&text=Rear+View" },
    ]
}

// Mock data for documents
const initialDocuments = [
    { id: 1, name: 'Insurance Policy', type: 'pdf', uploadDate: '2023-05-15', url: '/placeholder.svg?height=400&width=300&text=Insurance+Policy' },
    { id: 2, name: 'Registration Certificate', type: 'pdf', uploadDate: '2023-04-20', url: '/placeholder.svg?height=400&width=300&text=Registration+Certificate' },
    { id: 3, name: 'Maintenance Record', type: 'docx', uploadDate: '2023-06-01', url: '/placeholder.svg?height=400&width=300&text=Maintenance+Record' },
    { id: 4, name: 'Vehicle Photo', type: 'jpg', uploadDate: '2023-07-01', url: '/placeholder.svg?height=400&width=300&text=Vehicle+Photo' },
]

// Mock data for logs
const initialLogs = [
    { id: 1, action: 'Oil Change', date: '2023-07-01', details: 'Regular maintenance' },
    { id: 2, action: 'Tire Rotation', date: '2023-07-01', details: 'As part of regular service' },
    { id: 3, action: 'Brake Inspection', date: '2023-06-15', details: 'Routine safety check' },
    { id: 4, action: 'Battery Replacement', date: '2023-05-20', details: 'Old battery was failing' },
]

export default function VehicleDetail() {
    const [documents, setDocuments] = useState(initialDocuments)
    const [newDocument, setNewDocument] = useState({ name: '', type: '' })
    const [logs, setLogs] = useState(initialLogs)
    const [newLog, setNewLog] = useState({ action: '', details: '' })

    const handleAddDocument = (e: React.FormEvent) => {
        e.preventDefault()
        const newDoc = {
            id: documents.length + 1,
            ...newDocument,
            uploadDate: new Date().toISOString().split('T')[0],
            url: '/placeholder.svg?height=400&width=300&text=' + newDocument.name.replace(' ', '+')
        }
        setDocuments([...documents, newDoc])
        setNewDocument({ name: '', type: '' })
    }

    const handleAddLog = (e: React.FormEvent) => {
        e.preventDefault()
        const newLogEntry = {
            id: logs.length + 1,
            ...newLog,
            date: new Date().toISOString().split('T')[0]
        }
        setLogs([newLogEntry, ...logs])
        setNewLog({ action: '', details: '' })
    }

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'pdf':
                return <FileText className="h-4 w-4 text-red-500" />
            case 'docx':
                return <File className="h-4 w-4 text-blue-500" />
            case 'jpg':
            case 'png':
            case 'gif':
                return <FileImage className="h-4 w-4 text-green-500" />
            default:
                return <File className="h-4 w-4" />
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Vehicle Detail</h1>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Vehicle Information</CardTitle>
                        <CardDescription>Details about the vehicle</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Car className="mr-2 h-4 w-4" />
                                <span className="font-semibold">Make:</span>
                                <span className="ml-2">{vehicleData.make}</span>
                            </div>
                            <div className="flex items-center">
                                <Car className="mr-2 h-4 w-4" />
                                <span className="font-semibold">Model:</span>
                                <span className="ml-2">{vehicleData.model}</span>
                            </div>
                            <div className="flex items-center">
                                <Car className="mr-2 h-4 w-4" />
                                <span className="font-semibold">Year:</span>
                                <span className="ml-2">{vehicleData.year}</span>
                            </div>
                            <div className="flex items-center">
                                <Car className="mr-2 h-4 w-4" />
                                <span className="font-semibold">License Plate:</span>
                                <span className="ml-2">{vehicleData.licensePlate}</span>
                            </div>
                            <div className="flex items-center">
                                <Car className="mr-2 h-4 w-4" />
                                <span className="font-semibold">VIN:</span>
                                <span className="ml-2">{vehicleData.vin}</span>
                            </div>
                            <div className="flex items-center">
                                <Car className="mr-2 h-4 w-4" />
                                <span className="font-semibold">Current Mileage:</span>
                                <span className="ml-2">{vehicleData.currentMileage} miles</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Media</CardTitle>
                        <CardDescription>Images and videos of the vehicle</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            {vehicleData.media.map((item, index) => (
                                <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                                    <Image
                                        src={item.url}
                                        alt={`Vehicle image ${index + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <Button className="mt-4 w-full">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Media
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Documents</CardTitle>
                        <CardDescription>Manage vehicle-related documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="list" className="w-full">
                            <TabsList>
                                <TabsTrigger value="list">Document List</TabsTrigger>
                                <TabsTrigger value="add">Add Document</TabsTrigger>
                            </TabsList>
                            <TabsContent value="list">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Upload Date</TableHead>
                                            <TableHead>Preview</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {documents.map((doc) => (
                                            <TableRow key={doc.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center">
                                                        {getFileIcon(doc.type)}
                                                        <span className="ml-2">{doc.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{doc.type.toUpperCase()}</TableCell>
                                                <TableCell>{doc.uploadDate}</TableCell>
                                                <TableCell>
                                                    {doc.type === 'jpg' || doc.type === 'png' || doc.type === 'gif' ? (
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button variant="outline" size="sm">Preview</Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-[425px]">
                                                                <Image
                                                                    src={doc.url}
                                                                    alt={doc.name}
                                                                    width={400}
                                                                    height={300}
                                                                    layout="responsive"
                                                                />
                                                            </DialogContent>
                                                        </Dialog>
                                                    ) : (
                                                        <Button variant="outline" size="sm" disabled>Preview</Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                            <TabsContent value="add">
                                <form onSubmit={handleAddDocument} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="docName">Document Name</Label>
                                        <Input
                                            id="docName"
                                            value={newDocument.name}
                                            onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="docType">Document Type</Label>
                                        <Input
                                            id="docType"
                                            value={newDocument.type}
                                            onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <Button type="submit">
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add Document
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Logging</CardTitle>
                        <CardDescription>Recent activities and maintenance logs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="list" className="w-full">
                            <TabsList>
                                <TabsTrigger value="list">Log List</TabsTrigger>
                                <TabsTrigger value="add">Add Log</TabsTrigger>
                            </TabsList>
                            <TabsContent value="list">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Action</TableHead>
                                            <TableHead>Details</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {logs.map((log) => (
                                            <TableRow key={log.id}>
                                                <TableCell>{log.date}</TableCell>
                                                <TableCell className="font-medium">{log.action}</TableCell>
                                                <TableCell>{log.details}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                            <TabsContent value="add">
                                <form onSubmit={handleAddLog} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="logAction">Action</Label>
                                        <Input
                                            id="logAction"
                                            value={newLog.action}
                                            onChange={(e) => setNewLog({ ...newLog, action: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="logDetails">Details</Label>
                                        <Input
                                            id="logDetails"
                                            value={newLog.details}
                                            onChange={(e) => setNewLog({ ...newLog, details: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <Button type="submit">
                                        <Activity className="mr-2 h-4 w-4" /> Add Log Entry
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}