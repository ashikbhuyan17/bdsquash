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
    <header className="relative overflow-hidden border-b border-bsrf-border px-4 py-10 pb-8 sm:px-[5%] md:px-[8%] md:py-16 md:pb-[52px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0A0A0A]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_48%,#04241B_0%,transparent_55%),radial-gradient(ellipse_at_82%_16%,#052b20_0%,transparent_50%),radial-gradient(ellipse_at_66%_86%,#1c0309_0%,transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_22%_55%,rgba(4,36,27,0.45)_0%,transparent_68%),radial-gradient(ellipse_70%_85%_at_78%_22%,rgba(5,43,32,0.38)_0%,transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(0deg,#fff_0_1px,transparent_1px_80px),repeating-linear-gradient(90deg,#fff_0_1px,transparent_1px_80px)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] right-[2%] select-none font-bebas text-[160px] leading-[0.8] tracking-[-6px] text-white opacity-[0.025] min-[981px]:text-[300px] min-[981px]:opacity-[0.03]"
      >
        BSRF
      </div>

      <div className="relative z-[2]">
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
