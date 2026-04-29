'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import { getInitials } from '@/lib/utils'

interface AvatarMenuProps {
  name: string
  email: string
}

export default function AvatarMenu({ name, email }: AvatarMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const initials = getInitials(name)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Account menu"
        aria-expanded={open}
        className="w-9 h-9 rounded-full bg-[#1C3A2B] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#1C3A2B] focus:ring-offset-2"
      >
        <span className="font-heading text-white text-[13px] font-bold">{initials}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50">
          <div className="px-3 py-2">
            <p className="font-body font-bold text-[14px] text-[#1A1A1A] truncate">
              {name || 'Account'}
            </p>
            <p className="font-body text-[12px] text-[#888780] truncate">{email}</p>
          </div>
          <hr className="border-gray-100 my-1" />
          <Link
            href="/dashboard/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl font-body text-[14px] text-[#4A4A4A] hover:bg-[#F5F2ED] transition-colors"
          >
            <User size={15} className="text-[#888780]" />
            My Profile
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl font-body text-[14px] text-[#4A4A4A] hover:bg-[#F5F2ED] transition-colors"
          >
            <LogOut size={15} className="text-[#888780]" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
