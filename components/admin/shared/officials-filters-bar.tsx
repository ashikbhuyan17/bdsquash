"use client"

import { Select, SelectValue } from "@/components/ui/select"
import {
  AdminSelectContent,
  AdminSelectItem,
  AdminSelectTrigger,
} from "@/components/admin/shared/admin-select"
import { OFFICIAL_TYPES, type OfficialsFilterState } from "@/lib/types/officials"

type OfficialsFiltersBarProps = {
  filters: OfficialsFilterState
  onChange: (next: OfficialsFilterState) => void
}

export function OfficialsFiltersBar({ filters, onChange }: OfficialsFiltersBarProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <div className="space-y-1.5">
        <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">
          Official type
        </span>
        <Select
          value={filters.officialType}
          onValueChange={(value) =>
            onChange({
              ...filters,
              officialType: value as OfficialsFilterState["officialType"],
            })
          }
        >
          <AdminSelectTrigger>
            <SelectValue placeholder="All types" />
          </AdminSelectTrigger>
          <AdminSelectContent>
            <AdminSelectItem value="all">All types</AdminSelectItem>
            {OFFICIAL_TYPES.map((type) => (
              <AdminSelectItem key={type} value={type}>
                {type}
              </AdminSelectItem>
            ))}
          </AdminSelectContent>
        </Select>
      </div>
    </div>
  )
}
