export const HOME_FEATURED_PLAYER_COUNT = 5

export type RankingCategory = "Men's" | "Women's" | "Juniors"

export const RANKING_CATEGORIES: RankingCategory[] = [
  "Men's",
  "Women's",
  "Juniors",
]

export type PublicRankingRow = {
  userId: string
  name: string
  club: string
  points: number
  move: number
  profileImageUrl: string
}

export type PublicRankingsByCategory = Record<
  RankingCategory,
  PublicRankingRow[]
>

export type HomeFeaturedPlayer = {
  userId: string
  rank: string
  name: string
  cat: string
  profileImageUrl: string
}
