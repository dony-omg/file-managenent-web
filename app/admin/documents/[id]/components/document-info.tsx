import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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



interface DocumentInfoProps {
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
        title: string; // Include title if needed
    };
}

export default function DocumentInfo() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Số đăng ký</Label>
                        <div>{vehicleData.registrationNumber}</div>
                    </div>
                    <div>
                        <Label>Loại xe</Label>
                        <div>{vehicleData.type}</div>
                    </div>
                    <div>
                        <Label>Hãng</Label>
                        <div>{vehicleData.brand}</div>
                    </div>
                    <div>
                        <Label>Model</Label>
                        <div>{vehicleData.model}</div>
                    </div>
                    <div>
                        <Label>Màu sắc</Label>
                        <div>{vehicleData.color}</div>
                    </div>
                    <div>
                        <Label>Năm sản xuất</Label>
                        <div>{vehicleData.year}</div>
                    </div>
                    <div className="col-span-2">
                        <Label>Chủ sở hữu</Label>
                        <div>{vehicleData.owner.name} - {vehicleData.owner.contact}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
