export type EventStatus = "Ongoing" | "Upcoming" | "Past"

export const EVENT_STATUSES: EventStatus[] = ["Ongoing", "Upcoming", "Past"]

export type Event = {
  eventId: number
  eventTypeId: number
  eventTypeName: string
  name: string
  startDate: string
  endDate: string
  description: string
  address: string
  latitude: number
  longitude: number
  image: string | null
  isActive: boolean
  eventStatus: EventStatus
}

export type EventListData = {
  data: Event[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

export type EventCreatePayload = {
  eventTypeId: number
  name: string
  startDate: string
  endDate: string
  description: string
  address: string
  latitude: number
  longitude: number
  image: string
}

export type EventUpdatePayload = Omit<EventCreatePayload, "eventTypeId">

export type EventFilters = {
  pageNumber: number
  pageSize: number
  active?: boolean
  eventTypeId?: number
  eventId?: number
  eventStatus?: EventStatus
}

export type ApiDataResponse<T> = {
  isValid: boolean
  data: T
  message: string
}

export type EventFormValues = {
  eventTypeId: string
  name: string
  startDate: string
  endDate: string
  description: string
  address: string
  latitude: string
  longitude: string
  image: string
}

export type EventsFilterState = {
  active: "all" | "active" | "inactive"
  eventTypeId: string
  eventId: string
  eventStatus: "all" | EventStatus
}
