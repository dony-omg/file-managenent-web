import { AdminLayout } from "@/components/admin-layout"
import { VehicleRecordList } from "@/components/vehicle-record-list"

export default function VehiclesPage() {
  return (
    <AdminLayout>
      <VehicleRecordList />
    </AdminLayout>
  )
}

