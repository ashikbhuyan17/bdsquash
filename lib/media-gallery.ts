import "server-only"

import { getRequest, patchRequest, postRequest } from "@/lib/fetch"
import type {
  ApiDataResponse,
  MediaGalleryCreatePayload,
  MediaGalleryFilters,
  MediaGalleryItem,
  MediaGalleryListData,
  MediaGalleryUpdatePayload,
} from "@/lib/types/media-gallery"

function buildMediaGalleryQuery(filters: MediaGalleryFilters): string {
  const params = new URLSearchParams()
  params.set("pageNumber", String(filters.pageNumber))
  params.set("pageSize", String(filters.pageSize))

  if (filters.galleryType) {
    params.set("galleryType", filters.galleryType)
  }
  if (filters.category) {
    params.set("category", filters.category)
  }
  if (filters.isActive !== undefined) {
    params.set("isActive", String(filters.isActive))
  }

  return `/media-gallery?${params.toString()}`
}

export async function fetchMediaGallery(
  filters: MediaGalleryFilters
): Promise<MediaGalleryListData> {
  const response = await getRequest<ApiDataResponse<MediaGalleryListData>>(
    buildMediaGalleryQuery(filters),
    { cache: "no-store" }
  )

  if (!response.isValid || !response.data) {
    throw new Error(response.message || "Failed to load media gallery.")
  }

  return response.data
}

export async function fetchMediaGalleryItem(id: number): Promise<MediaGalleryItem> {
  const response = await getRequest<ApiDataResponse<MediaGalleryItem>>(
    `/media-gallery/${id}`,
    { cache: "no-store" }
  )

  if (!response.isValid || !response.data) {
    throw new Error(response.message || "Failed to load gallery item.")
  }

  return response.data
}

export async function createMediaGalleryItem(
  payload: MediaGalleryCreatePayload
): Promise<number> {
  const response = await postRequest<ApiDataResponse<number>>("/media-gallery", payload, {
    cache: "no-store",
  })

  if (!response.isValid) {
    throw new Error(response.message || "Failed to create gallery item.")
  }

  return response.data
}

export async function updateMediaGalleryItem(
  id: number,
  payload: MediaGalleryUpdatePayload
): Promise<void> {
  const response = await patchRequest<ApiDataResponse<unknown>>(
    `/media-gallery/${id}`,
    payload,
    { cache: "no-store" }
  )

  if (!response.isValid) {
    throw new Error(response.message || "Failed to update gallery item.")
  }
}

export async function updateMediaGalleryActiveStatus(
  id: number,
  isActive: boolean
): Promise<void> {
  const response = await patchRequest<ApiDataResponse<unknown>>(
    `/media-gallery/${id}/active-status`,
    { isActive },
    { cache: "no-store" }
  )

  if (!response.isValid) {
    throw new Error(response.message || "Failed to update gallery item status.")
  }
}
