import "server-only"

import { getRequest, patchRequest, postRequest } from "@/lib/fetch"
import type {
  ApiDataResponse,
  EventCreatePayload,
  EventFilters,
  EventListData,
  EventUpdatePayload,
} from "@/lib/types/events"

function buildEventsQuery(filters: EventFilters): string {
  const params = new URLSearchParams()
  params.set("pageNumber", String(filters.pageNumber))
  params.set("pageSize", String(filters.pageSize))

  if (filters.active !== undefined) {
    params.set("active", String(filters.active))
  }
  if (filters.eventTypeId !== undefined) {
    params.set("eventTypeId", String(filters.eventTypeId))
  }
  if (filters.eventId !== undefined) {
    params.set("eventId", String(filters.eventId))
  }
  if (filters.eventStatus) {
    params.set("eventStatus", filters.eventStatus)
  }

  return `/events?${params.toString()}`
}

export async function fetchEvents(filters: EventFilters): Promise<EventListData> {
  const response = await getRequest<ApiDataResponse<EventListData>>(
    buildEventsQuery(filters),
    { cache: "no-store" }
  )

  if (!response.isValid || !response.data) {
    throw new Error(response.message || "Failed to load events.")
  }

  return response.data
}

export async function createEvent(payload: EventCreatePayload): Promise<number> {
  const response = await postRequest<ApiDataResponse<number>>("/event", payload, {
    cache: "no-store",
  })

  if (!response.isValid) {
    throw new Error(response.message || "Failed to create event.")
  }

  return response.data
}

export async function updateEvent(
  eventId: number,
  payload: EventUpdatePayload
): Promise<void> {
  const response = await patchRequest<ApiDataResponse<unknown>>(
    `/events/${eventId}`,
    payload,
    { cache: "no-store" }
  )

  if (!response.isValid) {
    throw new Error(response.message || "Failed to update event.")
  }
}

export async function updateEventActiveStatus(
  eventId: number,
  isActive: boolean
): Promise<void> {
  const response = await patchRequest<ApiDataResponse<unknown>>(
    `/events/${eventId}/active-status`,
    { isActive },
    { cache: "no-store" }
  )

  if (!response.isValid) {
    throw new Error(response.message || "Failed to update event status.")
  }
}
