'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
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

import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/utils/supabase/client'
import { useToast } from "@/hooks/use-toast"
import { Dashboard, DragDrop } from '@uppy/react'
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import Webcam from '@uppy/webcam'


// Add these imports at the top
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

export default function NewDocumentForm() {


    const supabase = createClient()

    const formSchema = z.object({
        documentId: z.string().min(1, { message: 'Document ID is required' }),
        vehicleId: z.string().min(1, { message: 'Vehicle ID is required' }),
        // ownerName: z.string().optional(),
        vehicleType: z.string().optional(),
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


    const router = useRouter()
    const { toast } = useToast()

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            documentId: '',
            vehicleId: '',
            // ownerName: '',
            // vehicleType: '',
            documentImages: [],
            note: '',
        },
    })

    // Modify the Uppy instance configuration
    const uppy = useMemo(() => {
        return new Uppy({
            restrictions: {
                maxFileSize: 5000000,
                allowedFileTypes: ['image/*', '.pdf', '.doc', '.docx']
            }
        })
        // .use(Webcam, {
        //     modes: ['picture'],
        //     mirror: true,
        // })
    }, [])



    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true);



            // Create document record with actual file paths
            const documentData = {
                vehicleId: 1,
                documentType: 'Registration',
                documentNumber: values.documentId,
                note: values.note,
                issueDate: new Date(),
            };

            const response = await fetch('/api/documents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(documentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to create document. Please try again."
                });
                throw new Error(`Failed to create document: ${errorData.message}`);
            }

            const document = await response.json();

            // [
            //     {
            //         "documentid": 6,
            //         "vehicleId": 1,
            //         "documentType": "Registration",
            //         "documentNumber": "23127",
            //         "issueDate": "2024-12-07",
            //         "expiryDate": null,
            //         "createDate": "2024-12-07T10:12:20.817922",
            //         "note": ""
            //     }
            // ]

            const documentId = document?.data[0]?.documentid || undefined;



            console.log('documentId', documentId);

            // 2. Cấu hình tải tệp lên Supabase Storage
            uppy.use(XHRUpload, {
                endpoint: '/api/documents/upload',
                fieldName: 'file',
                method: 'POST',
                formData: true,
                // headers: {
                //     'Authorization': `Bearer ${yourAuthToken}`,
                // },
            });

            const upLoadedResult = await uppy.upload();

            if (upLoadedResult && upLoadedResult.failed && upLoadedResult.failed.length > 0) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to upload file. Please try again."
                });
                throw new Error('Failed to upload file');
            }

            if (upLoadedResult && Array.isArray(upLoadedResult.successful)) {
                for (const file of upLoadedResult.successful) {
                    if (file.response && file.response.body) {

                        const fileUrl = `${supabase.storage.from('documents').getPublicUrl(file.response.body.Key).data.publicUrl}`;

                        const { error: fileError } = await supabase.from('documentfiles').insert([
                            {
                                documentid: documentId,
                                fileurl: fileUrl,
                                filename: file.response.body.Key,
                                uploadedat: new Date(),
                            },
                        ]);

                        if (fileError) throw fileError;
                    }
                }
            }


            toast({
                title: "Success",
                description: "Document created successfully",
            });

            router.push('/admin/documents');

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create document. Please try again."
            });
        } finally {
            setIsSubmitting(false);
        }
    } return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid">
                    {/* Cột 1 */}
                    <div className="space-y-8">
                        <FormField
                            control={form.control}
                            name="documentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số quản lý sổ</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập m số xe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        {/* <FormField
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
                        /> */}
                        {/* <FormField
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
                        /> */}
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="documentImages"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hình Ảnh Tài Liệu</FormLabel>
                            <FormControl>
                                <Dashboard uppy={uppy} />
                            </FormControl>
                            <FormDescription>
                                Tải lên các tài liệu xe (tối đa 5MB mỗi file).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <Dashboard uppy={uppy} plugins={['Webcam']} proudlyDisplayPoweredByUppy={false} /> */}
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
