import Link from 'next/link';
import { HOME_PLAYERS } from '@/lib/home/data';
function PlayerSilhouette() {
  return (
    <div className="relative mb-[-10px] h-20 w-20 rounded-t-full rounded-b-none bg-[#2c2c2c]">
      <div className="absolute left-1/2 top-[-34px] h-11 w-11 -translate-x-1/2 rounded-full bg-[#2c2c2c]" />
    </div>
  );
}

export function HomePlayers() {
  return (
    <section className="bg-bsrf-surface px-4 py-12 sm:px-[5%] md:px-[8%] md:py-20" id="players">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="whitespace-nowrap font-bebas text-[38px] leading-none tracking-wide text-white min-[981px]:text-5xl">
          Featured Players
        </h2>
        <Link
          className="text-xs uppercase tracking-[0.12em] text-bsrf-green transition-opacity hover:opacity-70"
          href="/players-rankings"
        >
          View Rankings →
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {HOME_PLAYERS.map((player) => (
          <article
            className="w-[180px] min-w-[180px] border border-bsrf-border bg-bsrf-card transition-colors hover:border-bsrf-green"
            key={player.name}
          >
            <div className="relative flex h-[200px] items-end justify-center overflow-hidden bg-[#1d1d1d]">
              <PlayerSilhouette />
            </div>
            <div className="flex flex-col gap-1 p-4">
              <div className="font-bebas text-2xl leading-none text-bsrf-green">
                {player.rank}
              </div>
              <div className="text-sm font-bold text-white">{player.name}</div>
              <div className="text-[11px] uppercase tracking-[0.1em] text-bsrf-muted">
                {player.cat}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
