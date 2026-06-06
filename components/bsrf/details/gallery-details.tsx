import Link from 'next/link'
import { ImagesIcon } from 'lucide-react'
import {
  buildGalleryPageHref,
  GALLERY_FILTER_OPTIONS,
  type PublicGalleryItem,
} from '@/lib/media-gallery/public-gallery'
import type { GalleryCategory, GalleryType } from '@/lib/types/media-gallery'
import { cn } from '@/lib/utils'
import { BsrfShell } from './shared/bsrf-shell'
import { BsrfDetailsNav } from './shared/bsrf-details-nav'
import { BsrfDetailsFooter } from './shared/bsrf-details-footer'
import { BsrfDetailsPageHero } from './shared/bsrf-details-page-hero'
import { GalleryItemsGrid } from './gallery-items-grid'

function GalleryEmptyState({
  activeCategoryLabel,
  activeGalleryType,
}: {
  activeCategoryLabel: string
  activeGalleryType: GalleryType
}) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-bsrf-border bg-bsrf-card/40 px-6 py-16 text-center"
      role="status"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-full border border-bsrf-border bg-bsrf-primary text-bsrf-muted">
        <ImagesIcon className="size-6" aria-hidden="true" />
      </span>
      <div className="max-w-md space-y-2">
        <h3 className="font-bebas text-3xl tracking-wide text-white">
          No gallery items found
        </h3>
        <p className="text-sm leading-relaxed text-bsrf-muted">
          {activeCategoryLabel === 'All'
            ? `No ${activeGalleryType.toLowerCase()} items are available right now.`
            : `No ${activeGalleryType.toLowerCase()} items in ${activeCategoryLabel} right now.`}
        </p>
      </div>
      {activeCategoryLabel !== 'All' ? (
        <Link
          href={buildGalleryPageHref(activeGalleryType)}
          className="mt-2 inline-flex items-center rounded-full border border-bsrf-green px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-bsrf-green transition-all hover:bg-bsrf-green hover:text-black"
        >
          View all categories
        </Link>
      ) : null}
    </div>
  )
}

type BsrfGalleryDetailsProps = {
  activeGalleryType: GalleryType
  activeCategory?: GalleryCategory
  activeCategoryLabel: string
  items: PublicGalleryItem[]
}

export function BsrfGalleryDetails({
  activeGalleryType,
  activeCategory,
  activeCategoryLabel,
  items,
}: BsrfGalleryDetailsProps) {
  return (
    <BsrfShell>
      <a
        className="absolute left-3 top-[-60px] z-[200] rounded bg-bsrf-green px-[18px] py-2.5 text-[13px] font-bold text-black transition-[top] duration-200 focus:top-3"
        href="#main"
      >
        Skip to content
      </a>

      <BsrfDetailsNav active="gallery" />

      <main id="main">
        <BsrfDetailsPageHero
          crumb="Media Gallery"
          title={
            <>
              <span className="block">MEDIA</span>
              <span className="block text-bsrf-green">GALLERY</span>
            </>
          }
          sub="Moments from the court — tournaments, training camps, national squad action and federation events across Bangladesh."
        />

        <section
          className="px-4 pt-10 pb-16 sm:px-[5%] md:px-[8%] md:pt-14 md:pb-20 lg:pt-[56px] lg:pb-[90px]"
          aria-label="Photo gallery"
        >
          <div
            className="mb-6 flex flex-wrap gap-2 md:mb-8 md:gap-[10px]"
            role="tablist"
            aria-label="Filter photos by category"
          >
            {GALLERY_FILTER_OPTIONS.map((option) => {
              const isActive =
                option.value === null
                  ? activeCategory === undefined
                  : activeCategory === option.value
              const href = buildGalleryPageHref(
                activeGalleryType,
                option.value ?? undefined
              )

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

          <div className="mb-[22px] text-[13px] text-bsrf-muted">
            {items.length} {items.length === 1 ? 'photo' : 'photos'}
            {activeCategoryLabel !== 'All'
              ? ` in ${activeCategoryLabel}`
              : ''}
          </div>

          {items.length === 0 ? (
            <GalleryEmptyState
              activeCategoryLabel={activeCategoryLabel}
              activeGalleryType={activeGalleryType}
            />
          ) : (
            <GalleryItemsGrid items={items} />
          )}
        </section>
      </main>

      <BsrfDetailsFooter />
    </BsrfShell>
  )
}
