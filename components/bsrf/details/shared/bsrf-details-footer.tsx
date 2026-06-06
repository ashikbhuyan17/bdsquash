import Link from 'next/link'
import React from 'react'
type FooterLink = { t: string; href: string }

const FOOTER_LINKS: FooterLink[] = [
  { t: 'About BSRF', href: '/#thebsrf' },
  { t: "President's Message", href: '/#president' },
  { t: 'Managing Committee', href: '/committee' },
  { t: 'News', href: '/news' },
  { t: 'Events', href: '/events' },
  { t: 'Players & Rankings', href: '/players-rankings' },
  { t: 'Media Gallery', href: '/media-gallery' },
  { t: 'Contact Us', href: '/contact' },
]

export function BsrfDetailsFooter() {
  return (
    <footer
      className="border-t-2 border-bsrf-green bg-bsrf-primary pt-[60px]"
      id="contact"
    >
      <div
        className="grid gap-6 px-4 pb-8 max-[980px]:grid-cols-1 sm:px-[5%] min-[981px]:grid-cols-[1.4fr_1fr_1.2fr] min-[981px]:gap-12 min-[981px]:pb-10 md:px-[8%]"
      >
        <div>
          <div className="mb-3 font-bebas text-4xl text-bsrf-green">BSRF</div>
          <div className="mb-4 text-[13px] text-bsrf-muted">
            Bangladesh Squash Rackets Federation
          </div>
          <p className="mb-5 max-w-[320px] text-[13px] leading-[1.7] text-bsrf-muted">
            Developing players, organizing championships, and growing the game
            of squash across Bangladesh.
          </p>
          <div className="flex gap-2.5">
            {['f', '▶', '📷'].map((icon, idx) => (
              <Link
                key={icon}
                href="/#contact"
                aria-label={
                  idx === 0
                    ? 'BSRF on Facebook'
                    : idx === 1
                      ? 'BSRF on YouTube'
                      : 'BSRF on Instagram'
                }
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-bsrf-border text-sm text-bsrf-muted transition-all hover:border-bsrf-green hover:text-bsrf-green"
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-bsrf-green">
            Quick Access
          </h5>
          <ul className="list-none">
            {FOOTER_LINKS.map((l) => (
              <li key={l.t}>
                {l.href.startsWith('/') && l.href.includes('#') ? (
                  <Link
                    href={l.href}
                    className="text-sm leading-[2.2] text-bsrf-muted transition-colors hover:text-bsrf-green"
                  >
                    {l.t}
                  </Link>
                ) : (
                  <Link
                    href={l.href}
                    className="text-sm leading-[2.2] text-bsrf-muted transition-colors hover:text-bsrf-green"
                  >
                    {l.t}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-bsrf-green">
            Get In Touch
          </h5>

          <div className="flex gap-2.5 text-[13px] leading-[2.2] text-bsrf-muted">
            <span>📍</span>
            <span>Squash Complex, 144 Gulshan Avenue, Gulshan-1, Dhaka-1212</span>
          </div>

          <div className="flex gap-2.5 text-[13px] leading-[2.2] text-bsrf-muted">
            <span>📞</span>
            <a
              href="tel:+8800255045089"
              className="transition-colors hover:text-bsrf-green"
            >
              +88 0255045089
            </a>
          </div>

          <div className="flex gap-2.5 text-[13px] leading-[2.2] text-bsrf-muted">
            <span>✉</span>
            <a
              href="mailto:info@bdsquash.org"
              className="transition-colors hover:text-bsrf-green"
            >
              info@bdsquash.org
            </a>
          </div>

          <div className="flex gap-2.5 text-[13px] leading-[2.2] text-bsrf-muted">
            <span>✉</span>
            <a
              href="mailto:squash.bd@gmail.com"
              className="transition-colors hover:text-bsrf-green"
            >
              squash.bd@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div
        className="flex flex-wrap justify-between gap-2.5 border-t border-bsrf-border px-4 py-4 sm:px-[5%] md:px-[8%] md:py-5"
      >
        <span className="text-xs text-white">
          © 2026 Bangladesh Squash Rackets Federation. All Rights Reserved.
        </span>
        <span className="text-xs text-white">
          Developed by{' '}
          <a
            href="https://aesthitech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bsrf-gold underline transition-colors hover:text-[#FCDCAC]"
          >
            AesthiTech Ltd.
          </a>
        </span>
      </div>
    </footer>
  )
}

