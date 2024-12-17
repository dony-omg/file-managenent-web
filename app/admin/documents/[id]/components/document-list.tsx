'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, PlusCircle, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface DocumentListProps {
    documentFiles: Array<{ id: number; filename: string; type: string; uploadedat: string; url: string }>
}

export default function DocumentList({ documentFiles }: DocumentListProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [currentFileType, setCurrentFileType] = useState<string>('');

    const handlePreview = (url: string, type: string) => {
        setPreviewUrl(url);
        setCurrentFileType(type);
        setIsPreviewOpen(true);
    };

    const closePreview = () => {
        setPreviewUrl(null);
        setIsPreviewOpen(false);
    };


    const renderPreview = (url: string, fileType: string) => {
        if (fileType.includes('pdf')) {
            return <iframe src={url} className="w-full h-full" title="PDF Preview" />;
        }
        if (fileType.includes('image')) {
            return <img src={url} alt="Preview" className="max-w-full max-h-full object-contain" />;
        }
        // Add more file type conditions as needed
        return <div>Preview not available for this file type</div>;
    };


    return (
        <>
            <Card className="md:col-span-3">
                <CardHeader>
                    <CardTitle>Tài liệu liên quan</CardTitle>
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
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="max-w-4xl h-[80vh]">
                    <DialogTitle className="sr-only">Document Preview</DialogTitle>
                    <Button
                        variant="ghost"
                        className="absolute right-4 top-4"
                        onClick={closePreview}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                    <div className="w-full h-full mt-6">
                        {previewUrl && renderPreview(previewUrl, currentFileType)}


                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}


