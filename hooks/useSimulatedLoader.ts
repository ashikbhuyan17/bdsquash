"use client"

import { useEffect, useState } from "react"

/** Brief skeleton for list UIs; keeps demo data feel “live” without a real API. */
export function useSimulatedLoader(minMs = 400) {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), minMs)
    return () => clearTimeout(t)
  }, [minMs])
  return isLoading
}
