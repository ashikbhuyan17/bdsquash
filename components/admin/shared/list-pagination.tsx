"use client"

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PAGE_SIZES } from "@/hooks/useClientPagination"
import { cn } from "@/lib/utils"

type ListPaginationProps = {
  page: number
  pageCount: number
  total: number
  pageSize: number
  onPageSizeChange: (n: (typeof PAGE_SIZES)[number]) => void
  onPageChange: (p: number) => void
  className?: string
}

const squareNav =
  "size-8 rounded-lg border border-slate-200 bg-white p-0 text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-40 sm:size-9"

export function ListPagination({
  page,
  pageCount,
  total,
  pageSize,
  onPageSizeChange,
  onPageChange,
  className,
}: ListPaginationProps) {
  if (total === 0) return null

  const last = pageCount - 1

  return (
    <div
      className={cn(
        "border-slate-100 text-slate-600 flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-slate-500">Per page</span>
        <Select
          value={String(pageSize)}
          onValueChange={(v) => onPageSizeChange(Number(v) as (typeof PAGE_SIZES)[number])}
        >
          <SelectTrigger className="border-slate-200 bg-white h-9 w-[4.5rem] rounded-sm shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZES.map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-slate-400 max-sm:hidden">·</span>
        <span className="text-slate-500">
          <span className="text-slate-800 font-medium tabular-nums">{page + 1}</span>
          {" / "}
          <span className="tabular-nums">{pageCount}</span>
          <span className="max-sm:sr-only"> pages</span>
          <span className="text-slate-400"> · </span>
          <span className="tabular-nums">{total}</span> rows
        </span>
      </div>
      <div className="flex items-center justify-end gap-1">
        <Button
          type="button"
          variant="outline"
          className={squareNav}
          disabled={page <= 0}
          onClick={() => onPageChange(0)}
          aria-label="First page"
        >
          <ChevronsLeftIcon className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          className={squareNav}
          disabled={page <= 0}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          className={squareNav}
          disabled={page >= last}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRightIcon className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          className={squareNav}
          disabled={page >= last}
          onClick={() => onPageChange(last)}
          aria-label="Last page"
        >
          <ChevronsRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}
