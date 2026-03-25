export type RequestStatus = 'טיוטה' | 'בדיקה' | 'ממתין להבהרה' | 'אושר לתשלום' | 'נדחה' | 'סיום'
export type Priority = 'דחוף' | 'גבוה' | 'רגיל' | 'נמוך'

export interface RequestNote {
  author: string
  role: 'יועץ' | 'עובד ארגון'
  text: string
  date: string
  newStatus?: string
}

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
  notes?: RequestNote[]
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

  // ── ממתין להבהרה >15 ימים ──────────────────────────────────
  {
    id: 'REQ-012',
    title: 'מחלקה לוגיסטיקה',
    requestor: 'רונית שמיר',
    consultantId: '312456789',
    department: 'מחלקה לוגיסטיקה',
    project: 'שדרוג מחסן',
    amount: 37500,
    date: '1.3.2026',   // 23 ימים — >15 ימי הבהרה
    startDate: '2026-02-01',
    endDate: '2026-02-28',
    status: 'ממתין להבהרה',
    description: 'שדרוג מערכת ניהול המחסן',
    priority: 'גבוה',
    notes: [
      {
        author: 'יוסי לוי',
        role: 'עובד ארגון',
        text: 'חסרה חשבונית מקורית — נא לצרף לפני אישור.',
        date: '1.3.2026',
        newStatus: 'ממתין להבהרה',
      },
    ],
  },
  {
    id: 'REQ-013',
    title: 'מחלקה כספים',
    requestor: 'אבי פרדמן',
    consultantId: '208765432',
    department: 'מחלקה כספים',
    project: 'ביקורת פנימית',
    amount: 19800,
    date: '5.2.2026',   // 47 ימים — >15 ימי הבהרה
    startDate: '2026-01-10',
    endDate: '2026-01-31',
    status: 'ממתין להבהרה',
    description: 'ייעוץ לביקורת פנימית רבעון ראשון',
    priority: 'דחוף',
    notes: [
      {
        author: 'דנה מור',
        role: 'עובד ארגון',
        text: 'נדרש אישור מנהל ישיר על היקף הייעוץ.',
        date: '5.2.2026',
        newStatus: 'ממתין להבהרה',
      },
    ],
  },

  // ── יותר מ-90 ימים במערכת ──────────────────────────────────
  {
    id: 'REQ-014',
    title: 'מחלקה תכנול',
    requestor: 'משה ישראלי',
    consultantId: '305123456',
    department: 'מחלקה תכנול',
    project: 'מיגרציה לענן',
    amount: 112000,
    date: '10.12.2025',  // 105 ימים — חריגת SLA
    startDate: '2025-11-01',
    endDate: '2025-11-30',
    status: 'בדיקה',
    description: 'מיגרציה של שרתים פנימיים לסביבת ענן',
    priority: 'דחוף',
  },
  {
    id: 'REQ-015',
    title: 'מחלקה משאבי אנוש',
    requestor: 'חוניית גולן',
    consultantId: '411987654',
    department: 'מחלקה משאבי אנוש',
    project: 'הדרכות Q4',
    amount: 54000,
    date: '5.11.2025',   // 139 ימים — חריגת SLA + ממתין להבהרה
    startDate: '2025-10-01',
    endDate: '2025-10-31',
    status: 'ממתין להבהרה',
    description: 'הדרכות מקצועיות לעובדים חדשים ברבעון רביעי',
    priority: 'גבוה',
    notes: [
      {
        author: 'יוסי לוי',
        role: 'עובד ארגון',
        text: 'נא לפרט את מספר המשתתפים בכל הדרכה.',
        date: '20.11.2025',
        newStatus: 'ממתין להבהרה',
      },
    ],
  },
]
