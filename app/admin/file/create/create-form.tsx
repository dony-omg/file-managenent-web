'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'

const formSchema = z.object({
    vehicleId: z.string().min(1, { message: 'Vehicle ID is required' }),
    ownerName: z.string().min(1, { message: 'Owner Name is required' }),
    vehicleType: z.string().min(1, { message: 'Vehicle Type is required' }),
    documentImages: z
        .array(z.instanceof(File))
        .optional()
        .refine(
            (files) => {
                if (files) {
                    return files.every((file) => file.size <= 5000000);
                }
                return true;
            },
            {
                message: "Each file size should not exceed 5MB.",
            }
        ),
    note: z.string().optional(),
})

export default function NewDocumentForm() {
    const router = useRouter()
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vehicleId: '',
            ownerName: '',
            vehicleType: '',
            documentImage: undefined,
            note: '',
        },
    })

    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files);
        setSelectedFiles(prev => [...prev, ...files]);
        form.setValue('documentImages', files);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setSelectedFiles(prev => [...prev, ...files]);
            form.setValue('documentImages', files);
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        const formData = new FormData();

        // Add other form fields
        Object.entries(values).forEach(([key, value]) => {
            if (value !== undefined && key !== 'documentImages') {
                formData.append(key, value as string);
            }
        });

        // Add multiple files
        selectedFiles.forEach((file, index) => {
            formData.append(`documentImages[${index}]`, file);
        });

        console.log(Object.fromEntries(formData));
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSubmitting(false)
        router.push('/admin/documents') // Redirect to admin documents list page
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid">
                    {/* Cột 1 */}
                    <div className="space-y-8">
                        <FormField
                            control={form.control}
                            name="vehicleId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mã Số Xe</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập mã số xe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ownerName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên Chủ Sở Hữu</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập tên chủ sở hữu" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vehicleType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Loại Xe</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn loại xe" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="car">Ô tô</SelectItem>
                                            <SelectItem value="motorcycle">Xe máy</SelectItem>
                                            <SelectItem value="truck">Xe tải</SelectItem>
                                            <SelectItem value="bus">Xe buýt</SelectItem>
                                            <SelectItem value="other">Khác</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="documentImages"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hình Ảnh Tài Liệu</FormLabel>
                            <FormControl>
                                <div
                                    className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive ? "border-primary" : "border-gray-300"
                                        }`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <Input
                                        type="file"
                                        multiple
                                        accept="image/*,.pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer text-primary hover:text-primary/80"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <span>Kéo thả file vào đây hoặc click để chọn file</span>
                                            <span className="text-sm text-gray-500">
                                                (Hỗ trợ nhiều file, tối đa 5MB mỗi file)
                                            </span>
                                        </div>
                                    </label>
                                    {selectedFiles.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            {selectedFiles.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                                    <span className="text-sm">{file.name}</span>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedFiles(files => files.filter((_, i) => i !== index));
                                                        }}
                                                    >
                                                        ✕
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription>
                                Tải lên các tài liệu xe (tối đa 5MB mỗi file).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ghi Chú</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Nhập ghi chú" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={() => router.push('/admin/documents')}>
                        Hủy
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}