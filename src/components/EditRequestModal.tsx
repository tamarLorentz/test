import { useState } from 'react'
import { X, Edit2 } from 'lucide-react'
import { PaymentRequest, Priority } from '../data/mockRequests'
import { PriorityBadge } from './PriorityBadge'

interface EditRequestModalProps {
  request: PaymentRequest
  isOpen: boolean
  onClose: () => void
  onUpdate: (request: PaymentRequest) => void
}

export function EditRequestModal({ request, isOpen, onClose, onUpdate }: EditRequestModalProps) {
  const [note, setNote] = useState('')
  const [priority, setPriority] = useState<Priority>(request.priority)

  if (!isOpen) return null

  const handleAction = (newStatus: PaymentRequest['status']) => {
    const updatedRequest = { ...request, status: newStatus, priority }
    onUpdate(updatedRequest)
    setNote('')
    setPriority(request.priority)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Edit2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">עריכת בקשה</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Request Details */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <p className="text-xs text-slate-600 mb-1">מזהה בקשה</p>
          <p className="font-semibold text-slate-900 mb-3">{request.id}</p>
          <p className="text-xs text-slate-600 mb-1">כותרת</p>
          <p className="font-semibold text-slate-900 mb-3">{request.title}</p>
          <p className="text-xs text-slate-600 mb-1">סכום</p>
          <p className="font-bold text-blue-600">₪{request.amount.toLocaleString('he-IL')}</p>
        </div>

        {/* Priority Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            דחיפות
          </label>
          <div className="space-y-2">
            {(['דחוף', 'גבוה', 'רגיל', 'נמוך'] as Priority[]).map((p) => (
              <label key={p} className="flex items-center p-2 rounded-lg border-2 cursor-pointer hover:bg-slate-50 transition-colors" style={{ borderColor: priority === p ? '#2563eb' : '#e2e8f0' }}>
                <input
                  type="radio"
                  name="priority"
                  value={p}
                  checked={priority === p}
                  onChange={() => setPriority(p)}
                  className="w-4 h-4 ml-3"
                />
                <PriorityBadge priority={p} />
              </label>
            ))}
          </div>
        </div>

        {/* Note Textarea */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            הערה (אופציונלי)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="הוסף הערה לבקשה..."
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none text-sm"
            rows={3}
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Approve Button */}
          <button
            onClick={() => handleAction('אושר לתשלום')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>✓</span>
            אושר לתשלום
          </button>

          {/* Request Clarification Button */}
          <button
            onClick={() => handleAction('ממתין להבהרה')}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>?</span>
            בקשה בהבהרה
          </button>

          {/* Reject Button */}
          <button
            onClick={() => handleAction('נדחה')}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>✕</span>
            דחה
          </button>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="w-full mt-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          בטל
        </button>
      </div>
    </div>
  )
}
