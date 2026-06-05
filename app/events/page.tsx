import type { Metadata } from 'next'
import React from 'react'
import { BsrfEventsDetails } from '@/components/bsrf/details/events-details'

export const metadata: Metadata = {
  title: 'Events & Tournaments | Bangladesh Squash Rackets Federation',
  description:
    'Upcoming and past BSRF squash tournaments and championships across Bangladesh.',
}

export default function EventsPage() {
  return <BsrfEventsDetails />
}

