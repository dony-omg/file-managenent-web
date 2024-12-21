"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast"
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { useState, useEffect, useMemo } from "react";

interface UploadFileDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (file: File) => Promise<void>;
}

export function UploadFileDialog({
    isOpen,
    onClose,
    onUpload,
}: UploadFileDialogProps) {
    const { toast } = useToast();

    const handleClose = () => {
        uppy?.cancelAll();
        onClose();
    };

    const uppy = useMemo(() => {
        const uppyInstance = new Uppy({
            restrictions: {
                maxFileSize: 5000000,
                allowedFileTypes: ['image/*', '.pdf', '.doc', '.docx']
            },
            autoProceed: false
        })
            .use(XHRUpload, {
                endpoint: '/api/documents/upload',
                formData: true,
                fieldName: 'file',
            });

        uppyInstance.on('upload-success', (file, response) => {
            toast({
                title: "Success",
                description: "File uploaded successfully",
            });
            onClose();
        });

        uppyInstance.on('upload-error', (file, error) => {
            toast({
                title: "Error",
                description: "Failed to upload file",
                variant: "destructive",
            });
        });

        return uppyInstance;
    }, []);

    const handleUpload = () => {
        uppy.upload();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>
                        Select a file from your computer to upload
                    </DialogDescription>
                </DialogHeader>
                {uppy && (
                    <Dashboard
                        uppy={uppy}
                        plugins={['FileBrowser']}
                        height={350}
                        width="100%"
                    />
                )}
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleUpload}
                    >
                        Upload Files
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}