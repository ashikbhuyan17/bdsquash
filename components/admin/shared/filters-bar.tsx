'use client';

import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FilterMode } from '@/hooks/useClientPagination';

type FiltersBarProps = {
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: FilterMode;
  onStatusChange: (v: FilterMode) => void;
};

export function FiltersBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: FiltersBarProps) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative min-w-0 flex-1 sm:max-w-sm">
        <SearchIcon className="text-slate-400 absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search…"
          className="border-slate-200 bg-slate-50/80 h-10 rounded-sm pl-10 shadow-sm focus-visible:bg-white"
          aria-label="Search table"
        />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-slate-500 hidden text-sm sm:inline">Status</span>
        <Select
          value={statusFilter}
          onValueChange={(v) => onStatusChange(v as FilterMode)}
        >
          <SelectTrigger className="border-slate-200 bg-slate-50/80 h-10 w-full min-w-[8.5rem] rounded-sm shadow-sm sm:w-[10rem]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
