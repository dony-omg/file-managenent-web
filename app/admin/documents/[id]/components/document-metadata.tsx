'use client'
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";


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



interface DocumentMetadataProps {
    metadata: {
        createdAt: string;
        updatedAt: string;
        expiryDate: string;
    };
    // document: any
}

export default function DocumentMetadata({ metadata }: DocumentMetadataProps) {
    const [reminderEnabled, setReminderEnabled] = useState(false)

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
        <Card className="md:col-span-3">
            <CardHeader>
                <CardTitle>Thông tin đăng ký</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div>
                        <Label>Ngày đăng ký</Label>
                        <div>{metadata?.createdAt}</div>
                    </div>
                    <div>
                        <Label>Ngày hết hạn</Label>
                        <div>{metadata?.expiryDate}</div>
                    </div>
                    <div>
                        <Label>Cập nhật lần cuối</Label>
                        <div>{metadata?.expiryDate}</div>
                    </div>

                    {/* <div className="flex items-center space-x-2">
                        <Switch
                            id="reminder"
                            checked={reminderEnabled}
                            onCheckedChange={setReminderEnabled}
                        />
                        <Label htmlFor="reminder">Nhắc nhở gia hạn</Label>
                    </div> */}
                </div>
            </CardContent>
        </Card>
    )
}
