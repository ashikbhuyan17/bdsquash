"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { logoutAction } from "@/app/actions/auth"
import {
  CalendarDaysIcon,
  CalendarIcon,
  CircleHelpIcon,
  HomeIcon,
  // ImageIcon,
  ImagesIcon,
  // InfoIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  // NewspaperIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  UserCircleIcon,
  UserCogIcon,
  UsersIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboardIcon },
  // { href: "/admin/banner", label: "Banner", icon: ImageIcon },
  // { href: "/admin/news", label: "News", icon: NewspaperIcon },
  { href: "/admin/event-types", label: "Event types", icon: CalendarDaysIcon },
  { href: "/admin/events", label: "Events", icon: CalendarIcon },
  { href: "/admin/players", label: "Players", icon: UsersIcon },
  { href: "/admin/officials", label: "Officials", icon: UserCogIcon },
  { href: "/admin/gallery", label: "Gallery", icon: ImagesIcon },
  { href: "/admin/faqs", label: "FAQs", icon: CircleHelpIcon },
  // { href: "/admin/about", label: "About", icon: InfoIcon },
  { href: "/admin/profile", label: "Profile", icon: UserCircleIcon },
] as const

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/banner": "Banner management",
  "/admin/news": "News & announcements",
  "/admin/event-types": "Event types",
  "/admin/events": "Events",
  "/admin/players": "Player rankings",
  "/admin/officials": "Coaches & officials",
  "/admin/gallery": "Media gallery",
  "/admin/faqs": "FAQs",
  "/admin/about": "About section",
  "/admin/profile": "Admin profile",
}

const subtitles: Record<string, string> = {
  "/admin": "Overview and quick access to your modules.",
  "/admin/banner": "View and edit home hero banners and links.",
  "/admin/news": "View all news items and campaign posts.",
  "/admin/event-types": "Manage event categories for tournaments and listings.",
  "/admin/events": "Create events, set schedules, and filter by status or type.",
  "/admin/players": "Register players, rankings, clubs, and profile details.",
  "/admin/officials": "Register coaches and officials with profile details.",
  "/admin/gallery": "View album entries and public gallery links.",
  "/admin/faqs": "Create and manage frequently asked questions.",
  "/admin/about": "Manage mission, vision, and leadership content.",
  "/admin/profile": "Update your name, email, and phone number.",
}

function titleForPath(path: string) {
  if (titles[path]) return titles[path]
  const hit = Object.keys(titles).find((k) => k !== "/admin" && path.startsWith(k))
  return hit ? titles[hit]! : "Admin"
}

function subtitleForPath(path: string) {
  if (subtitles[path]) return subtitles[path]
  const hit = Object.keys(subtitles).find((k) => k !== "/admin" && path.startsWith(k))
  return hit ? subtitles[hit]! : ""
}

/**
 * Admin layout: fills `main` from SiteChrome (min-h-dvh root). The site header is in document
 * flow (relative) so the desktop sidebar can use `sticky top-0` and sit flush at the viewport
 * top when you scroll; long nav scrolls inside the aside.
 */
export function AdminAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/admin"
  const [collapsed, setCollapsed] = React.useState(false)
  const pageTitle = titleForPath(pathname)
  const pageSub = subtitleForPath(pathname)

  return (
    <div className="text-foreground flex w-full flex-1 flex-col bg-[#F3F4F6] pb-6">
      <div
        className={cn(
          "mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-0",
          "px-3 py-2 sm:px-4 sm:py-3",
          "lg:flex-row lg:items-start lg:gap-4 lg:px-6 lg:py-4"
        )}
      >
        <aside
          className={cn(
            "bg-[#F3F4F6] flex shrink-0 flex-col",
            "transition-[width] duration-200",
            "w-full min-h-0",
            collapsed ? "lg:max-w-14" : "lg:max-w-64",
            collapsed ? "lg:w-14" : "lg:w-60",
            "lg:z-10 lg:max-h-dvh lg:shrink-0 lg:overflow-y-auto lg:self-start lg:sticky lg:top-0"
          )}
        >
          <div
            className={cn(
              "flex h-14 shrink-0 items-center gap-2 px-2.5",
              collapsed && "lg:justify-center"
            )}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0 text-slate-600 hover:text-slate-900"
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeftOpenIcon className="size-4" /> : <PanelLeftCloseIcon className="size-4" />}
            </Button>
            <div className={cn("min-w-0", collapsed && "lg:hidden")}>
              <p className="text-xs font-bold tracking-tight text-slate-400 uppercase">bdsquash</p>
              <p className="text-sm font-bold tracking-tight text-slate-800">Admin</p>
            </div>
          </div>
          <div className="min-h-0 flex-1 py-2">
            <nav className="flex flex-col gap-1 px-2" aria-label="Admin">
              {nav.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`)
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl py-2.5 text-sm font-medium transition-colors",
                      "px-3",
                      collapsed && "lg:justify-center lg:px-0",
                      active
                        ? "bg-slate-800 text-white"
                        : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                    )}
                  >
                    <Icon className="size-4 shrink-0 opacity-90" />
                    <span className={cn("truncate", collapsed && "lg:sr-only")}>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className={cn("mt-auto shrink-0 space-y-2 p-2.5", collapsed && "lg:px-1.5")}>
            <Link
              href="/"
              className="text-slate-500 hover:text-slate-800 flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors"
            >
              <HomeIcon className="size-3.5" />
              <span className={cn(collapsed && "lg:sr-only")}>View site</span>
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-rose-600 hover:bg-rose-50 flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors"
              >
                <LogOutIcon className="size-3.5" />
                <span className={cn(collapsed && "lg:sr-only")}>Logout</span>
              </button>
            </form>
          </div>
        </aside>

        <div className="mt-2 flex min-w-0 flex-1 flex-col lg:mt-0">
          <header className="shrink-0 border-b border-slate-200/50 bg-[#F3F4F6] pb-3 sm:pb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {pageTitle}
                </h1>
                {pageSub ? (
                  <p className="text-slate-500 mt-0.5 max-w-2xl text-sm leading-relaxed">{pageSub}</p>
                ) : null}
              </div>
              <Button
                asChild
                size="icon"
                variant="outline"
                className="mt-0.5 shrink-0 border-slate-200 bg-white sm:hidden"
              >
                <Link href="/" aria-label="View site">
                  <MenuIcon className="size-4" />
                </Link>
              </Button>
            </div>
          </header>
          <div className="text-foreground w-full py-2 sm:pt-3">{children}</div>
        </div>
      </div>
    </div>
  )
}
