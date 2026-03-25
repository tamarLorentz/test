export type RequestStatus = 'טיוטה' | 'בדיקה' | 'ממתין להבהרה' | 'אושר לתשלום' | 'נדחה' | 'סיום'
export type Priority = 'דחוף' | 'גבוה' | 'רגיל' | 'נמוך'

export interface PaymentRequest {
  id: string
  title: string
  requestor: string
  consultantId?: string // ת.ז./ח.פ.
  department?: string // יחידה ארגונית
  project?: string // פרויקט
  amount: number
  date: string
  startDate?: string
  endDate?: string
  status: RequestStatus
  description: string
  priority: Priority
  invoiceFile?: string
}

export const mockRequests: PaymentRequest[] = [
  {
    id: 'REQ-011',
    title: 'מחלקה משאבי אנוש',
    requestor: 'תמחור לורנצ',
    amount: 86867,
    date: '24.3.2026',
    status: 'בדיקה',
    description: 'בקשה חדשה לתשלום',
    priority: 'דחוף',
  },
  {
    id: 'REQ-001',
    title: 'מחלקה תקשוב',
    requestor: 'דוד כהן',
    amount: 45000,
    date: '14.12.2025',
    status: 'בדיקה',
    description: 'עדכון ציוד מחשבים',
    priority: 'גבוה',
  },
  {
    id: 'REQ-002',
    title: 'מחלקה כספים',
    requestor: 'שרה לי',
    amount: 32000,
    date: '27.2.2026',
    status: 'אושר לתשלום',
    description: 'התקנה חדשה',
    priority: 'רגיל',
  },
  {
    id: 'REQ-003',
    title: 'מחלקה תכנול',
    requestor: 'משה ישראלי',
    amount: 68000,
    date: '9.12.2025',
    status: 'אושר לתשלום',
    description: 'פרויקט פיתוח חדש',
    priority: 'גבוה',
  },
  {
    id: 'REQ-004',
    title: 'מחלקה תקשוב',
    requestor: 'דוד כהן',
    amount: 28000,
    date: '9.3.2026',
    status: 'בדיקה',
    description: 'רכישת שרתים',
    priority: 'רגיל',
  },
  {
    id: 'REQ-005',
    title: 'מחלקה משאבי אנוש',
    requestor: 'חוניית גולן',
    amount: 15000,
    date: '19.3.2026',
    status: 'סיום',
    description: 'השתלמות עובדים',
    priority: 'נמוך',
  },
  {
    id: 'REQ-006',
    title: 'מחלקה משטחית',
    requestor: 'אבי פרדמן',
    amount: 95000,
    date: '20.10.2025',
    status: 'בדיקה',
    description: 'ציוד משרדי',
    priority: 'דחוף',
  },
  {
    id: 'REQ-007',
    title: 'מחלקה כספים',
    requestor: 'שרה לי',
    amount: 42000,
    date: '7.2.2026',
    status: 'נדחה',
    description: 'עדכון תוכנה',
    priority: 'גבוה',
  },
  {
    id: 'REQ-008',
    title: 'מחלקה תקשוב',
    requestor: 'דוד כהן',
    amount: 55000,
    date: '1.3.2026',
    status: 'אושר לתשלום',
    description: 'רכישת ציוד היקף',
    priority: 'רגיל',
  },
  {
    id: 'REQ-009',
    title: 'מחלקה משאבי אנוש',
    requestor: 'תמחור לורנצ',
    amount: 22500,
    date: '15.3.2026',
    status: 'בדיקה',
    description: 'תקצוב אירוע חברה',
    priority: 'נמוך',
  },
]
