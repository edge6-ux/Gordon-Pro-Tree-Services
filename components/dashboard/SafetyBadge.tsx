import { AlertTriangle, Eye, CheckCircle } from 'lucide-react'
import type { CustomerResult } from '@/lib/types'

const CONFIG = {
  attention_needed: {
    bg: 'bg-[#FCEBEB]',
    text: 'text-[#791F1F]',
    label: 'Needs Attention',
    Icon: AlertTriangle,
  },
  monitor: {
    bg: 'bg-[#FAEEDA]',
    text: 'text-[#633806]',
    label: 'Monitor',
    Icon: Eye,
  },
  healthy: {
    bg: 'bg-[#EAF3DE]',
    text: 'text-[#27500A]',
    label: 'Healthy',
    Icon: CheckCircle,
  },
}

export default function SafetyBadge({
  status,
}: {
  status: CustomerResult['safety_status']
}) {
  const { bg, text, label, Icon } = CONFIG[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${bg} ${text} font-body text-[12px] font-medium px-2.5 py-1 rounded-xl`}
    >
      <Icon size={13} />
      {label}
    </span>
  )
}
