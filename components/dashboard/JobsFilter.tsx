'use client'

import { useState } from 'react'
import {
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  TreePine,
  Check,
} from 'lucide-react'
import { fmtDate } from '@/lib/utils'
import SafetyBadge from './SafetyBadge'
import type { JobWithSubmission } from '@/lib/types'

// ─── Filter ───────────────────────────────────────────────────────────────────

type FilterType = 'all' | 'active' | 'scheduled' | 'complete'

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'complete', label: 'Complete' },
]

function filterJobs(jobs: JobWithSubmission[], filter: FilterType): JobWithSubmission[] {
  switch (filter) {
    case 'active':
      return jobs.filter((j) =>
        ['submitted', 'reviewed', 'quoted', 'assigned', 'in_progress'].includes(
          j.status.toLowerCase()
        )
      )
    case 'scheduled':
      return jobs.filter(
        (j) =>
          ['assigned', 'in_progress'].includes(j.status.toLowerCase()) &&
          !!j.scheduled_date
      )
    case 'complete':
      return jobs.filter((j) =>
        ['complete', 'completed'].includes(j.status.toLowerCase())
      )
    default:
      return jobs
  }
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const JOB_STATUS_CONFIG: Record<string, { bg: string; text: string; label: string }> = {
  submitted: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Received' },
  reviewed: { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Reviewed' },
  quoted: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Quote Ready' },
  assigned: { bg: 'bg-orange-50', text: 'text-orange-700', label: 'Scheduled' },
  in_progress: { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'In Progress' },
  complete: { bg: 'bg-green-50', text: 'text-green-700', label: 'Complete' },
  completed: { bg: 'bg-green-50', text: 'text-green-700', label: 'Complete' },
}

// ─── Status pipeline ──────────────────────────────────────────────────────────

const PIPELINE_STEPS = [
  { key: 'received', label: 'Received' },
  { key: 'reviewed', label: 'Reviewed' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'complete', label: 'Complete' },
]

function getStepIndex(status: string): number {
  switch (status.toLowerCase()) {
    case 'submitted': return 0
    case 'reviewed':
    case 'quoted': return 1
    case 'assigned': return 2
    case 'in_progress': return 3
    case 'complete':
    case 'completed': return 4
    default: return 0
  }
}

function StatusPipeline({ status }: { status: string }) {
  const stepIndex = getStepIndex(status)

  return (
    <div className="px-5 pb-5">
      {/* Mobile: vertical */}
      <div className="flex flex-col sm:hidden">
        {PIPELINE_STEPS.map((step, i) => {
          const isDone = i < stepIndex
          const isCurrent = i === stepIndex
          const isLast = i === PIPELINE_STEPS.length - 1
          return (
            <div key={step.key} className="flex items-start gap-3">
              <div className="flex flex-col items-center" style={{ width: 24 }}>
                <div
                  className="shrink-0 flex items-center justify-center rounded-full"
                  style={{
                    width: 24,
                    height: 24,
                    background: isDone ? '#1C3A2B' : isCurrent ? '#C8922A' : 'white',
                    border: !isDone && !isCurrent ? '2px solid #E5E7EB' : 'none',
                    boxShadow: isCurrent ? '0 0 0 4px rgba(200,146,42,0.2)' : 'none',
                  }}
                >
                  {isDone && <Check size={10} color="white" />}
                  {isCurrent && (
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: 'white',
                      }}
                    />
                  )}
                </div>
                {!isLast && (
                  <div
                    style={{
                      width: 2,
                      minHeight: 18,
                      flexGrow: 1,
                      background: isDone ? '#1C3A2B' : '#E5E7EB',
                      margin: '2px 0',
                    }}
                  />
                )}
              </div>
              <p
                className="font-body text-[12px] pt-0.5 pb-3"
                style={{
                  fontWeight: isDone || isCurrent ? 700 : 400,
                  color: isDone || isCurrent ? '#1A1A1A' : '#888780',
                }}
              >
                {step.label}
              </p>
            </div>
          )
        })}
      </div>

      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-start">
        {PIPELINE_STEPS.map((step, i) => {
          const isDone = i < stepIndex
          const isCurrent = i === stepIndex
          const isLast = i === PIPELINE_STEPS.length - 1
          return (
            <div key={step.key} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: 24,
                    height: 24,
                    background: isDone ? '#1C3A2B' : isCurrent ? '#C8922A' : 'white',
                    border: !isDone && !isCurrent ? '2px solid #E5E7EB' : 'none',
                    boxShadow: isCurrent ? '0 0 0 4px rgba(200,146,42,0.2)' : 'none',
                  }}
                >
                  {isDone && <Check size={10} color="white" />}
                  {isCurrent && (
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: 'white',
                      }}
                    />
                  )}
                </div>
                <p
                  className="font-body text-[11px] text-center"
                  style={{
                    fontWeight: isDone || isCurrent ? 700 : 400,
                    color: isDone || isCurrent ? '#1A1A1A' : '#888780',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {step.label}
                </p>
              </div>
              {!isLast && (
                <div
                  className="flex-1 mx-2"
                  style={{
                    height: 2,
                    marginBottom: 22,
                    background: isDone ? '#1C3A2B' : 'transparent',
                    borderTop: isDone ? 'none' : '2px dashed #E5E7EB',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Confidence badge ─────────────────────────────────────────────────────────

function ConfidenceBadge({ level }: { level: 'high' | 'medium' | 'low' }) {
  const config = {
    high: { bg: 'bg-green-50', text: 'text-green-700', label: 'High confidence' },
    medium: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Medium confidence' },
    low: { bg: 'bg-gray-100', text: 'text-gray-500', label: 'Low confidence' },
  }
  const { bg, text, label } = config[level]
  return (
    <span className={`${bg} ${text} font-body text-[10px] font-medium px-2 py-0.5 rounded-full`}>
      {label}
    </span>
  )
}

// ─── Job card ─────────────────────────────────────────────────────────────────

function JobCard({
  job,
  fieldAppUrl,
}: {
  job: JobWithSubmission
  fieldAppUrl: string
}) {
  const statusCfg = JOB_STATUS_CONFIG[job.status.toLowerCase()] ?? {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    label: job.status,
  }
  const serviceType =
    job.service_type ?? job.submission?.service_type ?? 'Tree Service'
  const customerResult = job.submission?.customer_result ?? null
  const aiResult = job.submission?.ai_result ?? null

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      {/* Top section */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <p className="font-mono text-[#888780] text-[11px] mb-1">
              {job.reference_code}
            </p>
            <p className="font-heading text-[#1A1A1A] text-[18px] font-bold">
              {serviceType}
            </p>
          </div>
          <span
            className={`${statusCfg.bg} ${statusCfg.text} font-body text-[12px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shrink-0`}
          >
            {statusCfg.label}
          </span>
        </div>

        <div className="space-y-1.5">
          {job.property_address && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#888780] shrink-0" />
              <span className="font-body text-[#4A4A4A] text-[14px] truncate">
                {job.property_address}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-[#888780] shrink-0" />
            <span className="font-body text-[#4A4A4A] text-[14px]">
              Submitted {fmtDate(job.created_at)}
            </span>
          </div>
          {job.scheduled_date && (
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-[#1C3A2B] shrink-0" />
              <span className="font-body text-[#1C3A2B] text-[14px] font-medium">
                Scheduled {fmtDate(job.scheduled_date)}
                {job.scheduled_time ? ` · ${job.scheduled_time}` : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Status pipeline */}
      <StatusPipeline status={job.status} />

      {/* AI assessment section */}
      {customerResult ? (
        <div className="border-t border-gray-100 p-5 bg-[#F9F9F8]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#C8922A]" />
              <span className="font-body text-[#1A1A1A] text-[14px] font-bold">
                AI Assessment
              </span>
            </div>
            {job.submission && (
              <a
                href={`${fieldAppUrl}/results/customer/${job.submission.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[#1C3A2B] text-[13px] hover:underline"
              >
                View full assessment →
              </a>
            )}
          </div>

          {/* Species row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#EAF3DE] flex items-center justify-center shrink-0">
              <TreePine size={18} className="text-[#1C3A2B]" />
            </div>
            <div>
              <p className="font-body text-[#1A1A1A] text-[14px] font-bold">
                {customerResult.species_name}
              </p>
              {aiResult?.species_confidence && (
                <ConfidenceBadge level={aiResult.species_confidence} />
              )}
            </div>
          </div>

          {/* Safety badge */}
          <div className="mb-3">
            <SafetyBadge status={customerResult.safety_status} />
          </div>

          {/* Safety summary */}
          {customerResult.safety_summary && (
            <p className="font-body text-[#4A4A4A] text-[13px] leading-relaxed">
              {customerResult.safety_summary}
            </p>
          )}
        </div>
      ) : (
        <div className="border-t border-gray-100 p-4 bg-[#F9F9F8]">
          <div className="flex items-center gap-3">
            <Sparkles size={16} className="text-[#888780] shrink-0" />
            <span className="font-body text-[#888780] text-[13px]">
              No AI assessment on file
            </span>
            {job.submission && (
              <a
                href={`${fieldAppUrl}/results/customer/${job.submission.id}/add-photos`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[#1C3A2B] text-[13px] hover:underline ml-auto shrink-0"
              >
                Add photos for AI assessment →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface JobsFilterProps {
  jobs: JobWithSubmission[]
  fieldAppUrl: string
}

export default function JobsFilter({ jobs, fieldAppUrl }: JobsFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const filtered = filterJobs(jobs, activeFilter)

  return (
    <div>
      {/* Filter pills */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setActiveFilter(value)}
            className={`font-body text-[14px] px-4 py-1.5 rounded-full border transition-colors ${
              activeFilter === value
                ? 'bg-[#1C3A2B] text-white border-[#1C3A2B]'
                : 'bg-white text-[#4A4A4A] border-gray-200 hover:border-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Empty state — no jobs at all */}
      {jobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <Briefcase size={40} className="text-[#888780] mx-auto" />
          <p className="font-body text-[#888780] text-[15px] mt-3">No jobs yet</p>
          <p className="font-body text-[#888780] text-[13px] mt-1">
            Start with a free AI assessment of your tree
          </p>
          <a
            href={`${fieldAppUrl}/submit`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-[#1C3A2B] text-white font-body text-[14px] font-medium px-5 py-2.5 rounded-xl hover:bg-[#2D5A40] transition-colors"
          >
            Get Free Assessment
          </a>
        </div>
      ) : filtered.length === 0 ? (
        /* No results for current filter */
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <p className="font-body text-[#888780] text-[14px]">
            No {activeFilter} jobs
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} fieldAppUrl={fieldAppUrl} />
          ))}
        </div>
      )}
    </div>
  )
}
