'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BsrfLogo } from '@/components/bsrf/shared/bsrf-logo';
import { NavAuthActions } from '@/components/auth/nav-auth-actions';
import { cn } from '@/lib/utils';

const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Profile', href: '/admin/profile' },
] as const;

export function AdminSiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-[100] flex h-[72px] w-full items-center justify-between border-b border-bsrf-border bg-[rgba(10,10,10,0.92)] px-4 backdrop-blur-md sm:px-[5%] lg:px-4 xl:h-[88px] xl:px-[8%]">
        <Link className="flex shrink-0 items-center gap-3.5" href="/admin">
          <BsrfLogo />
          <span className="hidden max-w-[180px] border-l border-bsrf-border pl-3.5 text-[11px] leading-tight text-white sm:inline">
            Administration Panel
          </span>
        </Link>

        <ul className="hidden list-none gap-6 md:flex xl:gap-[34px]">
          {ADMIN_NAV.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
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
            );
          })}
          <li>
            <Link
              href="/"
              className="text-xs uppercase tracking-[0.18em] text-white transition-colors hover:text-bsrf-green"
            >
              View Site
            </Link>
          </li>
        </ul>

        <NavAuthActions variant="bsrf" layout="desktop" />

        <button
          type="button"
          className="cursor-pointer border-none bg-transparent text-2xl text-white md:hidden"
          aria-label="Menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>
      </nav>

      <div
        className={cn(
          'fixed inset-x-0 top-[72px] z-[99] flex-col border-b border-bsrf-border bg-bsrf-primary px-4 py-4 pb-7 sm:px-[5%] md:hidden lg:px-4 xl:px-[8%]',
          menuOpen ? 'flex' : 'hidden'
        )}
      >
        {ADMIN_NAV.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'border-b border-bsrf-border py-3.5 text-sm uppercase tracking-[0.18em] transition-colors hover:text-bsrf-green',
                isActive ? 'text-bsrf-green' : 'text-white'
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="border-b border-bsrf-border py-3.5 text-sm uppercase tracking-[0.18em] text-white transition-colors hover:text-bsrf-green"
        >
          View Site
        </Link>
        <NavAuthActions
          variant="bsrf"
          layout="mobile"
          onNavigate={() => setMenuOpen(false)}
        />
      </div>
    </>
  );
}
