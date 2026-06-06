const DEV_DEFAULTS: Record<string, string> = {
  NEXT_PUBLIC_BASE_URL: "http://localhost:9000",
  NEXT_PUBLIC_API_URL: "https://api.bdsquash.org/api",
  NEXT_PUBLIC_IMG_URL: "https://api.bdsquash.org",
}

function getPublicEnv(name: keyof typeof DEV_DEFAULTS): string {
  const value = process.env[name]?.trim()
  if (value) return value

  if (process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return DEV_DEFAULTS[name]
}

/** Safe for client and server bundles (NEXT_PUBLIC_* only). */
export const publicEnv = {
  baseUrl: getPublicEnv("NEXT_PUBLIC_BASE_URL"),
  apiUrl: getPublicEnv("NEXT_PUBLIC_API_URL"),
  imgUrl: getPublicEnv("NEXT_PUBLIC_IMG_URL"),
} as const

/** Server-only secret. Do not import in client components. */
export function getGuestCartJwtSecret(): string {
  const value = process.env.GUEST_CART_JWT_SECRET?.trim()
  if (value) return value

  if (process.env.NODE_ENV === "production") {
    throw new Error("Missing required environment variable: GUEST_CART_JWT_SECRET")
  }

  return "dev-guest-cart-jwt-secret-local-only"
}
