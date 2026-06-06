import Link from 'next/link';
import { CommitteeMemberGrid } from '@/components/bsrf/shared/committee-member-card';
import type { PublicCommitteeMember } from '@/lib/officials/public-officials.types';

type HomeCommitteeProps = {
  members: PublicCommitteeMember[];
};

export function HomeCommittee({ members }: HomeCommitteeProps) {
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
        </div>
      </div>
      <CommitteeMemberGrid members={members} />
    </section>
  );
}
