import { HOME_COMMITTEE } from '@/lib/home/data';
import { cn } from '@/lib/utils';

function MemberSilhouette() {
  return (
    <div className="relative mb-[-8px] h-[78px] w-[78px] rounded-t-full rounded-b-none bg-[#2c2c2c]">
      <div className="absolute left-1/2 top-[-32px] h-[42px] w-[42px] -translate-x-1/2 rounded-full bg-[#2c2c2c]" />
    </div>
  );
}

type CommitteeMember = (typeof HOME_COMMITTEE)[number];

export function CommitteeMemberCard({ member }: { member: CommitteeMember }) {
  const isLead = 'lead' in member && member.lead;

  return (
    <article
      className={cn(
        'border border-bsrf-border bg-bsrf-card transition-all hover:-translate-y-[3px] hover:border-t-bsrf-green',
        isLead ? 'border-t-[3px] border-t-bsrf-red' : 'border-t-[3px] border-t-transparent'
      )}
    >
      <div
        className="relative flex aspect-square items-end justify-center overflow-hidden bg-[#1d1d1d]"
        role="img"
        aria-label={`Photo of the ${member.role}`}
      >
        <span
          aria-hidden="true"
          className="absolute left-3 top-3 h-3.5 w-3.5 rounded-full bg-bsrf-red"
        />
        <MemberSilhouette />
      </div>
      <div className="px-3 pb-3 pt-3 sm:px-[18px] sm:pb-[18px] sm:pt-4">
        <div
          className={cn(
            'mb-1.5 text-[11px] uppercase tracking-[0.14em]',
            isLead ? 'text-bsrf-red' : 'text-bsrf-green'
          )}
        >
          {member.role}
        </div>
        <div className="text-sm font-bold leading-tight text-white sm:text-base">
          {member.name}
        </div>
      </div>
    </article>
  );
}

export function CommitteeMemberGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-3 sm:gap-4 min-[981px]:grid-cols-4',
        className
      )}
    >
      {HOME_COMMITTEE.map((member) => (
        <CommitteeMemberCard key={member.role} member={member} />
      ))}
    </div>
  );
}
