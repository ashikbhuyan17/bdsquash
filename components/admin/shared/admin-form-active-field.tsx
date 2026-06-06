"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type AdminFormActiveFieldProps = {
  id?: string
  checked: boolean
  onChange: (value: boolean) => void
  description?: string
}

export function AdminFormActiveField({
  id = "form-is-active",
  checked,
  onChange,
  description = "Visible on the site when active.",
}: AdminFormActiveFieldProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-sm border p-3">
      <div>
        <Label htmlFor={id} className="text-sm font-medium">
          Active
        </Label>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
