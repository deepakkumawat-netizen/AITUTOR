import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('ai_tutor_user')
    if (!stored) { navigate('/'); return }
    setUser(JSON.parse(stored))
  }, [navigate])

  if (!user) return null

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.name}!</h1>
        <p className="text-gray-500 mt-1">{user.grade} · {user.school}</p>
        <p className="text-blue-600 mt-4 text-sm font-medium">Dashboard coming soon…</p>
        <button
          onClick={() => { localStorage.removeItem('ai_tutor_user'); navigate('/') }}
          className="mt-4 px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-white transition"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}
