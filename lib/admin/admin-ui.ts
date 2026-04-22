import { cn } from "@/lib/utils"

/** Thead’s single header row: no body border, no hover (see `TableHeader` / `TableRow` in @/components/ui/table). */
export const adminTableHeaderRowClass = "border-0 hover:bg-transparent"

/** Forest green CTA, aligned with the reference admin UI */
export const adminBtnPrimary = cn(
  "h-9 gap-1.5 rounded-lg bg-[#1b4332] px-4 text-sm font-medium text-white shadow-sm",
  "transition-colors hover:bg-[#2d6a4f] focus-visible:ring-2 focus-visible:ring-[#1b4332]/30 focus-visible:ring-offset-2",
  "active:scale-[0.99] disabled:opacity-50"
)
