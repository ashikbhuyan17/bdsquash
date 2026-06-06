'use client'

import { useState } from 'react'
import { HomeImage } from '@/components/home/home-image'
import { GalleryLightbox } from '@/components/bsrf/details/gallery-lightbox'
import {
  getSparseGalleryGridClass,
  getSparseGalleryItemClass,
  isSparseGallery,
} from '@/components/bsrf/details/gallery-grid-layout'
import type { PublicGalleryItem } from '@/lib/media-gallery/public-gallery'
import { cn } from '@/lib/utils'

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#1f1f1f_0_10px,#232323_10px_20px)] text-[12px] uppercase tracking-[0.15em] text-bsrf-muted">
      {label}
    </div>
  )
}

type GalleryCardProps = {
  item: PublicGalleryItem
  className?: string
  onOpen: () => void
}

function GalleryCard({ item, className, onOpen }: GalleryCardProps) {
  return (
    <figure
      role="button"
      tabIndex={0}
      aria-label={'View photo: ' + item.title}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpen()
      }}
      className={cn(
        'group relative cursor-pointer overflow-hidden border border-bsrf-border bg-bsrf-card',
        className
      )}
    >
      <span className="absolute left-[12px] top-[12px] z-[2] whitespace-nowrap rounded-none bg-[rgba(10,10,10,0.7)] px-[10px] py-[5px] text-[10px] font-semibold uppercase tracking-[0.1em] text-bsrf-green backdrop-blur-[4px]">
        {item.cat}
      </span>

      <div className="absolute inset-0">
        <div className="h-full w-full transition-transform duration-400 group-hover:scale-[1.05]">
          {item.imageUrl ? (
            <HomeImage
              src={item.imageUrl}
              alt={item.title}
              fallbackLabel="Photo"
            />
          ) : (
            <Placeholder label="Photo" />
          )}
        </div>
      </div>

      <figcaption className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-[8px] text-center opacity-0 transition-opacity duration-250 bg-[linear-gradient(to_top,rgba(0,106,78,0.55),rgba(10,10,10,0.25))] group-hover:opacity-100">
        <span className="font-bebas text-[22px] text-white tracking-[1px]">
          {item.title}
        </span>
        <span className="text-[11px] uppercase tracking-[0.14em] text-white/85">
          View Photo
        </span>
      </figcaption>
    </figure>
  )
}

type GalleryItemsGridProps = {
  items: PublicGalleryItem[]
}

export function GalleryItemsGrid({ items }: GalleryItemsGridProps) {
  const [active, setActive] = useState(-1)
  const sparse = isSparseGallery(items.length)

  return (
    <>
      <div
        className={
          sparse
            ? getSparseGalleryGridClass(items.length)
            : cn(
                'grid gap-[14px] grid-flow-dense auto-rows-[220px] grid-cols-4',
                'max-[1024px]:grid-cols-3',
                'max-[820px]:grid-cols-2 max-[820px]:auto-rows-[180px]'
              )
        }
      >
        {items.map((item, i) => (
          <GalleryCard
            key={item.id}
            item={item}
            onOpen={() => setActive(i)}
            className={
              sparse
                ? getSparseGalleryItemClass(items.length, i)
                : cn(
                    item.span === 'wide' && 'col-span-2',
                    item.span === 'tall' && 'row-span-2'
                  )
            }
          />
        ))}
      </div>

      <GalleryLightbox
        items={items}
        active={active}
        onClose={() => setActive(-1)}
        onChange={setActive}
      />
    </>
  )
}
