import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  Briefcase,
  FileText,
  CheckCircle,
  MessageSquare,
  AlertCircle,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { fmtDate, timeAgo } from '@/lib/utils'
import type { CustomerJob, CustomerQuote, CustomerMessage } from '@/lib/types'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const STATUS_CONFIG: Record<string, { bg: string; text: string; label: string }> = {
  submitted: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Submitted' },
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Pending' },
  scheduled: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Scheduled' },
  in_progress: { bg: 'bg-orange-50', text: 'text-orange-700', label: 'In Progress' },
  complete: { bg: 'bg-green-50', text: 'text-green-700', label: 'Complete' },
  completed: { bg: 'bg-green-50', text: 'text-green-700', label: 'Completed' },
  cancelled: { bg: 'bg-gray-100', text: 'text-gray-500', label: 'Cancelled' },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status.toLowerCase()] ?? {
    bg: 'bg-gray-100',
    text: 'text-gray-500',
    label: status,
  }
  return (
    <span
      className={`${cfg.bg} ${cfg.text} font-body text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap`}
    >
      {cfg.label}
    </span>
  )
}

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [{ data: profileData }, { data: jobData }, { data: quoteData }] =
    await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase
        .from('jobs')
        .select('*')
        .eq('customer_email', user.email ?? '')
        .order('created_at', { ascending: false }),
      supabase
        .from('quotes')
        .select('*')
        .eq('customer_email', user.email ?? '')
        .eq('status', 'presented')
        .order('created_at', { ascending: false }),
    ])

  const jobs = (jobData ?? []) as CustomerJob[]
  const pendingQuotes = (quoteData ?? []) as CustomerQuote[]
  const profile = profileData

  let messages: CustomerMessage[] = []
  const jobIds = jobs.map((j) => j.id)
  if (jobIds.length > 0) {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('direction', 'outbound')
      .in('job_id', jobIds)
      .order('created_at', { ascending: false })
      .limit(5)
    messages = (data ?? []) as CustomerMessage[]
  }

  const recentJobs = jobs.slice(0, 3)
  const activeJobCount = jobs.filter(
    (j) => !['complete', 'completed', 'cancelled'].includes(j.status.toLowerCase())
  ).length
  const completedJobCount = jobs.filter((j) =>
    ['complete', 'completed'].includes(j.status.toLowerCase())
  ).length

  const firstName = profile?.full_name?.split(' ')[0] ?? 'there'
  const hasActivity = jobs.length > 0 || pendingQuotes.length > 0
  const fieldAppUrl = (process.env.NEXT_PUBLIC_FIELD_APP_URL ?? '').replace(/\/$/, '')
  const assessmentUrl = `${fieldAppUrl}/submit`

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="font-heading text-[#1A1A1A] text-[28px] font-bold">
          {getGreeting()}, {firstName}!
        </h1>
        <p className="font-body text-[#888780] text-[15px] mt-1">
          Here&apos;s what&apos;s happening with your service.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link
          href="/dashboard/jobs"
          className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Briefcase size={18} className="text-[#1C3A2B]" />
          </div>
          <p className="font-heading text-[#1A1A1A] text-[32px] font-bold mt-3">
            {activeJobCount}
          </p>
          <p className="font-body text-[#888780] text-[13px]">Active Jobs</p>
        </Link>

        <Link
          href="/dashboard/quotes"
          className={`bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow ${
            pendingQuotes.length > 0 ? 'border-[#C8922A]' : 'border-gray-100'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <FileText size={18} className="text-[#C8922A]" />
            </div>
            {pendingQuotes.length > 0 && (
              <span className="font-body text-[10px] font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                Action needed
              </span>
            )}
          </div>
          <p className="font-heading text-[#1A1A1A] text-[32px] font-bold mt-3">
            {pendingQuotes.length}
          </p>
          <p className="font-body text-[#888780] text-[13px]">Pending Quotes</p>
        </Link>

        <Link
          href="/dashboard/jobs"
          className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={18} className="text-[#1C3A2B]" />
          </div>
          <p className="font-heading text-[#1A1A1A] text-[32px] font-bold mt-3">
            {completedJobCount}
          </p>
          <p className="font-body text-[#888780] text-[13px]">Completed Jobs</p>
        </Link>

        <Link
          href="/dashboard/messages"
          className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <MessageSquare size={18} className="text-blue-600" />
          </div>
          <p className="font-heading text-[#1A1A1A] text-[32px] font-bold mt-3">
            {messages.length}
          </p>
          <p className="font-body text-[#888780] text-[13px]">Messages</p>
        </Link>
      </div>

      {/* Pending quotes alert */}
      {pendingQuotes.length > 0 && (
        <div className="bg-[#FAEEDA] border border-[#C8922A] rounded-2xl p-5 mb-6 flex gap-4 items-start">
          <AlertCircle size={24} className="text-[#C8922A] shrink-0 mt-0.5" />
          <div>
            <p className="font-body text-[#633806] text-[15px] font-bold">
              You have {pendingQuotes.length} quote
              {pendingQuotes.length !== 1 ? 's' : ''} waiting for your review
            </p>
            <p className="font-body text-[#633806] text-[14px] mt-1">
              Review and accept or decline to get your job scheduled.
            </p>
            <Link
              href="/dashboard/quotes"
              className="font-body text-[#633806] text-[14px] font-medium underline mt-2 inline-block"
            >
              Review Quotes →
            </Link>
          </div>
        </div>
      )}

      {/* Recent jobs */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-[#1A1A1A] text-[20px] font-bold">Recent Jobs</h2>
          <Link href="/dashboard/jobs" className="font-body text-[#1C3A2B] text-[14px]">
            View all →
          </Link>
        </div>

        {recentJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <Briefcase size={32} className="text-[#888780] mx-auto" />
            <p className="font-body text-[#888780] text-[14px] mt-2">No jobs yet</p>
            <a
              href={assessmentUrl}
              className="inline-block mt-4 bg-[#1C3A2B] text-white font-body text-[14px] font-medium px-4 py-2.5 rounded-xl hover:bg-[#2D5A40] transition-colors"
            >
              Start a free assessment
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {recentJobs.map((job) => (
              <Link
                key={job.id}
                href="/dashboard/jobs"
                className="block bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-mono text-[#888780] text-[11px] mb-1">
                      {job.reference_code}
                    </p>
                    <p className="font-body text-[#1A1A1A] text-[15px] font-bold">
                      {job.service_type ?? 'Tree Service'}
                    </p>
                  </div>
                  <StatusBadge status={job.status} />
                </div>
                {job.property_address && (
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={12} className="text-[#888780] shrink-0" />
                    <p className="font-body text-[#888780] text-[13px] truncate">
                      {job.property_address}
                    </p>
                  </div>
                )}
                <p className="font-body text-[#888780] text-[12px] mt-2">
                  {fmtDate(job.created_at)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Recent messages */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-[#1A1A1A] text-[20px] font-bold">
            Recent Messages
          </h2>
          <Link href="/dashboard/messages" className="font-body text-[#1C3A2B] text-[14px]">
            View all →
          </Link>
        </div>

        {messages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="font-body text-[#888780] text-[14px]">No messages yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-body text-[#1A1A1A] font-bold text-[14px]">
                    Gordon Pro Team
                  </p>
                  <p className="font-body text-[#888780] text-[12px]">
                    {timeAgo(msg.created_at)}
                  </p>
                </div>
                <p className="font-body text-[#888780] text-[14px] mt-1 line-clamp-2">
                  {msg.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Get started CTA — only when no activity */}
      {!hasActivity && (
        <div className="bg-[#1C3A2B] rounded-2xl p-8 text-center">
          <h2 className="font-heading text-white text-[24px] font-bold">
            Ready to get started?
          </h2>
          <p className="font-body text-white/70 text-[15px] mt-2">
            Get a free AI-powered tree assessment in minutes.
          </p>
          <a
            href={assessmentUrl}
            className="inline-flex items-center gap-2 mt-6 bg-[#C8922A] text-[#1A1A1A] font-body font-medium px-6 py-3 rounded-xl hover:bg-[#a8751f] transition-colors"
          >
            <Sparkles size={16} />
            Get Free Assessment
          </a>
        </div>
      )}
    </div>
  )
}
