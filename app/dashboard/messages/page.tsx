'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { MessageSquare, Send } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import { fmtDateTime } from '@/lib/utils'
import type { CustomerMessage, CustomerJob } from '@/lib/types'

type JobOption = Pick<CustomerJob, 'id' | 'reference_code' | 'service_type'>

export default function MessagesPage() {
  const [messages, setMessages] = useState<CustomerMessage[]>([])
  const [jobs, setJobs] = useState<JobOption[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJobId, setSelectedJobId] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const threadRef = useRef<HTMLDivElement>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const [messagesRes, jobsRes] = await Promise.all([
        fetch('/api/dashboard/messages'),
        supabase
          .from('jobs')
          .select('id, reference_code, service_type')
          .eq('customer_email', user.email ?? '')
          .order('created_at', { ascending: false }),
      ])

      if (messagesRes.ok) {
        const data = (await messagesRes.json()) as CustomerMessage[]
        setMessages(data)
      }

      const fetchedJobs = (jobsRes.data ?? []) as JobOption[]
      setJobs(fetchedJobs)
      if (fetchedJobs.length > 0) {
        setSelectedJobId(fetchedJobs[0].id)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchData()
  }, [fetchData])

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight
    }
  }, [messages])

  async function handleSend() {
    if (!body.trim() || !selectedJobId) return
    setSending(true)
    setSendError(null)
    try {
      const res = await fetch('/api/dashboard/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: selectedJobId, body: body.trim() }),
      })
      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? 'Failed to send message')
      }
      const newMessage = (await res.json()) as CustomerMessage
      setMessages((prev) => [...prev, newMessage])
      setBody('')
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-heading text-[#1A1A1A] text-[26px] font-bold">Messages</h1>
        <p className="font-body text-[#888780] text-[14px] mt-1">
          Your correspondence with Gordon Pro
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-[#1C3A2B] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <MessageSquare size={40} className="text-[#888780] mx-auto" />
          <p className="font-body text-[#888780] text-[15px] mt-3">No messages yet</p>
          <p className="font-body text-[#888780] text-[13px] mt-1 max-w-xs mx-auto leading-relaxed">
            When our team sends you updates about your job they&apos;ll appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-4">
          {/* Thread header */}
          <div className="px-5 py-4 border-b border-gray-100 bg-[#F9F9F8] flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1C3A2B] flex items-center justify-center shrink-0">
              <span className="font-heading text-white text-[13px]">GP</span>
            </div>
            <div>
              <p className="font-body text-[#1A1A1A] text-[14px] font-bold">
                Gordon Pro Tree Service
              </p>
              <p className="font-body text-[#888780] text-[12px]">(770) 271-6072</p>
            </div>
          </div>

          {/* Messages area */}
          <div
            ref={threadRef}
            className="px-5 py-4 max-h-[500px] overflow-y-auto space-y-4"
          >
            {messages.map((msg) => {
              const isOutbound = msg.direction === 'outbound'
              return (
                <div
                  key={msg.id}
                  className={`flex ${isOutbound ? 'justify-start' : 'justify-end'}`}
                >
                  {isOutbound ? (
                    <div className="max-w-[80%] flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#1C3A2B] flex items-center justify-center shrink-0 mt-1">
                        <span className="font-heading text-white text-[11px]">GP</span>
                      </div>
                      <div>
                        <div className="bg-[#F5F2ED] rounded-2xl rounded-tl-sm px-4 py-3">
                          <p className="font-body text-[#1A1A1A] text-[14px] leading-relaxed">
                            {msg.body}
                          </p>
                        </div>
                        <p className="font-body text-[#888780] text-[11px] mt-1">
                          Gordon Pro · {fmtDateTime(msg.created_at)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[80%]">
                      <div className="bg-[#1C3A2B] rounded-2xl rounded-tr-sm px-4 py-3">
                        <p className="font-body text-white text-[14px] leading-relaxed">
                          {msg.body}
                        </p>
                      </div>
                      <p className="font-body text-[#888780] text-[11px] mt-1 text-right">
                        You · {fmtDateTime(msg.created_at)}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Compose area */}
          <div className="px-5 py-4 border-t border-gray-100 bg-white">
            {jobs.length > 1 && (
              <div className="mb-3">
                <label
                  htmlFor="job-select"
                  className="block font-body text-[#1A1A1A] text-[13px] font-medium mb-1.5"
                >
                  Regarding:
                </label>
                <select
                  id="job-select"
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="w-full border border-[#D3D1C7] rounded-xl px-4 py-2.5 font-body text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[#1C3A2B]"
                >
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.reference_code}
                      {job.service_type ? ` — ${job.service_type}` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <textarea
              rows={3}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message to Gordon Pro..."
              className="w-full border border-[#D3D1C7] rounded-xl px-4 py-3 font-body text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[#1C3A2B] resize-none"
            />

            {sendError && (
              <p className="font-body text-[#DC2626] text-[13px] mt-2">{sendError}</p>
            )}

            <div className="flex items-center justify-between mt-3 gap-4">
              <p className="font-body text-[#888780] text-[12px]">
                Our team typically responds within a few hours during business hours.
              </p>
              <button
                type="button"
                onClick={handleSend}
                disabled={!body.trim() || sending}
                className="flex items-center gap-2 bg-[#1C3A2B] text-white font-body text-[14px] font-medium px-5 py-2.5 rounded-xl hover:bg-[#2D5A40] transition-colors disabled:opacity-60 shrink-0"
              >
                <Send size={15} />
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
