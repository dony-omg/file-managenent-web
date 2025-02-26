"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, FileText, FileCheck, Upload, Plus, Loader2, Image, X } from "lucide-react"

interface CreateVehicleRecordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateVehicleRecordDialog({ open, onOpenChange }: CreateVehicleRecordDialogProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [vehiclePhotos, setVehiclePhotos] = useState<string[]>([])
  const [formPhotos, setFormPhotos] = useState<string[]>([])
  const [certificatePhotos, setCertificatePhotos] = useState<string[]>([])

  const [formData, setFormData] = useState({
    registrationNumber: "",
    vin: "",
    make: "",
    model: "",
    year: "",
    color: "",
    engineNumber: "",
    fuelType: "",
    ownerName: "",
    ownerContact: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would typically send the data to your API
    console.log("Vehicle record created:", {
      ...formData,
      vehiclePhotos,
      formPhotos,
      certificatePhotos,
    })

    setIsSubmitting(false)
    onOpenChange(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      registrationNumber: "",
      vin: "",
      make: "",
      model: "",
      year: "",
      color: "",
      engineNumber: "",
      fuelType: "",
      ownerName: "",
      ownerContact: "",
    })
    setVehiclePhotos([])
    setFormPhotos([])
    setCertificatePhotos([])
    setActiveTab("details")
  }

  const simulatePhotoUpload = (photoType: "vehicle" | "form" | "certificate") => {
    // Generate a random placeholder image
    const width = 800
    const height = 600
    const placeholderUrl = `/placeholder.svg?height=${height}&width=${width}`

    switch (photoType) {
      case "vehicle":
        setVehiclePhotos((prev) => [...prev, placeholderUrl])
        break
      case "form":
        setFormPhotos((prev) => [...prev, placeholderUrl])
        break
      case "certificate":
        setCertificatePhotos((prev) => [...prev, placeholderUrl])
        break
    }
  }

  const removePhoto = (photoType: "vehicle" | "form" | "certificate", index: number) => {
    switch (photoType) {
      case "vehicle":
        setVehiclePhotos((prev) => prev.filter((_, i) => i !== index))
        break
      case "form":
        setFormPhotos((prev) => prev.filter((_, i) => i !== index))
        break
      case "certificate":
        setCertificatePhotos((prev) => prev.filter((_, i) => i !== index))
        break
    }
  }

  const renderPhotoUploader = (
    title: string,
    description: string,
    photoType: "vehicle" | "form" | "certificate",
    photos: string[],
  ) => {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group aspect-video rounded-md overflow-hidden border bg-muted">
              <img
                src={photo || "/placeholder.svg"}
                alt={`${photoType} photo ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={() => removePhoto(photoType, index)}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => simulatePhotoUpload(photoType)}
            className="flex flex-col items-center justify-center gap-2 aspect-video rounded-md border border-dashed bg-muted/50 p-4 hover:bg-muted transition-colors"
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Upload Photo</span>
          </button>
        </div>
      </div>
    )
  }

  const isDetailsComplete = () => {
    return formData.registrationNumber && formData.vin && formData.make && formData.model && formData.year
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        onOpenChange(newOpen)
        if (!newOpen) resetForm()
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle Record
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Vehicle Record</DialogTitle>
            <DialogDescription>Add a new vehicle record to the inspection system.</DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-5">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="details" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Details
              </TabsTrigger>
              <TabsTrigger value="photos" className="flex items-center gap-2" disabled={!isDetailsComplete()}>
                <Image className="h-4 w-4" />
                Photos
              </TabsTrigger>
              <TabsTrigger value="forms" className="flex items-center gap-2" disabled={!isDetailsComplete()}>
                <FileText className="h-4 w-4" />
                Forms
              </TabsTrigger>
              <TabsTrigger value="certificates" className="flex items-center gap-2" disabled={!isDetailsComplete()}>
                <FileCheck className="h-4 w-4" />
                Certificates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vin">VIN (Vehicle Identification Number) *</Label>
                  <Input id="vin" name="vin" value={formData.vin} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make *</Label>
                  <Input id="make" name="make" value={formData.make} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input id="model" name="model" value={formData.model} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input id="year" name="year" value={formData.year} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" name="color" value={formData.color} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="engineNumber">Engine Number</Label>
                  <Input
                    id="engineNumber"
                    name="engineNumber"
                    value={formData.engineNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select value={formData.fuelType} onValueChange={(value) => handleSelectChange("fuelType", value)}>
                  <SelectTrigger id="fuelType">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="lpg">LPG</SelectItem>
                    <SelectItem value="cng">CNG</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input id="ownerName" name="ownerName" value={formData.ownerName} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerContact">Owner Contact</Label>
                  <Input
                    id="ownerContact"
                    name="ownerContact"
                    value={formData.ownerContact}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="photos" className="py-4">
              {renderPhotoUploader(
                "Vehicle Photos",
                "Upload photos of the vehicle from different angles (front, back, sides).",
                "vehicle",
                vehiclePhotos,
              )}

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                  Back
                </Button>
                <Button type="button" onClick={() => setActiveTab("forms")}>
                  Next: Forms
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="forms" className="py-4">
              {renderPhotoUploader(
                "Vehicle Record Establishment Form",
                "Upload photos of the completed vehicle record establishment form.",
                "form",
                formPhotos,
              )}

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={() => setActiveTab("photos")}>
                  Back
                </Button>
                <Button type="button" onClick={() => setActiveTab("certificates")}>
                  Next: Certificates
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="certificates" className="py-4">
              {renderPhotoUploader(
                "Production/Assembly or Import Certificate",
                "Upload photos of the production, assembly, or import certificate.",
                "certificate",
                certificatePhotos,
              )}

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={() => setActiveTab("forms")}>
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Creating..." : "Create Vehicle Record"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-4">
            {activeTab === "details" && (
              <>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={() => setActiveTab("photos")} disabled={!isDetailsComplete()}>
                  Next: Photos
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

