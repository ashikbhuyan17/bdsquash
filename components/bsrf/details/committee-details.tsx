'use client'

import Link from 'next/link'
import React from 'react'
import { CommitteeMemberGrid } from '@/components/bsrf/shared/committee-member-card'
import { BsrfShell } from './shared/bsrf-shell'
import { BsrfDetailsNav } from './shared/bsrf-details-nav'
import { BsrfDetailsFooter } from './shared/bsrf-details-footer'
import { BsrfDetailsPageHero } from './shared/bsrf-details-page-hero'

export function BsrfCommitteeDetails() {
  return (
    <BsrfShell>
      <a
        className="absolute left-3 top-[-60px] z-[200] rounded bg-bsrf-green px-[18px] py-2.5 text-[13px] font-bold text-black transition-[top] duration-200 focus:top-3"
        href="#main"
      >
        Skip to content
      </a>

      <BsrfDetailsNav active="committee" />

      <main id="main">
        <BsrfDetailsPageHero
          crumb="Managing Committee"
          title={
            <>
              <span className="block">MANAGING</span>
              <span className="block text-bsrf-green">COMMITTEE</span>
            </>
          }
          sub="The elected office bearers of the Bangladesh Squash Rackets Federation — governing squash development, tournaments, and federation affairs nationwide."
        />

        <section className="px-4 pt-10 pb-16 sm:px-[5%] md:px-[8%] md:pt-14 md:pb-20 lg:pt-[56px] lg:pb-[90px]" aria-label="Committee members">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 md:mb-10 md:gap-4">
            <h2 className="border-l-4 border-bsrf-red pl-4 font-bebas text-[32px] leading-none tracking-wide text-white min-[981px]:text-[38px]">
              Office Bearers
            </h2>
            <Link
              className="text-xs uppercase tracking-[0.12em] text-bsrf-green transition-opacity hover:opacity-70"
              href="/contact"
            >
              Contact The Office →
            </Link>
          </div>

          <CommitteeMemberGrid />

          <p className="mt-6 text-center text-xs text-bsrf-muted">
            Names shown are placeholders — to be updated with the current elected
            committee.
          </p>
        </section>
      </main>

      <BsrfDetailsFooter />
    </BsrfShell>
  )
}
