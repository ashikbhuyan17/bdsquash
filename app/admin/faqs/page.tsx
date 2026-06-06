import { FaqsAdminClient } from "@/components/admin/modules/faqs-admin-client"
import { fetchFaqs } from "@/lib/faqs"

export default async function AdminFaqsPage() {
  const initialData = await fetchFaqs(1, 10)

  return <FaqsAdminClient initialData={initialData} />
}
