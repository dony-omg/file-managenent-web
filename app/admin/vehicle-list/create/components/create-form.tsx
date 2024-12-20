'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  licensePlate: z.string().min(1, {
    message: 'License plate is required'
  }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  model: z.string().max(100),
  year: z.number().min(1, { message: 'Year is required' }),
  registrationDate: z
    .string()
    .date()
    .min(1, { message: 'Registration date is required' }),
  status: z.enum(['active', 'expiring', 'expired'])
});

export default function NewVehicleForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licensePlate: 'licensePlate',
      brand: 'brand',
      model: '',
      year: 1999,
      registrationDate: '1999/01/01',
      status: 'active'
    }
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* first row */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="licensePlate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số đăng ký</FormLabel>
                <FormControl>
                  <Input placeholder="licensePlate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhãn hiệu</FormLabel>
                <FormControl>
                  <Input placeholder="brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* second row */}
        <div>
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dòng xe</FormLabel>
                <FormControl>
                  <Input placeholder="model" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* third row */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Năm sản xuất</FormLabel>
                <FormControl>
                  <Input placeholder="year" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registrationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày đăng ký</FormLabel>
                <FormControl>
                  <Input placeholder="registrationDate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* fourth row */}
        <div>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Đang hoạt động</SelectItem>
                      <SelectItem value="expiring">Sắp hết hạn</SelectItem>
                      <SelectItem value="expired">Đã hết hạn</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
