"use client"

import { useState, useEffect, SetStateAction } from "react"
import { useRouter } from "next/navigation"
import {
  Car,
  FileText,
  FileCheck,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  Download,
  Printer,
  Share2,
  Edit,
  MoreHorizontal,
  ImageIcon,
  Info,
  History,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface VehicleRecordDetailProps {
  id: string
}

interface InspectionHistory {
  id: string
  date: string
  inspector: string
  inspectorAvatar?: string
  status: "approved" | "rejected" | "pending"
  notes: string
}

export function VehicleRecordDetail({ id }: VehicleRecordDetailProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [vehicleRecord, setVehicleRecord] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await fetch(`/api/vehicles/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle data')
        }
        const data = await response.json()
        setVehicleRecord(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchVehicleData()
  }, [id])

  // Mock inspection history
  const inspectionHistory: InspectionHistory[] = [
    {
      id: "1",
      date: "2024-02-15",
      inspector: "Michael Johnson",
      inspectorAvatar: "/placeholder.svg",
      status: "approved",
      notes: "Vehicle passed all inspection criteria. All documentation is in order.",
    },
    {
      id: "2",
      date: "2023-08-22",
      inspector: "Sarah Williams",
      inspectorAvatar: "/placeholder.svg",
      status: "approved",
      notes: "Annual inspection completed. Minor issues with brake pads noted but within acceptable limits.",
    },
    {
      id: "3",
      date: "2023-02-10",
      inspector: "David Brown",
      inspectorAvatar: "/placeholder.svg",
      status: "rejected",
      notes: "Failed inspection due to emissions test. Vehicle needs maintenance before re-inspection.",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Loading vehicle details...</h1>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-destructive">Error</h1>
          </div>
          <Card>
            <CardContent className="p-6">
              <p>{error}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!vehicleRecord) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Vehicle not found</h1>
          </div>
          <Card>
            <CardContent className="p-6">
              <p>The requested vehicle record could not be found.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* Header with back button and actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Vehicle Record Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Change Status</DropdownMenuItem>
                <DropdownMenuItem>Schedule Inspection</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete Record</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Summary card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <Car className="h-8 w-8 text-primary" />
                  <div>
                    <h2 className="text-xl font-bold">
                      {vehicleRecord.make} {vehicleRecord.model} ({vehicleRecord.year})
                    </h2>
                    <p className="text-muted-foreground">Registration: {vehicleRecord.registrationNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">VIN</p>
                    <p className="font-medium">{vehicleRecord.vin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div>{getStatusBadge(vehicleRecord.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Inspection</p>
                    <p className="font-medium">{vehicleRecord.lastInspection}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <p className="font-medium">{vehicleRecord.ownerName}</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3">
                <div className="aspect-video rounded-md overflow-hidden bg-muted">
                  <img
                    src={vehicleRecord.vehiclePhotos[0] || "/placeholder.svg"}
                    alt={`${vehicleRecord.make} ${vehicleRecord.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Photos & Documents
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Inspection History
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes
            </TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
                <CardDescription>Detailed information about the vehicle and its registration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Vehicle Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Make</p>
                        <p className="font-medium">{vehicleRecord.make}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Model</p>
                        <p className="font-medium">{vehicleRecord.model}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Year</p>
                        <p className="font-medium">{vehicleRecord.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Color</p>
                        <p className="font-medium">{vehicleRecord.color}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Fuel Type</p>
                        <p className="font-medium">{vehicleRecord.fuelType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Engine Number</p>
                        <p className="font-medium">{vehicleRecord.engineNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Registration Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Registration Number</p>
                        <p className="font-medium">{vehicleRecord.registrationNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">VIN</p>
                        <p className="font-medium">{vehicleRecord.vin}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Registration Date</p>
                        <p className="font-medium">{vehicleRecord.createdAt}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Inspection</p>
                        <p className="font-medium">{vehicleRecord.lastInspection}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-lg font-medium">Owner Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Owner Name</p>
                        <p className="font-medium">{vehicleRecord.ownerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Contact</p>
                        <p className="font-medium">{vehicleRecord.ownerContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photos & Documents Tab */}
          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle>Photos & Documents</CardTitle>
                <CardDescription>Vehicle photos and required documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Vehicle Photos */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      Vehicle Photos
                    </h3>
                    <Badge variant="secondary">{vehicleRecord.vehiclePhotos.length} photos</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {vehicleRecord.vehiclePhotos.map((photo: SetStateAction<string | null>, index: number) => (
                      <div
                        key={`vehicle-${index}`}
                        className="aspect-video rounded-md overflow-hidden bg-muted cursor-pointer"
                        onClick={() => setSelectedImage(photo)}
                      >
                        <img
                          src={typeof photo === 'string' ? photo : "/placeholder.svg"}
                          alt={`Vehicle photo ${index + 1}`}
                          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Form Photos */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Vehicle Record Establishment Form
                    </h3>
                    <Badge variant="secondary">{vehicleRecord.formPhotos.length} photos</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {vehicleRecord.formPhotos.map((photo: SetStateAction<string | null>, index: number) => (
                      <div
                        key={`form-${index}`}
                        className="aspect-video rounded-md overflow-hidden bg-muted cursor-pointer"
                        onClick={() => setSelectedImage(photo)}
                      >
                        <img
                          src={typeof photo === 'string' ? photo : "/placeholder.svg"}
                          alt={`Form photo ${index + 1}`}
                          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Certificate Photos */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Production/Assembly or Import Certificate
                    </h3>
                    <Badge variant="secondary">{vehicleRecord.certificatePhotos.length} photos</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {vehicleRecord.certificatePhotos.map((photo: SetStateAction<string | null>, index: number) => (
                      <div
                        key={`cert-${index}`}
                        className="aspect-video rounded-md overflow-hidden bg-muted cursor-pointer"
                        onClick={() => setSelectedImage(photo)}
                      >
                        <img
                          src={typeof photo === 'string' ? photo : "/placeholder.svg"}
                          alt={`Certificate photo ${index + 1}`}
                          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inspection History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Inspection History</CardTitle>
                <CardDescription>Record of all inspections performed on this vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {inspectionHistory.map((inspection, index) => (
                    <div key={inspection.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            inspection.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : inspection.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {inspection.status === "approved" ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : inspection.status === "rejected" ? (
                            <XCircle className="h-5 w-5" />
                          ) : (
                            <AlertCircle className="h-5 w-5" />
                          )}
                        </div>
                        {index < inspectionHistory.length - 1 && <div className="w-0.5 bg-border grow my-2"></div>}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{inspection.date}</span>
                          </div>
                          {getStatusBadge(inspection.status)}
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={inspection.inspectorAvatar} alt={inspection.inspector} />
                            <AvatarFallback>{inspection.inspector.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{inspection.inspector}</span>
                        </div>
                        <p className="text-sm">{inspection.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Schedule New Inspection
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Notes & Comments</CardTitle>
                <CardDescription>Additional notes and comments about this vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground text-center py-8">
                  No notes have been added to this vehicle record yet.
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add Note</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
            <DialogDescription>Vehicle documentation image</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center">
            {selectedImage && (
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Document preview"
                className="max-h-[70vh] object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

