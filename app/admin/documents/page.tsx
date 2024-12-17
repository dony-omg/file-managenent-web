import { createClient } from '@/utils/supabase/server'
import DocumentList from './table'

export default async function Page() {
    const supabase = await createClient()

    const { data: documents, error } = await supabase
        .from('documents')
        .select(`*,vehicles (*)`).order('created_at', { ascending: false })

    console.log(documents)

    if (error) {
        console.error(error)
        return null
    }


    const documentList = documents.map((doc: any) => ({
        id: doc.document_id || 'N/A',
        registrationNumber: doc.document_number || 'N/A',
        type: doc.document_type || 'N/A',
        brand: doc.vehicles?.brand || 'N/A',
        model: doc.vehicles?.model || 'N/A',
        licenseplate: doc.vehicles?.licenseplate || 'N/A',
        status: doc.vehicles?.status,
        expiryDate: doc.issueDate
    }))


    return <DocumentList data={documentList} />
}