import { OfficialsAdminClient } from "@/components/admin/modules/officials-admin-client"
import { fetchOfficials } from "@/lib/officials"

export default async function AdminOfficialsPage() {
  const initialData = await fetchOfficials({ pageNumber: 1, pageSize: 10 })

  return <OfficialsAdminClient initialData={initialData} />
}
