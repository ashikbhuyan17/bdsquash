import { HOME_FEATURED_NEWS, HOME_NEWS_SIDE } from "@/lib/home/data"
import { fetchPublicMediaGallery } from "@/lib/media-gallery"
import { getMediaGalleryImageUrl } from "@/lib/media-urls"
import {
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type MediaGalleryItem,
} from "@/lib/types/media-gallery"
import type { NewsArticle, NewsFilterCategory } from "@/lib/news/data"

export const PUBLIC_NEWS_DATE = "30 JUL 2025"

export const NEWS_FILTER_OPTIONS = [
  { label: "All", value: null },
  { label: "Tournaments", value: "Tournaments" },
  { label: "NationalTeam", value: "NationalTeam" },
  { label: "Training", value: "Training" },
  { label: "Juniors", value: "Juniors" },
  { label: "Events", value: "Events" },
] as const satisfies ReadonlyArray<{
  label: string
  value: GalleryCategory | null
}>

const CATEGORY_CHIP_LABELS: Record<GalleryCategory, string> = {
  Tournaments: "TOURNAMENTS",
  NationalTeam: "NATIONAL TEAM",
  Training: "TRAINING",
  Juniors: "JUNIORS",
  Events: "EVENTS",
}

export const NEWS_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  Tournaments: "Tournaments",
  NationalTeam: "NationalTeam",
  Training: "Training",
  Juniors: "Juniors",
  Events: "Events",
}

export function parseNewsCategoryParam(
  param?: string
): GalleryCategory | undefined {
  if (!param) return undefined
  if (GALLERY_CATEGORIES.includes(param as GalleryCategory)) {
    return param as GalleryCategory
  }
  return undefined
}

export function getActiveNewsFilter(
  category?: GalleryCategory
): NewsFilterCategory {
  return category ?? "All"
}

export function getNewsFilterLabel(filter: NewsFilterCategory): string {
  if (filter === "All") return "all categories"
  return NEWS_CATEGORY_LABELS[filter]
}

export function mapMediaGalleryItemToNewsArticle(
  item: MediaGalleryItem,
  options?: { featured?: boolean }
): NewsArticle {
  const title = (item.title ?? "").trim()
  const description = (item.description ?? "").trim()

  return {
    id: item.id,
    cat: CATEGORY_CHIP_LABELS[item.category] ?? item.category.toUpperCase(),
    filter: item.category,
    title: title || description.slice(0, 120) || `News ${item.id}`,
    date: PUBLIC_NEWS_DATE,
    image: item.image ? getMediaGalleryImageUrl(item.image) : "/news-01.jpg",
    link: (item.newsLink ?? "").trim() || "/news",
    featured: options?.featured,
  }
}

export async function fetchPublicNewsArticles(options?: {
  pageNumber?: number
  pageSize?: number
  category?: GalleryCategory
}): Promise<NewsArticle[]> {
  const result = await fetchPublicMediaGallery({
    pageNumber: options?.pageNumber ?? 1,
    pageSize: options?.pageSize ?? 10,
    galleryType: "News",
    category: options?.category,
  })

  return result.data.map((item) => mapMediaGalleryItemToNewsArticle(item))
}

export function getFallbackHomeNews(): {
  featured: NewsArticle
  side: NewsArticle[]
} {
  return {
    featured: {
      id: 0,
      cat: "TOURNAMENTS",
      filter: "Tournaments",
      title: HOME_FEATURED_NEWS.title,
      date: HOME_FEATURED_NEWS.date,
      image: HOME_FEATURED_NEWS.image,
      link: HOME_FEATURED_NEWS.link,
      featured: true,
    },
    side: HOME_NEWS_SIDE.map((item, index) => ({
      id: index + 1,
      cat: item.cat,
      filter: index === 0 ? "NationalTeam" : "Training",
      title: item.title,
      date: item.date,
      image: item.image,
      link: item.link,
    })),
  }
}

export async function loadHomeNews(): Promise<{
  featured: NewsArticle
  side: NewsArticle[]
}> {
  try {
    const articles = await fetchPublicNewsArticles({ pageSize: 3 })
    if (articles.length === 0) return getFallbackHomeNews()

    return {
      featured: { ...articles[0], featured: true },
      side: articles.slice(1, 3),
    }
  } catch {
    return getFallbackHomeNews()
  }
}

export async function loadNewsPageData(category?: GalleryCategory): Promise<{
  activeFilter: NewsFilterCategory
  featured: NewsArticle | null
  articles: NewsArticle[]
}> {
  const activeFilter = getActiveNewsFilter(category)

  try {
    const allItems = await fetchPublicNewsArticles({ pageSize: 10 })
    const featured = allItems[0]
      ? { ...allItems[0], featured: true }
      : null

    if (activeFilter === "All") {
      return {
        activeFilter,
        featured,
        articles: allItems.slice(1),
      }
    }

    const filteredItems = await fetchPublicNewsArticles({
      pageSize: 10,
      category,
    })

    return {
      activeFilter,
      featured,
      articles: filteredItems.filter((article) => article.id !== featured?.id),
    }
  } catch {
    return { activeFilter, featured: null, articles: [] }
  }
}
