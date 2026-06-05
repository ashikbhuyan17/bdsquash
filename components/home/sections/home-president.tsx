export function HomePresident() {
  return (
    <section
      className="relative bg-bsrf-surface px-4 py-12 sm:px-[5%] min-[981px]:py-[100px] md:px-[8%]"
      id="president"
      aria-labelledby="pres-h"
    >
      <div className="grid max-w-[560px] items-center gap-10 max-[980px]:grid-cols-1 min-[981px]:max-w-none min-[981px]:grid-cols-[360px_1fr] min-[981px]:gap-16">
        <div className="relative w-full max-w-[320px] min-[981px]:max-w-[360px]">
          <div
            aria-hidden="true"
            className="absolute -right-4 -top-5 z-0 h-[130px] w-[130px] rounded-full bg-bsrf-red shadow-[0_0_60px_rgba(244,42,65,0.35)] min-[981px]:-right-[26px] min-[981px]:-top-[30px] min-[981px]:h-[190px] min-[981px]:w-[190px]"
          />
          <div className="relative z-[1] bg-bsrf-bd-green p-3">
            <div
              className="flex aspect-[4/5] w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#0a3a2b_0_10px,#0d4434_10px_20px)] text-xs uppercase tracking-[0.15em] text-[#cfeede]"
              role="img"
              aria-label="Portrait of the BSRF President"
            >
              President Photo
            </div>
          </div>
          <div className="relative z-[1] border-t border-white/10 bg-bsrf-bd-green px-[18px] py-4">
            <div className="font-bebas text-[28px] leading-none tracking-wide text-white">
              President&apos;s Name
            </div>
            <div className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-white/75">
              President — BSRF
            </div>
          </div>
        </div>
        <div>
          <div className="mb-3.5 text-[11px] uppercase tracking-[0.22em] text-bsrf-green">
            Message from the President
          </div>
          <h2
            id="pres-h"
            className="mb-[26px] font-bebas text-[clamp(40px,5vw,58px)] leading-[0.92] tracking-wide text-white"
          >
            <span className="block">DRIVING SQUASH</span>
            <span className="block text-bsrf-green">FORWARD</span>
          </h2>
          <p className="mb-4 max-w-[60ch] text-base leading-[1.85] text-bsrf-muted">
            <span className="text-[#F5F5F5]">
              On behalf of the Bangladesh Squash Rackets Federation, it is my
              privilege to welcome you.
            </span>{' '}
            Squash is a sport of discipline, agility and resilience — values we
            are proud to nurture across Bangladesh.
          </p>
          <p className="mb-4 max-w-[60ch] text-base leading-[1.85] text-bsrf-muted">
            From grassroots coaching in our districts to representing the nation
            on the international stage, our mission is to build pathways for
            every aspiring player. I extend my sincere gratitude to our athletes,
            coaches, officials and sponsors whose dedication drives this movement
            forward.
          </p>
          <p className="mb-4 max-w-[60ch] text-base leading-[1.85] text-bsrf-muted">
            Together, we will raise the standard of squash in Bangladesh and
            inspire the next generation to pick up the racket. I invite you to
            be part of our journey.
          </p>
          <div className="mt-[26px] flex flex-col gap-0.5 border-l-[3px] border-bsrf-green pl-4">
            <span className="font-bebas text-2xl tracking-wide text-white">
              President&apos;s Name
            </span>
            <span className="text-xs uppercase tracking-[0.12em] text-bsrf-muted">
              President, Bangladesh Squash Rackets Federation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
