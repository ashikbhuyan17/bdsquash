'use client';

import { useEffect, useState } from 'react';
import { HOME_HERO_SHOTS, HOME_TICKER } from '@/lib/home/data';
import { cn } from '@/lib/utils';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
  }
}

export function HomeHero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setSlide((prev) => (prev + 1) % HOME_HERO_SHOTS.length),
      3500
    );
    return () => window.clearInterval(id);
  }, []);

  const tickerText = `⬥  ${HOME_TICKER}`;

  return (
    <header
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 [background:radial-gradient(ellipse_at_18%_48%,#04241B_0%,transparent_55%),radial-gradient(ellipse_at_82%_16%,#052b20_0%,transparent_50%),radial-gradient(ellipse_at_66%_86%,#1c0309_0%,transparent_55%),#0A0A0A] sm:px-[5%] md:px-[8%]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(0deg,#fff_0_1px,transparent_1px_80px),repeating-linear-gradient(90deg,#fff_0_1px,transparent_1px_80px)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] right-[2%] select-none font-bebas text-[160px] leading-[0.8] tracking-[-6px] text-white opacity-[0.025] min-[981px]:text-[300px] min-[981px]:opacity-[0.03]"
      >
        BSRF
      </div>

      <div className="relative z-[2] grid w-full grid-cols-1 items-center gap-9 min-[981px]:grid-cols-[1.45fr_0.75fr]">
        <div className="relative z-[3] max-w-[900px]">
          <span
            data-fade-up
            className="mb-7 inline-block animate-bsrf-fade-up whitespace-nowrap rounded-full border border-bsrf-green bg-[#1a1a1a] px-4 py-[7px] text-[11px] uppercase tracking-[0.22em] text-bsrf-green [animation-delay:0.1s] [animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100"
          >
            National Federation
          </span>
          <h1
            data-fade-up
            className="mb-2.5 animate-bsrf-fade-up font-bebas text-[64px] leading-[0.88] tracking-wide text-white min-[981px]:text-[clamp(52px,7.4vw,104px)] [animation-delay:0.3s] [animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100"
          >
            BANGLADESH
            <br />
            <span className="text-bsrf-green">SQUASH</span>
          </h1>
          <p
            data-fade-up
            className="mb-[38px] animate-bsrf-fade-up text-lg uppercase tracking-[0.3em] text-bsrf-muted [animation-delay:0.6s] [animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100"
          >
            Rackets Federation
          </p>
          <div
            data-fade-up
            className="flex animate-bsrf-fade-up flex-wrap gap-4 [animation-delay:0.8s] [animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100"
          >
            <button
              type="button"
              className="cursor-pointer whitespace-nowrap rounded-sm border border-bsrf-green bg-transparent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-bsrf-green transition-all hover:bg-bsrf-green hover:text-black"
              onClick={() => scrollToSection('news')}
            >
              Latest News
            </button>
            <button
              type="button"
              className="cursor-pointer whitespace-nowrap rounded-sm border border-bsrf-red bg-bsrf-red px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition-all hover:brightness-110"
              onClick={() => scrollToSection('events')}
            >
              Upcoming Events
            </button>
          </div>
        </div>

        {/* Right side — same as BSRF Homepage.html: rings + striped placeholder slides */}
        <div
          data-fade-up
          aria-label="Featured photos"
          className="relative z-[2] hidden min-h-[480px] animate-bsrf-fade-up items-center justify-center [animation-delay:0.8s] [animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100 min-[981px]:flex"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[400px] w-[400px] animate-bsrf-hero-spin rounded-full border border-dashed border-[rgba(0,196,106,0.45)] motion-reduce:animate-none before:absolute before:-top-[7px] before:left-1/2 before:h-[13px] before:w-[13px] before:-translate-x-1/2 before:rounded-full before:bg-bsrf-green before:shadow-[0_0_16px_rgba(0,196,106,0.7)] before:content-['']"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[460px] w-[460px] animate-bsrf-hero-spin-slow rounded-full border border-[rgba(244,42,65,0.22)] motion-reduce:animate-none before:absolute before:-bottom-1.5 before:left-1/2 before:h-2.5 before:w-2.5 before:-translate-x-1/2 before:rounded-full before:bg-bsrf-red before:content-['']"
          />

          <div className="relative aspect-[4/5] w-[min(320px,100%)]">
            {HOME_HERO_SHOTS.map((shot, idx) => (
              <div
                key={shot.title}
                className={cn(
                  'absolute inset-0 overflow-hidden border border-bsrf-border transition-[opacity,transform] duration-[900ms] ease-in-out',
                  idx === slide
                    ? 'z-[1] scale-100 opacity-100'
                    : 'scale-105 opacity-0'
                )}
              >
                <div
                  className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#1f1f1f_0_10px,#232323_10px_20px)] text-xs uppercase tracking-[0.15em] text-bsrf-muted"
                  role="img"
                  aria-label={shot.title}
                >
                  {shot.title}
                </div>
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-gradient-to-t from-[rgba(10,10,10,0.92)] to-transparent px-[18px] pb-4 pt-[18px]">
                  <span className="font-bebas text-2xl leading-none tracking-[0.5px] text-white">
                    {shot.title}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-bsrf-green">
                    {shot.caption}
                  </span>
                </div>
              </div>
            ))}

            <div className="absolute -bottom-[26px] left-0 right-0 z-[2] flex justify-center gap-2">
              {HOME_HERO_SHOTS.map((shot, idx) => (
                <button
                  key={shot.title}
                  type="button"
                  className={cn(
                    'h-1 w-7 cursor-pointer border-none p-0 transition-colors duration-200',
                    idx === slide ? 'bg-bsrf-green' : 'bg-bsrf-border'
                  )}
                  aria-label={`Show ${shot.title}`}
                  onClick={() => setSlide(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[3] overflow-hidden whitespace-nowrap border-t-2 border-bsrf-green bg-bsrf-surface py-3">
        <div className="inline-block animate-bsrf-marquee motion-reduce:animate-none">
          <span className="text-xs uppercase tracking-[0.2em] text-bsrf-green">
            {tickerText.repeat(2)}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-bsrf-green">
            {tickerText.repeat(2)}
          </span>
        </div>
      </div>
    </header>
  );
}
