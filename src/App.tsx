import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useUser } from './context/UserContext'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { SLAPage } from './pages/SLAPage'
import { RequestFormPage } from './pages/RequestFormPage'
import { UserProvider } from './context/UserContext'

function AppContent() {
  const { user, logout } = useUser()
  const location = useLocation()

  if (!user) {
    return <LoginPage />
  }

  const isDashboard = location.pathname === '/'
  const isSLA = location.pathname === '/sla'
  const isForm = location.pathname.startsWith('/requests')
  const showHeader = !isForm

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-inter">
      {showHeader && (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">מ</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">מערכת בקשות תשלום</h1>
            </div>
            <div className="flex items-center gap-6">
              <nav className="flex items-center gap-4">
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors ${
                    isDashboard
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  לוח בקרה בקשות
                </Link>
                {user.role === 'עובד ארגון' && (
                  <Link
                    to="/sla"
                    className={`text-sm font-medium transition-colors ${
                      isSLA
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ניטור SLA
                  </Link>
                )}
              </nav>
              <div className="border-r border-slate-200 pr-6">
                <div>
                  <span className="text-sm text-slate-700">
                    <span className="font-semibold">{user.firstName}</span> {user.lastName}
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {user.role === 'יועץ' ? '🔷 יועץ' : '👤 עובד ארגון'}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-red-50 hover:border-red-300 text-slate-700 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                החלף משתמש
              </button>
            </div>
          </div>
        </header>
      )}

      <main className={showHeader ? 'max-w-7xl mx-auto px-6 py-8' : ''}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          {user.role === 'עובד ארגון' && <Route path="/sla" element={<SLAPage />} />}
          <Route path="/requests/new" element={<RequestFormPage />} />
          <Route path="/requests/:requestId/edit" element={<RequestFormPage />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}

export default App
