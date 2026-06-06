export type AdminInformation = {
  name: string
  email: string | null
  phoneNumber: string
  profileImage: string | null
}

export type AdminInformationUpdatePayload = {
  name: string
  email: string
  phoneNumber: string
}

export type ApiDataResponse<T> = {
  isValid: boolean
  data: T
  message: string
}
