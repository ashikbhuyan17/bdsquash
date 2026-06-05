import Link from 'next/link';
export function HomeAbout() {
  return (
    <section
      className="grid items-center gap-6 bg-bsrf-surface px-4 py-12 max-[980px]:grid-cols-1 sm:px-[5%] min-[981px]:grid-cols-[55%_45%] min-[981px]:gap-[60px] min-[981px]:py-[100px] md:px-[8%]"
      id="thebsrf"
      aria-labelledby="about-h"
    >
      <div
        aria-hidden="true"
        className="font-bebas text-[clamp(52px,7vw,84px)] leading-[0.95] tracking-wide"
      >
        <div className="text-white">GOVERNING</div>
        <div className="text-bsrf-green">SQUASH IN</div>
        <div className="text-transparent [-webkit-text-stroke:2px_#fff]">
          BANGLADESH
        </div>
      </div>
      <div>
        <div className="mb-[18px] text-[11px] uppercase tracking-[0.22em] text-bsrf-green">
          About BSRF
        </div>
        <h2
          id="about-h"
          className="mb-6 text-base leading-[1.8] text-white"
        >
          The Bangladesh Squash Rackets Federation is the national governing body
          for squash in Bangladesh, affiliated with the World Squash Federation.
          We develop players, organize national and international tournaments, and
          promote squash across the country.
        </h2>
        <Link
          className="text-xs uppercase tracking-[0.08em] text-bsrf-green"
          href="/committee"
        >
          Learn More →
        </Link>
      </div>
    </section>
  );
}
