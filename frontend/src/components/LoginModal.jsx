import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginModal({ onClose, onSwitchSignup }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.password) {
      setError('Please enter your name and password.')
      return
    }
    // Placeholder auth — just store and go to dashboard
    const stored = localStorage.getItem('ai_tutor_user')
    if (stored) {
      const user = JSON.parse(stored)
      if (user.name.toLowerCase() === form.name.trim().toLowerCase()) {
        onClose()
        navigate('/dashboard')
        return
      }
    }
    setError('Account not found. Please sign up first.')
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Welcome back!</h2>
              <p className="text-blue-200 text-sm mt-0.5">Log in to continue learning</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition">✕</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-600">{error}</div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="Enter your name"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="Enter your password"
                className="w-full px-3 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              <button type="button" onClick={() => setShowPwd(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPwd
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          <button type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md">
            Log In
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <button type="button" onClick={onSwitchSignup} className="text-blue-600 font-semibold hover:underline">Sign Up Free</button>
          </p>
        </form>
      </div>
    </div>
  )
}
