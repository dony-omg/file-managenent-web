import NewDocumentForm from "./create-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
    return (
        <div className="flex justify-center">
            <div className="w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Tạo mới hồ sơ</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <NewDocumentForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
