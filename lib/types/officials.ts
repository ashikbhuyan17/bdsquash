export type OfficialType = "Coach" | "Official"

export const OFFICIAL_TYPES: OfficialType[] = ["Coach", "Official"]

export type Official = {
  officialId: number
  name: string
  phoneNumber: string
  email: string
  officialType: OfficialType
  profileImage: string | null
  designation: string
  description: string
  profileLink: string
  isActive: boolean
}

export type OfficialListData = {
  data: Official[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

export type OfficialRegistrationPayload = {
  name: string
  phoneNumber: string
  email: string
  officialType: OfficialType
  profileImage: string
  designation: string
  description: string
  profileLink: string
}

export type OfficialUpdatePayload = OfficialRegistrationPayload

export type OfficialFilters = {
  pageNumber: number
  pageSize: number
  officialType?: OfficialType
}

export type OfficialsFilterState = {
  officialType: "all" | OfficialType
}

export type ApiDataResponse<T> = {
  isValid: boolean
  data: T
  message: string
}
