'use client'

import Link from 'next/link'
import React from 'react'
import { BsrfShell } from './shared/bsrf-shell'
import { BsrfDetailsNav } from './shared/bsrf-details-nav'
import { BsrfDetailsFooter } from './shared/bsrf-details-footer'
import { BsrfDetailsPageHero } from './shared/bsrf-details-page-hero'
import { cn } from '@/lib/utils'

const CONTACT_ITEMS = [
  {
    icon: '📍',
    label: 'Address',
    content: (
      <p className="leading-[1.7]">
        Squash Complex, 144 Gulshan Avenue,
        <br />
        Gulshan-1, Dhaka-1212, Bangladesh
      </p>
    ),
  },
  {
    icon: '📞',
    label: 'Phone',
    content: (
      <a
        href="tel:+8800255045089"
        className="font-semibold text-white transition-colors hover:text-bsrf-green"
      >
        +88 0255045089
      </a>
    ),
  },
  {
    icon: '✉',
    label: 'Email',
    content: (
      <div className="flex flex-col gap-1">
        <a
          href="mailto:info@bdsquash.org"
          className="transition-colors hover:text-bsrf-green"
        >
          info@bdsquash.org
        </a>
        <a
          href="mailto:squash.bd@gmail.com"
          className="transition-colors hover:text-bsrf-green"
        >
          squash.bd@gmail.com
        </a>
      </div>
    ),
  },
  {
    icon: '🌐',
    label: 'Website',
    content: (
      <a
        href="https://bdsquash.org"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-white transition-colors hover:text-bsrf-green"
      >
        bdsquash.org
      </a>
    ),
  },
] as const

const OFFICE_HOURS = [
  { day: 'Sunday – Thursday', time: '9:00 AM – 5:00 PM' },
  { day: 'Friday & Saturday', time: 'Closed' },
] as const

const INQUIRY_TYPES = [
  {
    title: 'General Inquiries',
    desc: 'Questions about the federation, membership, or squash in Bangladesh.',
  },
  {
    title: 'Event Registration',
    desc: 'Tournament entries, draw information, and competition schedules.',
  },
  {
    title: 'Player Rankings',
    desc: 'National ranking updates, player records, and eligibility.',
  },
  {
    title: 'Media & Press',
    desc: 'Press accreditation, interviews, and official statements.',
  },
] as const

function ContactCard({
  icon,
  label,
  children,
}: {
  icon: string
  label: string
  children: React.ReactNode
}) {
  return (
    <article className="border border-bsrf-border border-l-[3px] border-l-transparent bg-bsrf-surface p-6 transition-all hover:-translate-y-[2px] hover:border-l-bsrf-green">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="text-lg" aria-hidden="true">
          {icon}
        </span>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-bsrf-green">
          {label}
        </h3>
      </div>
      <div className="text-[14px] text-bsrf-muted">{children}</div>
    </article>
  )
}

export function BsrfContactOfficeDetails() {
  return (
    <BsrfShell>
      <a
        className="absolute left-3 top-[-60px] z-[200] rounded bg-bsrf-green px-[18px] py-2.5 text-[13px] font-bold text-black transition-[top] duration-200 focus:top-3"
        href="#main"
      >
        Skip to content
      </a>

      <BsrfDetailsNav active="contact" />

      <main id="main">
        <BsrfDetailsPageHero
          crumb="Contact The Office"
          title={
            <>
              <span className="block">CONTACT</span>
              <span className="block text-bsrf-green">THE OFFICE</span>
            </>
          }
          sub="Reach the Bangladesh Squash Rackets Federation secretariat for tournament registration, rankings, media enquiries, and general federation matters."
        />

        <section className="px-4 pt-10 pb-16 sm:px-[5%] md:px-[8%] md:pt-14 md:pb-20 lg:pt-[56px] lg:pb-[90px]">
          <div className="mb-8 grid grid-cols-1 gap-px border border-bsrf-border bg-bsrf-border min-[981px]:mb-12 min-[981px]:grid-cols-2">
            <div className="relative min-h-[280px] bg-bsrf-card">
              <div
                className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#1f1f1f_0_10px,#232323_10px_20px)] text-[12px] uppercase tracking-[0.15em] text-bsrf-muted"
                role="img"
                aria-label="Map placeholder for Squash Complex, Gulshan"
              >
                Map — Gulshan Avenue
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 bg-bsrf-card p-5 sm:gap-5 sm:p-6 min-[981px]:p-10">
              <span className="self-start bg-bsrf-red px-[10px] py-[5px] text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                Federation Secretariat
              </span>
              <h2 className="font-bebas text-[clamp(28px,4vw,40px)] leading-none text-white">
                Squash Complex, Gulshan-1
              </h2>
              <p className="max-w-[48ch] text-[15px] leading-[1.7] text-bsrf-muted">
                The BSRF head office is located at the national squash complex on
                Gulshan Avenue. Visitors are welcome during office hours for
                federation business and event-related matters.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+8800255045089"
                  className="rounded-[2px] border border-bsrf-green bg-bsrf-green px-[18px] py-[10px] text-[12px] font-bold uppercase tracking-[0.08em] text-black transition-all hover:brightness-[1.1]"
                >
                  Call Office
                </a>
                <Link
                  href="/committee"
                  className="rounded-[2px] border border-bsrf-green bg-transparent px-[18px] py-[10px] text-[12px] font-bold uppercase tracking-[0.08em] text-bsrf-green transition-colors hover:bg-bsrf-green hover:text-black"
                >
                  View Committee →
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-12 grid gap-4 min-[768px]:grid-cols-2 min-[981px]:grid-cols-4">
            {CONTACT_ITEMS.map((item) => (
              <ContactCard key={item.label} icon={item.icon} label={item.label}>
                {item.content}
              </ContactCard>
            ))}
          </div>

          <div className="mb-12 grid gap-8 min-[981px]:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="mb-6 border-l-4 border-bsrf-red pl-4 font-bebas text-[32px] leading-none tracking-wide text-white">
                Office Hours
              </h2>
              <ul className="flex flex-col gap-3">
                {OFFICE_HOURS.map((row) => (
                  <li
                    key={row.day}
                    className="flex items-center justify-between gap-4 border border-bsrf-border bg-bsrf-surface px-5 py-4"
                  >
                    <span className="text-[14px] text-white">{row.day}</span>
                    <span className="text-[13px] text-bsrf-muted">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 border-l-4 border-bsrf-green pl-4 font-bebas text-[32px] leading-none tracking-wide text-white">
                How Can We Help?
              </h2>
              <div className="grid gap-3 min-[768px]:grid-cols-2">
                {INQUIRY_TYPES.map((item) => (
                  <article
                    key={item.title}
                    className="border border-bsrf-border bg-bsrf-surface p-5 transition-all hover:border-t-bsrf-green hover:border-t-[3px]"
                  >
                    <h3 className="mb-2 text-[14px] font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-[13px] leading-[1.6] text-bsrf-muted">
                      {item.desc}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-bsrf-border bg-bsrf-card p-8 min-[981px]:p-10">
            <h2 className="mb-2 font-bebas text-[32px] leading-none text-white">
              Send a Message
            </h2>
            <p className="mb-8 max-w-[56ch] text-[14px] leading-[1.7] text-bsrf-muted">
              Use the form below to reach the federation office. For urgent
              tournament matters, please call during office hours.
            </p>

            <form
              className="grid gap-5 min-[768px]:grid-cols-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.12em] text-bsrf-muted">
                  Full Name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  className="border border-bsrf-border bg-bsrf-surface px-4 py-3 text-[14px] text-white outline-none transition-colors focus:border-bsrf-green"
                  placeholder="Your name"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.12em] text-bsrf-muted">
                  Email Address
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="border border-bsrf-border bg-bsrf-surface px-4 py-3 text-[14px] text-white outline-none transition-colors focus:border-bsrf-green"
                  placeholder="you@example.com"
                />
              </label>

              <label className="flex flex-col gap-2 min-[768px]:col-span-2">
                <span className="text-[11px] uppercase tracking-[0.12em] text-bsrf-muted">
                  Subject
                </span>
                <select
                  name="subject"
                  className={cn(
                    'border border-bsrf-border bg-bsrf-surface px-4 py-3 text-[14px] text-white outline-none transition-colors focus:border-bsrf-green'
                  )}
                >
                  {INQUIRY_TYPES.map((item) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 min-[768px]:col-span-2">
                <span className="text-[11px] uppercase tracking-[0.12em] text-bsrf-muted">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="resize-y border border-bsrf-border bg-bsrf-surface px-4 py-3 text-[14px] text-white outline-none transition-colors focus:border-bsrf-green"
                  placeholder="How can we help you?"
                />
              </label>

              <div className="min-[768px]:col-span-2">
                <button
                  type="submit"
                  className="rounded-[2px] border border-bsrf-green bg-bsrf-green px-[22px] py-[12px] text-[12px] font-bold uppercase tracking-[0.08em] text-black transition-all hover:brightness-[1.1]"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <BsrfDetailsFooter />
    </BsrfShell>
  )
}
