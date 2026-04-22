'use client';

import Image from 'next/image';
import Link from 'next/link';

/**
 * Admin-only top bar — same surface as the public site header.
 * #F3F4F6 is the admin *container* (SiteChrome + shell), not this bar.
 */
export function AdminHeader() {
  return (
    <header
      className="w-full shrink-0"
      style={{
        background:
          'linear-gradient(135deg, rgba(0, 150, 110, 0.85), rgba(255, 59, 59, 0.75))',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.25)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2">
        <div className="flex h-14 items-center gap-3 sm:h-18 sm:gap-4">
          <Link
            href="/"
            className="group flex h-full min-h-0 max-h-full shrink-0 items-center rounded-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900/20"
            aria-label="bdsquash — go to home"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={15}
              className="h-auto w-36 max-h-8 min-w-0 object-contain object-left sm:max-h-9 sm:w-40 lg:w-44"
              priority
              sizes="(min-width: 1024px) 176px, (min-width: 640px) 160px, 144px"
            />
          </Link>
          <div
            className="hidden h-7 w-px shrink-0 bg-white/30 sm:block"
            aria-hidden
          />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
              Administration
            </p>
            <p className="hidden truncate text-xs text-white/75 sm:block">
              Bangladesh Squash — BSRF
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
