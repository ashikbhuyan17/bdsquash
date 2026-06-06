import type { Metadata } from 'next'
import { BsrfEventsDetails } from '@/components/bsrf/details/events-details'
import {
  loadEventsPageData,
  parseEventStatusParam,
  parseEventTypeIdParam,
} from '@/lib/events/public-events'

export const metadata: Metadata = {
  title: 'Events & Tournaments | Bangladesh Squash Rackets Federation',
  description:
    'Upcoming and past BSRF squash tournaments and championships across Bangladesh.',
}

type EventsPageProps = {
  searchParams: Promise<{ eventStatus?: string; eventTypeId?: string }>
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams
  const eventStatus = parseEventStatusParam(params.eventStatus)
  const eventTypeId = parseEventTypeIdParam(params.eventTypeId)
  const data = await loadEventsPageData({ eventStatus, eventTypeId })

  return <BsrfEventsDetails {...data} />
}
