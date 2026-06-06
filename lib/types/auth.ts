export type LoginRequest = {
  userName: string
  password: string
  isRememberMe: boolean
}

export type LoginResponse = {
  isValid: boolean
  data: string
  message: string
}

export type LoginActionState = {
  error?: string
}

export type AuthUser = {
  userId: string
  userPhone: string
  userType: string
  initials: string
  name?: string
  email?: string | null
  profileImage?: string | null
}

export type AuthSession = {
  isAuthenticated: boolean
  user?: AuthUser
}
