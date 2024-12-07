import { createClient } from '@/utils/supabase/server'
import DocumentList from './table'

// Define the type for the document
type Vehicle = {
    registration_number: string | null;
    vehicle_type: string | null;
    brand: string | null;
    color?: string | null; // Optional properties
    year_of_manufacture?: number | null; // Optional properties
};

type Document = {
    document_id: string;
    document_type: string;
    vehicle_id: string | null;
    vehicles: Vehicle | null;
    uploaded_at: string | null;
}[]

export default async function Page() {
    const supabase = await createClient()

    const { data: documents, error } = await supabase
        .from('documents')
        .select(`*`)

    console.log(documents)

    if (error) {
        console.error(error)
        return null
    }


    const documentList = documents.map((doc: any) => ({
        id: doc.documentId || 'N/A',
        registrationNumber: doc.documentNumber || 'N/A',
        type: doc.documentType || 'N/A',
        brand: doc.vehicles?.brand || 'N/A',
        owner: 'Unknown',
        status: doc.uploaded_at ? 'active' : 'inactive',
        expiryDate: doc.expiryDate
    }))


    return <DocumentList data={documentList} />
}