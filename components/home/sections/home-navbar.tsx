'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HOME_NAV } from '@/lib/home/data';
import { cn } from '@/lib/utils';

export function HomeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-[100] flex h-[72px] w-full items-center justify-between border-b border-bsrf-border bg-[rgba(10,10,10,0.92)] px-4 backdrop-blur-md sm:px-[5%] lg:px-4 xl:h-[88px] xl:px-[8%]">
        <Link className="flex shrink-0 items-center gap-3.5" href="/">
          <span className="font-bebas text-[28px] leading-none tracking-wide text-bsrf-green">
            BSRF
          </span>
          <span className="hidden max-w-[150px] border-l border-bsrf-border pl-3.5 text-[11px] leading-tight text-white sm:inline">
            Bangladesh Squash Rackets Federation
          </span>
        </Link>
        <ul className="hidden list-none gap-6 lg:flex xl:gap-[34px]">
          {HOME_NAV.map((item) => (
            <li key={item.label}>
              {item.href.startsWith('/') ? (
                <Link
                  href={item.href}
                  className="text-xs uppercase tracking-[0.18em] text-white transition-colors hover:text-bsrf-green"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="text-xs uppercase tracking-[0.18em] text-white transition-colors hover:text-bsrf-green"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="hidden rounded-full bg-bsrf-green px-[22px] py-[11px] text-center text-xs font-bold uppercase tracking-[0.08em] text-black transition-all hover:-translate-y-px hover:shadow-[0_6px_22px_rgba(200,244,0,0.25)] md:inline-block"
        >
          Register
        </Link>
        <button
          type="button"
          className="cursor-pointer border-none bg-transparent text-2xl text-white lg:hidden"
          aria-label="Menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>
      </nav>
      <div
        className={cn(
          'fixed inset-x-0 top-[72px] z-[99] flex-col border-b border-bsrf-border bg-bsrf-primary px-4 py-4 pb-7 sm:px-[5%] lg:hidden lg:px-4 xl:px-[8%]',
          menuOpen ? 'flex' : 'hidden'
        )}
      >
        {HOME_NAV.map((item) =>
          item.href.startsWith('/') ? (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-bsrf-border py-3.5 text-sm uppercase tracking-[0.18em] text-white transition-colors hover:text-bsrf-green"
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-bsrf-border py-3.5 text-sm uppercase tracking-[0.18em] text-white transition-colors hover:text-bsrf-green"
            >
              {item.label}
            </a>
          )
        )}
        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          className="py-3.5 text-sm uppercase tracking-[0.18em] text-bsrf-green"
        >
          Register →
        </Link>
      </div>
    </>
  );
}
