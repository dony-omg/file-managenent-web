'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface DocumentListProps {
    documentFiles: Array<{ id: number; filename: string; type: string; uploadedat: string }>
}

export default function DocumentList({ documentFiles }: DocumentListProps) {

    return (
        <Card className="md:col-span-3">
            <CardHeader>
                <CardTitle>Tài liệu liên quan</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tên tài liệu</TableHead>
                            {/* <TableHead>Loại</TableHead> */}
                            <TableHead>Ngày tải lên</TableHead>
                            <TableHead>Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {documentFiles?.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell>{doc?.filename ?? ''}</TableCell>
                                {/* <TableCell>{doc?.type?.toUpperCase()}</TableCell> */}
                                <TableCell>{doc.uploadedat}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm"><Download className="w-4 h-4" /></Button>
                                        <Button variant="outline" size="sm"><Eye className="w-4 h-4" /></Button>
                                        {/* <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button> */}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* <Button className="mt-4">
                    <PlusCircle className="w-4 h-4 mr-2" /> Thêm tài liệu
                </Button> */}
            </CardContent>
        </Card>
    )
}