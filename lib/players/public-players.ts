import "server-only"

import { HOME_PLAYERS } from "@/lib/home/data"
import { fetchPublicPlayers } from "@/lib/players"
import { getProfileImageUrl } from "@/lib/media-urls"
import type { Player, PlayerGender } from "@/lib/types/players"
import {
  HOME_FEATURED_PLAYER_COUNT,
  type HomeFeaturedPlayer,
  type PublicRankingRow,
  type PublicRankingsByCategory,
} from "@/lib/players/public-players.types"

export {
  HOME_FEATURED_PLAYER_COUNT,
  RANKING_CATEGORIES,
} from "@/lib/players/public-players.types"

export type {
  HomeFeaturedPlayer,
  PublicRankingRow,
  PublicRankingsByCategory,
  RankingCategory,
} from "@/lib/players/public-players.types"

function genderToCategoryLabel(gender: PlayerGender): string {
  return gender === "Female" ? "WOMEN'S" : "MEN'S"
}

function sortByPointsDesc(players: Player[]): Player[] {
  return [...players].sort((a, b) => b.points - a.points)
}

function sortByWorldRanking(players: Player[]): Player[] {
  return [...players].sort((a, b) => a.worldRanking - b.worldRanking)
}

export function mapPlayerToRankingRow(player: Player): PublicRankingRow {
  return {
    userId: player.userId,
    name: player.name,
    club: player.club,
    points: player.points,
    move: 0,
    profileImageUrl: player.profileImage
      ? getProfileImageUrl(player.profileImage)
      : "",
  }
}

export function groupPlayersByCategory(
  players: Player[]
): PublicRankingsByCategory {
  const activePlayers = players.filter((player) => player.isActive)

  const mens = sortByPointsDesc(
    activePlayers.filter((player) => player.gender === "Male")
  ).map(mapPlayerToRankingRow)

  const womens = sortByPointsDesc(
    activePlayers.filter((player) => player.gender === "Female")
  ).map(mapPlayerToRankingRow)

  return {
    "Men's": mens,
    "Women's": womens,
    Juniors: [],
  }
}

export function mapPlayerToHomeFeatured(player: Player): HomeFeaturedPlayer {
  return {
    userId: player.userId,
    rank: `#${player.worldRanking}`,
    name: player.name,
    cat: genderToCategoryLabel(player.gender),
    profileImageUrl: player.profileImage
      ? getProfileImageUrl(player.profileImage)
      : "",
  }
}

export function getFallbackHomeFeaturedPlayers(): HomeFeaturedPlayer[] {
  return HOME_PLAYERS.map((player, index) => ({
    userId: `fallback-${index}`,
    rank: player.rank,
    name: player.name,
    cat: player.cat,
    profileImageUrl: "",
  }))
}

const FALLBACK_RANKINGS: PublicRankingsByCategory = {
  "Men's": [
    {
      userId: "fallback-m-1",
      name: "Tahmid Rahman",
      club: "Dhaka Squash Club",
      points: 2480,
      move: 0,
      profileImageUrl: "",
    },
    {
      userId: "fallback-m-2",
      name: "Imran Kabir",
      club: "Gulshan Racket Club",
      points: 2310,
      move: 1,
      profileImageUrl: "",
    },
    {
      userId: "fallback-m-3",
      name: "Rafiq Ahmed",
      club: "Army Squash Academy",
      points: 2185,
      move: -1,
      profileImageUrl: "",
    },
  ],
  "Women's": [
    {
      userId: "fallback-w-1",
      name: "Nabila Hossain",
      club: "Gulshan Racket Club",
      points: 2390,
      move: 0,
      profileImageUrl: "",
    },
    {
      userId: "fallback-w-2",
      name: "Sadia Akter",
      club: "Dhaka Squash Club",
      points: 2255,
      move: 1,
      profileImageUrl: "",
    },
  ],
  Juniors: [],
}

export function getFallbackRankings(): PublicRankingsByCategory {
  return FALLBACK_RANKINGS
}

export async function loadHomeFeaturedPlayers(): Promise<HomeFeaturedPlayer[]> {
  try {
    const result = await fetchPublicPlayers(1, 50)
    const players = sortByWorldRanking(
      result.data.filter((player) => player.isActive)
    )
      .slice(0, HOME_FEATURED_PLAYER_COUNT)
      .map(mapPlayerToHomeFeatured)

    return players.length > 0 ? players : getFallbackHomeFeaturedPlayers()
  } catch {
    return getFallbackHomeFeaturedPlayers()
  }
}

export async function loadRankingsPageData(): Promise<PublicRankingsByCategory> {
  try {
    const result = await fetchPublicPlayers(1, 100)
    const rankings = groupPlayersByCategory(result.data)
    const hasPlayers =
      rankings["Men's"].length > 0 || rankings["Women's"].length > 0

    return hasPlayers ? rankings : getFallbackRankings()
  } catch {
    return getFallbackRankings()
  }
}
