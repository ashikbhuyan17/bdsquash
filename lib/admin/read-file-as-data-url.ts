/** Read a local image file as a `data:image/...;base64,...` string for client-side forms */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error ?? new Error("Read failed"))
    reader.readAsDataURL(file)
  })
}
