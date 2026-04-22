type ImageThumbProps = {
  src: string
  alt: string
  className?: string
}

/** Base64 data URLs or any image src; small preview for tables + cards. */
export function ImageThumb({ src, alt, className }: ImageThumbProps) {
  if (!src) {
    return (
      <div
        className={`bg-muted size-10 shrink-0 rounded-md border sm:size-12 ${className ?? ""}`}
        aria-hidden
      />
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`size-10 shrink-0 rounded-md border object-cover sm:size-12 ${className ?? ""}`}
    />
  )
}
