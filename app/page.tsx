import { AdminLayout } from "@/components/admin-layout"
import { VehicleRecordList } from "@/components/vehicle-record-list"

export default function HomePage() {
  return (
    <AdminLayout>
      <VehicleRecordList />
    </AdminLayout>
  )
}

