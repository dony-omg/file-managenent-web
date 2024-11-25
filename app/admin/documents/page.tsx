import { createClient } from '@/utils/supabase/server'
import DocumentList from './table'

// Define the type for the document
type Document = {
    vehicle_id: string | null;
    vehicles: {
        registration_number: string | null;
        vehicle_type: string | null;
        brand: string | null;
    } | null;
    uploaded_at: string | null;
    // Add other fields as necessary
}

export default async function Page() {
    const supabase = await createClient()
    const { data: documents, error } = await supabase
        .from('documents')
        .select(`
            document_id,
            document_type,
            file_path,
            uploaded_at,
            note,
            vehicle_id,
            vehicles (
                registration_number,
                vehicle_type,
                brand,
                color,
                year_of_manufacture
            )
        `)
        .order('uploaded_at', { ascending: false })


    //   {
    //     document_id: 231231111,
    //     document_type: 'vehicle',
    //     file_path: 'https://www.google.com',
    //     uploaded_at: '2024-11-22T16:19:09.961136',
    //     note: '',
    //     vehicle_id: null,
    //     vehicles: null
    // }


    console.log('Documents:', documents)

    if (error) {
        console.error(error)
        return null
    }

    console.log('Documents with vehicles:', documents)

    const documentList = documents.map((doc: Document) => ({
        id: doc.vehicle_id, // Assuming vehicle_id is unique and corresponds to the id
        registrationNumber: doc.vehicles?.registration_number || 'N/A', // Fallback if vehicles is null
        type: doc.vehicles?.vehicle_type || 'N/A',
        brand: doc.vehicles?.brand || 'N/A',
        owner: 'Unknown', // You may want to replace this with actual owner data if available
        status: doc.uploaded_at ? 'active' : 'inactive', // Example status logic
        expiryDate: doc.uploaded_at // Example expiry date logic
    }))

    return <DocumentList data={documentList} />
}