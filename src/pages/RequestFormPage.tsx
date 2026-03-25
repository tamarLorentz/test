import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { RequestForm } from '../components/RequestForm'
import { ConsultantFormData } from '../utils/formValidation'
import { PaymentRequest, mockRequests } from '../data/mockRequests'

export function RequestFormPage() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { requestId } = useParams<{ requestId?: string }>()
  const [editingRequest, setEditingRequest] = useState<PaymentRequest | undefined>()
  const [isLoading, setIsLoading] = useState(!!requestId)
  const [accessDenied, setAccessDenied] = useState(false)
  const [noteText, setNoteText] = useState('')

  useEffect(() => {
    if (requestId) {
      // Simulate finding the request
      const request = mockRequests.find(r => r.id === requestId)
      
      if (!request) {
        setIsLoading(false)
        setAccessDenied(true)
        return
      }

      // Consultants can only edit their own requests
      if (user?.role === 'יועץ') {
        const fullName = user.firstName + ' ' + user.lastName
        if (request.requestor !== fullName) {
          setAccessDenied(true)
          setIsLoading(false)
          return
        }
      }

      setEditingRequest(request)
      setIsLoading(false)
    }
  }, [requestId, user])

  const generateRequestId = () => {
    const maxId = Math.max(...mockRequests.map(r => {
      const num = parseInt(r.id.replace('REQ-', ''))
      return isNaN(num) ? 0 : num
    }))
    return `REQ-${String(maxId + 1).padStart(3, '0')}`
  }

  const handleSaveForm = (formData: ConsultantFormData, asDraft: boolean) => {
    const now = new Date()
    const dateStr = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`

    // For consultants, force their own name
    let consultantName = formData.consultantName
    if (user?.role === 'יועץ') {
      consultantName = user.firstName + ' ' + user.lastName
    }

    if (editingRequest) {
      // Edit mode: update existing request
      const updatedRequest: PaymentRequest = {
        ...editingRequest,
        requestor: consultantName,
        consultantId: formData.consultantId,
        department: formData.department,
        project: formData.project,
        description: formData.workDescription,
        startDate: formData.startDate,
        endDate: formData.endDate,
        amount: Number(formData.amount),
        invoiceFile: formData.invoiceFile,
        status: asDraft ? 'טיוטה' : 'בדיקה',
        date: editingRequest.date
      }

      // In a real app, you'd send this to the backend
      const index = mockRequests.findIndex(r => r.id === editingRequest.id)
      if (index !== -1) {
        mockRequests[index] = updatedRequest
      }

      showSuccess(asDraft ? 'טיוטה שמורה בהצלחה' : 'בקשה הוגשה בהצלחה')
    } else {
      // Create mode: new request
      const newRequest: PaymentRequest = {
        id: generateRequestId(),
        requestor: consultantName,
        consultantId: formData.consultantId,
        title: formData.project,
        department: formData.department,
        project: formData.project,
        description: formData.workDescription,
        startDate: formData.startDate,
        endDate: formData.endDate,
        amount: Number(formData.amount),
        invoiceFile: formData.invoiceFile,
        status: asDraft ? 'טיוטה' : 'בדיקה',
        date: dateStr,
        priority: 'רגיל'
      }

      // In a real app, you'd send this to the backend
      mockRequests.push(newRequest)

      showSuccess(asDraft ? 'טיוטה נוצרה בהצלחה' : 'בקשה הוגשה בהצלחה')
    }

    // Navigate back after a short delay
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  const handleUpdateStatus = (newStatus: string) => {
    if (editingRequest) {
      const updatedRequest: PaymentRequest = {
        ...editingRequest,
        status: newStatus as any
      }

      const index = mockRequests.findIndex(r => r.id === editingRequest.id)
      if (index !== -1) {
        mockRequests[index] = updatedRequest
      }

      // Log the note if provided
      if (noteText.trim()) {
        console.log(`📝 הערה עבור בקשה ${editingRequest.id}:`, noteText)
      }

      showSuccess(`סטטוס עודכן ל: ${newStatus}`)

      // Clear the note field after submission
      setNoteText('')

      setTimeout(() => {
        navigate('/')
      }, 1500)
    }
  }

  const showSuccess = (message: string) => {
    // This would show a toast notification in a real app
    console.log('✓', message)
  }

  const handleCancel = () => {
    navigate('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-slate-600">טוען...</p>
        </div>
      </div>
    )
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
        <div className="bg-white rounded-lg border border-red-200 p-8 text-center max-w-md">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">גישה נדחתה</h2>
          <p className="text-slate-600 mb-6">
            אינך מורשה לערוך בקשה זו. יועצים יכולים לערוך רק את הבקשות שלהם.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            חזור לדף הבית
          </button>
        </div>
      </div>
    )
  }

  // For consultants, pre-fill with their name
  let initialConsultantName = ''
  if (user?.role === 'יועץ') {
    initialConsultantName = user.firstName + ' ' + user.lastName
  }

  // Employee edit mode: show status update view instead of form
  if (user?.role === 'עובד ארגון' && editingRequest) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg border border-slate-200">
          <div className="border-b border-slate-200 px-6 py-4 bg-slate-50 flex items-center justify-start">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-2xl"
            >
              →
            </button>
            <h2 className="text-2xl font-bold text-slate-900 mr-auto">עריכת בקשה</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Request Details (Read-only) */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 text-lg">פרטי הבקשה</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-slate-600">שם היועץ</p>
                  <p className="font-semibold text-slate-900">{editingRequest.requestor}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">ת.ז./ח.פ.</p>
                  <p className="font-semibold text-slate-900">{editingRequest.consultantId}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">יחידה ארגונית</p>
                  <p className="font-semibold text-slate-900">{editingRequest.department}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">פרויקט</p>
                  <p className="font-semibold text-slate-900">{editingRequest.project}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-slate-600">תיאור העבודה</p>
                  <p className="font-semibold text-slate-900 whitespace-pre-wrap">{editingRequest.description}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">תאריך התחלה</p>
                  <p className="font-semibold text-slate-900">{editingRequest.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">תאריך סיום</p>
                  <p className="font-semibold text-slate-900">{editingRequest.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">סכום (בש"ח)</p>
                  <p className="font-semibold text-slate-900">₪{editingRequest.amount.toLocaleString('he-IL')}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">סטטוס נוכחי</p>
                  <p className="font-semibold text-slate-900">{editingRequest.status}</p>
                </div>
              </div>
            </div>

            {/* Status Actions */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 text-lg">פעולות</h3>
              
              {/* Note Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  הערות (אופציונלי)
                </label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                  placeholder="הוסף הערה או הבהרה..."
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleUpdateStatus('ממתין להבהרה')}
                  className="px-6 py-2 border-2 border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>?</span> בקש הבהרה
                </button>
                <button
                  onClick={() => handleUpdateStatus('נדחה')}
                  className="px-6 py-2 border-2 border-red-400 bg-red-50 hover:bg-red-100 text-red-900 font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>✕</span> דחה
                </button>
                <button
                  onClick={() => handleUpdateStatus('אושר לתשלום')}
                  className="px-6 py-2 border-2 border-green-500 bg-green-50 hover:bg-green-100 text-green-900 font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>✓</span> אשר לתשלום
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <RequestForm
          request={editingRequest}
          onSave={handleSaveForm}
          onCancel={handleCancel}
          initialConsultantName={initialConsultantName}
          isConsultant={user?.role === 'יועץ'}
        />
      </div>
    </div>
  )
}
