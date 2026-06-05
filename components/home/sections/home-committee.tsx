import Link from 'next/link';
import { CommitteeMemberGrid } from '@/components/bsrf/shared/committee-member-card';
export function HomeCommittee() {
  return (
    <section
      className="bg-bsrf-primary px-4 py-12 sm:px-[5%] md:px-[8%] md:py-20"
      id="committee"
      aria-labelledby="committee-h"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3 md:mb-10 md:gap-4">
        <h2
          id="committee-h"
          className="whitespace-nowrap border-l-4 border-bsrf-red pl-4 font-bebas text-[38px] leading-none tracking-wide text-white min-[981px]:text-5xl"
        >
          Managing Committee
        </h2>
        <div className="flex flex-wrap items-center gap-5">
          <Link
            className="text-xs uppercase tracking-[0.12em] text-bsrf-green transition-opacity hover:opacity-70"
            href="/committee"
          >
            View All →
          </Link>
          {/* <Link
            className="text-xs uppercase tracking-[0.12em] text-bsrf-green transition-opacity hover:opacity-70"
            href="/contact"
          >
            Contact The Office →
          </Link> */}
        </div>
      </div>
      <CommitteeMemberGrid />
      <p className="mt-6 text-center text-xs text-bsrf-muted">
        Names shown are placeholders — to be updated with the current elected
        committee.
      </p>
    </section>
  );
}
