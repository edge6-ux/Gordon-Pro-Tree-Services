import { redirect } from 'next/navigation'
import { Sparkles, TreePine } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { fmtDate } from '@/lib/utils'
import JobsFilter from '@/components/dashboard/JobsFilter'
import SafetyBadge from '@/components/dashboard/SafetyBadge'
import type { JobWithSubmission, CustomerSubmission } from '@/lib/types'

export default async function JobsPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [{ data: jobData }, { data: submissionData }] = await Promise.all([
    supabase
      .from('jobs')
      .select('*, submission:submissions(*)')
      .eq('customer_email', user.email ?? '')
      .order('created_at', { ascending: false }),
    supabase
      .from('submissions')
      .select('*')
      .eq('customer_email', user.email ?? '')
      .is('job_id', null)
      .order('created_at', { ascending: false }),
  ])

  const jobs = (jobData ?? []) as JobWithSubmission[]
  const standaloneSubmissions = (submissionData ?? []) as CustomerSubmission[]
  const pastAssessments = standaloneSubmissions.filter(
    (s) => s.customer_result !== null
  )

  const fieldAppUrl = process.env.NEXT_PUBLIC_FIELD_APP_URL ?? '#'

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-[#1A1A1A] text-[26px] font-bold">My Jobs</h1>
          <p className="font-body text-[#888780] text-[14px] mt-1">
            {jobs.length} total job{jobs.length !== 1 ? 's' : ''}
          </p>
        </div>
        <a
          href={fieldAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#1C3A2B] text-white font-body text-[14px] font-medium px-4 py-2.5 rounded-xl hover:bg-[#2D5A40] transition-colors"
        >
          <Sparkles size={15} />
          New Assessment
        </a>
      </div>

      {/* Filter pills + job cards */}
      <JobsFilter jobs={jobs} fieldAppUrl={fieldAppUrl} />

      {/* Past assessments (standalone — no linked job) */}
      {pastAssessments.length > 0 && (
        <div className="mt-10">
          <h2 className="font-heading text-[#1A1A1A] text-[20px] font-bold mb-4">
            Past Assessments
          </h2>
          <div className="space-y-3">
            {pastAssessments.map((submission) => {
              const result = submission.customer_result!
              return (
                <div
                  key={submission.id}
                  className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-[#EAF3DE] flex items-center justify-center shrink-0">
                        <TreePine size={16} className="text-[#C8922A]" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-body text-[#1A1A1A] font-bold text-[14px] truncate">
                          {result.species_name}
                        </p>
                        <p className="font-body text-[#888780] text-[12px]">
                          {fmtDate(submission.created_at)}
                        </p>
                      </div>
                    </div>
                    <a
                      href={`${fieldAppUrl}/results/customer/${submission.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[#1C3A2B] text-[13px] hover:underline shrink-0"
                    >
                      View Results →
                    </a>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <SafetyBadge status={result.safety_status} />
                    {result.safety_summary && (
                      <p className="font-body text-[#888780] text-[13px] mt-2 leading-relaxed">
                        {result.safety_summary}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
