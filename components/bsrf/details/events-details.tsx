'use client'

import React, { useMemo, useState } from 'react'
import { BsrfShell } from './shared/bsrf-shell'
import { BsrfDetailsNav } from './shared/bsrf-details-nav'
import { BsrfDetailsFooter } from './shared/bsrf-details-footer'
import { BsrfDetailsPageHero } from './shared/bsrf-details-page-hero'
import { cn } from '@/lib/utils'

type EventCategory = 'INTERNATIONAL' | 'NATIONAL' | 'JUNIOR' | 'DEVELOPMENT'

type EventItem = {
  d: string
  m: string
  y: string
  cat: EventCategory
  name: string
  loc: string
  desc?: string
  status?: 'Registration Open' | 'Coming Soon'
}

const FEATURED: EventItem = {
  d: '15',
  m: 'NOV',
  y: '2026',
  cat: 'INTERNATIONAL',
  name: '6th Bangladesh International Squash Open',
  loc: 'Squash Complex, 144 Gulshan Avenue, Dhaka',
  desc: `The flagship event of the BSRF calendar returns, welcoming top-ranked players from across Asia. Five days of elite competition across men’s and women’s draws, with qualifying rounds open to ranked national players.`,
}

const UPCOMING: EventItem[] = [
  {
    d: '06',
    m: 'DEC',
    y: '2026',
    cat: 'NATIONAL',
    name: 'Victory Day Squash Championship 2026',
    loc: 'BSRF Courts, Dhaka',
    status: 'Registration Open',
  },
  {
    d: '20',
    m: 'JAN',
    y: '2027',
    cat: 'JUNIOR',
    name: 'National Junior Ranking Series — Leg 1',
    loc: 'Gulshan-1, Dhaka',
    status: 'Registration Open',
  },
  {
    d: '14',
    m: 'FEB',
    y: '2027',
    cat: 'NATIONAL',
    name: '6th National Squash Championship',
    loc: 'Chittagong Squash Centre',
    status: 'Coming Soon',
  },
  {
    d: '08',
    m: 'MAR',
    y: '2027',
    cat: 'DEVELOPMENT',
    name: 'Inter-Club Team Championship',
    loc: 'Army Squash Academy, Dhaka',
    status: 'Coming Soon',
  },
]

const PAST: EventItem[] = [
  {
    d: '30',
    m: 'JUL',
    y: '2025',
    cat: 'INTERNATIONAL',
    name: '5th Bangladesh International Squash Open',
    loc: 'Squash Complex, Gulshan, Dhaka',
  },
  {
    d: '16',
    m: 'DEC',
    y: '2025',
    cat: 'NATIONAL',
    name: 'Victory Day Squash Championship 2025',
    loc: 'BSRF Courts, Dhaka',
  },
  {
    d: '12',
    m: 'JUN',
    y: '2025',
    cat: 'NATIONAL',
    name: '5th National Squash Championship',
    loc: 'Dhaka Squash Club',
  },
  {
    d: '28',
    m: 'MAY',
    y: '2025',
    cat: 'JUNIOR',
    name: 'National Junior Ranking Series — Finals',
    loc: 'Gulshan-1, Dhaka',
  },
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

function Chip({
  variant,
  children,
  className,
}: {
  variant: 'green' | 'red' | 'mutedBorder'
  children: React.ReactNode
  className?: string
}) {
  const base =
    'inline-block self-start bg-transparent px-[10px] py-[5px] text-[10px] font-semibold uppercase tracking-[0.1em]'

  const v =
    variant === 'red'
      ? 'bg-bsrf-red text-white'
      : variant === 'green'
        ? 'bg-bsrf-green text-black'
        : 'bg-bsrf-border text-bsrf-muted'

  return <span className={cn(base, v, className)}>{children}</span>
}

function ErCta({
  children,
  variant = 'solid',
  className,
  onClick,
}: {
  children: React.ReactNode
  variant?: 'solid' | 'ghost'
  className?: string
  onClick?: () => void
}) {
  if (variant === 'ghost') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'rounded-[2px] border border-bsrf-green bg-transparent px-[18px] py-[10px] text-[12px] font-bold uppercase tracking-[0.08em] text-bsrf-green whitespace-nowrap transition-colors hover:bg-bsrf-green hover:text-black hover:filter-none',
          className
        )}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-[2px] border border-bsrf-green bg-bsrf-green px-[18px] py-[10px] text-[12px] font-bold uppercase tracking-[0.08em] text-black whitespace-nowrap transition-all hover:brightness-[1.1]',
        className
      )}
    >
      {children}
    </button>
  )
}

function EventRow({ e, past }: { e: EventItem; past: boolean }) {
  const isOpen = e.status === 'Registration Open'

  return (
    <article
      className={cn(
        'grid gap-4 border bg-bsrf-surface border-bsrf-border border-l-[3px] p-4 transition-all sm:gap-5 sm:p-5 min-[981px]:grid-cols-[96px_1fr_auto] min-[981px]:items-center min-[981px]:gap-6 min-[981px]:p-[22px_26px]',
        past
          ? 'border-l-bsrf-border opacity-90 hover:border-l-bsrf-muted'
          : 'border-l-bsrf-green hover:border-l-bsrf-red',
        'hover:-translate-y-[2px]'
      )}
    >
      <div className="flex items-center gap-4 text-center min-[981px]:block min-[981px]:gap-0">
        <div
          className={cn(
            'font-bebas leading-[0.9] text-[36px] min-[981px]:text-[42px]',
            past ? 'text-bsrf-muted' : 'text-bsrf-green'
          )}
        >
          {e.d}
        </div>
        <div className="text-left min-[981px]:text-center">
          <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-bsrf-muted">
            {e.m}
          </div>
          <div className="text-[11px] text-bsrf-muted">{e.y}</div>
        </div>
      </div>

      <div className="flex flex-col gap-[6px]">
        <Chip variant={past ? 'mutedBorder' : 'green'}>{e.cat}</Chip>

        <div className="text-[16px] font-bold leading-[1.25] text-white min-[981px]:text-[17px]">
          {e.name}
        </div>
        <div className="flex flex-wrap items-center gap-[8px] text-[13px] text-bsrf-muted">
          <span>📍</span>
          <span>{e.loc}</span>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-3 min-[981px]:flex-col min-[981px]:items-end min-[981px]:gap-[10px]">
        {past ? (
          <ErCta variant="ghost">View Results →</ErCta>
        ) : (
          <>
            <span
              className={cn(
                'text-[12px]',
                isOpen ? 'text-bsrf-green' : 'text-bsrf-muted'
              )}
            >
              {e.status}
            </span>
            <ErCta>{isOpen ? 'Register' : 'Details'}</ErCta>
          </>
        )}
      </div>
    </article>
  )
}

export function BsrfEventsDetails() {
  const [view, setView] = useState<'upcoming' | 'past'>('upcoming')

  const list = useMemo(() => {
    return view === 'upcoming' ? UPCOMING : PAST
  }, [view])

  return (
    <BsrfShell>
      <a
        className="absolute left-3 top-[-60px] z-[200] rounded bg-bsrf-green px-[18px] py-2.5 text-[13px] font-bold text-black transition-[top] duration-200 focus:top-3"
        href="#main"
      >
        Skip to content
      </a>

      <BsrfDetailsNav active="events" />

      <main id="main">
        <BsrfDetailsPageHero
          crumb="Events & Tournaments"
          title={
            <>
              <span className="block">EVENTS &amp;</span>
              <span className="block text-bsrf-green">TOURNAMENTS</span>
            </>
          }
          sub="National championships, international opens, junior ranking series and development events — the full BSRF competition calendar."
        />

        <section className="px-4 pt-10 pb-16 sm:px-[5%] md:px-[8%] md:pt-14 md:pb-20 lg:pt-[56px] lg:pb-[90px]">
          {view === 'upcoming' ? (
            <div className="event-featured mb-8 grid grid-cols-1 gap-px border border-bsrf-border bg-bsrf-border min-[981px]:mb-12 min-[981px]:grid-cols-[1.1fr_1fr]">
              <div className="ef-media relative min-h-[220px] bg-bsrf-card sm:min-h-[280px] min-[981px]:min-h-[320px]">
                <div className="absolute inset-0">
                  <Placeholder label="Event Photo" />
                </div>
                <div className="ef-tag absolute left-[18px] top-[18px] z-[2]">
                  <Chip variant="red">FEATURED</Chip>
                </div>
              </div>

              <div className="ef-body flex flex-col justify-center gap-3 bg-bsrf-card p-5 sm:gap-4 sm:p-6 min-[981px]:p-10">
                <Chip variant="green">{FEATURED.cat}</Chip>

                <div className="ef-date flex items-baseline gap-[10px]">
                  <span className="font-bebas text-[56px] leading-[0.9] text-bsrf-green">
                    {FEATURED.d}
                  </span>
                  <span className="text-[14px] uppercase tracking-[0.1em] text-bsrf-muted">
                    {FEATURED.m} {FEATURED.y}
                  </span>
                </div>

                <h2 className="font-bebas text-[clamp(30px,4vw,46px)] leading-[1] text-white">
                  {FEATURED.name}
                </h2>

                <div className="ef-loc flex items-center gap-2 text-[14px] text-bsrf-muted">
                  <span>📍</span>
                  <span>{FEATURED.loc}</span>
                </div>

                <p className="ef-desc max-w-[52ch] text-[15px] leading-[1.7] text-bsrf-muted">
                  {FEATURED.desc}
                </p>

                <div className="ef-actions mt-[6px] flex flex-wrap gap-[12px]">
                  <ErCta>Register Now</ErCta>
                  <ErCta variant="ghost">Event Details →</ErCta>
                </div>
              </div>
            </div>
          ) : null}

          <div
            className="tabs mb-6 flex flex-wrap gap-1 border-b border-bsrf-border md:mb-9"
            role="tablist"
            aria-label="Event timeline"
          >
            <button
              role="tab"
              aria-selected={view === 'upcoming'}
              className={cn(
                'tab whitespace-nowrap border-b-2 border-transparent -mb-[1px] bg-transparent px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-white sm:px-[22px] sm:py-[14px] sm:text-[13px]',
                view === 'upcoming'
                  ? 'text-bsrf-green border-b-bsrf-green'
                  : 'text-bsrf-muted'
              )}
              onClick={() => setView('upcoming')}
              type="button"
            >
              Upcoming
            </button>
            <button
              role="tab"
              aria-selected={view === 'past'}
              className={cn(
                'tab whitespace-nowrap border-b-2 border-transparent -mb-[1px] bg-transparent px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-white sm:px-[22px] sm:py-[14px] sm:text-[13px]',
                view === 'past'
                  ? 'text-bsrf-green border-b-bsrf-green'
                  : 'text-bsrf-muted'
              )}
              onClick={() => setView('past')}
              type="button"
            >
              Past Events
            </button>
          </div>

          <div className="events-list flex flex-col gap-[14px]">
            {list.map((e) => (
              <EventRow key={e.name} e={e} past={view === 'past'} />
            ))}
          </div>
        </section>
      </main>

      <BsrfDetailsFooter />
    </BsrfShell>
  )
}

