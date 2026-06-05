import { HOME_STATS } from '@/lib/home/data';
import { cn } from '@/lib/utils';

export function HomeStats() {
  return (
    <section className="grid grid-cols-2 gap-y-6 border-y border-bsrf-border bg-bsrf-surface py-10 md:grid-cols-4 md:gap-y-0">
      {HOME_STATS.map((stat, index) => (
        <div
          className={cn(
            'px-5 text-center',
            index === 0 && 'border-l-0 md:border-l-0',
            index > 0 && 'max-md:odd:border-l-0 max-md:even:border-l max-md:even:border-bsrf-border md:border-l md:border-bsrf-border'
          )}
          key={stat.lbl}
        >
          <div className="font-bebas text-5xl leading-none text-white">
            {stat.num}
          </div>
          <div className="mt-2 text-[11px] uppercase tracking-[0.12em] text-bsrf-muted">
            {stat.lbl}
          </div>
        </div>
      ))}
    </section>
  );
}
