import Link from 'next/link';
import { HomeImage } from '@/components/home/home-image';
import type { NewsArticle } from '@/lib/news/data';

type HomeNewsProps = {
  featured: NewsArticle;
  side: NewsArticle[];
};

export function HomeNews({ featured, side }: HomeNewsProps) {
  return (
    <section className="px-4 py-12 sm:px-[5%] md:px-[8%] md:py-20" id="news">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="whitespace-nowrap border-l-4 border-bsrf-red pl-4 font-bebas text-[38px] leading-none tracking-wide text-white min-[981px]:text-5xl">
          Latest News
        </h2>
        <Link
          className="text-xs uppercase tracking-[0.12em] text-bsrf-green transition-opacity hover:opacity-70"
          href="/news"
        >
          View All News →
        </Link>
      </div>
      <div className="grid gap-px bg-bsrf-border max-[980px]:grid-cols-1 min-[981px]:grid-cols-[60%_40%]">
        <article className="flex flex-col bg-bsrf-card transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(200,244,0,0.06)]">
          <div className="h-[280px]">
            <HomeImage
              src={featured.image}
              alt={featured.title}
              fallbackLabel="Featured"
            />
          </div>
          <div className="flex flex-col gap-3 p-6">
            <span className="inline-block self-start bg-bsrf-red px-2.5 py-[5px] text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
              {featured.cat}
            </span>
            <h3 className="font-bebas text-[32px] leading-[1.12] tracking-wide text-white">
              {featured.title}
            </h3>
            <span className="text-xs text-bsrf-muted">{featured.date}</span>
            <a
              className="text-xs uppercase tracking-[0.08em] text-bsrf-green"
              href={featured.link}
              target={featured.link.startsWith('http') ? '_blank' : undefined}
              rel={
                featured.link.startsWith('http')
                  ? 'noopener noreferrer'
                  : undefined
              }
            >
              Read More →
            </a>
          </div>
        </article>
        <div className="flex flex-col gap-px bg-bsrf-border">
          {side.map((item) => (
            <article
              className="flex flex-1 gap-4 bg-bsrf-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(200,244,0,0.06)]"
              key={item.id}
            >
              <div className="h-[100px] w-[120px] min-w-[120px]">
                <HomeImage
                  src={item.image}
                  alt={item.title}
                  fallbackLabel="Photo"
                />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <span className="inline-block self-start bg-bsrf-red px-2.5 py-[5px] text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                  {item.cat}
                </span>
                <h4 className="font-bebas text-xl leading-[1.15] tracking-wide text-white">
                  {item.title}
                </h4>
                <span className="text-xs text-bsrf-muted">{item.date}</span>
                <a
                  className="text-[11px] uppercase tracking-[0.08em] text-bsrf-green"
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={
                    item.link.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                >
                  Read →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
