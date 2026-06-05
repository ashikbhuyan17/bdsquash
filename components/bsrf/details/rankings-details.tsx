'use client'

import React, { useMemo, useState } from 'react'
import { BsrfShell } from './shared/bsrf-shell'
import { BsrfDetailsNav } from './shared/bsrf-details-nav'
import { BsrfDetailsFooter } from './shared/bsrf-details-footer'
import { BsrfDetailsPageHero } from './shared/bsrf-details-page-hero'
import { cn } from '@/lib/utils'

type Cat = "Men's" | "Women's" | 'Juniors'

type RankingRow = {
  name: string
  club: string
  points: number
  move: number
}

const RANKINGS: Record<Cat, RankingRow[]> = {
  "Men's": [
    { name: 'Tahmid Rahman', club: 'Dhaka Squash Club', points: 2480, move: 0 },
    { name: 'Imran Kabir', club: 'Gulshan Racket Club', points: 2310, move: 1 },
    { name: 'Rafiq Ahmed', club: 'Army Squash Academy', points: 2185, move: -1 },
    { name: 'Shahriar Islam', club: 'Chittagong SC', points: 2040, move: 2 },
    { name: 'Naeem Hasan', club: 'Dhaka Squash Club', points: 1960, move: 0 },
    { name: 'Faisal Mahmud', club: 'Gulshan Racket Club', points: 1875, move: -2 },
    { name: 'Arif Chowdhury', club: 'Sylhet Squash Centre', points: 1790, move: 1 },
    { name: 'Tanvir Alam', club: 'Army Squash Academy', points: 1710, move: 3 },
    { name: 'Sabbir Hossain', club: 'Khulna SC', points: 1640, move: -1 },
    { name: 'Mizanur Rahman', club: 'Dhaka Squash Club', points: 1585, move: 0 },
  ],
  "Women's": [
    { name: 'Nabila Hossain', club: 'Gulshan Racket Club', points: 2390, move: 0 },
    { name: 'Sadia Akter', club: 'Dhaka Squash Club', points: 2255, move: 1 },
    { name: 'Marjana Khatun', club: 'Army Squash Academy', points: 2110, move: -1 },
    { name: 'Tasnim Jahan', club: 'Chittagong SC', points: 1985, move: 2 },
    { name: 'Rumana Begum', club: 'Gulshan Racket Club', points: 1870, move: 0 },
    { name: 'Lamia Sultana', club: 'Sylhet Squash Centre', points: 1760, move: 1 },
    { name: 'Nusrat Jahan', club: 'Dhaka Squash Club', points: 1680, move: -2 },
    { name: 'Farzana Akhter', club: 'Khulna SC', points: 1605, move: 0 },
  ],
  Juniors: [
    { name: 'Adib Karim', club: 'BSRF Academy', points: 1820, move: 2 },
    { name: 'Sumaiya Haque', club: 'BSRF Academy', points: 1755, move: 1 },
    { name: 'Rian Mahmud', club: 'Dhaka Squash Club', points: 1690, move: 0 },
    { name: 'Anika Rahman', club: 'Gulshan Racket Club', points: 1620, move: 3 },
    { name: 'Zayan Ahmed', club: 'Chittagong SC', points: 1540, move: -1 },
    { name: 'Mehjabin Noor', club: 'BSRF Academy', points: 1470, move: 0 },
    { name: 'Sami Reza', club: 'Sylhet Squash Centre', points: 1410, move: 1 },
  ],
}

const CATS: Cat[] = ["Men's", "Women's", 'Juniors']

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

function PodiumCard({
  p,
  rank,
  medal,
  tier,
}: {
  p: RankingRow
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
        <PodiumSilhouette />
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

function Podium({ list }: { list: RankingRow[] }) {
  const order = [1, 0, 2]
  const tiers = ['silver', 'gold', 'bronze'] as const
  const medals = ['2nd', '1st', '3rd'] as const

  return (
    <>
      <div className="mb-8 flex flex-col gap-3 min-[981px]:hidden">
        {list.slice(0, 3).map((p, idx) => (
          <PodiumCard
            key={p.name}
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
              key={p.name}
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

export function BsrfRankingsDetails() {
  const [cat, setCat] = useState<Cat>("Men's")

  const list = useMemo(() => RANKINGS[cat], [cat])

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
            {CATS.map((c) => {
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
                  <tr key={p.name} className="hover:bg-[#161616]">
                    <td className="border-b border-bsrf-border px-3 py-3 text-[14px] text-white sm:px-[20px] sm:py-[16px]">
                      <span className="inline-block w-[64px] font-bebas text-[24px] text-bsrf-green">
                        {i + 1}
                      </span>
                    </td>
                    <td className="border-b border-bsrf-border px-3 py-3 text-[14px] text-white min-w-[160px] sm:min-w-[200px] sm:px-[20px] sm:py-[16px]">
                      <div className="flex items-center gap-[12px]">
                        <div className="relative flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#222]">
                          <DotSilhouette />
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

