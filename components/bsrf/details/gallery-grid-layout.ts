const SPARSE_THRESHOLD = 7

export function isSparseGallery(count: number): boolean {
  return count > 0 && count < SPARSE_THRESHOLD
}

export function getSparseGalleryGridClass(count: number): string {
  switch (count) {
    case 1:
      return 'grid w-full max-w-3xl grid-cols-1 gap-[14px]'
    case 2:
      return 'grid w-full max-w-4xl grid-cols-1 gap-[14px] sm:grid-cols-2'
    case 3:
      return 'grid w-full max-w-5xl grid-cols-1 gap-[14px] sm:grid-cols-2'
    case 4:
      return 'grid w-full max-w-4xl grid-cols-2 gap-[14px]'
    default:
      return 'grid w-full grid-cols-2 gap-[14px] md:grid-cols-3'
  }
}

export function getSparseGalleryItemClass(count: number, index: number): string {
  switch (count) {
    case 1:
      return 'aspect-[16/10] min-h-[280px] sm:min-h-[360px]'
    case 2:
      return 'aspect-[4/3] min-h-[220px] sm:min-h-[260px]'
    case 3:
      if (index === 0) {
        return 'aspect-[21/9] min-h-[220px] sm:col-span-2 sm:min-h-[280px]'
      }
      return 'aspect-[4/3] min-h-[200px] sm:min-h-[220px]'
    case 4:
      return 'aspect-[4/3] min-h-[200px] sm:min-h-[220px]'
    default:
      return 'aspect-[4/3] min-h-[180px] sm:min-h-[200px]'
  }
}
