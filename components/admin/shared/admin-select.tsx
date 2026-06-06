"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export const adminSelectTriggerClass = cn(
  "h-10 w-full rounded-lg border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm",
  "transition-[border-color,box-shadow] hover:border-slate-300",
  "focus-visible:border-[#1b4332]/50 focus-visible:ring-[3px] focus-visible:ring-[#1b4332]/10",
  "data-[placeholder]:text-slate-400",
  "disabled:cursor-not-allowed disabled:opacity-60"
)

export const adminSelectContentClass = cn(
  "rounded-lg border-slate-200 bg-white p-1.5 shadow-lg"
)

export const adminSelectItemClass = cn(
  "cursor-pointer rounded-md py-2.5 pr-9 pl-3 text-sm text-slate-700",
  "focus:bg-[#1b4332]/8 focus:text-[#1b4332]",
  "data-[state=checked]:bg-[#1b4332]/10 data-[state=checked]:font-medium data-[state=checked]:text-[#1b4332]"
)

type AdminSelectTriggerProps = React.ComponentProps<typeof SelectTrigger>

export function AdminSelectTrigger({ className, ...props }: AdminSelectTriggerProps) {
  return <SelectTrigger className={cn(adminSelectTriggerClass, className)} {...props} />
}

type AdminSelectContentProps = React.ComponentProps<typeof SelectContent>

export function AdminSelectContent({ className, ...props }: AdminSelectContentProps) {
  return (
    <SelectContent
      position="popper"
      sideOffset={4}
      className={cn(adminSelectContentClass, className)}
      {...props}
    />
  )
}

type AdminSelectItemProps = React.ComponentProps<typeof SelectItem>

export function AdminSelectItem({ className, children, ...props }: AdminSelectItemProps) {
  return (
    <SelectItem className={cn(adminSelectItemClass, className)} {...props}>
      {children}
    </SelectItem>
  )
}

type AdminSelectOption = {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
}

type AdminSelectFieldProps = {
  id?: string
  value?: string
  placeholder?: string
  options: AdminSelectOption[]
  onValueChange: (value: string) => void
  disabled?: boolean
  "aria-invalid"?: boolean
  className?: string
}

/** Full-width admin select with consistent trigger, menu, and optional option icons. */
export function AdminSelectField({
  id,
  value,
  placeholder,
  options,
  onValueChange,
  disabled,
  "aria-invalid": ariaInvalid,
  className,
}: AdminSelectFieldProps) {
  return (
    <Select value={value || undefined} onValueChange={onValueChange} disabled={disabled}>
      <AdminSelectTrigger id={id} aria-invalid={ariaInvalid} className={className}>
        <SelectValue placeholder={placeholder} />
      </AdminSelectTrigger>
      <AdminSelectContent>
        {options.map((option) => (
          <AdminSelectItem key={option.value} value={option.value}>
            <span className="flex items-center gap-2.5">
              {option.icon ? (
                <span className="text-[#1b4332]/70 flex size-7 shrink-0 items-center justify-center rounded-md bg-[#1b4332]/8">
                  {option.icon}
                </span>
              ) : null}
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="leading-none">{option.label}</span>
                {option.description ? (
                  <span className="text-slate-500 text-xs leading-snug font-normal">
                    {option.description}
                  </span>
                ) : null}
              </span>
            </span>
          </AdminSelectItem>
        ))}
      </AdminSelectContent>
    </Select>
  )
}
