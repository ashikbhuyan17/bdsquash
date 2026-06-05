import type { Metadata } from 'next'
import React from 'react'
import { BsrfRankingsDetails } from '@/components/bsrf/details/rankings-details'

export const metadata: Metadata = {
  title: 'National Rankings | Bangladesh Squash Rackets Federation',
  description:
    'Official BSRF national squash rankings for Men\'s, Women\'s and Juniors categories.',
}

export default function PlayersRankingsPage() {
  return <BsrfRankingsDetails />
}

