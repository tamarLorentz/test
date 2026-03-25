import { useState } from 'react'
import { PaymentRequest } from '../data/mockRequests'
import {
  ConsultantFormData,
  validateConsultantForm,
  isFormValid,
  DEPARTMENTS,
  FormErrors
} from '../utils/formValidation'
import { X } from 'lucide-react'
import { EDITABLE_STATUSES } from '../utils/permissions'

interface RequestFormProps {
  request?: PaymentRequest
  onSave: (formData: ConsultantFormData, asDraft: boolean) => void
  onCancel: () => void
  initialConsultantName?: string
  isConsultant?: boolean
}

export function RequestForm({ request, onSave, onCancel, initialConsultantName, isConsultant }: RequestFormProps) {
  const isEditMode = !!request
  const canEdit = isEditMode ? EDITABLE_STATUSES.includes(request.status) : true

  const [formData, setFormData] = useState<ConsultantFormData>({
    consultantName: initialConsultantName || request?.requestor || '',
    consultantId: request?.consultantId || '',
    department: request?.department || '',
    project: request?.project || '',
    workDescription: request?.description || '',
    startDate: request?.startDate || '',
    endDate: request?.endDate || '',
    amount: request?.amount?.toString() || '',
    invoiceFile: request?.invoiceFile
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        invoiceFile: file.name
      }))
    }
  }

  const handleSaveDraft = () => {
    const newErrors = validateConsultantForm(formData)
    setErrors(newErrors)
    setSubmitted(true)

    if (isFormValid(newErrors)) {
      onSave(formData, true)
    }
  }

  const handleSubmit = () => {
    const newErrors = validateConsultantForm(formData)
    setErrors(newErrors)
    setSubmitted(true)

    if (isFormValid(newErrors)) {
      onSave(formData, false)
    }
  }

  if (isEditMode && !canEdit) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">לא ניתן לערוך בקשה זו</h2>
        <p className="text-slate-600 mb-6">
          ניתן לערוך בקשות רק בסטטוסים:
          <br />
          <span className="font-semibold">טיוטה, בדיקה, או ממתין להבהרה</span>
        </p>
        <p className="text-sm text-slate-500 mb-6">
          סטטוס נוכחי: <span className="font-semibold">{request?.status}</span>
        </p>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold rounded-lg transition-colors"
        >
          חזור
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900">
          {isEditMode ? 'עריכת בקשה' : 'יצירת בקשה חדשה'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Row 1: Consultant Name & ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              שם היועץ <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="consultantName"
              value={formData.consultantName}
              onChange={handleChange}
              disabled={!canEdit || isConsultant}
              className={`w-full px-3 py-2 border rounded-lg font-medium ${
                errors.consultantName
                  ? 'border-red-500 bg-red-50'
                  : 'border-slate-300 bg-white'
              } ${(!canEdit || isConsultant) ? 'bg-slate-100 cursor-not-allowed' : ''}`}
              placeholder="הזן שם יועץ"
            />
            {errors.consultantName && (
              <p className="text-sm text-red-600 mt-1">{errors.consultantName}</p>
            )}
            {isConsultant && (
              <p className="text-xs text-slate-500 mt-1">🔒 השדה נעול לשם שלך</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              ת.ז./ח.פ. <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="consultantId"
              value={formData.consultantId}
              onChange={handleChange}
              disabled={!canEdit}
              className={`w-full px-3 py-2 border rounded-lg font-medium ${
                errors.consultantId
                  ? 'border-red-500 bg-red-50'
                  : 'border-slate-300 bg-white'
              } ${!canEdit ? 'bg-slate-100 cursor-not-allowed' : ''}`}
              placeholder="9-10 ספרות"
            />
            {errors.consultantId && (
              <p className="text-sm text-red-600 mt-1">{errors.consultantId}</p>
            )}
          </div>
        </div>

        {/* Row 2: Department & Project */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              יחידה ארגונית <span className="text-red-600">*</span>
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={!canEdit}
              className={`w-full px-3 py-2 border rounded-lg font-medium ${
                errors.department
                  ? 'border-red-500 bg-red-50'
                  : 'border-slate-300 bg-white'
              } ${!canEdit ? 'bg-slate-100 cursor-not-allowed' : ''}`}
            >
              <option value="">-- בחר יחידה --</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-sm text-red-600 mt-1">{errors.department}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              פרויקט <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              disabled={!canEdit}
              className={`w-full px-3 py-2 border rounded-lg font-medium ${
                errors.project
                  ? 'border-red-500 bg-red-50'
                  : 'border-slate-300 bg-white'
              } ${!canEdit ? 'bg-slate-100 cursor-not-allowed' : ''}`}
              placeholder="שם הפרויקט"
            />
            {errors.project && (
              <p className="text-sm text-red-600 mt-1">{errors.project}</p>
            )}
          </div>
        </div>

        {/* Row 3: Work Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            תיאור העבודה <span className="text-red-600">*</span>
          </label>
          <textarea
            name="workDescription"
            value={formData.workDescription}
            onChange={handleChange}
            disabled={!canEdit}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg font-medium resize-none ${
              errors.workDescription
                ? 'border-red-500 bg-red-50'
                : 'border-slate-300 bg-white'
            } ${!canEdit ? 'bg-slate-100 cursor-not-allowed' : ''}`}
            placeholder="תאר את העבודה המבוצעת"
          />
          {errors.workDescription && (
            <p className="text-sm text-red-600 mt-1">{errors.workDescription}</p>
          )}
        </div>

        {/* Row 4: Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              תאריך התחלה <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              disabled={!canEdit}
              className={`w-full px-3 py-2 border rounded-lg font-medium ${
                errors.startDate
                  ? 'border-red-500 bg-red-50'
                  : 'border-slate-300 bg-white'
              } ${!canEdit ? 'bg-slate-100 cursor-not-allowed' : ''}`}
            />
            {errors.startDate && (
              <p className="text-sm text-red-600 mt-1">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              תאריך סיום <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              disabled={!canEdit}
              className={`w-full px-3 py-2 border rounded-lg font-medium ${
                errors.endDate
                  ? 'border-red-500 bg-red-50'
                  : 'border-slate-300 bg-white'
              } ${!canEdit ? 'bg-slate-100 cursor-not-allowed' : ''}`}
            />
            {errors.endDate && (
              <p className="text-sm text-red-600 mt-1">{errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Row 5: Amount */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            סכום (בש"ח) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            disabled={!canEdit}
            className={`w-full px-3 py-2 border rounded-lg font-medium ${
              errors.amount
                ? 'border-red-500 bg-red-50'
                : 'border-slate-300 bg-white'
            } ${!canEdit ? 'bg-slate-100 cursor-not-allowed' : ''}`}
            placeholder="0.00"
          />
          {errors.amount && (
            <p className="text-sm text-red-600 mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Row 6: Invoice Upload */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            העלה חשבוניה (סימולציה)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              id="invoice"
              onChange={handleFileChange}
              disabled={!canEdit}
              className="hidden"
              accept="image/*,.pdf"
            />
            <label
              htmlFor="invoice"
              className={`flex-1 px-4 py-3 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                !canEdit
                  ? 'border-slate-300 bg-slate-100 cursor-not-allowed'
                  : 'border-blue-300 bg-blue-50 hover:bg-blue-100'
              }`}
            >
              {formData.invoiceFile ? (
                <div>
                  <p className="font-semibold text-slate-900">📄 {formData.invoiceFile}</p>
                  <p className="text-xs text-slate-600">לחץ להחלפה</p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-slate-900">העלה קובץ</p>
                  <p className="text-xs text-slate-600">PDF או תמונה</p>
                </div>
              )}
            </label>
          </div>
        </div>
        {/* Notes History */}
      {request?.notes && request.notes.length > 0 && (
        <div>
          <h3 className="font-semibold text-slate-900 text-base mb-3">היסטוריית הערות</h3>
          <div className="space-y-3">
            {request.notes.map((note, i) => (
              <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-900">{note.author}</span>
                  <span className="text-xs text-slate-500">{note.date}</span>
                </div>
                {note.newStatus && (
                  <p className="text-xs text-slate-500 mb-1">
                    שינוי סטטוס ל: <span className="font-semibold">{note.newStatus}</span>
                  </p>
                )}
                <p className="text-sm text-slate-700">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

      {/* Action Buttons */}
      <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 flex items-center justify-between gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-lg transition-colors"
        >
          ביטול
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            disabled={!canEdit}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              canEdit
                ? 'bg-slate-600 hover:bg-slate-700 text-white'
                : 'bg-slate-300 text-slate-600 cursor-not-allowed'
            }`}
          >
            💾 שמור כטיוטה
          </button>

          <button
            onClick={handleSubmit}
            disabled={!canEdit}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              canEdit
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-300 text-white cursor-not-allowed'
            }`}
          >
            ✓ שלח לבדיקה
          </button>
        </div>
      </div>
    </div>
  )
}
