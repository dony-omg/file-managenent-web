interface DocumentFile {
    id: string;
    filename: string;
    file_path: string;
    upload_date: string;
    document_id: string;
}

interface Document {
    documentid: string;
    documentNumber: string;
    createDate: string;
    expiryDate: string;
    documentFiles: DocumentFile[];
}
