export type AdminStatus = "active" | "draft"

export type WithAdminMeta = {
  id: string
  active: boolean
}

export type Banner = WithAdminMeta & {
  image: string
  title: string
  description: string
  bannerLink: string
}

export type News = WithAdminMeta & {
  newsDate: string
  image: string
  title: string
  description: string
  newsLink: string
}

export type Player = WithAdminMeta & {
  name: string
  profileImage: string
  ranking: number
  country: string
  bio: string
}

export type Gallery = WithAdminMeta & {
  image: string
  title: string
  galleryLink: string
}

export type About = WithAdminMeta & {
  history: string
  presidentMessage: string
  mission: string
  vision: string
}
