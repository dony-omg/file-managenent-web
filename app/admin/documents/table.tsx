'use client';

import { useState } from 'react';
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
  useReactTable
} from '@tanstack/react-table';
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
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

type Vehicle = {
  id: number;
  registrationNumber: string;
  type: string;
  brand: string;
  owner: string;
  status: 'active' | 'expiring' | 'expired';
  expiryDate: string;
};

export default function DocumentList({ data }: { data: any }) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const columns: ColumnDef<Vehicle>[] = [
    {
      accessorKey: 'registrationNumber',
      header: 'Số Đăng Ký',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('registrationNumber')}</div>
      )
    },
    {
      accessorKey: 'type',
      header: 'Loại Xe'
    },
    {
      accessorKey: 'brand',
      header: 'Thương Hiệu'
    },
    // {
    //     accessorKey: "owner",
    //     header: "Chủ Sở Hữu",
    // },
    {
      accessorKey: 'status',
      header: 'Trạng Thái',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge
            className={
              status === 'active'
                ? 'bg-green-500'
                : status === 'expiring'
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }
          >
            {status === 'active' && <CheckCircle className="w-4 h-4 mr-1" />}
            {status === 'expiring' && (
              <AlertTriangle className="w-4 h-4 mr-1" />
            )}
            {status === 'expired' && <X className="w-4 h-4 mr-1" />}
            {status === 'active'
              ? 'Đang hoạt động'
              : status === 'expiring'
              ? 'Sắp hết hạn'
              : 'Đã hết hạn'}
          </Badge>
        );
      }
    },
    {
      accessorKey: 'expiryDate',
      header: 'Ngày Hết Hạn'
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const vehicle = row.original;
        return (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => setSelectedVehicle(vehicle)}
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
        );
      }
    }
  ];

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
      rowSelection
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Quản Lý Tài Liệu
          </h3>
        </CardTitle>
        <CardDescription>
          Nhập thông tin tài liệu mới để thêm vào hệ thống.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2 w-full">
              <Input
                placeholder="Tìm kiếm tài liệu..."
                value={
                  (table
                    .getColumn('registrationNumber')
                    ?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table
                    .getColumn('registrationNumber')
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Tìm Kiếm
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => router.push('/admin/documents/create')}>
                <Plus className="mr-2 h-4 w-4" />
                Tạo hồ sơ mới
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Bộ Lọc
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Bộ Lọc Tài Liệu</SheetTitle>
                    <SheetDescription>
                      Sử dụng các tùy chọn dưới đây để lọc danh sách tài liệu.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType">Loại Xe</Label>
                      <Select>
                        <SelectTrigger id="vehicleType">
                          <SelectValue placeholder="Chọn loại xe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">Ô tô</SelectItem>
                          <SelectItem value="motorcycle">Xe máy</SelectItem>
                          <SelectItem value="truck">Xe tải</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Trạng Thái Đăng Ký</Label>
                      <Select>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Đang hoạt động</SelectItem>
                          <SelectItem value="expiring">Sắp hết hạn</SelectItem>
                          <SelectItem value="expired">Đã hết hạn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="owner">Chủ Sở Hữu</Label>
                      <Input id="owner" placeholder="Lọc theo tên chủ sở hữu" />
                    </div>
                    <div className="space-y-2">
                      <Label>Khoảng Thời Gian</Label>
                      <div className="flex space-x-2">
                        <Input type="date" placeholder="Ngày bắt đầu" />
                        <Input type="date" placeholder="Ngày kết thúc" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => console.log('Reset filters')}
                    >
                      Đặt Lại
                    </Button>
                    <Button onClick={() => console.log('Apply filters')}>
                      Áp Dụng
                    </Button>
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
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
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
          {selectedVehicle && (
            <Dialog
              open={!!selectedVehicle}
              onOpenChange={() => setSelectedVehicle(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Chi Tiết Xe</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Số Đăng Ký</Label>
                    <div>{selectedVehicle.registrationNumber}</div>
                  </div>
                  <div>
                    <Label>Loại Xe</Label>
                    <div>{selectedVehicle.type}</div>
                  </div>
                  <div>
                    <Label>Thương Hiệu</Label>
                    <div>{selectedVehicle.brand}</div>
                  </div>
                  {/* <div>
                                        <Label>Chủ Sở Hữu</Label>
                                        <div>{selectedVehicle.owner}</div>
                                    </div> */}
                  <div>
                    <Label>Trạng Thái</Label>
                    <div>{selectedVehicle.status}</div>
                  </div>
                  <div>
                    <Label>Ngày Hết Hạn</Label>
                    <div>{selectedVehicle.expiryDate}</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => console.log('Edit', selectedVehicle.id)}
                  >
                    Chỉnh Sửa
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => console.log('Delete', selectedVehicle.id)}
                  >
                    Xóa
                  </Button>
                  <Button
                    onClick={() =>
                      router.push(`/admin/documents/${selectedVehicle.id}`)
                    }
                  >
                    Xem Chi Tiết
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
