import { ProfileAdminClient } from "@/components/admin/modules/profile-admin-client"
import { fetchAdminInformation } from "@/lib/admin-information"

export default async function AdminProfilePage() {
  const profile = await fetchAdminInformation()

  return <ProfileAdminClient initialData={profile} />
}
