"use client"

import { useState, useEffect } from "react"
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
import { Vehicle } from "@/type/types"

export function VehicleRecordList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(searchQuery && { search: searchQuery }),
        ...(statusFilter !== "all" && { filter: statusFilter })
      })

      const response = await fetch(`/api/vehicles/list?${params}`)
      const result = await response.json()

      if (response.ok) {
        setVehicles(result.data)
        setTotal(result.metadata.total)
      } else {
        console.error("Failed to fetch vehicles:", result.error)
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [page, limit, searchQuery, statusFilter])

  const totalPages = Math.ceil(total / limit)

  const vehicleRecords = vehicles.map(vehicle => ({
    id: vehicle.id,
    registrationNumber: vehicle.license_plate,
    vin: vehicle.vin_number,
    make: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    color: vehicle.color || '-',
    chassisNumber: vehicle.chassis_number,
    engineNumber: vehicle.engine_number,
    fuelType: vehicle.fuel_type || '-',
    ownerName: vehicle.owner_name || '-',
    ownerContact: vehicle.owner_contact || '-',
    status: vehicle.status,
    registrationDate: vehicle.registration_date ? new Date(vehicle.registration_date).toLocaleDateString() : '-',
    expirationDate: vehicle.expiration_date ? new Date(vehicle.expiration_date).toLocaleDateString() : '-',
    lastUpdated: new Date(vehicle.updated_at).toLocaleDateString(),
    // vehiclePhotos: vehicle.vehiclePhotos || 0,
    // formPhotos: vehicle.formphotos || 0,
    // certificatePhotos: vehicle.certificatephotos || 0
  }))

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
          <CreateVehicleRecordDialog 
            open={isCreateDialogOpen} 
            onOpenChange={setIsCreateDialogOpen} 
            onSuccess={fetchVehicles}
          />
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
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Documentation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : vehicleRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No vehicle records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  vehicleRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.registrationNumber}</TableCell>
                      <TableCell>{record.vin}</TableCell>
                      <TableCell>
                        {record.make} {record.model} ({record.year})
                      </TableCell>
                      <TableCell>{record.status ? getStatusBadge(record.status) : null}</TableCell>
                      <TableCell>{record.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Camera className="h-3 w-3" />
                            {/* {record.vehiclePhotos} */}
                            0
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {/* {record.formPhotos} */}
                            0
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <FileCheck className="h-3 w-3" />
                            {/* {record.certificatePhotos} */}
                            0
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

