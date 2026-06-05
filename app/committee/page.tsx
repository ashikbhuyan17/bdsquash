import type { Metadata } from 'next'
import React from 'react'
import { BsrfCommitteeDetails } from '@/components/bsrf/details/committee-details'

export const metadata: Metadata = {
  title: 'Managing Committee | Bangladesh Squash Rackets Federation',
  description:
    'Meet the elected managing committee and office bearers of the Bangladesh Squash Rackets Federation.',
}

export default function CommitteePage() {
  return <BsrfCommitteeDetails />
}
