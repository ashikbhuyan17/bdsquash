'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type BsrfNavKey =
  | 'thebsrf'
  | 'committee'
  | 'news'
  | 'events'
  | 'rankings'
  | 'gallery'
  | 'contact'

const PRIMARY_NAV = [
  { key: 'thebsrf' as const, label: 'The BSRF', href: '/#thebsrf' },
  { key: 'committee' as const, label: 'Committee', href: '/committee' },
  { key: 'news' as const, label: 'News', href: '/news' },
  { key: 'events' as const, label: 'Events', href: '/events' },
  { key: 'rankings' as const, label: 'Players', href: '/players-rankings' },
  { key: 'gallery' as const, label: 'Gallery', href: '/media-gallery' },
  { key: 'contact' as const, label: 'Contact', href: '/contact' },
] as const

export function BsrfDetailsNav({ active }: { active?: BsrfNavKey }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-[100] flex h-[72px] w-full items-center justify-between border-b border-bsrf-border bg-[rgba(10,10,10,0.92)] px-4 backdrop-blur-md sm:px-[5%] lg:px-4 xl:px-[8%]">
        <Link href="/" className="flex shrink-0 items-center gap-3.5">
          <span className="font-bebas text-[28px] leading-none tracking-wide text-bsrf-green">
            BSRF
          </span>
          <span className="hidden max-w-[150px] border-l border-bsrf-border pl-3.5 text-[11px] leading-tight text-white md:block">
            Bangladesh Squash Rackets Federation
          </span>
        </Link>

        <ul className="hidden list-none gap-6 md:flex xl:gap-[34px]">
          {PRIMARY_NAV.map((item) => {
            const isActive = active === item.key
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-xs uppercase tracking-[0.18em] transition-colors hover:text-bsrf-green',
                    isActive ? 'text-bsrf-green' : 'text-white'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <Link
          href="/#contact"
          className="hidden rounded-full bg-bsrf-green px-[22px] py-[11px] text-center text-xs font-bold uppercase tracking-[0.08em] text-black transition-all hover:-translate-y-px hover:shadow-[0_6px_22px_rgba(200,244,0,0.25)] md:inline-block"
        >
          Register
        </Link>

        <button
          type="button"
          className="cursor-pointer border-none bg-transparent text-2xl text-white md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </nav>

      <div
        className={cn(
          'fixed inset-x-0 top-[72px] z-[99] flex-col border-b border-bsrf-border bg-bsrf-primary px-4 py-4 pb-7 sm:px-[5%] md:hidden lg:px-4 xl:px-[8%]',
          open ? 'flex' : 'hidden'
        )}
      >
        {PRIMARY_NAV.map((item) => {
          const isActive = active === item.key
          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                'border-b border-bsrf-border py-3.5 text-sm uppercase tracking-[0.18em] transition-colors hover:text-bsrf-green',
                isActive ? 'text-bsrf-green' : 'text-white'
              )}
            >
              {item.label}
            </Link>
          )
        })}

        <Link
          href="/#contact"
          onClick={() => setOpen(false)}
          className="py-3.5 text-sm uppercase tracking-[0.18em] text-bsrf-green"
        >
          Register →
        </Link>
      </div>
    </>
  )
}
