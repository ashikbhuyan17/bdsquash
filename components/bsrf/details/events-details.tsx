import Link from 'next/link'
import { CalendarDaysIcon } from 'lucide-react'
import React from 'react'
import { HomeImage } from '@/components/home/home-image'
import {
  buildEventsPageHref,
  getEventRowStatusLabel,
  type PublicEventCard,
} from '@/lib/events/public-events'
import type { EventStatus } from '@/lib/types/events'
import type { EventType } from '@/lib/types/event-types'
import { cn } from '@/lib/utils'
import { BsrfShell } from './shared/bsrf-shell'
import { BsrfDetailsNav } from './shared/bsrf-details-nav'
import { BsrfDetailsFooter } from './shared/bsrf-details-footer'
import { BsrfDetailsPageHero } from './shared/bsrf-details-page-hero'

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
}: {
  children: React.ReactNode
  variant?: 'solid' | 'ghost'
  className?: string
}) {
  if (variant === 'ghost') {
    return (
      <span
        className={cn(
          'inline-flex rounded-[2px] border border-bsrf-green bg-transparent px-[18px] py-[10px] text-[12px] font-bold uppercase tracking-[0.08em] text-bsrf-green whitespace-nowrap',
          className
        )}
      >
        {children}
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex rounded-[2px] border border-bsrf-green bg-bsrf-green px-[18px] py-[10px] text-[12px] font-bold uppercase tracking-[0.08em] text-black whitespace-nowrap',
        className
      )}
    >
      {children}
    </span>
  )
}

function EventsEmptyState({
  activeStatus,
  activeEventTypeId,
  eventTypes,
}: {
  activeStatus: EventStatus
  activeEventTypeId?: number
  eventTypes: EventType[]
}) {
  const typeName = eventTypes.find(
    (type) => type.eventTypeId === activeEventTypeId
  )?.name

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-bsrf-border bg-bsrf-card/40 px-6 py-16 text-center"
      role="status"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-full border border-bsrf-border bg-bsrf-primary text-bsrf-muted">
        <CalendarDaysIcon className="size-6" aria-hidden="true" />
      </span>
      <div className="max-w-md space-y-2">
        <h3 className="font-bebas text-3xl tracking-wide text-white">
          No events found
        </h3>
        <p className="text-sm leading-relaxed text-bsrf-muted">
          {activeEventTypeId
            ? `No ${activeStatus.toLowerCase()} events are listed for ${typeName ?? 'this type'} right now.`
            : `No ${activeStatus.toLowerCase()} events are available at the moment. Please check back soon.`}
        </p>
      </div>
      {activeEventTypeId ? (
        <Link
          href={buildEventsPageHref(activeStatus)}
          className="mt-2 inline-flex items-center rounded-full border border-bsrf-green px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-bsrf-green transition-all hover:bg-bsrf-green hover:text-black"
        >
          View all event types
        </Link>
      ) : null}
    </div>
  )
}

function EventRow({ event, past }: { event: PublicEventCard; past: boolean }) {
  const rowStatus = getEventRowStatusLabel(event.status)
  const isOpen = rowStatus === 'Registration Open'

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
          {event.d}
        </div>
        <div className="text-left min-[981px]:text-center">
          <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-bsrf-muted">
            {event.m}
          </div>
          <div className="text-[11px] text-bsrf-muted">{event.y}</div>
        </div>
      </div>

      <div className="flex flex-col gap-[6px]">
        <Chip variant={past ? 'mutedBorder' : 'green'}>{event.cat}</Chip>

        <div className="text-[16px] font-bold leading-[1.25] text-white min-[981px]:text-[17px]">
          {event.name}
        </div>
        <div className="flex flex-wrap items-center gap-[8px] text-[13px] text-bsrf-muted">
          <span>📍</span>
          <span>{event.loc}</span>
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
              {rowStatus}
            </span>
            <ErCta>{isOpen ? 'Register' : 'Details'}</ErCta>
          </>
        )}
      </div>
    </article>
  )
}

type BsrfEventsDetailsProps = {
  activeStatus: EventStatus
  activeEventTypeId?: number
  eventTypes: EventType[]
  featured: PublicEventCard | null
  events: PublicEventCard[]
}

export function BsrfEventsDetails({
  activeStatus,
  activeEventTypeId,
  eventTypes,
  featured,
  events,
}: BsrfEventsDetailsProps) {
  const isPast = activeStatus === 'Past'
  const showFeatured = !isPast && featured != null
  const showListEmpty = events.length === 0

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
          {showFeatured ? (
            <div className="event-featured mb-8 grid grid-cols-1 gap-px border border-bsrf-border bg-bsrf-border min-[981px]:mb-12 min-[981px]:grid-cols-[1.1fr_1fr]">
              <div className="ef-media relative min-h-[220px] bg-bsrf-card sm:min-h-[280px] min-[981px]:min-h-[320px]">
                <div className="absolute inset-0">
                  {featured.imageUrl ? (
                    <HomeImage
                      src={featured.imageUrl}
                      alt={featured.name}
                      fallbackLabel="Event Photo"
                      priority
                    />
                  ) : (
                    <Placeholder label="Event Photo" />
                  )}
                </div>
                <div className="ef-tag absolute left-[18px] top-[18px] z-[2]">
                  <Chip variant="red">FEATURED</Chip>
                </div>
              </div>

              <div className="ef-body flex flex-col justify-center gap-3 bg-bsrf-card p-5 sm:gap-4 sm:p-6 min-[981px]:p-10">
                <Chip variant="green">{featured.cat}</Chip>

                <div className="ef-date flex items-baseline gap-[10px]">
                  <span className="font-bebas text-[56px] leading-[0.9] text-bsrf-green">
                    {featured.d}
                  </span>
                  <span className="text-[14px] uppercase tracking-[0.1em] text-bsrf-muted">
                    {featured.m} {featured.y}
                  </span>
                </div>

                <h2 className="font-bebas text-[clamp(30px,4vw,46px)] leading-[1] text-white">
                  {featured.name}
                </h2>

                <div className="ef-loc flex items-center gap-2 text-[14px] text-bsrf-muted">
                  <span>📍</span>
                  <span>{featured.loc}</span>
                </div>

                {featured.desc ? (
                  <p className="ef-desc line-clamp-4 max-w-[52ch] text-[15px] leading-[1.7] text-bsrf-muted">
                    {featured.desc}
                  </p>
                ) : null}

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
            {(['Upcoming', 'Past'] as const).map((status) => {
              const isActive =
                status === 'Past'
                  ? activeStatus === 'Past'
                  : activeStatus !== 'Past'
              const href = buildEventsPageHref(
                status === 'Past' ? 'Past' : 'Upcoming',
                activeEventTypeId
              )

              return (
                <Link
                  key={status}
                  href={href}
                  scroll={false}
                  role="tab"
                  aria-selected={isActive}
                  className={cn(
                    'tab whitespace-nowrap border-b-2 border-transparent -mb-[1px] bg-transparent px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-white sm:px-[22px] sm:py-[14px] sm:text-[13px]',
                    isActive
                      ? 'text-bsrf-green border-b-bsrf-green'
                      : 'text-bsrf-muted'
                  )}
                >
                  {status === 'Past' ? 'Past Events' : 'Upcoming'}
                </Link>
              )
            })}
          </div>

          {eventTypes.length > 0 ? (
            <div
              className="mb-6 flex flex-wrap gap-2 md:mb-9 md:gap-[10px]"
              role="tablist"
              aria-label="Filter events by type"
            >
              <Link
                href={buildEventsPageHref(activeStatus)}
                scroll={false}
                role="tab"
                aria-selected={activeEventTypeId === undefined}
                className={cn(
                  'whitespace-nowrap rounded-full border border-bsrf-border bg-transparent px-[18px] py-[9px] text-[12px] font-semibold uppercase tracking-[0.1em] text-bsrf-muted transition-all hover:border-[#444] hover:text-white',
                  activeEventTypeId === undefined &&
                    'border-bsrf-green bg-bsrf-green text-black'
                )}
              >
                All
              </Link>
              {eventTypes.map((type) => {
                const isActive = activeEventTypeId === type.eventTypeId
                const href = buildEventsPageHref(activeStatus, type.eventTypeId)

                return (
                  <Link
                    key={type.eventTypeId}
                    href={href}
                    scroll={false}
                    role="tab"
                    aria-selected={isActive}
                    className={cn(
                      'whitespace-nowrap rounded-full border border-bsrf-border bg-transparent px-[18px] py-[9px] text-[12px] font-semibold uppercase tracking-[0.1em] text-bsrf-muted transition-all hover:border-[#444] hover:text-white',
                      isActive && 'border-bsrf-green bg-bsrf-green text-black'
                    )}
                  >
                    {type.name}
                  </Link>
                )
              })}
            </div>
          ) : null}

          <div className="events-list flex flex-col gap-[14px]">
            {showListEmpty ? (
              <EventsEmptyState
                activeStatus={activeStatus}
                activeEventTypeId={activeEventTypeId}
                eventTypes={eventTypes}
              />
            ) : null}
            {events.map((event) => (
              <EventRow key={event.id} event={event} past={isPast} />
            ))}
          </div>
        </section>
      </main>

      <BsrfDetailsFooter />
    </BsrfShell>
  )
}
