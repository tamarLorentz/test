import { PaymentRequest, RequestStatus } from '../data/mockRequests'

// Current date for calculation (24.3.2026)
const CURRENT_DATE = new Date(2026, 2, 24)

export function parseDateString(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number)
  return new Date(year, month - 1, day)
}

export function getDaysInSystem(date: string): number {
  const requestDate = parseDateString(date)
  const diffTime = CURRENT_DATE.getTime() - requestDate.getTime()
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

export interface SLAMetrics {
  totalRequests: number
  approvedRecently: number
  slaViolations: number // Requests exceeding 90 days
  stuckRequests: number // Requests in "בדיקה" or "ממתין להבהרה" status
  pendingClarification: number
  totalDays: number
}

export interface SLARequest extends PaymentRequest {
  daysInSystem: number
  isViolation: boolean
  isStuck: boolean
}

export function calculateSLAMetrics(requests: PaymentRequest[]): SLAMetrics {
  const slaRequests = requests.map(req => ({
    ...req,
    daysInSystem: getDaysInSystem(req.date),
    isViolation: getDaysInSystem(req.date) > 90,
    isStuck: req.status === 'טיוטה' || req.status === 'בדיקה' || req.status === 'ממתין להבהרה'
  }))

  const today = new Date(2026, 2, 24)
  const recentDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

  return {
    totalRequests: requests.length,
    approvedRecently: requests.filter(req =>
      req.status === 'אושר לתשלום' && parseDateString(req.date) >= recentDate
    ).length,
    slaViolations: slaRequests.filter(r => r.isViolation).length,
    stuckRequests: slaRequests.filter(r => r.isStuck).length,
    pendingClarification: requests.filter(r => r.status === 'ממתין להבהרה').length,
    totalDays: 0
  }
}

export function getSLARequests(requests: PaymentRequest[]): SLARequest[] {
  return requests.map(req => ({
    ...req,
    daysInSystem: getDaysInSystem(req.date),
    isViolation: getDaysInSystem(req.date) > 90,
    isStuck: req.status === 'טיוטה' || req.status === 'בדיקה' || req.status === 'ממתין להבהרה'
  }))
}
