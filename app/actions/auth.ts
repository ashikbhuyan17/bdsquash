"use server"

import { redirect } from "next/navigation"
import { setAuthTokens, clearAuthTokens } from "@/lib/auth"
import { postRequest } from "@/lib/fetch"
import type { LoginActionState, LoginResponse } from "@/lib/types/auth"

const REMEMBER_ME_MAX_AGE = 60 * 60 * 24 * 30
const SESSION_MAX_AGE = 60 * 60 * 24

function getSafeRedirect(path: string | null | undefined): string {
  if (path && path.startsWith("/admin")) return path
  return "/admin"
}

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const userName = String(formData.get("userName") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const isRememberMe = formData.get("isRememberMe") === "on"
  const redirectTo = getSafeRedirect(String(formData.get("redirect") ?? ""))

  if (!userName || !password) {
    return { error: "Phone number and password are required." }
  }

  try {
    const result = await postRequest<LoginResponse>(
      "/login",
      { userName, password, isRememberMe },
      { anonymous: true, cache: "no-store" }
    )

    if (!result.isValid || !result.data) {
      return { error: result.message || "Invalid credentials." }
    }

    await setAuthTokens(
      { accessToken: result.data },
      isRememberMe ? REMEMBER_ME_MAX_AGE : SESSION_MAX_AGE
    )
  } catch {
    return { error: "Login failed. Please check your credentials and try again." }
  }

  redirect(redirectTo)
}

export async function logoutAction(): Promise<void> {
  await clearAuthTokens()
  redirect("/login")
}
