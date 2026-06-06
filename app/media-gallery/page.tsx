import type { Metadata } from 'next'
import { BsrfGalleryDetails } from '@/components/bsrf/details/gallery-details'
import {
  loadGalleryPageData,
  parseGalleryCategoryParam,
  parseGalleryTypeParam,
} from '@/lib/media-gallery/public-gallery'

export const metadata: Metadata = {
  title: 'Media Gallery | Bangladesh Squash Rackets Federation',
  description:
    'Official BSRF media gallery — photos from squash tournaments and federation events across Bangladesh.',
}

type MediaGalleryPageProps = {
  searchParams: Promise<{ category?: string; galleryType?: string }>
}

export default async function MediaGalleryPage({
  searchParams,
}: MediaGalleryPageProps) {
  const params = await searchParams
  const galleryType = parseGalleryTypeParam(params.galleryType)
  const category = parseGalleryCategoryParam(params.category)
  const data = await loadGalleryPageData({ galleryType, category })

  return <BsrfGalleryDetails {...data} />
}
