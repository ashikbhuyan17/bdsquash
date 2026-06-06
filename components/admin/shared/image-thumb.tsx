"use client"

import { useEffect, useState } from "react"
import { ImageOff } from "lucide-react"

import { cn } from "@/lib/utils"

type ImageThumbProps = {
  src: string
  alt: string
  className?: string
}

function EmptyThumb({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-md border border-dashed border-slate-200 bg-slate-50 text-slate-400 sm:size-12",
        className
      )}
      title="No image"
      aria-label="No image"
    >
      <ImageOff className="size-3.5 sm:size-4" aria-hidden />
    </div>
  )
}

/** Base64 data URLs or any image src; small preview for tables + cards. */
export function ImageThumb({ src, alt, className }: ImageThumbProps) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [src])

  if (!src || failed) {
    return <EmptyThumb className={className} />
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={cn(
        "size-10 shrink-0 rounded-md border object-cover sm:size-12",
        className
      )}
    />
  )
}
