"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EVENT_STATUSES, type EventsFilterState } from "@/lib/types/events"
import type { EventType } from "@/lib/types/event-types"

type EventsFiltersBarProps = {
  filters: EventsFilterState
  eventTypeOptions: EventType[]
  onChange: (next: EventsFilterState) => void
}

export function EventsFiltersBar({
  filters,
  eventTypeOptions,
  onChange,
}: EventsFiltersBarProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <div className="space-y-1.5">
        <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">
          Active
        </span>
        <Select
          value={filters.active}
          onValueChange={(value) =>
            onChange({ ...filters, active: value as EventsFilterState["active"] })
          }
        >
          <SelectTrigger className="border-slate-200 bg-white h-10 w-full rounded-sm shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">
          Event status
        </span>
        <Select
          value={filters.eventStatus}
          onValueChange={(value) =>
            onChange({
              ...filters,
              eventStatus: value as EventsFilterState["eventStatus"],
            })
          }
        >
          <SelectTrigger className="border-slate-200 bg-white h-10 w-full rounded-sm shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {EVENT_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">
          Event type
        </span>
        <Select
          value={filters.eventTypeId}
          onValueChange={(value) => onChange({ ...filters, eventTypeId: value })}
        >
          <SelectTrigger className="border-slate-200 bg-white h-10 w-full rounded-sm shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {eventTypeOptions.map((type) => (
              <SelectItem key={type.eventTypeId} value={String(type.eventTypeId)}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">
          Event ID
        </span>
        <Input
          value={filters.eventId}
          onChange={(event) => onChange({ ...filters, eventId: event.target.value })}
          placeholder="e.g. 6"
          inputMode="numeric"
          className="border-slate-200 bg-white h-10 rounded-sm shadow-sm"
        />
      </div>
    </div>
  )
}
