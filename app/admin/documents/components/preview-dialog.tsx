"use client"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PreviewFileDialogProps {
    isOpen: boolean;
    previewUrl: string;
    onClose: () => void;
    onUpload: (file: File) => Promise<void>;
}

export function PreviewFileDialog({
    isOpen,
    previewUrl,
    onClose,
}: PreviewFileDialogProps) {

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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[80vh]">
                <DialogTitle className="sr-only">Document Preview</DialogTitle>
                <Button
                    variant="ghost"
                    className="absolute right-4 top-4"
                    onClick={onClose}
                >
                    {/* <X className="h-4 w-4" /> */}
                </Button>
                <div className="w-full h-full mt-6">
                    {/* {previewUrl && renderPreview(previewUrl, currentFileType)} */}

                </div>
            </DialogContent>
        </Dialog>
    )
}
