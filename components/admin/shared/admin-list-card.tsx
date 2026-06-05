import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function AdminListCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm",
        className
      )}
    >
      {children}
    </div>
  )
}
