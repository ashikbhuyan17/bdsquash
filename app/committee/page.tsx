import type { Metadata } from 'next'
import { BsrfCommitteeDetails } from '@/components/bsrf/details/committee-details'
import { loadCommitteeMembers } from '@/lib/officials/public-officials'

export const metadata: Metadata = {
  title: 'Managing Committee | Bangladesh Squash Rackets Federation',
  description:
    'Meet the elected managing committee and office bearers of the Bangladesh Squash Rackets Federation.',
}

export default async function CommitteePage() {
  const members = await loadCommitteeMembers()

  return <BsrfCommitteeDetails members={members} />
}
