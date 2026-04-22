"use client"

import { useMemo, useState } from "react"

type FilterMode = "all" | "active" | "inactive"

const PAGE_SIZES = [5, 10, 25, 50] as const
export { PAGE_SIZES }

export function useClientPagination<T extends { active: boolean }>(
  items: T[],
  initialPageSize: (typeof PAGE_SIZES)[number] = 10
) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<FilterMode>("all")
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return items.filter((row) => {
      if (statusFilter === "active" && !row.active) return false
      if (statusFilter === "inactive" && row.active) return false
      if (!q) return true
      const blob = JSON.stringify(row).toLowerCase()
      return blob.includes(q)
    })
  }, [items, search, statusFilter])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize) || 1)
  const safePage = Math.min(page, pageCount - 1)
  const sliceStart = safePage * pageSize
  const pageItems = useMemo(
    () => filtered.slice(sliceStart, sliceStart + pageSize),
    [filtered, pageSize, sliceStart]
  )

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    page: safePage,
    setPage: (p: number) => setPage(Math.max(0, p)),
    pageSize,
    setPageSize: (n: (typeof PAGE_SIZES)[number]) => {
      setPageSize(n)
      setPage(0)
    },
    pageCount,
    pageItems,
    totalFiltered: filtered.length,
    onSearchChange: (v: string) => {
      setSearch(v)
      setPage(0)
    },
    onStatusChange: (v: FilterMode) => {
      setStatusFilter(v)
      setPage(0)
    },
  }
}

export type { FilterMode }
