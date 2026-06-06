export type PlayerFormatType = "Single" | "Team" | "Both"

export type PlayerGender = "Male" | "Female"

export const PLAYER_FORMAT_TYPES: PlayerFormatType[] = ["Single", "Team", "Both"]

export const PLAYER_GENDERS: PlayerGender[] = ["Male", "Female"]

export type Player = {
  userId: string
  name: string
  email: string
  phoneNumber: string
  isActive: boolean
  formetType: PlayerFormatType
  gender: PlayerGender
  worldRanking: number
  description: string
  profileLink: string
  profileImage: string | null
  club: string
  points: number
}

export type PlayerListData = {
  data: Player[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

export type PlayerRegistrationPayload = {
  userType: "Player"
  phoneNumber: string
  password: string
  email: string
  name: string
  profileImage: string
  playerInformation: {
    formetType: PlayerFormatType
    gender: PlayerGender
    worldRanking: number
    description: string
    profileLInk: string
    club: string
    points: number
  }
}

export type PlayerUpdatePayload = {
  name: string
  email: string
  phoneNumber: string
  formetType: PlayerFormatType
  gender: PlayerGender
  worldRanking: number
  description: string
  profileLink: string
  club: string
  points: number
  profileImage: string
}

export type ApiDataResponse<T> = {
  isValid: boolean
  data: T
  message: string
}

export type ApiPlayerFormValues = {
  name: string
  email: string
  phoneNumber: string
  password: string
  profileImage: string
  formetType: PlayerFormatType
  gender: PlayerGender
  worldRanking: string
  description: string
  profileLink: string
  club: string
  points: string
}
