import { HOME_HERO_SHOTS } from "@/lib/home/data"
import { getMediaGalleryImageUrl } from "@/lib/media-urls"
import type { GalleryCategory, MediaGalleryItem } from "@/lib/types/media-gallery"

export const HERO_GALLERY_SLIDE_COUNT = 5

export type HomeHeroSlide = {
  id: number
  title: string
  caption: string
  imageUrl: string
}

const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  Tournaments: "Tournaments",
  NationalTeam: "National Team",
  Training: "Training",
  Juniors: "Juniors",
  Events: "Events",
}

function formatCategory(category: GalleryCategory): string {
  return CATEGORY_LABELS[category] ?? category
}

export function mapGalleryItemsToHeroSlides(
  items: MediaGalleryItem[]
): HomeHeroSlide[] {
  return items
    .filter((item) => item.image)
    .slice(0, HERO_GALLERY_SLIDE_COUNT)
    .map((item) => ({
      id: item.id,
      title:
        (item.title ?? "").trim() ||
        (item.description ?? "").trim() ||
        formatCategory(item.category),
      caption: formatCategory(item.category),
      imageUrl: getMediaGalleryImageUrl(item.image),
    }))
}

export function getFallbackHeroSlides(): HomeHeroSlide[] {
  return HOME_HERO_SHOTS.map((shot, index) => ({
    id: index,
    title: shot.title,
    caption: shot.caption,
    imageUrl: "",
  }))
}
