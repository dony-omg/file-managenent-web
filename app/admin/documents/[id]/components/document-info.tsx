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




interface DocumentHeaderProps {
    document: any; // Replace 'any' with the actual type of your document
}

export default function DocumentInfo({ document }: DocumentHeaderProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Số đăng ký</Label>
                        <div>{document?.registrationNumber}</div>
                    </div>
                    <div>
                        <Label>Loại xe</Label>
                        <div>{document?.type}</div>
                    </div>
                    <div>
                        <Label>Hãng</Label>
                        <div>{document?.brand}</div>
                    </div>
                    <div>
                        <Label>Model</Label>
                        <div>{document?.model}</div>
                    </div>
                    <div>
                        <Label>Màu sắc</Label>
                        <div>{document?.color}</div>
                    </div>
                    <div>
                        <Label>Năm sản xuất</Label>
                        <div>{document?.year}</div>
                    </div>
                    <div className="col-span-2">
                        <Label>Chủ sở hữu</Label>
                        <div>{document?.owner?.name} - {document?.owner?.contact}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
