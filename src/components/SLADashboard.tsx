import { useState } from 'react'
import { mockRequests } from '../data/mockRequests'
import { calculateSLAMetrics, getSLARequests, getDaysInSystem } from '../utils/slaCalculations'
import { StatusBadge } from './StatusBadge'
import { PriorityBadge } from './PriorityBadge'
import { AlertTriangle, Clock, AlertCircle } from 'lucide-react'

export function SLADashboard() {
  const slaRequests = getSLARequests(mockRequests)
  const metrics = calculateSLAMetrics(mockRequests)

  const violationRequests = slaRequests.filter(r => r.isViolation)
  const stuckRequests = slaRequests.filter(r => r.isStuck)

  const getViolationColor = (days: number) => {
    if (days > 150) return 'text-red-700 bg-red-50'
    if (days > 100) return 'text-orange-700 bg-orange-50'
    return 'text-yellow-700 bg-yellow-50'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">לוח בקרה SLA</h1>
        <p className="text-slate-600 mt-2">ניטור בקשות חורגות מ-90 ימי טיפול ובקשות תקועות</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-1">סה"כ בקשות</p>
              <p className="text-3xl font-bold text-slate-900">{metrics.totalRequests}</p>
            </div>
            <div className="text-2xl">📋</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-1">חריות SLA (90+)</p>
              <p className="text-3xl font-bold text-red-600">{metrics.slaViolations}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-1">בקשות תקועות</p>
              <p className="text-3xl font-bold text-orange-600">{metrics.stuckRequests}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-1">ממתין להבהרה</p>
              <p className="text-3xl font-bold text-yellow-600">{metrics.pendingClarification}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* SLA Violations Section */}
      <div className="bg-white rounded-lg border border-red-200">
        <div className="border-b border-red-200 px-6 py-4 bg-red-50">
          <h2 className="text-lg font-bold text-red-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            חריות SLA - בקשות חורגות מ-90 ימי טיפול
          </h2>
        </div>

        {violationRequests.length === 0 ? (
          <div className="p-6 text-center text-slate-600">
            ✓ אין בקשות חורגות מ-90 ימים
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {violationRequests
              .sort((a, b) => b.daysInSystem - a.daysInSystem)
              .map(request => (
                <div key={request.id} className={`p-4 border-r-4 border-r-red-500 ${getViolationColor(request.daysInSystem)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded text-slate-700">
                          {request.id}
                        </span>
                        <PriorityBadge priority={request.priority} />
                        <StatusBadge status={request.status} />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">{request.title}</h3>
                      <p className="text-sm text-slate-600">{request.requestor}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600">
                        {request.daysInSystem}
                      </div>
                      <p className="text-xs text-slate-500">ימים בטיפול</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Stuck Requests Section */}
      <div className="bg-white rounded-lg border border-orange-200">
        <div className="border-b border-orange-200 px-6 py-4 bg-orange-50">
          <h2 className="text-lg font-bold text-orange-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            בקשות תקועות - ממתין להבהרה מעל 15 יום
          </h2>
        </div>

        {stuckRequests.length === 0 ? (
          <div className="p-6 text-center text-slate-600">
            ✓ אין בקשות תקועות
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {stuckRequests
              .sort((a, b) => b.daysInSystem - a.daysInSystem)
              .map(request => (
                <div key={request.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded text-slate-700">
                          {request.id}
                        </span>
                        <PriorityBadge priority={request.priority} />
                        <StatusBadge status={request.status} />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">{request.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>{request.requestor}</span>
                        <span>סכום: ₪{request.amount.toLocaleString('he-IL')}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-orange-600">
                        {request.daysInSystem}
                      </div>
                      <p className="text-xs text-slate-500">ימים בטיפול</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Visual Summary Chart */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">התפלגות סטטוסים</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['טיוטה', 'בדיקה', 'ממתין להבהרה', 'אושר לתשלום', 'נדחה', 'סיום'].map(status => {
            const count = mockRequests.filter(r => r.status === status).length
            const percentage = (count / mockRequests.length) * 100
            return (
              <div key={status} className="text-center">
                <div className="text-2xl font-bold text-slate-900">{count}</div>
                <p className="text-xs text-slate-600 mt-1">{status}</p>
                <div className="mt-2 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
