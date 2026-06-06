"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Toaster } from "sonner"

/** Render Sonner on document.body so toasts sit above Radix Sheet (z-50) portals. */
export function AdminToaster() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <Toaster
      richColors
      position="top-right"
      closeButton
      expand
      visibleToasts={4}
      offset={16}
      className="sm:max-w-md"
      style={{ zIndex: 99999 }}
    />,
    document.body
  )
}
