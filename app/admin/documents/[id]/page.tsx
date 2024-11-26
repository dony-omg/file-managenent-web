import { createClient } from '@/utils/supabase/server'
import DocumentHeader from './components/document-header'
import DocumentInfo from './components/document-info'
import DocumentMetadata from './components/document-metadata'
import DocumentList from './components/document-list'
import History from './components/document-history'

async function getDocument(id: string) {
    const supabase = await createClient(); // Ensure you have your Supabase client initialized

    const { data, error } = await supabase
        .from('documents') // Replace with your actual table name
        .select('*') // Select all fields or specify the fields you need
        .eq('document_id', id) // Filter by document_id
        .single(); // Use .single() to get a single record

    if (error) {
        console.error('Error fetching document:', error);
        return null; // Handle error appropriately
    }

    return data;
}

export default async function DocumentsDetail({
    params
}: {
    params: { id: string }
}) {

    const id = (await params).id

    const document = await getDocument(id)

    console.log('Document:', document)


    return (
        <div className="container mx-auto p-4">
            <DocumentHeader document={document} />
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <DocumentInfo document={document} />
                </div>
                <DocumentMetadata document={document} />
                <DocumentList document={document} />
                <div className="md:col-span-3">
                    <History document={document} />
                </div>
            </div>
        </div>
    )
}