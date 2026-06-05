'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { BsrfShell } from './shared/bsrf-shell'
import { BsrfDetailsNav } from './shared/bsrf-details-nav'
import { BsrfDetailsFooter } from './shared/bsrf-details-footer'
import { BsrfDetailsPageHero } from './shared/bsrf-details-page-hero'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  'All',
  'Tournaments',
  'National Team',
  'Training',
  'Juniors',
  'Events',
] as const

type PhotoSpan = 'wide' | 'tall'

type Photo = {
  cat: string
  title: string
  span?: PhotoSpan
}

const PHOTOS: Photo[] = [
  { cat: 'Tournaments', title: '6th Int’l Open — Final', span: 'tall' },
  { cat: 'National Team', title: 'Squad Training Camp' },
  { cat: 'Events', title: 'Victory Day Ceremony', span: 'wide' },
  { cat: 'Juniors', title: 'U-15 Coaching Clinic' },
  { cat: 'Tournaments', title: 'National Championship' },
  { cat: 'Training', title: 'Court Session, Gulshan', span: 'tall' },
  { cat: 'National Team', title: 'Team Bangladesh Portrait' },
  { cat: 'Events', title: 'Awards Night' },
  { cat: 'Tournaments', title: 'Semi-Final Rally', span: 'wide' },
  { cat: 'Juniors', title: 'School Squash League' },
  { cat: 'Training', title: 'Fitness & Conditioning' },
  { cat: 'Events', title: 'Federation AGM 2025' },
  { cat: 'Tournaments', title: 'Mixed Doubles Open', span: 'tall' },
  { cat: 'National Team', title: 'International Tour' },
  { cat: 'Training', title: 'Glass Court Practice' },
  { cat: 'Juniors', title: 'Talent ID Day', span: 'wide' },
]

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

export function BsrfGalleryDetails() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('All')
  const [active, setActive] = useState(-1) // index into shown[]

  const shown = useMemo(() => {
    if (filter === 'All') return PHOTOS
    return PHOTOS.filter((p) => p.cat === filter)
  }, [filter])

  const photo = active >= 0 ? shown[active] : null

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active < 0) return
      if (e.key === 'Escape') setActive(-1)
      if (e.key === 'ArrowRight')
        setActive((i) => (i + 1) % shown.length)
      if (e.key === 'ArrowLeft')
        setActive((i) => (i - 1 + shown.length) % shown.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, shown.length])

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

        <section className="px-4 pt-10 pb-16 sm:px-[5%] md:px-[8%] md:pt-14 md:pb-20 lg:pt-[56px] lg:pb-[90px]" aria-label="Photo gallery">
          <div className="mb-6 flex flex-wrap gap-2 md:mb-8 md:gap-[10px]" role="tablist" aria-label="Filter photos by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={cn(
                  'whitespace-nowrap rounded-full border border-bsrf-border bg-transparent px-[18px] py-[9px] text-[12px] font-semibold uppercase tracking-[0.1em] text-bsrf-muted transition-all hover:border-[#444] hover:text-white',
                  filter === c && 'border-bsrf-green bg-bsrf-green text-black'
                )}
                aria-pressed={filter === c}
                onClick={() => {
                  setFilter(c)
                  setActive(-1)
                }}
                type="button"
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mb-[22px] text-[13px] text-bsrf-muted">
            {shown.length}{' '}
            {shown.length === 1 ? 'photo' : 'photos'}
            {filter !== 'All' ? ` in ${filter}` : ''}
          </div>

          <div
            className={cn(
              'grid gap-[14px] grid-flow-dense auto-rows-[220px] grid-cols-4',
              'max-[1024px]:grid-cols-3',
              'max-[820px]:grid-cols-2 max-[820px]:auto-rows-[180px]'
            )}
          >
            {shown.map((p, i) => (
              <figure
                key={p.title + i}
                role="button"
                tabIndex={0}
                aria-label={'View photo: ' + p.title}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setActive(i)
                }}
                className={cn(
                  'group relative cursor-pointer overflow-hidden border border-bsrf-border bg-bsrf-card',
                  p.span === 'wide' && 'col-span-2',
                  p.span === 'tall' && 'row-span-2'
                )}
              >
                <span
                  className="absolute left-[12px] top-[12px] z-[2] whitespace-nowrap rounded-none bg-[rgba(10,10,10,0.7)] px-[10px] py-[5px] text-[10px] font-semibold uppercase tracking-[0.1em] text-bsrf-green backdrop-blur-[4px]"
                >
                  {p.cat}
                </span>

                <div className="absolute inset-0">
                  <div className="h-full w-full transition-transform duration-400 group-hover:scale-[1.05]">
                    <Placeholder label="Photo" />
                  </div>
                </div>

                <figcaption
                  className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-[8px] text-center opacity-0 transition-opacity duration-250 bg-[linear-gradient(to_top,rgba(0,106,78,0.55),rgba(10,10,10,0.25))] group-hover:opacity-100"
                >
                  <span className="font-bebas text-[22px] text-white tracking-[1px]">
                    {p.title}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-white/85">
                    View Photo
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {photo ? (
          <div
            className="fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(5,5,5,0.94)] p-[5vh_6vw] backdrop-blur-[6px]"
            onClick={() => setActive(-1)}
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
                onClick={() => setActive(-1)}
              >
                ×
              </button>

              <div className="relative aspect-[16/10] border border-bsrf-border bg-bsrf-card">
                <div className="absolute inset-0">
                  <Placeholder
                    label={`${photo.cat} · Photo ${active + 1} / ${shown.length}`}
                    className="h-full w-full"
                  />
                </div>

                <button
                  type="button"
                  aria-label="Previous"
                  className="absolute left-3 top-1/2 z-10 flex h-[52px] w-[52px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-bsrf-border bg-[rgba(20,20,20,0.85)] text-[22px] text-white backdrop-blur-sm transition-colors duration-200 hover:border-bsrf-green hover:bg-bsrf-green hover:text-black"
                  onClick={() =>
                    setActive(
                      (i) => (i - 1 + shown.length) % shown.length
                    )
                  }
                >
                  ‹
                </button>

                <button
                  type="button"
                  aria-label="Next"
                  className="absolute right-3 top-1/2 z-10 flex h-[52px] w-[52px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-bsrf-border bg-[rgba(20,20,20,0.85)] text-[22px] text-white backdrop-blur-sm transition-colors duration-200 hover:border-bsrf-green hover:bg-bsrf-green hover:text-black"
                  onClick={() => setActive((i) => (i + 1) % shown.length)}
                >
                  ›
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <span className="font-bebas text-[26px] tracking-[0.5px] text-white">
                  {photo.title}
                </span>
                <span className="text-[12px] uppercase tracking-[0.12em] text-bsrf-green">
                  {photo.cat}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      <BsrfDetailsFooter />
    </BsrfShell>
  )
}

