import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Modes:
//   'login'   - normal login form
//   'forgotU' - show saved username
//   'forgotP' - reset password (verify name, then set new password)

export default function LoginModal({ onClose, onSwitchSignup }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', password: '', newPassword: '', confirm: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [showNewPwd, setShowNewPwd] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  const getStored = () => {
    try { return JSON.parse(localStorage.getItem('ai_tutor_user') || 'null') }
    catch { return null }
  }

  // ── LOGIN ──
  const handleLogin = (e) => {
    e.preventDefault()
    setError(''); setInfo('')
    if (!form.name.trim() || !form.password) {
      setError('Please enter your name and password.')
      return
    }
    const user = getStored()
    if (!user || user.name.toLowerCase() !== form.name.trim().toLowerCase()) {
      setError('Account not found. Please sign up first.')
      return
    }
    // Verify password (older accounts without stored password pass through for backwards compat)
    if (user.password) {
      const storedPwd = atob(user.password)
      if (storedPwd !== form.password) {
        setError('Wrong password. Try again or click "Forgot password?"')
        return
      }
    }
    onClose()
    navigate('/dashboard')
  }

  // ── FORGOT USERNAME ──
  const handleForgotUsername = () => {
    setMode('forgotU'); setError(''); setInfo('')
    const user = getStored()
    if (user?.name) setInfo(`Your saved username is: ${user.name}`)
    else setError('No saved account found on this device. Please sign up first.')
  }

  const useThisUsername = () => {
    const user = getStored()
    if (user?.name) {
      setForm(p => ({ ...p, name: user.name }))
      setMode('login')
      setInfo(''); setError('')
    }
  }

  // ── FORGOT PASSWORD (reset flow) ──
  const handleResetPassword = (e) => {
    e.preventDefault()
    setError(''); setInfo('')
    if (!form.name.trim()) { setError('Please enter your name first.'); return }
    if (form.newPassword.length < 8) { setError('New password must be at least 8 characters.'); return }
    if (form.newPassword !== form.confirm) { setError('Passwords do not match.'); return }

    const user = getStored()
    if (!user || user.name.toLowerCase() !== form.name.trim().toLowerCase()) {
      setError('No account found with that name on this device.')
      return
    }

    user.password = btoa(form.newPassword)
    localStorage.setItem('ai_tutor_user', JSON.stringify(user))
    setMode('login')
    setForm(p => ({ ...p, password: form.newPassword, newPassword: '', confirm: '' }))
    setInfo('Password reset successfully. Please log in.')
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                {mode === 'login' && 'Welcome back!'}
                {mode === 'forgotU' && 'Forgot username?'}
                {mode === 'forgotP' && 'Reset password'}
              </h2>
              <p className="text-blue-200 text-sm mt-0.5">
                {mode === 'login' && 'Log in to continue learning'}
                {mode === 'forgotU' && "We'll show your saved name"}
                {mode === 'forgotP' && 'Set a new password for your account'}
              </p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition">✕</button>
          </div>
        </div>

        {/* ── LOGIN MODE ── */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="px-6 py-5 space-y-4">
            {error && <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-600">{error}</div>}
            {info && <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm text-green-700">{info}</div>}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-600">Full Name</label>
                <button type="button" onClick={handleForgotUsername}
                  className="text-xs text-blue-600 hover:underline font-medium">Forgot username?</button>
              </div>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Enter your name"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-600">Password</label>
                <button type="button" onClick={() => { setMode('forgotP'); setError(''); setInfo('') }}
                  className="text-xs text-blue-600 hover:underline font-medium">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
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

            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-md">
              Log In
            </button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <button type="button" onClick={onSwitchSignup} className="text-blue-600 font-semibold hover:underline">Sign Up Free</button>
            </p>
          </form>
        )}

        {/* ── FORGOT USERNAME MODE ── */}
        {mode === 'forgotU' && (
          <div className="px-6 py-5 space-y-4">
            {info && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-xs text-green-700 mb-2 font-semibold">✓ Account found on this device</p>
                <p className="text-base text-green-800 font-bold">{info.replace('Your saved username is: ', '')}</p>
              </div>
            )}
            {error && <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-600">{error}</div>}

            <div className="flex gap-2">
              {info && (
                <button onClick={useThisUsername}
                  className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow">
                  Use this name
                </button>
              )}
              <button onClick={() => { setMode('login'); setError(''); setInfo('') }}
                className={`${info ? 'px-4' : 'flex-1 py-2.5'} text-blue-600 font-semibold rounded-xl border border-blue-200 hover:bg-blue-50 transition text-sm`}>
                Back to Login
              </button>
            </div>

            {!info && (
              <p className="text-center text-sm text-gray-500">
                <button onClick={onSwitchSignup} className="text-blue-600 font-semibold hover:underline">Sign up here</button>
              </p>
            )}
          </div>
        )}

        {/* ── FORGOT PASSWORD MODE ── */}
        {mode === 'forgotP' && (
          <form onSubmit={handleResetPassword} className="px-6 py-5 space-y-4">
            {error && <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-600">{error}</div>}

            <p className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              💡 Enter your name and a new password. Make sure your name matches the account on this device.
            </p>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Enter your name"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showNewPwd ? 'text' : 'password'}
                  value={form.newPassword}
                  onChange={e => setForm(p => ({ ...p, newPassword: e.target.value }))}
                  placeholder="At least 8 characters"
                  className="w-full px-3 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button type="button" onClick={() => setShowNewPwd(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showNewPwd
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Confirm New Password</label>
              <input
                type={showNewPwd ? 'text' : 'password'}
                value={form.confirm}
                onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
                placeholder="Re-enter new password"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="flex gap-2">
              <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow">
                Reset Password
              </button>
              <button type="button" onClick={() => { setMode('login'); setError(''); setInfo('') }}
                className="px-4 text-blue-600 font-semibold rounded-xl border border-blue-200 hover:bg-blue-50 transition text-sm">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
