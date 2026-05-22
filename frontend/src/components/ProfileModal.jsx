import { useState } from 'react'

const GRADES = Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`)

export default function ProfileModal({ user, onClose, onSave, onLogout }) {
  const [form, setForm] = useState({
    name: user.name || '',
    school: user.school || '',
    grade: user.grade || 'Grade 5',
  })

  const handleSave = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.school.trim() || !form.grade) return
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold text-white">
              {form.name.charAt(0).toUpperCase() || 'S'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">My Profile</h2>
              <p className="text-blue-200 text-xs">Update your details anytime</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white">✕</button>
        </div>

        <form onSubmit={handleSave} className="px-6 py-5 space-y-4">

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">School</label>
            <input
              type="text"
              value={form.school}
              onChange={e => setForm(p => ({ ...p, school: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Grade</label>
            <select
              value={form.grade}
              onChange={e => setForm(p => ({ ...p, grade: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            >
              {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <p className="text-xs text-gray-400 mt-1">Changing your grade will update the subjects you see.</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="submit"
              className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow">
              Save Changes
            </button>
            <button type="button" onClick={onLogout}
              className="px-4 py-2.5 text-red-500 font-semibold rounded-xl border border-red-200 hover:bg-red-50 transition text-sm">
              Log Out
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
