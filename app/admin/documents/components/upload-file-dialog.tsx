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
import { useState, useEffect } from "react";

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
    const [uppy, setUppy] = useState<Uppy | null>(null);
    const { toast } = useToast();

    const handleClose = () => {
        uppy?.cancelAll();
        onClose();
    };

    useEffect(() => {
        const uppyInstance = new Uppy({
            restrictions: {
                maxFileSize: 10 * 1024 * 1024, // 10MB
                maxNumberOfFiles: 1,
                allowedFileTypes: ['image/*', '.pdf', '.doc', '.docx']
            },
            autoProceed: false,
        });

        uppyInstance.use(XHRUpload, {
            endpoint: '/api/upload', // Your upload endpoint
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

        setUppy(uppyInstance);

        // return () => uppyInstance.close({ reason: 'unmount' });
    }, []);

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
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
