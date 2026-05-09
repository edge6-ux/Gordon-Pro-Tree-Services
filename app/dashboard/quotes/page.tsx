'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  FileText,
  CheckCircle,
  MessageSquare,
  Download,
} from 'lucide-react'
import { fmtDate, formatCurrency } from '@/lib/utils'
import type { CustomerQuote } from '@/lib/types'

// ─── Filter ───────────────────────────────────────────────────────────────────

type FilterType = 'all' | 'accepted' | 'declined'

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'declined', label: 'Declined' },
]

function filterQuotes(quotes: CustomerQuote[], filter: FilterType): CustomerQuote[] {
  switch (filter) {
    case 'accepted': return quotes.filter((q) => q.status === 'accepted')
    case 'declined': return quotes.filter((q) => q.status === 'declined')
    default: return quotes
  }
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function QuoteStatusBadge({ status }: { status: string }) {
  if (status === 'presented') {
    return (
      <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 font-body text-[12px] font-bold px-3 py-1.5 rounded-xl">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        Pending
      </span>
    )
  }
  const cfg: Record<string, { bg: string; text: string; label: string }> = {
    draft: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Draft' },
    accepted: { bg: 'bg-green-50', text: 'text-green-700', label: 'Accepted' },
    declined: { bg: 'bg-red-50', text: 'text-red-700', label: 'Declined' },
  }
  const c = cfg[status] ?? { bg: 'bg-gray-100', text: 'text-gray-600', label: status }
  return (
    <span
      className={`${c.bg} ${c.text} font-body text-[12px] font-bold px-3 py-1.5 rounded-xl`}
    >
      {c.label}
    </span>
  )
}

// ─── Quote card ───────────────────────────────────────────────────────────────

function QuoteCard({ quote }: { quote: CustomerQuote }) {
  const isAccepted = quote.status === 'accepted'

  const serviceLabel =
    quote.description_of_work?.length > 0
      ? quote.description_of_work.slice(0, 40) +
        (quote.description_of_work.length > 40 ? '…' : '')
      : 'Tree Service'

  const treeServices = quote.tree_services_cost ?? 0
  const stumpRemoval = quote.stump_removal_cost ?? 0
  const discount = quote.discount ?? 0
  const cardFee = quote.card_fee_applied ? quote.total_cost * 0.03 : 0
  const hasLineItems = treeServices > 0 || stumpRemoval > 0 || discount > 0

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
      {/* Top section */}
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <p className="font-body text-[#888780] text-[11px] mb-1">
              {fmtDate(quote.date || quote.created_at)}
            </p>
            <p className="font-heading text-[#1A1A1A] text-[18px] font-bold leading-snug">
              Quote for {serviceLabel}
            </p>
          </div>
          <QuoteStatusBadge status={quote.status} />
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="font-body text-[#888780] text-[11px] uppercase tracking-wide mb-0.5">
              Property
            </p>
            <p className="font-body text-[#4A4A4A] text-[13px] leading-snug">
              {quote.property_address || '—'}
            </p>
          </div>
          <div>
            <p className="font-body text-[#888780] text-[11px] uppercase tracking-wide mb-0.5">
              Prepared by
            </p>
            <p className="font-body text-[#4A4A4A] text-[13px]">
              {quote.sales_rep ?? 'Gordon Pro Team'}
            </p>
          </div>
          {quote.hours_estimate != null && (
            <div>
              <p className="font-body text-[#888780] text-[11px] uppercase tracking-wide mb-0.5">
                Est. Hours
              </p>
              <p className="font-body text-[#4A4A4A] text-[13px]">{quote.hours_estimate}</p>
            </div>
          )}
          {quote.wet_dry != null && (
            <div>
              <p className="font-body text-[#888780] text-[11px] uppercase tracking-wide mb-0.5">
                Conditions
              </p>
              <p className="font-body text-[#4A4A4A] text-[13px]">
                {quote.wet_dry.toUpperCase()}
              </p>
            </div>
          )}
        </div>

        {/* Description */}
        {quote.description_of_work && (
          <div className="mb-4">
            <p className="font-body text-[#888780] text-[11px] uppercase tracking-wide mb-1">
              Description of Work
            </p>
            <p className="font-body text-[#4A4A4A] text-[14px] leading-relaxed line-clamp-3">
              {quote.description_of_work}
            </p>
          </div>
        )}

        {/* Cost summary */}
        <div className="bg-[#F9F9F8] rounded-xl p-4">
          {hasLineItems && (
            <div className="space-y-1.5 mb-2">
              {treeServices > 0 && (
                <div className="flex items-center justify-between">
                  <span className="font-body text-[#4A4A4A] text-[13px]">Tree Services</span>
                  <span className="font-body text-[#1A1A1A] text-[13px] font-medium">
                    {formatCurrency(treeServices)}
                  </span>
                </div>
              )}
              {stumpRemoval > 0 && (
                <div className="flex items-center justify-between">
                  <span className="font-body text-[#4A4A4A] text-[13px]">Stump Removal</span>
                  <span className="font-body text-[#1A1A1A] text-[13px] font-medium">
                    {formatCurrency(stumpRemoval)}
                  </span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="font-body text-[#4A4A4A] text-[13px]">Discount</span>
                  <span className="font-body text-[#E24B4A] text-[13px] font-medium">
                    -{formatCurrency(discount)}
                  </span>
                </div>
              )}
              {cardFee > 0 && (
                <div className="flex items-center justify-between">
                  <span className="font-body text-[#4A4A4A] text-[13px]">3% Card Fee</span>
                  <span className="font-body text-[#1A1A1A] text-[13px] font-medium">
                    {formatCurrency(cardFee)}
                  </span>
                </div>
              )}
            </div>
          )}

          {hasLineItems && <hr className="border-gray-200 my-2" />}

          <div className="flex items-center justify-between">
            <span className="font-heading text-[#1A1A1A] text-[16px] font-bold">Total</span>
            <span className="font-heading text-[#1C3A2B] text-[22px] font-bold">
              {formatCurrency(quote.total_cost)}
            </span>
          </div>

          {quote.card_fee_applied && (
            <p className="font-body text-[#888780] text-[11px] text-center italic mt-2">
              3% convenience fee applied for card/debit payments
            </p>
          )}
        </div>
      </div>

      {/* Signature section */}
      {quote.signed_at && (
        <div className="border-t border-gray-100 p-5 bg-[#F9F9F8] flex items-center gap-3">
          <CheckCircle size={18} className="text-[#16A34A] shrink-0" />
          <span className="font-body text-[#27500A] text-[13px]">
            Signed on {fmtDate(quote.signed_at)}
          </span>
        </div>
      )}

      {/* Accepted actions */}
      {isAccepted && (
        <div className="border-t border-gray-100 p-4 flex gap-3 flex-wrap">
          <a
            href={`/dashboard/quotes/${quote.id}/download`}
            className="flex items-center gap-2 bg-white border border-[#D3D1C7] text-[#4A4A4A] font-body text-[13px] px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Download size={14} />
            Download Quote
          </a>
          <Link
            href="/dashboard/messages"
            className="flex items-center gap-2 bg-white border border-[#1C3A2B] text-[#1C3A2B] font-body text-[13px] px-4 py-2 rounded-xl hover:bg-[#EAF3DE] transition-colors"
          >
            <MessageSquare size={14} />
            Contact Us
          </Link>
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<CustomerQuote[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')

  const fetchQuotes = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/dashboard/quotes')
      if (res.ok) {
        const data = (await res.json()) as CustomerQuote[]
        setQuotes(data)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchQuotes()
  }, [fetchQuotes])

  const filtered = filterQuotes(quotes, filter)

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-[#1A1A1A] text-[26px] font-bold">My Quotes</h1>
          <p className="font-body text-[#888780] text-[14px] mt-1">
            {quotes.length} total quote{quotes.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`font-body text-[14px] px-4 py-1.5 rounded-full border transition-colors ${
              filter === value
                ? 'bg-[#1C3A2B] text-white border-[#1C3A2B]'
                : 'bg-white text-[#4A4A4A] border-gray-200 hover:border-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-[#1C3A2B] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : quotes.length === 0 ? (
        /* Empty state */
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <FileText size={40} className="text-[#888780] mx-auto" />
          <p className="font-body text-[#888780] text-[15px] mt-3">No quotes yet</p>
          <p className="font-body text-[#888780] text-[13px] mt-1 max-w-xs mx-auto leading-relaxed">
            Once our team prepares a quote for your job it will appear here.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <p className="font-body text-[#888780] text-[14px]">No {filter} quotes</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      )}
    </div>
  )
}
