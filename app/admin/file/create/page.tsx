'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Car, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
    managementId: z.string().min(2, {
        message: "Management ID must be at least 2 characters.",
    }),
    registrationNumber: z.string().min(2, {
        message: "Registration number must be at least 2 characters.",
    }),
    type: z.string().min(1, {
        message: "Please select a vehicle type.",
    }),
    brand: z.string().min(2, {
        message: "Brand must be at least 2 characters.",
    }),
    model: z.string().min(2, {
        message: "Model must be at least 2 characters.",
    }),
    year: z.number().min(1900, {
        message: "Year must be 1900 or later.",
    }).max(new Date().getFullYear() + 1, {
        message: "Year cannot be in the future.",
    }),
    color: z.string().min(2, {
        message: "Color must be at least 2 characters.",
    }),
    licensePlate: z.string().min(2, {
        message: "License plate must be at least 2 characters.",
    }),
    vin: z.string().min(17).max(17, {
        message: "VIN must be exactly 17 characters.",
    }),
    owner: z.string().min(2, {
        message: "Owner name must be at least 2 characters.",
    }),
})

export default function CreateVehicle() {
    const { toast } = useToast()
    const router = useRouter()
    const [vehicleImage, setVehicleImage] = useState<File | null>(null)
    const [registrationFormImage, setRegistrationFormImage] = useState<File | null>(null)
    const [certificateImage, setCertificateImage] = useState<File | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            managementId: "",
            registrationNumber: "",
            type: "",
            brand: "",
            model: "",
            year: new Date().getFullYear(),
            color: "",
            licensePlate: "",
            vin: "",
            owner: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Here you would typically send the form data to your backend
        console.log(values)
        console.log("Vehicle Image:", vehicleImage)
        console.log("Registration Form Image:", registrationFormImage)
        console.log("Certificate Image:", certificateImage)

        toast({
            title: "Vehicle created",
            description: "The new vehicle has been successfully added to the system.",
        })

        // Redirect to the vehicle list page after successful submission
        router.push('/vehicles')
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0])
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Vehicle Registration</CardTitle>
                <CardDescription>Enter the details of the new vehicle to add it to the system.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="managementId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Management ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter management ID" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the internal ID used for managing the vehicle.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="registrationNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Registration Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter registration number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vehicle Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a vehicle type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="car">Car</SelectItem>
                                            <SelectItem value="motorcycle">Motorcycle</SelectItem>
                                            <SelectItem value="truck">Truck</SelectItem>
                                            <SelectItem value="suv">SUV</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="brand"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brand</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter brand" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="model"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Model</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter model" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Color</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter color" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="licensePlate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>License Plate</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter license plate" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>VIN</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter VIN" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="owner"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Owner</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter owner's name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-4">
                            <div>
                                <FormLabel>Vehicle Image</FormLabel>
                                <div className="mt-2 flex items-center gap-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, setVehicleImage)}
                                    />
                                    {vehicleImage && (
                                        <p className="text-sm text-gray-500">{vehicleImage.name}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <FormLabel>Registration Form Image</FormLabel>
                                <div className="mt-2 flex items-center gap-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, setRegistrationFormImage)}
                                    />
                                    {registrationFormImage && (
                                        <p className="text-sm text-gray-500">{registrationFormImage.name}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <FormLabel>Certificate of Export/Import Image</FormLabel>
                                <div className="mt-2 flex items-center gap-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, setCertificateImage)}
                                    />
                                    {certificateImage && (
                                        <p className="text-sm text-gray-500">{certificateImage.name}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            <Car className="mr-2 h-4 w-4" /> Create Vehicle
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}