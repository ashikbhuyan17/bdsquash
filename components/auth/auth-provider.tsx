"use client"

import { createContext, useContext } from "react"
import type { AuthSession } from "@/lib/types/auth"

const AuthContext = createContext<AuthSession>({ isAuthenticated: false })

export function AuthProvider({
  session,
  children,
}: {
  session: AuthSession
  children: React.ReactNode
}) {
  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
}

export function useAuthSession(): AuthSession {
  return useContext(AuthContext)
}
