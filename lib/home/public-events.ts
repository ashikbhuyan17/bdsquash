import { HOME_EVENTS } from "@/lib/home/data"
import {
  formatEventDateParts,
  mapEventToPublicCard,
} from "@/lib/events/public-events"
import { fetchPublicEvents } from "@/lib/events"
import type { Event } from "@/lib/types/events"
import type { EventStatus } from "@/lib/types/events"

export const HOME_UPCOMING_EVENT_COUNT = 3

export type HomeEventCard = {
  id: number
  d: string
  m: string
  name: string
  loc: string
  status: EventStatus
}

export function mapEventToHomeCard(event: Event): HomeEventCard {
  const card = mapEventToPublicCard(event)
  return {
    id: card.id,
    d: card.d,
    m: card.m,
    name: card.name,
    loc: card.loc,
    status: card.status,
  }
}

export function getFallbackHomeEvents(): HomeEventCard[] {
  return HOME_EVENTS.map((event, index) => ({
    id: index,
    d: event.d,
    m: event.m,
    name: event.name,
    loc: event.loc,
    status: "Upcoming" as const,
  }))
}

export async function loadHomeUpcomingEvents(): Promise<HomeEventCard[]> {
  try {
    const result = await fetchPublicEvents({
      pageNumber: 1,
      pageSize: HOME_UPCOMING_EVENT_COUNT,
      eventStatus: "Upcoming",
    })

    const events = result.data
      .slice(0, HOME_UPCOMING_EVENT_COUNT)
      .map(mapEventToHomeCard)

    return events.length > 0 ? events : getFallbackHomeEvents()
  } catch {
    return getFallbackHomeEvents()
  }
}

export { formatEventDateParts }
