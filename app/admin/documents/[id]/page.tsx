import DocumentHeader from './components/document-header'
import DocumentInfo from './components/document-info'
import DocumentMetadata from './components/document-metadata'
import DocumentList from './components/document-list'
import History from './components/document-history'

export default function VehicleDetail() {

    return (
        <div className="container mx-auto p-4">
            <DocumentHeader />

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <DocumentInfo />
                </div>
                <DocumentMetadata />
                <DocumentList />
                <div className="md:col-span-3">
                    <History />
                </div>
            </div>
        </div>
    )
}