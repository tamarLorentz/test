import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ListFilter, Plus } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { mockRequests, PaymentRequest, RequestStatus } from '../data/mockRequests'
import { RequestCard } from '../components/RequestCard'
import { canOpenRequest, getActionLabel, ROLES } from '../utils/permissions'

const allStatuses: RequestStatus[] = ['טיוטה', 'בדיקה', 'ממתין להבהרה', 'אושר לתשלום', 'נדחה', 'סיום']

export function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [requests, setRequests] = useState<PaymentRequest[]>(mockRequests)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | 'הכל'>('הכל')

  // Filter requests based on user role
  const userRequests = useMemo(() => {
    if (!user) return requests
    
    // Consultants see only their own requests
    if (user.role === ROLES.CONSULTANT) {
      return requests.filter(req => req.requestor === user.firstName + ' ' + user.lastName)
    }
    
    // Employees see all requests
    return requests
  }, [requests, user])

  const filteredRequests = useMemo(() => {
    return userRequests.filter((request) => {
      const matchesSearch =
        request.title.includes(searchQuery) ||
        request.requestor.includes(searchQuery) ||
        request.id.includes(searchQuery)

      const matchesStatus =
        selectedStatus === 'הכל' || request.status === selectedStatus

      return matchesSearch && matchesStatus
    })
  }, [searchQuery, selectedStatus, userRequests])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {user?.role === ROLES.CONSULTANT ? 'הבקשות שלי' : 'כל הבקשות'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {user?.role === ROLES.CONSULTANT ? '🔷 יועץ' : '👤 עובד ארגון'} | {filteredRequests.length} בקשות
          </p>
        </div>
        {user?.role === ROLES.CONSULTANT && (
          <button
            onClick={() => navigate('/requests/new')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            בקשה חדשה
          </button>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 flex items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="חיפוש לפי מסכ בקשה, שם, יוצר..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-3 whitespace-nowrap">
          <ListFilter className="w-4 h-4 text-slate-600" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as RequestStatus | 'הכל')}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
          >
            <option value="הכל">כל הסטטוסים</option>
            {allStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Requests Grid */}
      <div>
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onAction={user && canOpenRequest(request, user) ? () => navigate(`/requests/${request.id}/edit`) : undefined}
                actionLabel={user ? getActionLabel(user) : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <p className="text-slate-600 mb-2">לא נמצאו בקשות</p>
            <p className="text-sm text-slate-500">
              {searchQuery ? 'נסה חיפוש אחר' : 'בחר סטטוס אחר'}
            </p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">סטטיסטיקות</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {allStatuses.map((status) => {
            const count = userRequests.filter((r) => r.status === status).length
            return (
              <div key={status} className="text-center">
                <p className="text-2xl font-bold text-blue-600">{count}</p>
                <p className="text-xs text-slate-600 mt-1">{status}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
