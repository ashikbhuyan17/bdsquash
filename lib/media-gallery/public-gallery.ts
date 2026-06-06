import { fetchPublicMediaGallery } from "@/lib/media-gallery"
import { getMediaGalleryImageUrl } from "@/lib/media-urls"
import {
  GALLERY_CATEGORIES,
  GALLERY_TYPES,
  type GalleryCategory,
  type GalleryType,
  type MediaGalleryItem,
} from "@/lib/types/media-gallery"

export const HOME_GALLERY_ITEM_COUNT = 5

export type GalleryPhotoSpan = "wide" | "tall"

export type PublicGalleryItem = {
  id: number
  cat: string
  title: string
  imageUrl: string
  newsLink: string
  galleryType: GalleryType
  span?: GalleryPhotoSpan
}

export const GALLERY_FILTER_OPTIONS = [
  { label: "All", value: null },
  { label: "Tournaments", value: "Tournaments" },
  { label: "National Team", value: "NationalTeam" },
  { label: "Training", value: "Training" },
  { label: "Juniors", value: "Juniors" },
  { label: "Events", value: "Events" },
] as const satisfies ReadonlyArray<{
  label: string
  value: GalleryCategory | null
}>

const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  Tournaments: "Tournaments",
  NationalTeam: "National Team",
  Training: "Training",
  Juniors: "Juniors",
  Events: "Events",
}

const GALLERY_SPANS: (GalleryPhotoSpan | undefined)[] = [
  "tall",
  undefined,
  "wide",
  undefined,
  undefined,
  "tall",
  undefined,
  undefined,
  "wide",
  undefined,
  undefined,
  undefined,
  "tall",
  undefined,
  undefined,
  "wide",
]

export function parseGalleryCategoryParam(
  param?: string
): GalleryCategory | undefined {
  if (!param) return undefined
  if (GALLERY_CATEGORIES.includes(param as GalleryCategory)) {
    return param as GalleryCategory
  }
  return undefined
}

export function parseGalleryTypeParam(param?: string): GalleryType {
  if (param && GALLERY_TYPES.includes(param as GalleryType)) {
    return param as GalleryType
  }
  return "GalleryImage"
}

export function getActiveGalleryCategoryLabel(
  category?: GalleryCategory
): string {
  if (!category) return "All"
  const option = GALLERY_FILTER_OPTIONS.find((item) => item.value === category)
  return option?.label ?? "All"
}

export function buildGalleryPageHref(
  galleryType: GalleryType,
  category?: GalleryCategory
): string {
  const params = new URLSearchParams()
  if (galleryType !== "GalleryImage") {
    params.set("galleryType", galleryType)
  }
  if (category) params.set("category", category)
  const query = params.toString()
  return query ? `/media-gallery?${query}` : "/media-gallery"
}

function galleryItemTitle(item: MediaGalleryItem): string {
  const title = (item.title ?? "").trim()
  if (title) return title
  const description = (item.description ?? "").trim()
  if (description) return description.slice(0, 80)
  return `Gallery ${item.id}`
}

export function mapGalleryItem(
  item: MediaGalleryItem,
  index?: number
): PublicGalleryItem {
  return {
    id: item.id,
    cat: CATEGORY_LABELS[item.category] ?? item.category,
    title: galleryItemTitle(item),
    imageUrl: item.image ? getMediaGalleryImageUrl(item.image) : "",
    newsLink: (item.newsLink ?? "").trim(),
    galleryType: item.galleryType,
    span:
      index !== undefined
        ? GALLERY_SPANS[index % GALLERY_SPANS.length]
        : undefined,
  }
}

export async function fetchPublicGalleryItems(options?: {
  pageNumber?: number
  pageSize?: number
  galleryType?: GalleryType
  category?: GalleryCategory
}): Promise<PublicGalleryItem[]> {
  const result = await fetchPublicMediaGallery({
    pageNumber: options?.pageNumber ?? 1,
    pageSize: options?.pageSize ?? 10,
    galleryType: options?.galleryType,
    category: options?.category,
  })

  return result.data
    .filter((item) => item.image)
    .map((item, index) => mapGalleryItem(item, index))
}

export async function loadHomeGallery(): Promise<PublicGalleryItem[]> {
  try {
    const items = await fetchPublicGalleryItems({
      pageSize: HOME_GALLERY_ITEM_COUNT,
      galleryType: "GalleryImage",
    })
    return items.slice(0, HOME_GALLERY_ITEM_COUNT)
  } catch {
    return []
  }
}

export async function loadGalleryPageData(options: {
  galleryType: GalleryType
  category?: GalleryCategory
}): Promise<{
  activeGalleryType: GalleryType
  activeCategory?: GalleryCategory
  activeCategoryLabel: string
  items: PublicGalleryItem[]
}> {
  const { galleryType, category } = options

  try {
    const items = await fetchPublicGalleryItems({
      pageSize: 10,
      galleryType,
      category,
    })

    return {
      activeGalleryType: galleryType,
      activeCategory: category,
      activeCategoryLabel: getActiveGalleryCategoryLabel(category),
      items,
    }
  } catch {
    return {
      activeGalleryType: galleryType,
      activeCategory: category,
      activeCategoryLabel: getActiveGalleryCategoryLabel(category),
      items: [],
    }
  }
}
