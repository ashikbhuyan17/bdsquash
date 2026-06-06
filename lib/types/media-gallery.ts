export type GalleryType = "GalleryImage" | "Video" | "News"

export const GALLERY_TYPES: GalleryType[] = ["GalleryImage", "Video", "News"]

export type GalleryCategory =
  | "Tournaments"
  | "NationalTeam"
  | "Training"
  | "Juniors"
  | "Events"

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "Tournaments",
  "NationalTeam",
  "Training",
  "Juniors",
  "Events",
]

export type MediaGalleryItem = {
  id: number
  galleryType: GalleryType
  category: GalleryCategory
  image: string | null
  newsLink: string
  description: string
  isActive: boolean
}

export type MediaGalleryListData = {
  data: MediaGalleryItem[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

export type MediaGalleryCreatePayload = {
  galleryType: GalleryType
  category: GalleryCategory
  image: string
  newsLink: string
  description: string
  isActive: boolean
}

export type MediaGalleryUpdatePayload = Omit<MediaGalleryCreatePayload, "isActive">

export type MediaGalleryFilters = {
  pageNumber: number
  pageSize: number
  galleryType?: GalleryType
  category?: GalleryCategory
  isActive?: boolean
}

export type ApiDataResponse<T> = {
  isValid: boolean
  data: T
  message: string
}

export type MediaGalleryFilterState = {
  galleryType: "all" | GalleryType
  category: "all" | GalleryCategory
  active: "all" | "active" | "inactive"
}
