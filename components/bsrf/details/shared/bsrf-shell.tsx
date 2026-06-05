import { Bebas_Neue, DM_Sans } from 'next/font/google'
import React from 'react'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export function BsrfShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`overflow-x-clip bg-bsrf-primary font-dm-sans text-[#F5F5F5] antialiased ${bebasNeue.variable} ${dmSans.variable}`}
    >
      {children}
    </div>
  )
}

