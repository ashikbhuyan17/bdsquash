export type EventType = {
  eventTypeId: number
  name: string
  image: string | null
  description: string
  isActive: boolean
}

export type EventTypeListData = {
  data: EventType[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

export type EventTypePayload = {
  name: string
  image: string
  description: string
}

export type ApiDataResponse<T> = {
  isValid: boolean
  data: T
  message: string
}

export type EventTypeFormValues = {
  name: string
  image: string
  description: string
}
