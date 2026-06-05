import type { Metadata } from 'next';
import { BsrfHome } from '@/components/home/bsrf-home';

export const metadata: Metadata = {
  title:
    'Bangladesh Squash Rackets Federation (BSRF) — National Squash Body',
  description:
    'The Bangladesh Squash Rackets Federation (BSRF) is the national governing body for squash in Bangladesh, affiliated with the World Squash Federation — developing players, hosting national & international tournaments, rankings, events and news.',
  keywords: [
    'Bangladesh Squash',
    'BSRF',
    'Squash Rackets Federation',
    'squash Bangladesh',
    'squash tournament Dhaka',
    'national squash championship',
    'squash rankings',
    'World Squash Federation',
  ],
};

export default function Home() {
  return <BsrfHome />;
}
