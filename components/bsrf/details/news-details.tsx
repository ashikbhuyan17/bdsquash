import Link from 'next/link'
import { NewspaperIcon } from 'lucide-react'
import React from 'react'
import { HomeImage } from '@/components/home/home-image'
import type { NewsArticle, NewsFilterCategory } from '@/lib/news/data'
import {
  getNewsFilterLabel,
  NEWS_FILTER_OPTIONS,
} from '@/lib/news/public-news'
import { cn } from '@/lib/utils'
import { BsrfShell } from './shared/bsrf-shell'
import { BsrfDetailsNav } from './shared/bsrf-details-nav'
import { BsrfDetailsFooter } from './shared/bsrf-details-footer'
import { BsrfDetailsPageHero } from './shared/bsrf-details-page-hero'

function Chip({
  variant,
  children,
}: {
  variant: 'green' | 'red'
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-block self-start px-[10px] py-[5px] text-[10px] font-semibold uppercase tracking-[0.1em]',
        variant === 'red' ? 'bg-bsrf-red text-white' : 'bg-bsrf-green text-black'
      )}
    >
      {children}
    </span>
  )
}

function ReadLink({ article }: { article: NewsArticle }) {
  const isExternal = article.link.startsWith('http')

  return (
    <a
      className="text-xs uppercase tracking-[0.08em] text-bsrf-green transition-opacity hover:opacity-70"
      href={article.link}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      Read More →
    </a>
  )
}

function NewsEmptyState({ activeFilter }: { activeFilter: NewsFilterCategory }) {
  const categoryLabel = getNewsFilterLabel(activeFilter)

  return (
    <div
      className="col-span-full flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-bsrf-border bg-bsrf-card/40 px-6 py-16 text-center sm:py-20"
      role="status"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-full border border-bsrf-border bg-bsrf-primary text-bsrf-muted">
        <NewspaperIcon className="size-6" aria-hidden="true" />
      </span>
      <div className="max-w-md space-y-2">
        <h3 className="font-bebas text-3xl tracking-wide text-white">
          No news found
        </h3>
        <p className="text-sm leading-relaxed text-bsrf-muted">
          {activeFilter === 'All'
            ? 'There are no published news articles at the moment. Please check back soon for tournament results and federation updates.'
            : `No news articles are available in ${categoryLabel} right now. Try another category or view all news.`}
        </p>
      </div>
      {activeFilter !== 'All' ? (
        <Link
          href="/news"
          className="mt-2 inline-flex items-center rounded-full border border-bsrf-green px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-bsrf-green transition-all hover:bg-bsrf-green hover:text-black"
        >
          View all news
        </Link>
      ) : null}
    </div>
  )
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="flex flex-col border border-bsrf-border bg-bsrf-card transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(200,244,0,0.06)]">
      <div className="h-[220px]">
        <HomeImage src={article.image} alt={article.title} fallbackLabel="News" />
      </div>
      <div className="flex flex-col gap-3 p-6">
        <Chip variant="red">{article.cat}</Chip>
        <h3 className="font-bebas text-[26px] leading-[1.12] tracking-wide text-white">
          {article.title}
        </h3>
        <span className="text-xs text-bsrf-muted">{article.date}</span>
        <ReadLink article={article} />
      </div>
    </article>
  )
}

type BsrfNewsDetailsProps = {
  activeFilter: NewsFilterCategory
  featured: NewsArticle | null
  articles: NewsArticle[]
}

export function BsrfNewsDetails({
  activeFilter,
  featured,
  articles,
}: BsrfNewsDetailsProps) {
  const showFeatured = featured != null
  const showGridEmpty =
    articles.length === 0 && (activeFilter !== 'All' || !showFeatured)

  return (
    <BsrfShell>
      <a
        className="absolute left-3 top-[-60px] z-[200] rounded bg-bsrf-green px-[18px] py-2.5 text-[13px] font-bold text-black transition-[top] duration-200 focus:top-3"
        href="#main"
      >
        Skip to content
      </a>

      <BsrfDetailsNav active="news" />

      <main id="main">
        <BsrfDetailsPageHero
          crumb="News & Announcements"
          title={
            <>
              <span className="block">LATEST</span>
              <span className="block text-bsrf-green">NEWS</span>
            </>
          }
          sub="Tournament results, national championships, player development updates, and official announcements from the Bangladesh Squash Rackets Federation."
        />

        <section className="px-4 pt-10 pb-16 sm:px-[5%] md:px-[8%] md:pt-14 md:pb-20 lg:pt-[56px] lg:pb-[90px]" aria-label="News articles">
          {showFeatured ? (
            <article className="mb-8 grid grid-cols-1 gap-px border border-bsrf-border bg-bsrf-border min-[981px]:mb-12 min-[981px]:grid-cols-[1.1fr_1fr]">
              <div className="relative min-h-[220px] bg-bsrf-card sm:min-h-[280px] min-[981px]:min-h-[320px]">
                <HomeImage
                  src={featured.image}
                  alt={featured.title}
                  fallbackLabel="Featured"
                  priority
                />
                <div className="absolute left-[18px] top-[18px] z-[2]">
                  <Chip variant="red">FEATURED</Chip>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-3 bg-bsrf-card p-5 sm:gap-4 sm:p-6 min-[981px]:p-10">
                <Chip variant="green">{featured.cat}</Chip>
                <h2 className="font-bebas text-[clamp(30px,4vw,46px)] leading-[1] text-white">
                  {featured.title}
                </h2>
                <span className="text-[13px] uppercase tracking-[0.1em] text-bsrf-muted">
                  {featured.date}
                </span>
                <p className="max-w-[52ch] text-[15px] leading-[1.7] text-bsrf-muted">
                  The flagship international open wrapped with elite competition
                  across men&apos;s and women&apos;s draws at the Squash Complex,
                  Gulshan — marking another milestone for squash in Bangladesh.
                </p>
                <ReadLink article={featured} />
              </div>
            </article>
          ) : null}

          <div
            className="mb-6 flex flex-wrap gap-2 md:mb-9 md:gap-[10px]"
            role="tablist"
            aria-label="Filter news by category"
          >
            {NEWS_FILTER_OPTIONS.map((option) => {
              const href = option.value ? `/news?category=${option.value}` : '/news'
              const isActive =
                option.value === null
                  ? activeFilter === 'All'
                  : activeFilter === option.value

              return (
                <Link
                  key={option.label}
                  href={href}
                  scroll={false}
                  role="tab"
                  aria-selected={isActive}
                  className={cn(
                    'whitespace-nowrap rounded-full border border-bsrf-border bg-transparent px-[18px] py-[9px] text-[12px] font-semibold uppercase tracking-[0.1em] text-bsrf-muted transition-all hover:border-[#444] hover:text-white',
                    isActive && 'border-bsrf-green bg-bsrf-green text-black'
                  )}
                >
                  {option.label}
                </Link>
              )
            })}
          </div>

          <div className="grid gap-3 min-[768px]:grid-cols-2 min-[981px]:grid-cols-3 min-[981px]:gap-4">
            {showGridEmpty ? (
              <NewsEmptyState activeFilter={activeFilter} />
            ) : null}
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </main>

      <BsrfDetailsFooter />
    </BsrfShell>
  )
}
