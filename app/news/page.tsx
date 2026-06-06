import type { Metadata } from 'next'
import { BsrfNewsDetails } from '@/components/bsrf/details/news-details'
import { loadNewsPageData, parseNewsCategoryParam } from '@/lib/news/public-news'

export const metadata: Metadata = {
  title: 'News & Announcements | Bangladesh Squash Rackets Federation',
  description:
    'Latest squash news, tournament results, and federation announcements from the Bangladesh Squash Rackets Federation.',
}

type NewsPageProps = {
  searchParams: Promise<{ category?: string }>
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const { category: categoryParam } = await searchParams
  const category = parseNewsCategoryParam(categoryParam)
  const { activeFilter, featured, articles } = await loadNewsPageData(category)

  return (
    <BsrfNewsDetails
      activeFilter={activeFilter}
      featured={featured}
      articles={articles}
    />
  )
}
