'use client';

import Link from 'next/link';
import {
  ArrowUpRightIcon,
  CalendarDaysIcon,
  CalendarIcon,
  CircleHelpIcon,
  ImageIcon,
  ImagesIcon,
  InfoIcon,
  LayoutDashboardIcon,
  NewspaperIcon,
  UserCogIcon,
  UsersIcon,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useSimulatedLoader } from '@/hooks/useSimulatedLoader';
import {
  seedAbout,
  seedBanners,
  seedGallery,
  seedNews,
  seedPlayers,
} from '@/lib/admin/seed';

const modules = [
  {
    href: '/admin/banner',
    label: 'Banner',
    count: () => seedBanners.length,
    description: 'Hero + announcement strips',
    icon: ImageIcon,
  },
  {
    href: '/admin/news',
    label: 'News',
    count: () => seedNews.length,
    description: 'Newsroom posts and dates',
    icon: NewspaperIcon,
  },
  {
    href: '/admin/events',
    label: 'Events',
    count: () => 0,
    description: 'Tournaments, schedules, and locations',
    icon: CalendarIcon,
  },
  {
    href: '/admin/event-types',
    label: 'Event types',
    count: () => 0,
    description: 'Tournament and event categories',
    icon: CalendarDaysIcon,
  },
  {
    href: '/admin/players',
    label: 'Players',
    count: () => seedPlayers.length,
    description: 'Rankings and bios',
    icon: UsersIcon,
  },
  {
    href: '/admin/officials',
    label: 'COMMITTEE',
    count: () => 0,
    description: 'Federation committee members',
    icon: UserCogIcon,
  },
  {
    href: '/admin/gallery',
    label: 'Gallery',
    count: () => seedGallery.length,
    description: 'Media albums and links',
    icon: ImagesIcon,
  },
  {
    href: '/admin/faqs',
    label: 'FAQs',
    count: () => 0,
    description: 'Questions and answers for visitors',
    icon: CircleHelpIcon,
  },
  {
    href: '/admin/about',
    label: 'About',
    count: () => seedAbout.length,
    description: 'Story, mission, leadership',
    icon: InfoIcon,
  },
] as const;

export function AdminDashboardClient() {
  const loading = useSimulatedLoader(300);

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="max-w-2xl space-y-1">
        <h2 className="text-slate-900 text-lg font-semibold tracking-tight sm:text-xl">
          Overview
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          This dashboard is front-end only: data lives in the browser until
          refresh. Each card links to a module; connect your API in the client
          module files when ready.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.href}
              href={m.href}
              className="group block h-full min-h-0"
            >
              <Card className="border-slate-200/90 hover:border-[#1b4332]/25 h-full rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="bg-emerald-50 text-emerald-800 flex size-10 items-center justify-center rounded-xl">
                      <Icon className="size-5" />
                    </div>
                    <div className="text-slate-400 group-hover:text-slate-700 flex items-center text-xs font-medium">
                      Open
                      <ArrowUpRightIcon className="size-3.5" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-slate-800 text-base font-semibold">
                      {m.label}
                    </CardTitle>
                    <CardDescription className="text-slate-500 text-xs sm:text-sm">
                      {m.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {loading ? (
                    <Skeleton className="h-8 w-20 rounded-lg" />
                  ) : (
                    <p className="text-slate-900 text-3xl font-semibold tabular-nums">
                      {m.count()}
                    </p>
                  )}
                  <p className="text-slate-500 text-xs">Rows in demo seed</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card className="border-slate-200/90 border-dashed bg-white/80 rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <LayoutDashboardIcon className="text-slate-500 size-4" />
            <CardTitle className="text-slate-800 text-base font-semibold">
              What’s next
            </CardTitle>
          </div>
          <CardDescription className="text-slate-500 text-sm">
            Add authentication, route guards, and API routes when you are ready.
            The admin modules live under{' '}
            <code className="text-slate-700 text-xs">components/admin</code> and{' '}
            <code className="text-slate-700 text-xs">app/admin</code> for a
            clean upgrade path.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="border-slate-200/90 border-dashed bg-white/80 rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <LayoutDashboardIcon className="text-slate-500 size-4" />
            <CardTitle className="text-slate-800 text-base font-semibold">
              What’s next
            </CardTitle>
          </div>
          <CardDescription className="text-slate-500 text-sm">
            Add authentication, route guards, and API routes when you are ready.
            The admin modules live under{' '}
            <code className="text-slate-700 text-xs">components/admin</code> and{' '}
            <code className="text-slate-700 text-xs">app/admin</code> for a
            clean upgrade path.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="border-slate-200/90 border-dashed bg-white/80 rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <LayoutDashboardIcon className="text-slate-500 size-4" />
            <CardTitle className="text-slate-800 text-base font-semibold">
              What’s next
            </CardTitle>
          </div>
          <CardDescription className="text-slate-500 text-sm">
            Add authentication, route guards, and API routes when you are ready.
            The admin modules live under{' '}
            <code className="text-slate-700 text-xs">components/admin</code> and{' '}
            <code className="text-slate-700 text-xs">app/admin</code> for a
            clean upgrade path.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="border-slate-200/90 border-dashed bg-white/80 rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <LayoutDashboardIcon className="text-slate-500 size-4" />
            <CardTitle className="text-slate-800 text-base font-semibold">
              What’s next
            </CardTitle>
          </div>
          <CardDescription className="text-slate-500 text-sm">
            Add authentication, route guards, and API routes when you are ready.
            The admin modules live under{' '}
            <code className="text-slate-700 text-xs">components/admin</code> and{' '}
            <code className="text-slate-700 text-xs">app/admin</code> for a
            clean upgrade path.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="border-slate-200/90 border-dashed bg-white/80 rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <LayoutDashboardIcon className="text-slate-500 size-4" />
            <CardTitle className="text-slate-800 text-base font-semibold">
              What’s next
            </CardTitle>
          </div>
          <CardDescription className="text-slate-500 text-sm">
            Add authentication, route guards, and API routes when you are ready.
            The admin modules live under{' '}
            <code className="text-slate-700 text-xs">components/admin</code> and{' '}
            <code className="text-slate-700 text-xs">app/admin</code> for a
            clean upgrade path.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
