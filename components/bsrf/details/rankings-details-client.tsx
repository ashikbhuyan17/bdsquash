'use client'

import React, { useMemo, useState } from 'react'
import { HomeImage } from '@/components/home/home-image'
import {
  RANKING_CATEGORIES,
  type PublicRankingRow,
  type PublicRankingsByCategory,
  type RankingCategory,
} from '@/lib/players/public-players.types'
import { BsrfShell } from './shared/bsrf-shell'
import { BsrfDetailsNav } from './shared/bsrf-details-nav'
import { BsrfDetailsFooter } from './shared/bsrf-details-footer'
import { BsrfDetailsPageHero } from './shared/bsrf-details-page-hero'
import { cn } from '@/lib/utils'

function PodiumSilhouette() {
  return (
    <div className="absolute left-1/2 bottom-[-6px] h-[54px] w-[54px] -translate-x-1/2 overflow-hidden rounded-t-full rounded-b-none bg-[#2c2c2c]">
      <div className="absolute left-1/2 top-[-24px] h-[30px] w-[30px] -translate-x-1/2 rounded-full bg-[#2c2c2c]" />
    </div>
  )
}

function DotSilhouette() {
  return (
    <div className="absolute left-1/2 bottom-[-4px] h-[20px] w-[20px] -translate-x-1/2 overflow-hidden rounded-t-full rounded-b-none bg-[#383838]">
      <div className="absolute left-1/2 top-[-9px] h-[11px] w-[11px] -translate-x-1/2 rounded-full bg-[#383838]" />
    </div>
  )
}

function Move({ move }: { move: number }) {
  if (move > 0) {
    return (
      <span className="rk-move inline-flex items-center gap-[4px] text-[13px] font-semibold text-bsrf-green">
        ▲ {move}
      </span>
    )
  }
  if (move < 0) {
    return (
      <span className="rk-move inline-flex items-center gap-[4px] text-[13px] font-semibold text-bsrf-red">
        ▼ {Math.abs(move)}
      </span>
    )
  }
  return (
    <span className="rk-move inline-flex items-center gap-[4px] text-[13px] font-semibold text-bsrf-muted">
      —
    </span>
  )
}

function ProfileAvatar({
  name,
  profileImageUrl,
  large,
}: {
  name: string
  profileImageUrl: string
  large?: boolean
}) {
  if (profileImageUrl) {
    return (
      <div className="absolute inset-0">
        <HomeImage
          src={profileImageUrl}
          alt={name}
          fallbackLabel={name}
        />
      </div>
    )
  }

  return large ? <PodiumSilhouette /> : <DotSilhouette />
}

function PodiumCard({
  p,
  rank,
  medal,
  tier,
}: {
  p: PublicRankingRow
  rank: number
  medal: string
  tier: 'silver' | 'gold' | 'bronze'
}) {
  const isGold = tier === 'gold'

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1.5 border border-bsrf-border bg-bsrf-card p-3 text-center transition-transform sm:gap-[6px] sm:p-4 min-[981px]:p-6',
        'border-t-[3px] border-t-bsrf-border',
        isGold && 'border-t-bsrf-green min-[981px]:-translate-y-[14px]'
      )}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-bsrf-muted sm:text-[11px]">
        {medal} place
      </span>

      <div className="relative mb-1 h-[64px] w-[64px] overflow-hidden rounded-full bg-[#1d1d1d] sm:mb-2 sm:h-[80px] sm:w-[80px] min-[981px]:h-[96px] min-[981px]:w-[96px]">
        <ProfileAvatar
          name={p.name}
          profileImageUrl={p.profileImageUrl}
          large
        />
      </div>

      <div
        className={cn(
          'font-bebas leading-[0.9] text-[32px] sm:text-[36px] min-[981px]:text-[40px]',
          isGold ? 'text-bsrf-green' : 'text-white'
        )}
      >
        #{rank}
      </div>
      <div className="text-[14px] font-bold leading-tight text-white sm:text-[16px]">
        {p.name}
      </div>
      <div className="text-[11px] leading-snug text-bsrf-muted sm:text-[12px]">{p.club}</div>
      <div className="mt-1 font-bebas text-[18px] tracking-[0.5px] text-bsrf-green sm:mt-[4px] sm:text-[22px]">
        {p.points.toLocaleString()} pts
      </div>
    </div>
  )
}

function Podium({ list }: { list: PublicRankingRow[] }) {
  const order = [1, 0, 2]
  const tiers = ['silver', 'gold', 'bronze'] as const
  const medals = ['2nd', '1st', '3rd'] as const

  if (list.length === 0) return null

  return (
    <>
      <div className="mb-8 flex flex-col gap-3 min-[981px]:hidden">
        {list.slice(0, 3).map((p, idx) => (
          <PodiumCard
            key={p.userId}
            p={p}
            rank={idx + 1}
            medal={['1st', '2nd', '3rd'][idx]}
            tier={(['gold', 'silver', 'bronze'] as const)[idx]}
          />
        ))}
      </div>

      <div className="mb-8 hidden min-[981px]:mb-12 min-[981px]:grid min-[981px]:grid-cols-3 min-[981px]:items-end min-[981px]:gap-4">
        {order.map((idx, i) => {
          const p = list[idx]
          if (!p) return null

          return (
            <PodiumCard
              key={p.userId}
              p={p}
              rank={idx + 1}
              medal={medals[i]}
              tier={tiers[i]}
            />
          )
        })}
      </div>
    </>
  )
}

type RankingsDetailsClientProps = {
  rankings: PublicRankingsByCategory
}

export function RankingsDetailsClient({ rankings }: RankingsDetailsClientProps) {
  const [cat, setCat] = useState<RankingCategory>("Men's")

  const list = useMemo(() => rankings[cat], [cat, rankings])

  return (
    <BsrfShell>
      <a
        className="absolute left-3 top-[-60px] z-[200] rounded bg-bsrf-green px-[18px] py-2.5 text-[13px] font-bold text-black transition-[top] duration-200 focus:top-3"
        href="#main"
      >
        Skip to content
      </a>

      <BsrfDetailsNav active="rankings" />

      <main id="main">
        <BsrfDetailsPageHero
          crumb="Players & Rankings"
          title={
            <>
              <span className="block">NATIONAL</span>
              <span className="block text-bsrf-green">RANKINGS</span>
            </>
          }
          sub="Official BSRF player rankings, updated after each ranked national event. Points reflect performance across the current season."
        />

        <section className="px-4 pt-10 pb-16 sm:px-[5%] md:px-[8%] md:pt-14 md:pb-20 lg:pt-[56px] lg:pb-[90px]" aria-label="National rankings">
          <div className="mb-6 flex flex-wrap gap-1 border-b border-bsrf-border md:mb-9" role="tablist" aria-label="Ranking category">
            {RANKING_CATEGORIES.map((c) => {
              const isActive = c === cat
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={isActive}
                  className={cn(
                    'whitespace-nowrap border-b-2 border-transparent -mb-[1px] bg-transparent px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-white sm:px-[22px] sm:py-[14px] sm:text-[13px]',
                    isActive ? 'text-bsrf-green border-b-bsrf-green' : 'text-bsrf-muted'
                  )}
                  onClick={() => setCat(c)}
                  type="button"
                >
                  {c}
                </button>
              )
            })}
          </div>

          <Podium list={list} />

          <div className="overflow-x-auto border border-bsrf-border bg-bsrf-surface">
            <table className="min-w-[600px] w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-bsrf-border px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-bsrf-muted sm:px-[20px] sm:py-[16px]">
                    Rank
                  </th>
                  <th className="border-b border-bsrf-border px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-bsrf-muted sm:px-[20px] sm:py-[16px]">
                    Player
                  </th>
                  <th className="border-b border-bsrf-border px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-bsrf-muted sm:px-[20px] sm:py-[16px]">
                    Club
                  </th>
                  <th className="border-b border-bsrf-border px-3 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-bsrf-muted sm:px-[20px] sm:py-[16px]">
                    Points
                  </th>
                  <th className="border-b border-bsrf-border px-3 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-bsrf-muted sm:px-[20px] sm:py-[16px]">
                    Movement
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((p, i) => (
                  <tr key={p.userId} className="hover:bg-[#161616]">
                    <td className="border-b border-bsrf-border px-3 py-3 text-[14px] text-white sm:px-[20px] sm:py-[16px]">
                      <span className="inline-block w-[64px] font-bebas text-[24px] text-bsrf-green">
                        {i + 1}
                      </span>
                    </td>
                    <td className="border-b border-bsrf-border px-3 py-3 text-[14px] text-white min-w-[160px] sm:min-w-[200px] sm:px-[20px] sm:py-[16px]">
                      <div className="flex items-center gap-[12px]">
                        <div className="relative flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#222]">
                          <ProfileAvatar
                            name={p.name}
                            profileImageUrl={p.profileImageUrl}
                          />
                        </div>
                        <span className="whitespace-nowrap font-semibold text-white">
                          {p.name}
                        </span>
                      </div>
                    </td>
                    <td className="border-b border-bsrf-border px-3 py-3 text-[14px] text-white sm:px-[20px] sm:py-[16px]">
                      {p.club}
                    </td>
                    <td className="border-b border-bsrf-border px-3 py-3 text-right text-[14px] text-white sm:px-[20px] sm:py-[16px]">
                      <span className="font-bebas text-[20px] tracking-[0.5px] text-white">
                        {p.points.toLocaleString()}
                      </span>
                    </td>
                    <td className="border-b border-bsrf-border px-3 py-3 text-right text-[14px] text-white sm:px-[20px] sm:py-[16px]">
                      <Move move={p.move} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-[18px] text-[12px] text-bsrf-muted">
            Last updated: 30 May 2026 · Movement shown vs. previous ranking
            period.
          </p>
        </section>
      </main>

      <BsrfDetailsFooter />
    </BsrfShell>
  )
}
