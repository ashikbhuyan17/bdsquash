import type { Metadata } from 'next'
import React from 'react'
import { BsrfContactOfficeDetails } from '@/components/bsrf/details/contact-office-details'

export const metadata: Metadata = {
  title: 'Contact The Office | Bangladesh Squash Rackets Federation',
  description:
    'Contact the BSRF federation secretariat for tournament registration, rankings, media enquiries, and general matters.',
}

export default function ContactPage() {
  return <BsrfContactOfficeDetails />
}
