import { BsrfShell } from "@/components/bsrf/details/shared/bsrf-shell"
import { BsrfDetailsNav } from "@/components/bsrf/details/shared/bsrf-details-nav"
import { BsrfDetailsPageHero } from "@/components/bsrf/details/shared/bsrf-details-page-hero"
import { BsrfDetailsFooter } from "@/components/bsrf/details/shared/bsrf-details-footer"
import { LoginForm } from "@/components/auth/login-form"

export function LoginDetails({ redirectTo }: { redirectTo: string }) {
  return (
    <BsrfShell>
      <BsrfDetailsNav />
      <BsrfDetailsPageHero
        crumb="Admin Login"
        title={
          <>
            Sign <span className="text-bsrf-green">In</span>
          </>
        }
        sub="Access the BSRF administration panel to manage news, events, gallery, and more."
      />

      <section className="px-4 py-12 sm:px-[5%] md:px-[8%] md:py-16">
        <div className="mx-auto max-w-md border border-bsrf-border border-l-[3px] border-l-bsrf-green bg-bsrf-surface p-8">
          <p className="mb-8 text-sm leading-relaxed text-bsrf-muted">
            Enter your admin credentials to continue to the dashboard.
          </p>
          <LoginForm redirectTo={redirectTo} />
        </div>
      </section>

      <BsrfDetailsFooter />
    </BsrfShell>
  )
}
