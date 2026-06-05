import { IMG_PLACEHOLDER_PNG, IMG_PLACEHOLDER_ALT } from "./constants"

/** True when the value is a seed/default tiny PNG, not a user image */
export function isPlaceholderDataUrl(value: string) {
  return value === IMG_PLACEHOLDER_PNG || value === IMG_PLACEHOLDER_ALT
}
