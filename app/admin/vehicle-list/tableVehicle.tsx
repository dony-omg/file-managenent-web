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
import { ChevronDown, Plus, Search, SlidersHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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

type VehicleList = {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  registrationDate: string;
  status: 'active' | 'expiring' | 'expired';
};

const TableVehicleList = ({ data }: { data: any }) => {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<VehicleList>[] = [
    {
      accessorKey: 'licensePlate',
      header: 'Biển số xe'
    },
    {
      accessorKey: 'brand',
      header: 'Nhãn hiệu'
    },
    {
      accessorKey: 'model',
      header: 'Dòng xe'
    },
    {
      accessorKey: 'status',
      header: 'Trạng thái'
    },
    {
      accessorKey: 'year',
      header: 'Năm sản xuất'
    },
    {
      accessorKey: 'registrationDate',
      header: 'Ngày đăng ký'
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
            Danh sách phương tiện
          </h3>
        </CardTitle>
        <CardDescription>
          Nhập thông tin tài liệu mới để thêm vào hệ thống.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {/* search and filter bar */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2 w-full">
              <Input placeholder="Tìm kiếm tài liệu..." className="max-w-sm" />
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Tìm Kiếm
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => router.push('/admin/vehicle-list/create')}>
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
          {/* close search and filter bar */}
          {/* table */}
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
                {/* {table.getRowModel().rows?.length ? (
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
                ) : ( */}
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
                {/* )} */}
              </TableBody>
            </Table>
          </div>
          {/* close table */}
        </div>
      </CardContent>
    </Card>
  );
};

export default TableVehicleList;
