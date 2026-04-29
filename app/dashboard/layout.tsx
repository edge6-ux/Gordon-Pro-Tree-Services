import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Bell } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import AvatarMenu from '@/components/dashboard/AvatarMenu'
import SidebarNav from '@/components/dashboard/SidebarNav'
import BottomNav from '@/components/dashboard/BottomNav'
import PageTitle from '@/components/dashboard/PageTitle'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between">
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-full bg-[#1C3A2B] flex items-center justify-center shrink-0">
            <span className="font-heading text-white text-[13px] font-bold">GP</span>
          </div>
          <span className="font-heading text-[#1C3A2B] text-[18px] font-bold hidden md:block">
            Gordon Pro
          </span>
        </Link>

        {/* CENTER: Current page title (mobile only) */}
        <div className="lg:hidden absolute left-1/2 -translate-x-1/2">
          <PageTitle />
        </div>

        {/* RIGHT: Bell + Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          <Bell size={20} className="text-[#888780]" aria-hidden="true" />
          <AvatarMenu
            name={profile?.full_name ?? ''}
            email={user.email ?? ''}
          />
        </div>
      </header>

      {/* Sidebar (desktop only) */}
      <SidebarNav />

      {/* Bottom nav (mobile only) */}
      <BottomNav />

      {/* Main content */}
      <div className="pt-16 lg:pl-56 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 pb-24 lg:pb-8">
          {children}
        </div>
      </div>
    </div>
  )
}
