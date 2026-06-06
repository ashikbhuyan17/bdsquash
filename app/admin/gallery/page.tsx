import { GalleryAdminClient } from "@/components/admin/modules/gallery-admin-client"
import { fetchMediaGallery } from "@/lib/media-gallery"

export default async function AdminGalleryPage() {
  const initialData = await fetchMediaGallery({ pageNumber: 1, pageSize: 10 })

  return <GalleryAdminClient initialData={initialData} />
}
