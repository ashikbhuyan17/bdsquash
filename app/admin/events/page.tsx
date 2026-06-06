import { EventsAdminClient } from "@/components/admin/modules/events-admin-client"
import { fetchEventTypes } from "@/lib/event-types"
import { fetchEvents } from "@/lib/events"

export default async function AdminEventsPage() {
  const [initialData, eventTypesResult] = await Promise.all([
    fetchEvents({ pageNumber: 1, pageSize: 10 }),
    fetchEventTypes(1, 100),
  ])

  return (
    <EventsAdminClient
      initialData={initialData}
      eventTypeOptions={eventTypesResult.data}
    />
  )
}
