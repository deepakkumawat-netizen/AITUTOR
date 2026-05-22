export default function TopicSelectionModal({ grade, subject, chapters, onClose, onPick }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-white">Choose a topic</h2>
            <p className="text-blue-200 text-xs">{grade} · {subject} — pick a chapter to focus on</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white">✕</button>
        </div>

        {/* Topics list */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {chapters?.length > 0 ? (
            <div className="space-y-2">
              <button onClick={() => onPick(null)}
                className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition">
                <div className="font-semibold text-sm text-gray-800">Any topic</div>
                <div className="text-xs text-gray-500 mt-0.5">Don't focus on a specific chapter</div>
              </button>

              {chapters.map(ch => (
                <button key={ch.ch} onClick={() => onPick(ch)}
                  className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition group">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                      {ch.ch}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-800">{ch.title}</div>
                      {ch.unit && <div className="text-xs text-blue-600 mt-0.5">Unit: {ch.unit}</div>}
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{ch.concepts}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-sm text-gray-400">
              No chapters available for {subject} in {grade} yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
