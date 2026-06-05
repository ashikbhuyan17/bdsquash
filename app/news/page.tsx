import type { Metadata } from 'next'
import React from 'react'
import { BsrfNewsDetails } from '@/components/bsrf/details/news-details'

export const metadata: Metadata = {
  title: 'News & Announcements | Bangladesh Squash Rackets Federation',
  description:
    'Latest squash news, tournament results, and federation announcements from the Bangladesh Squash Rackets Federation.',
}

export default function NewsPage() {
  return <BsrfNewsDetails />
}
