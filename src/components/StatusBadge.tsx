import { RequestStatus } from '../data/mockRequests'

interface StatusBadgeProps {
  status: RequestStatus
}

const statusConfig: Record<RequestStatus, { bg: string; text: string; label: string }> = {
  'טיוטה': {
    bg: 'bg-slate-100',
    text: 'text-slate-800',
    label: 'טיוטה',
  },
  'בדיקה': {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    label: 'בדיקה',
  },
  'ממתין להבהרה': {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    label: 'ממתין להבהרה',
  },
  'אושר לתשלום': {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'אושר לתשלום',
  },
  'נדחה': {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'נדחה',
  },
  'סיום': {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    label: 'סיום',
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  if (!config) {
    console.warn(`Unknown status: ${status}`)
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
        {status}
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}
