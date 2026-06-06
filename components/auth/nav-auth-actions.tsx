"use client"

import Link from "next/link"
import { LayoutDashboard, LogOut, UserCircle } from "lucide-react"
import { logoutAction } from "@/app/actions/auth"
import { useAuthSession } from "@/components/auth/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { publicEnv } from "@/lib/env"
import type { AuthUser } from "@/lib/types/auth"
import { cn } from "@/lib/utils"

type NavAuthVariant = "bsrf" | "header"

function resolveProfileImageUrl(profileImage?: string | null): string | undefined {
  if (!profileImage) return undefined
  if (/^https?:\/\//i.test(profileImage)) return profileImage
  return `${publicEnv.imgUrl}${profileImage.startsWith("/") ? profileImage : `/${profileImage}`}`
}

function displayName(user: AuthUser): string {
  return user.name?.trim() || user.userPhone || "Account"
}

function displaySubtitle(user: AuthUser): string {
  if (user.email) return user.email
  return user.userType
}

function LoginLink({
  variant,
  mobile,
  onNavigate,
}: {
  variant: NavAuthVariant
  mobile?: boolean
  onNavigate?: () => void
}) {
  if (mobile) {
    return (
      <Link
        href="/login"
        onClick={onNavigate}
        className={cn(
          "py-3.5 text-sm uppercase tracking-[0.18em]",
          variant === "bsrf" ? "text-bsrf-green" : "font-medium text-gray-900"
        )}
      >
        Login →
      </Link>
    )
  }

  if (variant === "header") {
    return (
      <Link
        href="/login"
        className="inline-flex h-10 w-max items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium uppercase text-white transition-colors hover:bg-gray-800"
      >
        Login
      </Link>
    )
  }

  return (
    <Link
      href="/login"
      className="hidden rounded-full bg-bsrf-green px-[22px] py-[11px] text-center text-xs font-bold uppercase tracking-[0.08em] text-black transition-all hover:-translate-y-px hover:shadow-[0_6px_22px_rgba(200,244,0,0.25)] md:inline-block"
    >
      Login
    </Link>
  )
}

function UserAvatar({
  user,
  variant,
  size = "md",
}: {
  user: AuthUser
  variant: NavAuthVariant
  size?: "md" | "lg"
}) {
  const avatarUrl = resolveProfileImageUrl(user.profileImage)
  const sizeClass = size === "lg" ? "size-10" : "size-9"

  return (
    <Avatar
      className={cn(
        sizeClass,
        "border-2",
        variant === "bsrf" ? "border-bsrf-green" : "border-emerald-700"
      )}
    >
      {avatarUrl ? <AvatarImage src={avatarUrl} alt={displayName(user)} /> : null}
      <AvatarFallback
        className={cn(
          "text-xs font-bold",
          variant === "bsrf" ? "bg-bsrf-green text-black" : "bg-emerald-700 text-white"
        )}
      >
        {user.initials}
      </AvatarFallback>
    </Avatar>
  )
}

function UserMenuDesktop({
  user,
  variant,
}: {
  user: AuthUser
  variant: NavAuthVariant
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "rounded-full outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2",
            variant === "bsrf"
              ? "focus-visible:ring-bsrf-green focus-visible:ring-offset-bsrf-primary"
              : "focus-visible:ring-gray-900 focus-visible:ring-offset-white"
          )}
          aria-label="Account menu"
        >
          <UserAvatar user={user} variant={variant} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium">{displayName(user)}</p>
          <p className="text-xs text-muted-foreground">{displaySubtitle(user)}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/admin" className="cursor-pointer">
            <LayoutDashboard />
            Admin Panel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/admin/profile" className="cursor-pointer">
            <UserCircle />
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive"
          onSelect={(event) => {
            event.preventDefault()
            void logoutAction()
          }}
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function UserMenuMobile({
  user,
  variant,
  onNavigate,
}: {
  user: AuthUser
  variant: NavAuthVariant
  onNavigate?: () => void
}) {
  return (
    <div
      className={cn(
        "pt-3",
        variant === "bsrf" ? "border-t border-bsrf-border" : "border-t mt-2"
      )}
    >
      <div className="mb-3 flex items-center gap-3 py-2">
        <UserAvatar user={user} variant={variant} size="lg" />
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              variant === "bsrf" ? "text-white" : "text-gray-900"
            )}
          >
            {displayName(user)}
          </p>
          <p
            className={cn(
              "text-xs",
              variant === "bsrf" ? "text-bsrf-muted" : "text-gray-500"
            )}
          >
            {displaySubtitle(user)}
          </p>
        </div>
      </div>
      <Link
        href="/admin"
        onClick={onNavigate}
        className={cn(
          "mb-2 block py-2 text-sm uppercase tracking-[0.12em]",
          variant === "bsrf"
            ? "text-white hover:text-bsrf-green"
            : "font-medium text-gray-800 hover:text-gray-600"
        )}
      >
        Admin Panel
      </Link>
      <Link
        href="/admin/profile"
        onClick={onNavigate}
        className={cn(
          "mb-2 block py-2 text-sm uppercase tracking-[0.12em]",
          variant === "bsrf"
            ? "text-white hover:text-bsrf-green"
            : "font-medium text-gray-800 hover:text-gray-600"
        )}
      >
        My Profile
      </Link>
      <form action={logoutAction}>
        <button
          type="submit"
          onClick={onNavigate}
          className={cn(
            "py-2 text-sm uppercase tracking-[0.12em]",
            variant === "bsrf" ? "text-bsrf-red" : "font-medium text-red-600"
          )}
        >
          Logout
        </button>
      </form>
    </div>
  )
}

export function NavAuthActions({
  variant = "bsrf",
  layout = "desktop",
  onNavigate,
}: {
  variant?: NavAuthVariant
  layout?: "desktop" | "mobile"
  onNavigate?: () => void
}) {
  const session = useAuthSession()

  if (!session.isAuthenticated || !session.user) {
    return <LoginLink variant={variant} mobile={layout === "mobile"} onNavigate={onNavigate} />
  }

  if (layout === "mobile") {
    return (
      <UserMenuMobile
        user={session.user}
        variant={variant}
        onNavigate={onNavigate}
      />
    )
  }

  return (
    <div className={variant === "bsrf" ? "hidden md:block" : undefined}>
      <UserMenuDesktop user={session.user} variant={variant} />
    </div>
  )
}
