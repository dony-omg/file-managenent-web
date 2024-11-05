'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Pencil, Trash2, CarFront } from 'lucide-react'

interface Vehicle {
    id: string
    make: string
    model: string
    year: number
    type: 'sedan' | 'suv' | 'truck' | 'van'
    status: 'available' | 'in-use' | 'maintenance'
}

// Mock data
const mockVehicles: Vehicle[] = [
    { id: '1', make: 'Toyota', model: 'Camry', year: 2022, type: 'sedan', status: 'available' },
    { id: '2', make: 'Honda', model: 'CR-V', year: 2021, type: 'suv', status: 'in-use' },
    { id: '3', make: 'Ford', model: 'F-150', year: 2023, type: 'truck', status: 'maintenance' },
    { id: '4', make: 'Chevrolet', model: 'Express', year: 2020, type: 'van', status: 'available' },
    { id: '5', make: 'Nissan', model: 'Altima', year: 2022, type: 'sedan', status: 'in-use' },
]

export default function VehicleManagement() {
    const { toast } = useToast()
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false)
    const [isEditVehicleOpen, setIsEditVehicleOpen] = useState(false)
    const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null)
    const [newVehicle, setNewVehicle] = useState<Omit<Vehicle, 'id'>>({ make: '', model: '', year: 2023, type: 'sedan', status: 'available' })

    useEffect(() => {
        // Simulating API call with mock data
        setVehicles(mockVehicles)
    }, [])

    const handleAddVehicle = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            // Simulating API call
            const newId = (vehicles.length + 1).toString()
            const addedVehicle = { ...newVehicle, id: newId }
            setVehicles([...vehicles, addedVehicle])
            setIsAddVehicleOpen(false)
            setNewVehicle({ make: '', model: '', year: 2023, type: 'sedan', status: 'available' })
            toast({
                title: "Success",
                description: "Vehicle added successfully.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add vehicle. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleEditVehicle = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!currentVehicle) return
        try {
            // Simulating API call
            const updatedVehicles = vehicles.map(vehicle =>
                vehicle.id === currentVehicle.id ? currentVehicle : vehicle
            )
            setVehicles(updatedVehicles)
            setIsEditVehicleOpen(false)
            setCurrentVehicle(null)
            toast({
                title: "Success",
                description: "Vehicle updated successfully.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update vehicle. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleDeleteVehicle = async (id: string) => {
        if (!confirm('Are you sure you want to delete this vehicle?')) return
        try {
            // Simulating API call
            const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== id)
            setVehicles(updatedVehicles)
            toast({
                title: "Success",
                description: "Vehicle deleted successfully.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete vehicle. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-5">Vehicle Management</h1>
            <div className="flex justify-between items-center mb-5">
                <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <CarFront className="h-4 w-4" />
                            Add Vehicle
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Vehicle</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddVehicle} className="space-y-4">
                            <div>
                                <Label htmlFor="make">Make</Label>
                                <Input
                                    id="make"
                                    value={newVehicle.make}
                                    onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="model">Model</Label>
                                <Input
                                    id="model"
                                    value={newVehicle.model}
                                    onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    type="number"
                                    value={newVehicle.year}
                                    onChange={(e) => setNewVehicle({ ...newVehicle, year: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="type">Type</Label>
                                <Select
                                    value={newVehicle.type}
                                    onValueChange={(value: 'sedan' | 'suv' | 'truck' | 'van') => setNewVehicle({ ...newVehicle, type: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sedan">Sedan</SelectItem>
                                        <SelectItem value="suv">SUV</SelectItem>
                                        <SelectItem value="truck">Truck</SelectItem>
                                        <SelectItem value="van">Van</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={newVehicle.status}
                                    onValueChange={(value: 'available' | 'in-use' | 'maintenance') => setNewVehicle({ ...newVehicle, status: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="available">Available</SelectItem>
                                        <SelectItem value="in-use">In Use</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full">Add Vehicle</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Make</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vehicles.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                            <TableCell>{vehicle.make}</TableCell>
                            <TableCell>{vehicle.model}</TableCell>
                            <TableCell>{vehicle.year}</TableCell>
                            <TableCell>{vehicle.type}</TableCell>
                            <TableCell>{vehicle.status}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setCurrentVehicle(vehicle)
                                        setIsEditVehicleOpen(true)
                                    }}
                                >
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Edit vehicle</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteVehicle(vehicle.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete vehicle</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={isEditVehicleOpen} onOpenChange={setIsEditVehicleOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Vehicle</DialogTitle>
                    </DialogHeader>
                    {currentVehicle && (
                        <form onSubmit={handleEditVehicle} className="space-y-4">
                            <div>
                                <Label htmlFor="edit-make">Make</Label>
                                <Input
                                    id="edit-make"
                                    value={currentVehicle.make}
                                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, make: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-model">Model</Label>
                                <Input
                                    id="edit-model"
                                    value={currentVehicle.model}
                                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, model: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-year">Year</Label>
                                <Input
                                    id="edit-year"
                                    type="number"
                                    value={currentVehicle.year}
                                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, year: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="edit-type">Type</Label>
                                <Select
                                    value={currentVehicle.type}
                                    onValueChange={(value: 'sedan' | 'suv' | 'truck' | 'van') => setCurrentVehicle({ ...currentVehicle, type: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sedan">Sedan</SelectItem>
                                        <SelectItem value="suv">SUV</SelectItem>
                                        <SelectItem value="truck">Truck</SelectItem>
                                        <SelectItem value="van">Van</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="edit-status">Status</Label>
                                <Select
                                    value={currentVehicle.status}
                                    onValueChange={(value: 'available' | 'in-use' | 'maintenance') => setCurrentVehicle({ ...currentVehicle, status: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="available">Available</SelectItem>
                                        <SelectItem value="in-use">In Use</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full">Update Vehicle</Button>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}