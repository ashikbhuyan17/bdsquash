import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Players & Rankings | Bangladesh Squash Rackets Federation',
  description:
    'View national player profiles with rankings, and meet our experienced coaches and officials.',
};

export default function PlayersRankingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
