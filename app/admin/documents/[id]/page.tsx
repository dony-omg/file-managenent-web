import { createClient } from '@/utils/supabase/server'
import DocumentHeader from './components/document-header'
import DocumentInfo from './components/document-info'
import DocumentMetadata from './components/document-metadata'
import DocumentList from './components/document-list'
import History from './components/document-history'

// // Define a type for the params
// type Params = { id: string };

// async function getDocument(id: string) {
//     const supabase = await createClient(); // Ensure you have your Supabase client initialized

//     const { data, error } = await supabase
//         .from('documents') // Replace with your actual table name
//         .select('*') // Select all fields or specify the fields you need
//         .eq('documentid', id) // Filter by document_id
//         .single(); // Use .single() to get a single record

//     if (error) {
//         console.error('Error fetching document:', error);
//         return null; // Handle error appropriately
//     }

//     return data;
// }


// async function getDocumentFilesByDocumentId(documentId: string) {
//     const supabase = await createClient(); // Ensure you have your Supabase client initialized  
//     const { data, error } = await supabase.from('documentfiles').select('*').eq('documentid', documentId)

//     if (error) {
//         console.error('Error fetching document files:', error);
//         return []; // Handle error appropriately
//     }

//     return data;

// }

// async function getDocumentLogs(documentId: string) {
//     const supabase = await createClient();

//     const { data, error } = await supabase
//         .from('documentlogs')
//         .select('*')
//         .eq('documentid', documentId)
//     // .order('created_at', { ascending: false });

//     if (error) {
//         console.error('Error fetching document logs:', error);
//         return [];
//     }

//     return data;
// }



export default async function DocumentsDetail() {

    // const id = (await params).id

    // const document = await getDocument(id)
    // const documentFiles = await getDocumentFilesByDocumentId(id)
    // const documentLogs = await getDocumentLogs(id); // Add this line

    const document = {
        documentNumber: ''
    }
    const documentFiles = []
    const documentLogs = []



    const documentNumber = document?.documentNumber
    // const metadata = {
    //     createdAt: document?.createDate || '',
    //     updatedAt: '',
    //     expiryDate: document?.expiryDate || '',
    // }


    return (
        <div className="container mx-auto p-4">
            <DocumentHeader documentNumber={documentNumber} />
            <div className="grid md:grid-cols-3 gap-6">
                {/* <div className="md:col-span-2">
                    <DocumentInfo document={document} />
                </div> */}
                {/* <DocumentMetadata metadata={metadata} />
                <DocumentList documentFiles={documentFiles} />
                <div className="md:col-span-3">
                    <History activityHistory={documentLogs} />
                </div> */}
            </div>
        </div>
    )
}