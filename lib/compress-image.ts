const DEFAULT_MAX_WIDTH = 1280
const DEFAULT_QUALITY = 0.82
const DEFAULT_MAX_BYTES = 900 * 1024

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("Could not load image"))
    image.src = src
  })
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Could not compress image"))
        else resolve(blob)
      },
      type,
      quality
    )
  })
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error ?? new Error("Read failed"))
    reader.readAsDataURL(blob)
  })
}

/** Compress local images before sending through Server Actions / JSON APIs. */
export async function compressImageFile(
  file: File,
  maxWidth = DEFAULT_MAX_WIDTH,
  quality = DEFAULT_QUALITY,
  maxBytes = DEFAULT_MAX_BYTES
): Promise<string> {
  const objectUrl = URL.createObjectURL(file)

  try {
    const image = await loadImage(objectUrl)
    const scale = Math.min(1, maxWidth / Math.max(image.width, image.height))
    const width = Math.max(1, Math.round(image.width * scale))
    const height = Math.max(1, Math.round(image.height * scale))

    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext("2d")
    if (!context) throw new Error("Could not prepare image canvas")

    context.drawImage(image, 0, 0, width, height)

    const outputType =
      file.type === "image/png" || file.type === "image/webp"
        ? "image/jpeg"
        : file.type || "image/jpeg"

    let currentQuality = quality
    let dataUrl = await blobToDataUrl(
      await canvasToBlob(canvas, outputType, currentQuality)
    )

    while (dataUrl.length > maxBytes * 1.37 && currentQuality > 0.45) {
      currentQuality -= 0.1
      dataUrl = await blobToDataUrl(
        await canvasToBlob(canvas, outputType, currentQuality)
      )
    }

    if (dataUrl.length > maxBytes * 1.37) {
      throw new Error("Image is still too large after compression. Use a smaller file.")
    }

    return dataUrl
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}
