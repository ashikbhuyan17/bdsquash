import { cn } from '@/lib/utils';

export const BSRF_TUTORIAL_URL = 'https://www.learn.bdsquash.org/';

type BsrfTutorialButtonProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export function BsrfTutorialButton({
  mobile = false,
  onNavigate,
}: BsrfTutorialButtonProps) {
  if (mobile) {
    return (
      <a
        href={BSRF_TUTORIAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className="border-b border-bsrf-border py-3.5 text-sm uppercase tracking-[0.18em] text-bsrf-green transition-colors hover:text-white"
      >
        Tutorial →
      </a>
    );
  }

  return (
    <a
      href={BSRF_TUTORIAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'hidden rounded-full border border-bsrf-green bg-transparent px-[22px] py-[11px] text-center text-xs font-bold uppercase tracking-[0.08em] text-bsrf-green transition-all hover:-translate-y-px hover:bg-bsrf-green hover:text-black hover:shadow-[0_6px_22px_rgba(200,244,0,0.25)] md:inline-block'
      )}
    >
      Tutorial
    </a>
  );
}
