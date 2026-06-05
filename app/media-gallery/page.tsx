import type { Metadata } from 'next'
import React from 'react'
import { BsrfGalleryDetails } from '@/components/bsrf/details/gallery-details'

export const metadata: Metadata = {
  title: 'Media Gallery | Bangladesh Squash Rackets Federation',
  description:
    'Official BSRF media gallery — photos from squash tournaments and federation events across Bangladesh.',
}

export default function MediaGalleryPage() {
  return <BsrfGalleryDetails />
}

