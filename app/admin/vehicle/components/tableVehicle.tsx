'use client';

import { useState } from 'react';
import { Vehicle } from '@/type/types';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    ColumnFiltersState,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    VisibilityState,
} from "@tanstack/react-table"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, SlidersHorizontal, ChevronDown, Trash2, Pencil, Eye } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const TableVehicleList = ({ data }: { data: Vehicle[] }) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const columns: ColumnDef<Vehicle>[] = [
        {
            accessorKey: 'licenseplate',
            header: 'Biển số xe',
        },
        {
            accessorKey: 'brand',
            header: 'Nhãn hiệu',
        },
        {
            accessorKey: 'model',
            header: 'Dòng xe',
        },
        {
            accessorKey: 'status',
            header: 'Trạng thái',
        },
        {
            accessorKey: 'year',
            header: 'Năm sản xuất',
        },
        {
            accessorKey: 'registrationdate',
            header: 'Ngày đăng ký',
            cell: ({ row }) => new Date(row.original.registrationdate).toLocaleDateString('vi-VN'),
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const vehicle = row.original
                return (
                    <div className="flex space-x-2">
                        <Button
                            variant="ghost"
                            onClick={() => console.log('View', vehicle.id)}
                            className="h-8 w-8 p-0"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => console.log('Edit', vehicle.id)}
                            className="h-8 w-8 p-0"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => console.log('Delete', vehicle.id)}
                            className="h-8 w-8 p-0"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                )
            }
        }
    ]
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        }
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Quản Lý Xe
                    </h3>
                </CardTitle>
                <CardDescription>
                    Quản lý thông tin các phương tiện trong hệ thống.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2 w-full">
                        <Input
                            placeholder="Tìm kiếm biển số xe..."
                            value={(table.getColumn('licenseplate')?.getFilterValue() as string) ?? ''}
                            onChange={(event) =>
                                table.getColumn('licenseplate')?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                        <Button>
                            <Search className="mr-2 h-4 w-4" />
                            Tìm Kiếm
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Thêm xe mới
                        </Button>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline">
                                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                                    Bộ Lọc
                                </Button>
                            </SheetTrigger>
                        </Sheet>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table.getAllColumns()
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
                                        );
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
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{' '}
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
            </CardContent>
        </Card>
    );
};

export default TableVehicleList;
