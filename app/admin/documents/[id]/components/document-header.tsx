import { AlertTriangle, Badge, CheckCircle, Download } from "lucide-react";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";





interface DocumentHeaderProps {
    documentNumber: string
}

export default function DocumentHeader({ documentNumber }: DocumentHeaderProps) {

    return (
        <Card className='p-6 mb-6'>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">{documentNumber}</h1>
                <div className="flex space-x-2">
                    <Button variant="outline" disabled><Pencil className="w-4 h-4 mr-2" /> Chỉnh sửa thông tin</Button>
                    {/* <Button variant="outline" className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4 mr-2" /> Xóa xe</Button> */}
                    <Button>Gia hạn đăng ký</Button>
                </div>
            </div>
            {/* {getStatusBadge(vehicleData.registration.status)} */}
        </Card>
    )
}
