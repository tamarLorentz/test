import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { validateName } from '../utils/validation'
import { LogIn } from 'lucide-react'

export function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useUser()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState<'יועץ' | 'עובד ארגון'>('עובד ארגון')
  const [errors, setErrors] = useState({ firstName: '', lastName: '' })

  const firstNameError = validateName(firstName)
  const lastNameError = validateName(lastName)
  const isValid = !firstNameError && !lastNameError && firstName.trim() && lastName.trim()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValid) return

    const newUser = { firstName: firstName.trim(), lastName: lastName.trim(), role }
    setUser(newUser)
    navigate('/')
  }

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex justify-center mb-8">
          <div className="bg-blue-600 rounded-full p-3">
            <LogIn className="w-6 h-6 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">כניסה למערכת</h1>
        <p className="text-center text-slate-600 mb-8">הזן את פרטיך כדי להתחיל</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name Field */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-2">
              שם פרטי
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="הכנס שם פרטי"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none font-inter ${
                firstNameError && firstName
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-slate-200 focus:border-blue-500'
              }`}
            />
            {firstNameError && firstName && (
              <p className="text-sm text-red-600 mt-2">{firstNameError}</p>
            )}
          </div>

          {/* Last Name Field */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">
              שם משפחה
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              placeholder="הכנס שם משפחה"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none font-inter ${
                lastNameError && lastName
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-slate-200 focus:border-blue-500'
              }`}
            />
            {lastNameError && lastName && (
              <p className="text-sm text-red-600 mt-2">{lastNameError}</p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">תפקיד</label>
            <div className="space-y-2">
              <label className="flex items-center p-3 rounded-lg border-2 border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="role"
                  value="יועץ"
                  checked={role === 'יועץ'}
                  onChange={() => setRole('יועץ')}
                  className="w-4 h-4 ml-3"
                />
                <span className="font-medium text-slate-700">יועץ</span>
              </label>
              <label className="flex items-center p-3 rounded-lg border-2 border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="role"
                  value="עובד ארגון"
                  checked={role === 'עובד ארגון'}
                  onChange={() => setRole('עובד ארגון')}
                  className="w-4 h-4 ml-3"
                />
                <span className="font-medium text-slate-700">עובד ארגון</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
              isValid
                ? 'bg-blue-600 hover:bg-blue-700 active:scale-95 cursor-pointer'
                : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            <LogIn className="w-5 h-5" />
            כניסה למערכת
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center mt-6">
          כל השדות חובה • אותיות עברית בלבד
        </p>
      </div>
    </div>
  )
}
