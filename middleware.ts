import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AUTH_COOKIES } from "@/lib/auth.constants"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(AUTH_COOKIES.accessToken)?.value
  const isAdminRoute = pathname.startsWith("/admin")
  const isLoginPage = pathname === "/login"

  if (isAdminRoute && !token) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/login"
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isLoginPage && token) {
    const adminUrl = request.nextUrl.clone()
    adminUrl.pathname = "/admin"
    adminUrl.search = ""
    return NextResponse.redirect(adminUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/login"],
}
