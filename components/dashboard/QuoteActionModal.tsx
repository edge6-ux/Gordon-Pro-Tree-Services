'use client'

import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface QuoteActionModalProps {
  type: 'accept' | 'decline'
  quoteId: string
  totalCost: number
  onClose: () => void
  onSuccess: () => void
}

export default function QuoteActionModal({
  type,
  quoteId,
  totalCost,
  onClose,
  onSuccess,
}: QuoteActionModalProps) {
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isAccept = type === 'accept'

  async function handleConfirm() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/dashboard/quotes/${quoteId}/respond`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: type,
          ...(reason.trim() && { reason: reason.trim() }),
        }),
      })

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? 'Something went wrong')
      }

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mt-32 p-6">
        {isAccept ? (
          <CheckCircle size={40} className="text-[#1C3A2B] mx-auto mb-4" />
        ) : (
          <XCircle size={40} className="text-[#E24B4A] mx-auto mb-4" />
        )}

        <h2 className="font-heading text-[#1A1A1A] text-[22px] font-bold text-center">
          {isAccept ? 'Accept this quote?' : 'Decline this quote?'}
        </h2>

        {isAccept ? (
          <>
            <p className="font-body text-[#4A4A4A] text-[14px] mt-2 text-center">
              By accepting you are confirming you&apos;d like Gordon Pro to proceed
              with the work for
            </p>
            <p className="font-heading text-[#1C3A2B] text-[28px] font-bold text-center mt-2">
              {formatCurrency(totalCost)}
            </p>
            <p className="font-body text-[#888780] text-[13px] mt-3 text-center">
              Our team will contact you to confirm scheduling.
            </p>
          </>
        ) : (
          <div className="mt-4">
            <label
              htmlFor="decline-reason"
              className="block font-body text-sm text-[#1A1A1A] font-medium mb-1.5"
            >
              Reason <span className="text-[#888780] font-normal">(optional)</span>
            </label>
            <textarea
              id="decline-reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Let us know why you're declining..."
              className="w-full border border-[#D3D1C7] rounded-xl px-4 py-3 font-body text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[#1C3A2B] resize-none"
            />
          </div>
        )}

        {error && (
          <p className="font-body text-[#DC2626] text-[13px] mt-3 text-center">{error}</p>
        )}

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 bg-white border border-gray-200 text-[#4A4A4A] font-body text-[14px] py-3 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className={`flex-1 text-white font-body text-[14px] py-3 rounded-xl transition-colors disabled:opacity-60 ${
              isAccept
                ? 'bg-[#1C3A2B] hover:bg-[#2D5A40]'
                : 'bg-[#E24B4A] hover:bg-[#c73f3e]'
            }`}
          >
            {loading ? 'Saving...' : isAccept ? 'Yes, Accept' : 'Yes, Decline'}
          </button>
        </div>
      </div>
    </div>
  )
}
