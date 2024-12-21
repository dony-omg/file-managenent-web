'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, PlusCircle, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

import { UploadFileDialog } from "./upload-file-dialog";
import { PreviewFileDialog } from "./preview-dialog";


interface DocumentListProps {
    documentFiles: Array<{ id: number; filename: string; type: string; uploadedat: string; url: string }>
}

export default function DocumentList({ documentFiles }: DocumentListProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [currentFileType, setCurrentFileType] = useState<string>('');
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    const handlePreview = (url: string, type: string) => {
        setPreviewUrl(url);
        setCurrentFileType(type);
        setIsPreviewOpen(true);
    };


    return (
        <>
            <Card className="md:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Tài liệu liên quan</CardTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsUploadOpen(true)}
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Tải lên tài liệu
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tên tài liệu</TableHead>
                                <TableHead>Ngày tải lên</TableHead>
                                <TableHead>Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documentFiles?.map((doc, index) => (
                                <TableRow key={`${doc.id}-${index}`}>
                                    <TableCell>{doc?.filename ?? ''}</TableCell>
                                    <TableCell>{doc.uploadedat}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button variant="outline" size="sm">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePreview(doc.url, doc.type)}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>s
                    </Table>
                </CardContent>
            </Card>

            <UploadFileDialog
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                onUpload={async (file: File) => {
                    // Handle file upload logic here
                }}
            />
            <PreviewFileDialog
                isOpen={isPreviewOpen}
                previewUrl={previewUrl ?? ""}
                onClose={() => setIsPreviewOpen(false)}
                onUpload={async (file: File) => {
                    // Handle file upload logic here
                }}
            />

        </>
    );
}


