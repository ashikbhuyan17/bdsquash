"use client"

import { useActionState, useState } from "react"
import { loginAction } from "@/app/actions/auth"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { formPlaceholders } from "@/lib/admin/form-placeholders"
import { cn } from "@/lib/utils"

const inputClassName =
  "h-11 rounded-none border-bsrf-border bg-bsrf-card text-white placeholder:text-bsrf-muted focus-visible:border-bsrf-green focus-visible:ring-bsrf-green/20"

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, isPending] = useActionState(loginAction, {})
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="redirect" value={redirectTo} />
      {rememberMe ? <input type="hidden" name="isRememberMe" value="on" /> : null}

      {state.error ? (
        <div
          role="alert"
          className="border border-bsrf-red/40 bg-bsrf-red/10 px-4 py-3 text-sm text-white"
        >
          {state.error}
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="userName" className="text-xs uppercase tracking-[0.12em] text-bsrf-muted">
          Phone / Username
        </Label>
        <Input
          id="userName"
          name="userName"
          type="text"
          autoComplete="username"
          placeholder={formPlaceholders.phoneNumber}
          required
          disabled={isPending}
          className={inputClassName}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-xs uppercase tracking-[0.12em] text-bsrf-muted">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder={formPlaceholders.password}
          required
          disabled={isPending}
          className={inputClassName}
        />
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="isRememberMe"
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked === true)}
          disabled={isPending}
          className="border-bsrf-border data-[state=checked]:border-bsrf-green data-[state=checked]:bg-bsrf-green data-[state=checked]:text-black"
        />
        <Label htmlFor="isRememberMe" className="cursor-pointer text-sm text-bsrf-muted">
          Remember me
        </Label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "w-full rounded-full bg-bsrf-green px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-black transition-all",
          "hover:-translate-y-px hover:shadow-[0_6px_22px_rgba(0,196,106,0.25)]",
          "disabled:cursor-not-allowed disabled:opacity-60"
        )}
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}
