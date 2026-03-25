import { PaymentRequest, RequestStatus } from '../data/mockRequests'
import { User } from '../context/UserContext'

export const ROLES = {
  CONSULTANT: 'יועץ',
  EMPLOYEE: 'עובד ארגון',
} as const

export const EDITABLE_STATUSES: RequestStatus[] = ['טיוטה', 'בדיקה', 'ממתין להבהרה']
const CLOSED_STATUSES: RequestStatus[] = ['אושר לתשלום', 'סיום']

/** יועץ יכול לערוך רק בקשות שלו שנמצאות בסטטוס ניתן לעריכה */
export function consultantCanEdit(request: PaymentRequest, user: User): boolean {
  const fullName = user.firstName + ' ' + user.lastName
  return request.requestor === fullName && EDITABLE_STATUSES.includes(request.status)
}

/** עובד ארגון יכול לטפל בבקשה רק אם היא לא סגורה */
export function employeeCanHandle(request: PaymentRequest, _user: User): boolean {
  return !CLOSED_STATUSES.includes(request.status)
}

/** האם למשתמש יש גישה לפתיחת בקשה בכלל */
export function canOpenRequest(request: PaymentRequest, user: User): boolean {
  if (user.role === ROLES.EMPLOYEE) return employeeCanHandle(request, user)
  if (user.role === ROLES.CONSULTANT) return consultantCanEdit(request, user)
  return false
}

/** תווית הכפתור לפי תפקיד */
export function getActionLabel(user: User): string {
  return user.role === ROLES.EMPLOYEE ? 'טיפול בבקשה' : 'ערוך בקשה'
}
