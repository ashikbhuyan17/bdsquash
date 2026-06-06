import "server-only"

import { cookies } from "next/headers"
import { AUTH_COOKIES } from "@/lib/auth.constants"
import type { AuthSession, AuthUser } from "@/lib/types/auth"

export { AUTH_COOKIES }

export type AuthTokens = {
  accessToken: string
  refreshToken?: string
}

const DEFAULT_AUTH_MAX_AGE = 60 * 60 * 24 * 7

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const segment = token.split(".")[1]
    if (!segment) return null
    const json = Buffer.from(segment, "base64url").toString("utf8")
    return JSON.parse(json) as Record<string, unknown>
  } catch {
    return null
  }
}

function buildAuthUser(payload: Record<string, unknown>): AuthUser {
  const userPhone = String(payload.UserPhone ?? payload.userPhone ?? "")
  const userId = String(payload.UserId ?? payload.userId ?? "")
  const userType = String(payload.UserType ?? payload.userType ?? "User")
  const initials =
    userType.length >= 2
      ? userType.slice(0, 2).toUpperCase()
      : userPhone.slice(-2) || "U"

  return { userId, userPhone, userType, initials }
}

export async function getAuthSession(): Promise<AuthSession> {
  const token = await getAccessToken()
  if (!token) return { isAuthenticated: false }

  const payload = decodeJwtPayload(token)
  if (!payload) return { isAuthenticated: false }

  const user = buildAuthUser(payload)

  try {
    const { fetchAdminInformation, mergeAdminProfile } = await import(
      "@/lib/admin-information"
    )
    const profile = await fetchAdminInformation()
    if (profile) {
      return {
        isAuthenticated: true,
        user: mergeAdminProfile(user, profile),
      }
    }
  } catch {
    // Fall back to JWT claims when profile API is unavailable.
  }

  return { isAuthenticated: true, user }
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getAuthSession()
  return session.isAuthenticated
}

export async function getAccessToken(): Promise<string | undefined> {
  const store = await cookies()
  return store.get(AUTH_COOKIES.accessToken)?.value
}

export async function getAuthTokens(): Promise<AuthTokens | null> {
  const store = await cookies()
  const accessToken = store.get(AUTH_COOKIES.accessToken)?.value
  if (!accessToken) return null

  const refreshToken = store.get(AUTH_COOKIES.refreshToken)?.value
  return refreshToken ? { accessToken, refreshToken } : { accessToken }
}

export async function setAuthTokens(
  tokens: AuthTokens,
  maxAge = DEFAULT_AUTH_MAX_AGE
): Promise<void> {
  const store = await cookies()
  store.set(AUTH_COOKIES.accessToken, tokens.accessToken, {
    ...cookieOptions,
    maxAge,
  })

  if (tokens.refreshToken) {
    store.set(AUTH_COOKIES.refreshToken, tokens.refreshToken, {
      ...cookieOptions,
      maxAge: maxAge * 2,
    })
  }
}

export async function clearAuthTokens(): Promise<void> {
  const store = await cookies()
  store.delete(AUTH_COOKIES.accessToken)
  store.delete(AUTH_COOKIES.refreshToken)
}

export const getAuthCookies = getAuthTokens
export const setAuthCookies = setAuthTokens
export const clearAuthCookies = clearAuthTokens
