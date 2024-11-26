import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Dữ liệu giả lập cho lịch sử hoạt động
const activityHistory = [
    { id: 1, action: 'Gia hạn đăng ký', date: '2023-01-01', details: 'Gia hạn đăng ký hàng năm' },
    { id: 2, action: 'Thêm tài liệu', date: '2023-01-01', details: 'Thêm tài liệu bảo hiểm mới' },
    { id: 3, action: 'Cập nhật thông tin', date: '2022-12-15', details: 'Cập nhật thông tin liên hệ của chủ xe' },
    { id: 4, action: 'Đăng ký ban đầu', date: '2022-01-01', details: 'Đăng ký xe ban đầu' },
]

export default function History() {

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
                        {activityHistory.map((activity) => (
                            <TableRow key={activity.id}>
                                <TableCell>{activity.date}</TableCell>
                                <TableCell>{activity.action}</TableCell>
                                <TableCell>{activity.details}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )

}