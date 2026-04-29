'use client'

import { usePathname } from 'next/navigation'

const TITLES: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/jobs': 'My Jobs',
  '/dashboard/quotes': 'Quotes',
  '/dashboard/messages': 'Messages',
  '/dashboard/profile': 'Profile',
}

export default function PageTitle() {
  const pathname = usePathname()
  const title = TITLES[pathname] ?? 'Dashboard'
  return (
    <span className="font-heading text-[#1A1A1A] text-base font-bold">{title}</span>
  )
}
