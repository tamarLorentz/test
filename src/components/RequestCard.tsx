import { PaymentRequest } from '../data/mockRequests'
import { StatusBadge } from './StatusBadge'
import { PriorityBadge } from './PriorityBadge'
import { Edit2 } from 'lucide-react'

interface RequestCardProps {
  request: PaymentRequest
  onAction?: () => void
  actionLabel?: string
}

export function RequestCard({ request, onAction, actionLabel }: RequestCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
              {request.id}
            </span>
            <PriorityBadge priority={request.priority} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{request.title}</h3>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <p className="text-sm text-slate-600 mb-4">{request.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-slate-100">
        <div>
          <p className="text-xs text-slate-500 mb-1">יוצר בקשה</p>
          <p className="font-semibold text-slate-900">{request.requestor}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">תאריך הגשה</p>
          <p className="font-semibold text-slate-900">{request.date}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-sm text-slate-600">סכום:</span>
        <span className="text-lg font-bold text-blue-600">₪{request.amount.toLocaleString('he-IL')}</span>
      </div>

      {/* Action Button */}
      {onAction && (
        <button
          onClick={onAction}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors"
        >
          <Edit2 className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  )
}
