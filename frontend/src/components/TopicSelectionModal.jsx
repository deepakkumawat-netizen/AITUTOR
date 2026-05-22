import { useMemo, useState } from 'react'

export default function TopicSelectionModal({ grade, subject, chapters, onClose, onPick }) {
  const [search, setSearch] = useState('')

  // Group chapters by unit/stream when available
  const grouped = useMemo(() => {
    const result = {}
    let hasGrouping = false
    for (const ch of chapters || []) {
      const key = ch.unit || ch.stream || '__flat__'
      if (key !== '__flat__') hasGrouping = true
      if (!result[key]) result[key] = []
      result[key].push(ch)
    }
    return { groups: result, hasGrouping }
  }, [chapters])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return grouped.groups
    const out = {}
    for (const [key, list] of Object.entries(grouped.groups)) {
      const matches = list.filter(ch =>
        ch.title?.toLowerCase().includes(q) ||
        ch.concepts?.toLowerCase().includes(q)
      )
      if (matches.length) out[key] = matches
    }
    return out
  }, [grouped, search])

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-white">Choose a chapter</h2>
            <p className="text-blue-200 text-xs">{grade} · {subject} — {chapters?.length || 0} chapters from CBSE syllabus</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white">✕</button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search chapters or concepts..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              autoFocus
            />
          </div>
        </div>

        {/* Topics list */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {chapters?.length > 0 ? (
            <div className="space-y-4">
              <button onClick={() => onPick(null)}
                className="w-full text-left px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 transition">
                <div className="font-semibold text-sm text-blue-700">✨ Any topic / Open question</div>
                <div className="text-xs text-blue-600 mt-0.5">Ask me anything in {subject} — I'll handle it</div>
              </button>

              {Object.entries(filtered).map(([groupKey, list]) => (
                <div key={groupKey}>
                  {grouped.hasGrouping && groupKey !== '__flat__' && (
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1 mb-2">
                      📚 {groupKey}
                    </h3>
                  )}
                  <div className="space-y-2">
                    {list.map(ch => (
                      <button key={ch.ch + ch.title} onClick={() => onPick(ch)}
                        className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition group">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition whitespace-nowrap px-1">
                            {ch.ch.replace(/Chapter\s*/i, '')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-800">{ch.title}</div>
                            {ch.concepts && (
                              <div className="text-xs text-gray-500 mt-1 line-clamp-2">{ch.concepts}</div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {Object.keys(filtered).length === 0 && search && (
                <div className="text-center py-10 text-sm text-gray-400">
                  No chapters match "{search}"
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 text-sm text-gray-400">
              No chapters available for {subject} in {grade} yet.
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-500 flex-shrink-0">
          💡 Picking a chapter grounds the AI's answer in that CBSE chapter. Pick "Any topic" for open questions.
        </div>
      </div>
    </div>
  )
}
