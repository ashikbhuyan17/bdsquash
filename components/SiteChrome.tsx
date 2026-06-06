"use client"

import { usePathname } from "next/navigation"
import { AdminSiteHeader } from "@/components/admin/admin-site-header"
import Footer from "@/components/Footer"
import Header from "@/components/shared-ui-components/Header"

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin") ?? false
  const isHome = pathname === "/"
  const isBsrfDetails =
    pathname === "/events" ||
    pathname === "/media-gallery" ||
    pathname === "/players-rankings" ||
    pathname === "/contact" ||
    pathname === "/committee" ||
    pathname === "/news" ||
    pathname === "/login"

  if (isAdmin) {
    // Document (window) scroll when content is tall; min-h-dvh + flex-1 main fills below header
    // so the admin background reaches the bottom (no white strip) on short pages.
    return (
      <div className="relative flex min-h-dvh w-full max-w-full flex-col bg-[#F3F4F6]">
        <div className="pointer-events-none absolute inset-0 z-0" />
        <div className="relative z-10 shrink-0">
          <AdminSiteHeader />
        </div>
        <main className="relative z-10 flex min-h-0 w-full min-w-0 flex-1 flex-col">{children}</main>
      </div>
    )
  }

  if (isHome) {
    return <main className="relative z-10">{children}</main>
  }

  if (isBsrfDetails) {
    return <main className="relative z-10">{children}</main>
  }

  return (
    <div className="min-h-screen w-full relative">
      <div className="absolute inset-0 z-0" />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  )
}
