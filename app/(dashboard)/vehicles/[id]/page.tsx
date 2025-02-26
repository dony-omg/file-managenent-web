import { AdminLayout } from "@/components/admin-layout"
import { VehicleRecordDetail } from "@/components/vehicle-record-detail"

interface VehicleDetailPageProps {
  params: {
    id: string
  }
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  return (
    <AdminLayout>
      <VehicleRecordDetail id={params.id} />
    </AdminLayout>
  )
}

