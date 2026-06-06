import type { Metadata } from "next"
import { LoginDetails } from "@/components/auth/login-details"

export const metadata: Metadata = {
  title: "Admin Login | Bangladesh Squash Rackets Federation",
  description: "Sign in to the BSRF administration panel.",
}

type LoginPageProps = {
  searchParams: Promise<{ redirect?: string }>
}

function getRedirectPath(redirect: string | undefined): string {
  if (redirect && redirect.startsWith("/admin")) return redirect
  return "/admin"
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const redirectTo = getRedirectPath(params.redirect)

  return <LoginDetails redirectTo={redirectTo} />
}
