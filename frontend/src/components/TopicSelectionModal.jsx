import { useMemo, useState } from 'react'

export default function TopicSelectionModal({ grade, subject, chapters, initialTopic, onClose, onPick }) {
  // ── Group chapters by their unit/stream/module ──
  const { groups, groupOrder, hasGrouping } = useMemo(() => {
    const g = {}
    const order = []
    let hasGroup = false
    for (const ch of chapters || []) {
      const key = ch.unit || ch.stream || '__flat__'
      if (key !== '__flat__') hasGroup = true
      if (!g[key]) { g[key] = []; order.push(key) }
      g[key].push(ch)
    }
    return { groups: g, groupOrder: order, hasGrouping: hasGroup }
  }, [chapters])

  // For flat subjects, skip the topic step. If initialTopic is provided (user
  // already picked it from the nested hover submenu), jump straight to chapter step.
  const [step, setStep] = useState(initialTopic ? 'chapter' : (hasGrouping ? 'topic' : 'chapter'))
  const [selectedTopic, setSelectedTopic] = useState(
    initialTopic || (hasGrouping ? null : '__flat__')
  )
  const [search, setSearch] = useState('')

  const currentChapters = selectedTopic ? (groups[selectedTopic] || []) : []

  const filteredTopics = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return groupOrder
    return groupOrder.filter(t =>
      t.toLowerCase().includes(q) ||
      (groups[t] || []).some(ch => ch.title?.toLowerCase().includes(q))
    )
  }, [search, groupOrder, groups])

  const filteredChapters = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return currentChapters
    return currentChapters.filter(ch =>
      ch.title?.toLowerCase().includes(q) || ch.concepts?.toLowerCase().includes(q)
    )
  }, [search, currentChapters])

  const goBackToTopics = () => {
    setStep('topic')
    setSelectedTopic(null)
    setSearch('')
  }

  const pickTopic = (topic) => {
    setSelectedTopic(topic)
    setStep('chapter')
    setSearch('')
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {step === 'chapter' && hasGrouping && (
              <button onClick={goBackToTopics} title="Back to topics"
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
            )}
            <div className="min-w-0">
              <h2 className="text-base font-bold text-white truncate">
                {step === 'topic' ? 'Choose a topic' : 'Choose a chapter'}
              </h2>
              <p className="text-blue-200 text-xs truncate">
                {grade} · {subject}
                {step === 'chapter' && selectedTopic && selectedTopic !== '__flat__' && ` · ${selectedTopic}`}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white flex-shrink-0">✕</button>
        </div>

        {/* Stepper indicator (only when there are topics) */}
        {hasGrouping && (
          <div className="px-5 py-2 bg-blue-50 border-b border-blue-100 flex items-center gap-2 text-xs flex-shrink-0">
            <div className={`flex items-center gap-1.5 ${step === 'topic' ? 'text-blue-700 font-bold' : 'text-blue-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step === 'topic' ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-700'}`}>1</span>
              Topic / Unit
            </div>
            <div className="flex-1 h-px bg-blue-200" />
            <div className={`flex items-center gap-1.5 ${step === 'chapter' ? 'text-blue-700 font-bold' : 'text-gray-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step === 'chapter' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</span>
              Chapter
            </div>
          </div>
        )}

        {/* Search */}
        <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={step === 'topic' ? 'Search topics...' : 'Search chapters...'}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              autoFocus
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-3">

          {/* "Any topic" option — always at top of step 1 (or step 2 if no grouping) */}
          {(step === 'topic' || !hasGrouping) && (
            <button onClick={() => onPick(null)}
              className="w-full text-left px-4 py-3 mb-3 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 transition">
              <div className="font-semibold text-sm text-blue-700">✨ Any topic / Open question</div>
              <div className="text-xs text-blue-600 mt-0.5">Ask anything in {subject} — I'll handle it</div>
            </button>
          )}

          {/* STEP 1: TOPIC LIST */}
          {step === 'topic' && (
            <div className="space-y-2">
              {filteredTopics.map(t => (
                <button key={t} onClick={() => pickTopic(t)}
                  className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition group flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                    📚
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-800">{t}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {(groups[t] || []).length} chapter{(groups[t] || []).length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 group-hover:text-blue-500 flex-shrink-0"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              ))}
              {filteredTopics.length === 0 && (
                <div className="text-center py-8 text-sm text-gray-400">No topics match "{search}"</div>
              )}
            </div>
          )}

          {/* STEP 2: CHAPTER LIST */}
          {step === 'chapter' && (
            <div className="space-y-2">
              {filteredChapters.map(ch => (
                <button key={ch.ch + ch.title} onClick={() => onPick(ch)}
                  className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition group">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition whitespace-nowrap px-2 py-1.5">
                      {ch.ch.replace(/Chapter\s*/i, '').replace(/Module\s*/i, 'M').replace(/Unit\s*/i, 'U').replace(/Theme\s*/i, 'T') || ch.ch}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-800">{ch.title}</div>
                      {ch.concepts && <div className="text-xs text-gray-500 mt-1 line-clamp-2">{ch.concepts}</div>}
                    </div>
                  </div>
                </button>
              ))}
              {filteredChapters.length === 0 && (
                <div className="text-center py-8 text-sm text-gray-400">No chapters match "{search}"</div>
              )}
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-500 flex-shrink-0">
          {step === 'topic' ? '👆 Pick a topic to see its chapters' : '💡 Pick a chapter and the AI will explain it instantly'}
        </div>
      </div>
    </div>
  )
}
