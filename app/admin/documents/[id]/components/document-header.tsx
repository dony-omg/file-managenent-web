import { AlertTriangle, Badge, CheckCircle, Download } from "lucide-react";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";



// Dữ liệu giả lập cho xe
const vehicleData = {
    id: 1,
    registrationNumber: "ABC 123",
    type: "Xe hơi",
    brand: "Toyota",
    model: "Camry",
    color: "Bạc",
    year: 2022,
    owner: {
        name: "John Doe",
        contact: "+1 234 567 8900"
    },
    registration: {
        date: "2023-01-01",
        expiry: "2024-01-01",
        status: "active"
    }
}


interface DocumentHeaderProps {
    document: {
        id: number;
        registrationNumber: string;
        type: string;
        brand: string;
        model: string;
        color: string;
        year: number;
        owner: {
            name: string;
            contact: string;
        };
        registration: {
            date: string;
            expiry: string;
            status: string;
        };
        metadata: {
            createdAt: string;
            updatedAt: string;
            additionalInfo: string;
        };
        title: string;
    };
    onDownload: () => void;
    onPreview: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export default function DocumentHeader() {

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-500"><CheckCircle className="w-4 h-4 mr-1" /> Hoạt động</Badge>
            case 'expiring':
                return <Badge className="bg-yellow-500"><AlertTriangle className="w-4 h-4 mr-1" /> Sắp hết hạn</Badge>
            case 'expired':
                return <Badge className="bg-red-500"><AlertTriangle className="w-4 h-4 mr-1" /> Hết hạn</Badge>
            default:
                return null
        }
    }

    return (
        <Card className='p-6 mb-6'>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">{vehicleData.registrationNumber}</h1>
                <div className="flex space-x-2">
                    <Button variant="outline"><Pencil className="w-4 h-4 mr-2" /> Chỉnh sửa thông tin</Button>
                    <Button variant="outline" className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4 mr-2" /> Xóa xe</Button>
                    <Button>Gia hạn đăng ký</Button>
                </div>
            </div>
            {getStatusBadge(vehicleData.registration.status)}
        </Card>
    )
}
