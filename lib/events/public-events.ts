import { format, parseISO } from "date-fns"
import { fetchPublicEvents } from "@/lib/events"
import { fetchPublicEventTypes } from "@/lib/event-types"
import { getEventImageUrl } from "@/lib/media-urls"
import type { Event, EventStatus } from "@/lib/types/events"
import type { EventType } from "@/lib/types/event-types"

export type PublicEventCard = {
  id: number
  eventTypeId: number
  d: string
  m: string
  y: string
  cat: string
  name: string
  loc: string
  desc: string
  status: EventStatus
  imageUrl: string
}

export function formatEventDateParts(startDate: string): {
  d: string
  m: string
  y: string
} {
  try {
    const date = parseISO(startDate)
    return {
      d: format(date, "dd"),
      m: format(date, "MMM").toUpperCase(),
      y: format(date, "yyyy"),
    }
  } catch {
    return { d: "--", m: "---", y: "----" }
  }
}

export function mapEventToPublicCard(event: Event): PublicEventCard {
  const { d, m, y } = formatEventDateParts(event.startDate)

  return {
    id: event.eventId,
    eventTypeId: event.eventTypeId,
    d,
    m,
    y,
    cat: event.eventTypeName,
    name: event.name,
    loc: event.address,
    desc: event.description,
    status: event.eventStatus,
    imageUrl: event.image ? getEventImageUrl(event.image) : "",
  }
}

export function parseEventStatusParam(param?: string): EventStatus {
  if (param === "Past" || param === "Ongoing" || param === "Upcoming") {
    return param
  }
  return "Upcoming"
}

export function parseEventTypeIdParam(param?: string): number | undefined {
  if (!param) return undefined
  const id = Number(param)
  return Number.isFinite(id) && id > 0 ? id : undefined
}

export function buildEventsPageHref(
  eventStatus: EventStatus,
  eventTypeId?: number
): string {
  const params = new URLSearchParams()
  params.set("eventStatus", eventStatus)
  if (eventTypeId) params.set("eventTypeId", String(eventTypeId))
  return `/events?${params.toString()}`
}

export function getEventRowStatusLabel(
  status: EventStatus
): "Registration Open" | "Coming Soon" | undefined {
  if (status === "Ongoing") return "Registration Open"
  if (status === "Upcoming") return "Coming Soon"
  return undefined
}

export async function loadEventsPageData(options: {
  eventStatus: EventStatus
  eventTypeId?: number
}): Promise<{
  activeStatus: EventStatus
  activeEventTypeId?: number
  eventTypes: EventType[]
  featured: PublicEventCard | null
  events: PublicEventCard[]
}> {
  const { eventStatus, eventTypeId } = options

  let eventTypes: EventType[] = []
  try {
    eventTypes = (await fetchPublicEventTypes(1, 50)).data
  } catch {
    eventTypes = []
  }

  try {
    const listResult = await fetchPublicEvents({
      pageNumber: 1,
      pageSize: 10,
      eventStatus,
      eventTypeId,
    })

    const events = listResult.data.map(mapEventToPublicCard)
    const featured =
      eventStatus !== "Past" && events[0] ? events[0] : null

    return {
      activeStatus: eventStatus,
      activeEventTypeId: eventTypeId,
      eventTypes,
      featured,
      events,
    }
  } catch {
    return {
      activeStatus: eventStatus,
      activeEventTypeId: eventTypeId,
      eventTypes,
      featured: null,
      events: [],
    }
  }
}
