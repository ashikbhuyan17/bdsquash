"use client"

import { useCallback, useId, useRef, useState } from "react"
import { ImageUp, RefreshCw, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { isPlaceholderDataUrl } from "@/lib/admin/is-placeholder-data-url"
import { compressImageFile } from "@/lib/compress-image"

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
const MAX_BYTES = 4 * 1024 * 1024
const previewH = "h-32"

type ImageDataUrlUploadProps = {
  id: string
  value: string
  onChange: (dataUrl: string) => void
  "aria-invalid"?: boolean
  error?: string
  className?: string
}

export function ImageDataUrlUpload({
  id,
  value,
  onChange,
  "aria-invalid": ariaInvalid,
  error,
  className,
}: ImageDataUrlUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const hasImage = value.trim() !== "" && !isPlaceholderDataUrl(value)
  const labelId = useId()
  const errorId = `${labelId}-error`

  const applyFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Please choose an image file")
        return
      }
      if (file.size > MAX_BYTES) {
        toast.error("Image must be 4MB or smaller")
        return
      }
      try {
        const dataUrl = await compressImageFile(file)
        onChange(dataUrl)
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Could not process that file"
        )
      }
    },
    [onChange]
  )

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    e.target.value = ""
    if (f) void applyFile(f)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f) void applyFile(f)
  }

  const onRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onChange("")
  }

  return (
    <div className={cn("grid gap-1.5", className)}>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        tabIndex={-1}
        aria-invalid={ariaInvalid}
        aria-describedby={error ? errorId : undefined}
        onChange={onInputChange}
      />
      <div
        className={cn(
          "overflow-hidden rounded-xl border transition-[border-color,box-shadow]",
          isDragging
            ? "border-[#1b4332]/50 shadow-[0_0_0_3px] shadow-[#1b4332]/12"
            : "border-slate-200/90 shadow-sm",
          ariaInvalid && "border-destructive/60"
        )}
      >
        {hasImage ? (
          <div
            className="bg-white dark:bg-slate-950/40"
            role="group"
            aria-labelledby={labelId}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
          >
            <div
              className={cn(
                "relative flex w-full items-center justify-center border-b border-slate-100 bg-gradient-to-b from-slate-50/90 to-slate-100/40 p-2 dark:from-slate-900/50 dark:to-slate-950/30 dark:border-slate-800",
                previewH
              )}
            >
              <img
                src={value}
                alt=""
                className="max-h-full max-w-full rounded-md object-contain shadow-sm ring-1 ring-black/5"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 py-2">
              <p
                id={labelId}
                className="text-muted-foreground max-w-[55%] text-[0.7rem] leading-snug sm:max-w-[60%]"
              >
                <span className="text-slate-600 dark:text-slate-400">Saved as</span>{" "}
                <code className="text-[0.65rem] text-slate-500">data:image/…;base64,…</code>
              </p>
              <div className="flex shrink-0 items-center gap-1.5">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-8 border-slate-200 bg-white px-2.5 text-xs font-medium"
                  onClick={() => inputRef.current?.click()}
                >
                  <RefreshCw className="size-3.5" />
                  Replace
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10 h-8 px-2.5 text-xs"
                  onClick={onRemove}
                >
                  <Trash2 className="size-3.5" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            role="group"
            aria-labelledby={labelId}
          >
            <label
              htmlFor={id}
              className={cn(
                "flex cursor-pointer items-center gap-3 p-3 transition-colors sm:gap-4 sm:p-3.5",
                "hover:bg-slate-50/90 dark:hover:bg-slate-900/40",
                isDragging && "bg-emerald-50/70 dark:bg-emerald-950/25"
              )}
            >
              <div
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-xl",
                  "bg-gradient-to-br from-[#1b4332]/10 to-[#1b4332]/5",
                  "ring-1 ring-[#1b4332]/10"
                )}
              >
                <ImageUp className="size-5 text-[#1b4332] sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p
                  id={labelId}
                  className="text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-100"
                >
                  Add image
                </p>
                <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
                  Drop a file here or click to choose. PNG, JPG, WebP, GIF, SVG — max 4MB. Stored
                  as base64 for your API.
                </p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5",
                  "text-xs font-medium text-slate-600 shadow-sm",
                  "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                )}
              >
                Browse
              </span>
            </label>
          </div>
        )}
      </div>
      {error != null && error !== "" && (
        <p id={errorId} className="text-destructive text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
