import { loadRankingsPageData } from '@/lib/players/public-players'
import { RankingsDetailsClient } from './rankings-details-client'

export async function BsrfRankingsDetails() {
  const rankings = await loadRankingsPageData()
  return <RankingsDetailsClient rankings={rankings} />
}
