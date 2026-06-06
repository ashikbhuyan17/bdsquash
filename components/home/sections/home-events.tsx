import Link from 'next/link';
import type { HomeEventCard } from '@/lib/home/public-events';

type HomeEventsProps = {
  events: HomeEventCard[];
};

export function HomeEvents({ events }: HomeEventsProps) {
  return (
    <section className="bg-bsrf-primary px-4 py-12 sm:px-[5%] md:px-[8%] md:py-20" id="events">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="whitespace-nowrap font-bebas text-[38px] leading-none tracking-wide text-white min-[981px]:text-5xl">
          Upcoming Events
        </h2>
        <Link
          className="text-xs uppercase tracking-[0.12em] text-bsrf-green transition-opacity hover:opacity-70"
          href="/events"
        >
          View All →
        </Link>
      </div>
      <div className="grid gap-4 max-[980px]:grid-cols-1 min-[981px]:grid-cols-3">
        {events.map((event) => (
          <article
            className="flex gap-5 border border-bsrf-border border-l-[3px] border-l-bsrf-green bg-bsrf-surface p-6 transition-all hover:-translate-y-0.5 hover:border-l-bsrf-red"
            key={event.id}
          >
            <div className="min-w-[56px] text-center">
              <div className="font-bebas text-5xl leading-[0.9] text-bsrf-green">
                {event.d}
              </div>
              <div className="text-xs uppercase tracking-[0.1em] text-bsrf-muted">
                {event.m}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-base font-semibold leading-snug text-white">
                {event.name}
              </div>
              <div className="text-xs text-bsrf-muted">{event.loc}</div>
              <span className="inline-block self-start bg-bsrf-green px-2.5 py-[5px] text-[10px] font-semibold uppercase tracking-[0.1em] text-black">
                {event.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
