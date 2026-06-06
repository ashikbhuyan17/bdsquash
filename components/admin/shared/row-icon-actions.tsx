"use client"

import { PencilLineIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type RowIconActionsProps = {
  onEdit: () => void
  onDelete?: () => void
  className?: string
}

const square = "h-8 w-8 shrink-0 rounded-lg border p-0 shadow-sm sm:h-9 sm:w-9"

/**
 * Edit / delete as soft tint blocks (reference UI: green edit, red delete).
 */
export function RowIconActions({ onEdit, onDelete, className }: RowIconActionsProps) {
  return (
    <div
      className={cn("flex items-center justify-end gap-1.5", className)}
      role="group"
      aria-label="Row actions"
    >
      <Button
        type="button"
        variant="outline"
        className={cn(
          square,
          "border-emerald-200/80 bg-emerald-50/90 text-emerald-800 hover:bg-emerald-100/90"
        )}
        onClick={onEdit}
        aria-label="Edit"
        title="Edit"
      >
        <PencilLineIcon className="size-3.5 sm:size-4" />
      </Button>
      {onDelete ? (
        <Button
          type="button"
          variant="outline"
          className={cn(
            square,
            "border-rose-200/80 bg-rose-50/90 text-rose-800 hover:bg-rose-100/90"
          )}
          onClick={onDelete}
          aria-label="Delete"
          title="Delete"
        >
          <Trash2Icon className="size-3.5 sm:size-4" />
        </Button>
      ) : null}
    </div>
  )
}
