'use client'

import { useEffect } from 'react'
import { HomeImage } from '@/components/home/home-image'
import type { PublicGalleryItem } from '@/lib/media-gallery/public-gallery'
import { cn } from '@/lib/utils'

function Placeholder({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#1f1f1f_0_10px,#232323_10px_20px)] text-[12px] uppercase tracking-[0.15em] text-bsrf-muted',
        className
      )}
    >
      {label}
    </div>
  )
}

type GalleryLightboxProps = {
  items: PublicGalleryItem[]
  active: number
  onClose: () => void
  onChange: (index: number) => void
}

export function GalleryLightbox({
  items,
  active,
  onClose,
  onChange,
}: GalleryLightboxProps) {
  const photo = active >= 0 ? items[active] : null

  useEffect(() => {
    if (active < 0) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight')
        onChange((active + 1) % items.length)
      if (e.key === 'ArrowLeft')
        onChange((active - 1 + items.length) % items.length)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, items.length, onChange, onClose])

  if (!photo) return null

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(5,5,5,0.94)] p-[5vh_6vw] backdrop-blur-[6px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      <div
        className="relative w-full max-w-[1000px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          className="absolute right-0 top-[-6px] cursor-pointer border-0 bg-transparent text-[30px] leading-none text-bsrf-muted transition-colors hover:text-bsrf-red"
          onClick={onClose}
        >
          ×
        </button>

        <div className="relative aspect-[16/10] border border-bsrf-border bg-bsrf-card">
          <div className="absolute inset-0">
            {photo.imageUrl ? (
              <HomeImage
                src={photo.imageUrl}
                alt={photo.title}
                fallbackLabel={`${photo.cat} · Photo ${active + 1} / ${items.length}`}
              />
            ) : (
              <Placeholder
                label={`${photo.cat} · Photo ${active + 1} / ${items.length}`}
                className="h-full w-full"
              />
            )}
          </div>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous"
                className="absolute left-3 top-1/2 z-10 flex h-[52px] w-[52px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-bsrf-border bg-[rgba(20,20,20,0.85)] text-[22px] text-white backdrop-blur-sm transition-colors duration-200 hover:border-bsrf-green hover:bg-bsrf-green hover:text-black"
                onClick={() =>
                  onChange((active - 1 + items.length) % items.length)
                }
              >
                ‹
              </button>

              <button
                type="button"
                aria-label="Next"
                className="absolute right-3 top-1/2 z-10 flex h-[52px] w-[52px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-bsrf-border bg-[rgba(20,20,20,0.85)] text-[22px] text-white backdrop-blur-sm transition-colors duration-200 hover:border-bsrf-green hover:bg-bsrf-green hover:text-black"
                onClick={() => onChange((active + 1) % items.length)}
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <span className="font-bebas text-[26px] tracking-[0.5px] text-white">
            {photo.title}
          </span>
          {photo.cat ? (
            <span className="text-[12px] uppercase tracking-[0.12em] text-bsrf-green">
              {photo.cat}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
