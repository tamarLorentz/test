import { Priority } from '../data/mockRequests'
import { AlertCircle, AlertTriangle, Zap } from 'lucide-react'

interface PriorityBadgeProps {
  priority: Priority
}

const priorityConfig: Record<Priority, { bg: string; text: string; label: string; icon: React.ReactNode }> = {
  'דחוף': {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'דחוף',
    icon: <AlertCircle className="w-4 h-4" />,
  },
  'גבוה': {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    label: 'גבוה',
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  'רגיל': {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    label: 'רגיל',
    icon: <Zap className="w-4 h-4" />,
  },
  'נמוך': {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'נמוך',
    icon: null,
  },
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority]

  if (!config) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
        {priority}
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
      {config.icon}
      {config.label}
    </span>
  )
}
