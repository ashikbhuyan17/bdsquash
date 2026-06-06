import { EventTypesAdminClient } from "@/components/admin/modules/event-types-admin-client"
import { fetchEventTypes } from "@/lib/event-types"

export default async function AdminEventTypesPage() {
  const initialData = await fetchEventTypes(1, 10)

  return <EventTypesAdminClient initialData={initialData} />
}
