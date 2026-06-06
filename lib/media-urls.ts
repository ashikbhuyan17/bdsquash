import { isPlaceholderDataUrl } from "@/lib/admin/is-placeholder-data-url"
import { publicEnv } from "@/lib/env"

export function getEventTypeImageUrl(filename: string | null | undefined): string {
  if (!filename) return ""
  if (filename.startsWith("data:") || /^https?:\/\//i.test(filename)) return filename
  return `${publicEnv.apiUrl}/event-type-image/${filename}`
}

export function getEventImageUrl(filename: string | null | undefined): string {
  if (!filename) return ""
  if (filename.startsWith("data:") || /^https?:\/\//i.test(filename)) return filename
  return `${publicEnv.apiUrl}/event-image/${filename}`
}

export function getProfileImageUrl(filename: string | null | undefined): string {
  if (!filename) return ""
  if (filename.startsWith("data:") || /^https?:\/\//i.test(filename)) return filename
  return `${publicEnv.apiUrl}/profile-image/${filename}`
}

export function getMediaGalleryImageUrl(filename: string | null | undefined): string {
  if (!filename) return ""
  if (filename.startsWith("data:") || /^https?:\/\//i.test(filename)) return filename
  return `${publicEnv.apiUrl}/gallery-image/${filename}`
}

function extractMediaFilename(value: string): string | null {
  const match = value.match(
    /\/(?:event-(?:type-)?image|profile-image|gallery-image)\/([^/?#]+)$/i
  )
  return match?.[1] ?? null
}

/** Send base64 for new uploads, filename for unchanged API images, empty when cleared. */
export function toApiMediaValue(
  value: string,
  existingFilename?: string | null
): string {
  if (!value || isPlaceholderDataUrl(value)) return ""
  if (value.startsWith("data:")) return value

  const filename = extractMediaFilename(value)
  if (filename) return filename

  if (existingFilename) return existingFilename

  return value
}

export function toMediaPreviewValue(
  filename: string | null | undefined,
  resolver: (name: string | null | undefined) => string
): string {
  if (!filename) return ""
  return resolver(filename)
}
