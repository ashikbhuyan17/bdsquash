import React, { ReactNode } from 'react'
import Link from 'next/link'
export function BsrfDetailsPageHero({
  crumb,
  title,
  sub,
}: {
  crumb: string
  title: ReactNode
  sub?: string
}) {
  return (
    <header
      className="relative overflow-hidden border-b border-bsrf-border bg-[radial-gradient(ellipse_at_16%_30%,#04241B_0%,transparent_55%),radial-gradient(ellipse_at_88%_10%,#052b20_0%,transparent_52%),radial-gradient(ellipse_at_72%_110%,#1c0309_0%,transparent_55%),#0A0A0A] px-4 py-10 pb-8 sm:px-[5%] md:px-[8%] md:py-16 md:pb-[52px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(0deg,#fff_0_1px,transparent_1px_80px),repeating-linear-gradient(90deg,#fff_0_1px,transparent_1px_80px)]"
      />

      <div className="relative z-2">
        <nav
          className="mb-[22px] flex items-center gap-2.5 text-[12px] uppercase tracking-[0.08em] text-bsrf-muted"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-bsrf-green">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="whitespace-nowrap text-bsrf-green">{crumb}</span>
        </nav>

        <h1 className="font-bebas text-[clamp(52px,8vw,104px)] leading-[0.9] tracking-[1px] text-white">
          {title}
        </h1>

        {sub ? (
          <p className="mt-[16px] max-w-[60ch] text-[16px] leading-[1.7] text-bsrf-muted">
            {sub}
          </p>
        ) : null}
      </div>
    </header>
  )
}

