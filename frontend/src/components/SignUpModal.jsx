import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GRADES = Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`)

function passwordStrength(pwd) {
  if (!pwd) return { score: 0, label: '', color: '' }
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  if (pwd.length >= 12) score++
  if (score <= 1) return { score, label: 'Too weak', color: 'bg-red-500', text: 'text-red-600' }
  if (score === 2) return { score, label: 'Weak', color: 'bg-orange-400', text: 'text-orange-600' }
  if (score === 3) return { score, label: 'Fair', color: 'bg-yellow-400', text: 'text-yellow-600' }
  if (score === 4) return { score, label: 'Strong', color: 'bg-blue-500', text: 'text-blue-600' }
  return { score, label: 'Very strong', color: 'bg-green-500', text: 'text-green-600' }
}

export default function SignUpModal({ onClose, onSwitchLogin }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', school: '', grade: '', password: '', confirm: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})

  const strength = passwordStrength(form.password)
  const bars = [1, 2, 3, 4, 5]

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.school.trim()) e.school = 'School is required'
    if (!form.grade) e.grade = 'Please select your grade'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    // Store in localStorage (placeholder — replace with real auth later)
    localStorage.setItem('ai_tutor_user', JSON.stringify({
      name: form.name,
      school: form.school,
      grade: form.grade,
      password: btoa(form.password),  // base64 obfuscation only — demo-grade auth
    }))
    onClose()
    navigate('/dashboard')
  }

  const field = (key, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 border ${errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
      />
      {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Create your account</h2>
              <p className="text-blue-200 text-sm mt-0.5">Start learning with AI Tutor</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition">✕</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {field('name', 'Full Name', 'text', 'Your full name')}
          {field('school', 'School Name', 'text', 'Your school name')}

          {/* Grade dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Grade</label>
            <select
              value={form.grade}
              onChange={e => setForm(p => ({ ...p, grade: e.target.value }))}
              className={`w-full px-3 py-2.5 border ${errors.grade ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition bg-white`}
            >
              <option value="">Select your grade</option>
              {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            {errors.grade && <p className="text-xs text-red-500 mt-1">{errors.grade}</p>}
          </div>

          {/* Password with strength meter */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="Create a strong password"
                className={`w-full px-3 py-2.5 pr-10 border ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
              />
              <button type="button" onClick={() => setShowPwd(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPwd
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>

            {/* Strength bars */}
            {form.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {bars.map(b => (
                    <div key={b} className={`flex-1 h-1 rounded-full transition-all ${b <= strength.score ? strength.color : 'bg-gray-200'}`} />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-semibold ${strength.text}`}>{strength.label}</p>
                  <p className="text-xs text-gray-400">
                    {strength.score < 3 ? 'Use uppercase, numbers & symbols' : 'Good password!'}
                  </p>
                </div>
              </div>
            )}
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={form.confirm}
                onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
                placeholder="Re-enter your password"
                className={`w-full px-3 py-2.5 pr-10 border ${errors.confirm ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
              />
              <button type="button" onClick={() => setShowConfirm(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showConfirm
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
            {form.confirm && form.password === form.confirm && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Passwords match
              </p>
            )}
            {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
          </div>

          <button type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md mt-2">
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <button type="button" onClick={onSwitchLogin} className="text-blue-600 font-semibold hover:underline">Log In</button>
          </p>
        </form>
      </div>
    </div>
  )
}
