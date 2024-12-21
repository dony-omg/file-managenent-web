import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


interface HistoryProps {
    activityHistory: Activity[];
}

interface Activity {
    id: string,
    performedat: string,
    action: string,
    performedby: string
}


export default function History({ activityHistory }: HistoryProps) {

    return (
        <Card >
            <CardHeader>
                <CardTitle>Lịch sử đăng ký và hoạt động</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ngày</TableHead>
                            <TableHead>Hành động</TableHead>
                            <TableHead>Chi tiết</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activityHistory?.map((activity: Activity, index: number) => (
                            <TableRow key={`${activity.id}-${index}`}>
                                <TableCell>{activity.performedat}</TableCell>
                                <TableCell>{activity.action}</TableCell>
                                <TableCell>{activity.performedby}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )

}