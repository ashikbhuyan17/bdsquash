export type Faq = {
  faqId: number
  question: string
  answer: string
  isActive: boolean
}

export type FaqListData = {
  data: Faq[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

export type FaqPayload = {
  question: string
  answer: string
}

export type ApiDataResponse<T> = {
  isValid: boolean
  data: T
  message: string
}
