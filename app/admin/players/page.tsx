import { PlayersAdminClient } from "@/components/admin/modules/players-admin-client"
import { fetchPlayers } from "@/lib/players"

export default async function AdminPlayersPage() {
  const initialData = await fetchPlayers(1, 10)

  return <PlayersAdminClient initialData={initialData} />
}
