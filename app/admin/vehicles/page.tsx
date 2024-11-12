'use client'

import { useState } from 'react'
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    ChevronDown,
    MoreHorizontal,
    Plus,
    Search,
    SlidersHorizontal,
    Eye,
    Pencil,
    Trash2,
    CheckCircle,
    AlertTriangle,
    X
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import { useRouter } from 'next/navigation'

// Mock data for vehicles
const data: Vehicle[] = [
    { id: 1, registrationNumber: 'ABC123', type: 'Car', brand: 'Toyota', owner: 'John Doe', status: 'active', expiryDate: '2024-05-15' },
    { id: 2, registrationNumber: 'XYZ789', type: 'Motorcycle', brand: 'Honda', owner: 'Jane Smith', status: 'expiring', expiryDate: '2023-08-30' },
    { id: 3, registrationNumber: 'DEF456', type: 'Truck', brand: 'Ford', owner: 'Bob Johnson', status: 'expired', expiryDate: '2023-03-01' },
    { id: 4, registrationNumber: 'GHI789', type: 'Car', brand: 'Chevrolet', owner: 'Alice Brown', status: 'active', expiryDate: '2024-11-20' },
    { id: 5, registrationNumber: 'JKL012', type: 'SUV', brand: 'Nissan', owner: 'Charlie Davis', status: 'active', expiryDate: '2024-09-10' },
]

type Vehicle = {
    id: number
    registrationNumber: string
    type: string
    brand: string
    owner: string
    status: 'active' | 'expiring' | 'expired'
    expiryDate: string
}

export default function VehicleList() {
    const router = useRouter()
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

    const columns: ColumnDef<Vehicle>[] = [
        {
            accessorKey: "registrationNumber",
            header: "Registration Number",
            cell: ({ row }) => <div className="font-medium">{row.getValue("registrationNumber")}</div>,
        },
        {
            accessorKey: "type",
            header: "Vehicle Type",
        },
        {
            accessorKey: "brand",
            header: "Brand",
        },
        {
            accessorKey: "owner",
            header: "Owner",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string
                return (
                    <Badge className={
                        status === 'active' ? "bg-green-500" :
                            status === 'expiring' ? "bg-yellow-500" :
                                "bg-red-500"
                    }>
                        {status === 'active' && <CheckCircle className="w-4 h-4 mr-1" />}
                        {status === 'expiring' && <AlertTriangle className="w-4 h-4 mr-1" />}
                        {status === 'expired' && <X className="w-4 h-4 mr-1" />}
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "expiryDate",
            header: "Expiry Date",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const vehicle = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSelectedVehicle(vehicle)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Edit', vehicle.id)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Delete', vehicle.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Document Registration</CardTitle>
                <CardDescription>Enter the details of the new vehicle to add it to the system.</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2 w-full">
                            <Input
                                placeholder="Search vehicles..."
                                value={(table.getColumn("registrationNumber")?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                    table.getColumn("registrationNumber")?.setFilterValue(event.target.value)
                                }
                                className="max-w-sm"
                            />
                            <Button>
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button onClick={() => router.push('/admin/vehicles/create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Document
                            </Button>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline">
                                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                                        Filter
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Filter Vehicles</SheetTitle>
                                        <SheetDescription>
                                            Use the options below to filter the vehicle list.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicleType">Vehicle Type</Label>
                                            <Select>
                                                <SelectTrigger id="vehicleType">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="car">Car</SelectItem>
                                                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                                                    <SelectItem value="truck">Truck</SelectItem>
                                                    <SelectItem value="suv">SUV</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="status">Registration Status</Label>
                                            <Select>
                                                <SelectTrigger id="status">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="expiring">Expiring Soon</SelectItem>
                                                    <SelectItem value="expired">Expired</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="owner">Owner</Label>
                                            <Input id="owner" placeholder="Filter by owner name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Expiry Date Range</Label>
                                            <div className="flex space-x-2">
                                                <Input type="date" placeholder="Start date" />
                                                <Input type="date" placeholder="End date" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="outline" onClick={() => console.log('Reset filters')}>Reset</Button>
                                        <Button onClick={() => console.log('Apply filters')}>Apply Filters</Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        Columns <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {table
                                        .getAllColumns()
                                        .filter((column) => column.getCanHide())
                                        .map((column) => {
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={column.id}
                                                    className="capitalize"
                                                    checked={column.getIsVisible()}
                                                    onCheckedChange={(value) =>
                                                        column.toggleVisibility(!!value)
                                                    }
                                                >
                                                    {column.id}
                                                </DropdownMenuCheckboxItem>
                                            )
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-between space-x-2 py-4">
                        <div className="flex-1 text-sm text-muted-foreground">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                    {selectedVehicle && (
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>Vehicle Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Registration Number</Label>
                                        <div>{selectedVehicle.registrationNumber}</div>
                                    </div>
                                    <div>
                                        <Label>Vehicle Type</Label>
                                        <div>{selectedVehicle.type}</div>
                                    </div>
                                    <div>
                                        <Label>Brand</Label>
                                        <div>{selectedVehicle.brand}</div>
                                    </div>
                                    <div>
                                        <Label>Owner</Label>
                                        <div>{selectedVehicle.owner}</div>
                                    </div>
                                    <div>
                                        <Label>Status</Label>
                                        <div>{selectedVehicle.status}</div>
                                    </div>
                                    <div>
                                        <Label>Expiry Date</Label>
                                        <div>{selectedVehicle.expiryDate}</div>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <Button variant="outline" onClick={() => console.log('Edit', selectedVehicle.id)}>Edit</Button>
                                    <Button variant="outline" className="text-red-500 hover:text-red-700" onClick={() => console.log('Delete', selectedVehicle.id)}>Delete</Button>
                                    <Button onClick={() => router.push(`/admin/vehicles/${selectedVehicle.id}`)}>View Full Details</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}