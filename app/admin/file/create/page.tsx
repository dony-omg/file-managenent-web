import NewDocumentForm from "./create-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
    return (
        <div className="flex justify-center">
            <div className="w-[600px]">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                Tạo mới hồ sơ
                            </h3>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <NewDocumentForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
