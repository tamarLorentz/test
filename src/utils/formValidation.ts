export interface ConsultantFormData {
  consultantName: string
  consultantId: string
  department: string
  project: string
  workDescription: string
  startDate: string
  endDate: string
  amount: string
  invoiceFile?: string
}

export interface FormErrors {
  consultantName?: string
  consultantId?: string
  department?: string
  project?: string
  workDescription?: string
  startDate?: string
  endDate?: string
  amount?: string
}

export function validateConsultantForm(data: ConsultantFormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.consultantName?.trim()) {
    errors.consultantName = 'שם היועץ חובה'
  }

  if (!data.consultantId?.trim()) {
    errors.consultantId = 'ת.ז./ח.פ. חובה'
  } else if (!/^[\d]{9,10}$/.test(data.consultantId.trim())) {
    errors.consultantId = 'ת.ז./ח.פ. חייבת להיות בין 9-10 ספרות'
  }

  if (!data.department) {
    errors.department = 'יחידה ארגונית חובה'
  }

  if (!data.project?.trim()) {
    errors.project = 'פרויקט חובה'
  }

  if (!data.workDescription?.trim()) {
    errors.workDescription = 'תיאור העבודה חובה'
  }

  if (!data.startDate) {
    errors.startDate = 'תאריך התחלה חובה'
  }

  if (!data.endDate) {
    errors.endDate = 'תאריך סיום חובה'
  }

  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate)
    const end = new Date(data.endDate)
    if (end < start) {
      errors.endDate = 'תאריך הסיום חייב להיות אחרי תאריך ההתחלה'
    }
  }

  if (!data.amount?.trim()) {
    errors.amount = 'סכום חובה'
  } else if (isNaN(Number(data.amount)) || Number(data.amount) <= 0) {
    errors.amount = 'סכום חייב להיות מספר חיובי'
  }

  return errors
}

export function isFormValid(errors: FormErrors): boolean {
  return Object.keys(errors).length === 0
}

export const DEPARTMENTS = [
  'משאבי אנוש',
  'תקשוב',
  'כספים',
  'תכנול',
  'משטחית',
  'מכירות',
  'שיווק'
]
