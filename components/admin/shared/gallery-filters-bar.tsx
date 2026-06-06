"use client"

import { Select, SelectValue } from "@/components/ui/select"
import {
  AdminSelectContent,
  AdminSelectItem,
  AdminSelectTrigger,
} from "@/components/admin/shared/admin-select"
import {
  GALLERY_CATEGORIES,
  GALLERY_TYPES,
  type MediaGalleryFilterState,
} from "@/lib/types/media-gallery"

const GALLERY_TYPE_LABELS: Record<(typeof GALLERY_TYPES)[number], string> = {
  GalleryImage: "Gallery image",
  Video: "Video",
  News: "News",
}

const CATEGORY_LABELS: Record<(typeof GALLERY_CATEGORIES)[number], string> = {
  Tournaments: "Tournaments",
  NationalTeam: "National team",
  Training: "Training",
  Juniors: "Juniors",
  Events: "Events",
}

type GalleryFiltersBarProps = {
  filters: MediaGalleryFilterState
  onChange: (next: MediaGalleryFilterState) => void
}

export function GalleryFiltersBar({ filters, onChange }: GalleryFiltersBarProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <div className="space-y-1.5">
        <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">
          Gallery type
        </span>
        <Select
          value={filters.galleryType}
          onValueChange={(value) =>
            onChange({
              ...filters,
              galleryType: value as MediaGalleryFilterState["galleryType"],
            })
          }
        >
          <AdminSelectTrigger>
            <SelectValue placeholder="All types" />
          </AdminSelectTrigger>
          <AdminSelectContent>
            <AdminSelectItem value="all">All types</AdminSelectItem>
            {GALLERY_TYPES.map((type) => (
              <AdminSelectItem key={type} value={type}>
                {GALLERY_TYPE_LABELS[type]}
              </AdminSelectItem>
            ))}
          </AdminSelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">
          Category
        </span>
        <Select
          value={filters.category}
          onValueChange={(value) =>
            onChange({
              ...filters,
              category: value as MediaGalleryFilterState["category"],
            })
          }
        >
          <AdminSelectTrigger>
            <SelectValue placeholder="All categories" />
          </AdminSelectTrigger>
          <AdminSelectContent>
            <AdminSelectItem value="all">All categories</AdminSelectItem>
            {GALLERY_CATEGORIES.map((category) => (
              <AdminSelectItem key={category} value={category}>
                {CATEGORY_LABELS[category]}
              </AdminSelectItem>
            ))}
          </AdminSelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">
          Active
        </span>
        <Select
          value={filters.active}
          onValueChange={(value) =>
            onChange({ ...filters, active: value as MediaGalleryFilterState["active"] })
          }
        >
          <AdminSelectTrigger>
            <SelectValue placeholder="All" />
          </AdminSelectTrigger>
          <AdminSelectContent>
            <AdminSelectItem value="all">All</AdminSelectItem>
            <AdminSelectItem value="active">Active</AdminSelectItem>
            <AdminSelectItem value="inactive">Inactive</AdminSelectItem>
          </AdminSelectContent>
        </Select>
      </div>
    </div>
  )
}
