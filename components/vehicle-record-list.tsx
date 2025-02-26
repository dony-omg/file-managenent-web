"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, FileText, Camera, FileCheck, Download, Eye, Pencil, Trash2 } from "lucide-react"
import { CreateVehicleRecordDialog } from "./create-vehicle-record-dialog"

interface VehicleRecord {
  id: string
  registrationNumber: string
  vin: string
  make: string
  model: string
  year: string
  status: "pending" | "approved" | "rejected"
  lastInspection: string
  vehiclePhotos: number
  formPhotos: number
  certificatePhotos: number
}

export function VehicleRecordList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Sample data
  const vehicleRecords: VehicleRecord[] = [
    {
      id: "1",
      registrationNumber: "ABC-123",
      vin: "1HGCM82633A123456",
      make: "Toyota",
      model: "Camry",
      year: "2022",
      status: "approved",
      lastInspection: "2024-02-15",
      vehiclePhotos: 4,
      formPhotos: 2,
      certificatePhotos: 1,
    },
    {
      id: "2",
      registrationNumber: "XYZ-789",
      vin: "WBADT43483G123456",
      make: "BMW",
      model: "X5",
      year: "2021",
      status: "pending",
      lastInspection: "2024-02-20",
      vehiclePhotos: 3,
      formPhotos: 1,
      certificatePhotos: 2,
    },
    {
      id: "3",
      registrationNumber: "DEF-456",
      vin: "JH4KA7660MC123456",
      make: "Honda",
      model: "Accord",
      year: "2023",
      status: "approved",
      lastInspection: "2024-01-30",
      vehiclePhotos: 5,
      formPhotos: 2,
      certificatePhotos: 1,
    },
    {
      id: "4",
      registrationNumber: "GHI-789",
      vin: "1G1JC5444R7123456",
      make: "Chevrolet",
      model: "Malibu",
      year: "2020",
      status: "rejected",
      lastInspection: "2024-02-10",
      vehiclePhotos: 2,
      formPhotos: 1,
      certificatePhotos: 0,
    },
    {
      id: "5",
      registrationNumber: "JKL-012",
      vin: "1FTEW1E53JF123456",
      make: "Ford",
      model: "F-150",
      year: "2022",
      status: "pending",
      lastInspection: "2024-02-22",
      vehiclePhotos: 3,
      formPhotos: 2,
      certificatePhotos: 1,
    },
  ]

  const filteredRecords = vehicleRecords.filter((record) => {
    const matchesSearch =
      record.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.model.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || record.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  const handleViewVehicle = (id: string) => {
    router.push(`/vehicles/${id}`)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Vehicle Records</h1>
          <CreateVehicleRecordDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by registration number, VIN, make or model..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Records</CardTitle>
            <CardDescription>Manage vehicle inspection records and documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Registration #</TableHead>
                  <TableHead>VIN</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Inspection</TableHead>
                  <TableHead>Documentation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No vehicle records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.registrationNumber}</TableCell>
                      <TableCell>{record.vin}</TableCell>
                      <TableCell>
                        {record.make} {record.model} ({record.year})
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>{record.lastInspection}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Camera className="h-3 w-3" />
                            {record.vehiclePhotos}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {record.formPhotos}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <FileCheck className="h-3 w-3" />
                            {record.certificatePhotos}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewVehicle(record.id)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Record
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Export Record
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Record
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

