'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  User,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const NAV_ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/jobs', label: 'My Jobs', icon: Briefcase },
  { href: '/dashboard/quotes', label: 'Quotes', icon: FileText },
  { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
]

function isActive(href: string, pathname: string): boolean {
  if (href === '/dashboard') return pathname === '/dashboard'
  return pathname.startsWith(href)
}

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-16 w-56 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 py-6 px-3 space-y-1 z-40">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = isActive(href, pathname)
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-[14px] transition-colors ${
              active
                ? 'bg-[#EAF3DE] text-[#1C3A2B]'
                : 'text-[#4A4A4A] hover:bg-[#F5F2ED]'
            }`}
          >
            <Icon size={18} className={active ? 'text-[#1C3A2B]' : 'text-[#888780]'} />
            {label}
          </Link>
        )
      })}
    </aside>
  )
}
