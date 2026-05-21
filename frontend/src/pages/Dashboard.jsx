import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SUBJECTS = ['Maths', 'Science', 'English', 'Hindi', 'Social Science', 'General Knowledge']
const GRADES = Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`)
const API = import.meta.env.VITE_API_URL || ''

const TOOLS = [
  {
    id: 'concept',
    label: 'Concept Explainer',
    desc: 'Explain any topic clearly',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
      </svg>
    ),
    placeholder: 'Ask me to explain any concept...',
  },
  {
    id: 'summarizer',
    label: 'AI Summarizer',
    desc: 'Summarize notes or text',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
      </svg>
    ),
    placeholder: 'Paste your notes or text to summarize...',
  },
]

function Avatar({ name, size = 'md' }) {
  const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-11 h-11 text-base' }
  return (
    <div className={`${sizes[size]} rounded-full bg-blue-600 flex items-center justify-center font-bold text-white flex-shrink-0`}>
      {name?.charAt(0).toUpperCase()}
    </div>
  )
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start`}>
      {isUser
        ? <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{msg.initials}</div>
        : <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v9h4v-5h6v5h4V7L12 2z" fill="white"/></svg>
          </div>
      }
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow-sm
        ${isUser ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white text-gray-800 border border-blue-100 rounded-tl-sm'}`}>
        {msg.content}
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v9h4v-5h6v5h4V7L12 2z" fill="white"/></svg>
      </div>
      <div className="bg-white border border-blue-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [activeTool, setActiveTool] = useState('concept')
  const [subject, setSubject] = useState('Maths')
  const [grade, setGrade] = useState('')
  const [messages, setMessages] = useState({})  // keyed by toolId
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showGradeMenu, setShowGradeMenu] = useState(false)
  const [showSubjectMenu, setShowSubjectMenu] = useState(false)
  const [disclaimer, setDisclaimer] = useState(null)  // red toast message
  const [listening, setListening] = useState(false)
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)
  const fileRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    const stored = localStorage.getItem('ai_tutor_user')
    if (!stored) { navigate('/'); return }
    const u = JSON.parse(stored)
    setUser(u)
    setGrade(u.grade || 'Grade 5')
  }, [navigate])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (!disclaimer) return
    const t = setTimeout(() => setDisclaimer(null), 5000)
    return () => clearTimeout(t)
  }, [disclaimer])

  const currentMessages = messages[activeTool] || []
  const currentTool = TOOLS.find(t => t.id === activeTool)

  const toggleVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      setDisclaimer("Voice input is not supported in this browser. Please use Chrome or Edge.")
      return
    }

    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
      return
    }

    const rec = new SR()
    rec.continuous = false
    rec.interimResults = true
    rec.lang = 'en-IN'
    rec.maxAlternatives = 1

    let finalTranscript = ''

    rec.onresult = (event) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) finalTranscript += transcript
        else interim += transcript
      }
      setInput((finalTranscript + interim).trim())
    }

    rec.onerror = (e) => {
      setListening(false)
      if (e.error === 'not-allowed') {
        setDisclaimer("Microphone access denied. Please allow microphone permission in your browser.")
      }
    }

    rec.onend = () => setListening(false)

    recognitionRef.current = rec
    rec.start()
    setListening(true)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setInput(prev => prev + (prev ? '\n\n' : '') + ev.target.result)
    }
    reader.readAsText(file)
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text, initials: user.name.charAt(0).toUpperCase() }
    setMessages(prev => ({ ...prev, [activeTool]: [...(prev[activeTool] || []), userMsg] }))
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, grade, subject, tool: activeTool }),
      })
      const data = await res.json()
      if (data.blocked) {
        setDisclaimer("Inappropriate language detected. Please keep questions focused on your studies. This message will close in 5 seconds.")
      }
      const aiMsg = { role: 'ai', content: data.response || data.detail || 'Sorry, I could not get a response.' }
      setMessages(prev => ({ ...prev, [activeTool]: [...(prev[activeTool] || []), aiMsg] }))
    } catch {
      setMessages(prev => ({ ...prev, [activeTool]: [...(prev[activeTool] || []), { role: 'ai', content: 'Connection error. Please try again.' }] }))
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const logout = () => { localStorage.removeItem('ai_tutor_user'); navigate('/') }

  if (!user) return null

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">

      {/* Red disclaimer toast (auto-hides after 5s) */}
      {disclaimer && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-red-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-md border border-red-700">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-sm font-medium leading-snug">{disclaimer}</p>
            <button onClick={() => setDisclaimer(null)}
              className="ml-2 text-white/80 hover:text-white text-lg leading-none flex-shrink-0">✕</button>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 flex-shrink-0 shadow-sm z-10">
        <button onClick={() => setSidebarOpen(p => !p)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 7v9h4v-5h6v5h4V7L10 2z" fill="white"/></svg>
          </div>
          <span className="font-bold text-blue-700 text-base">AI Tutor</span>
        </div>

        <div className="flex-1" />

        {/* Grade chip */}
        <div className="relative">
          <button onClick={() => { setShowGradeMenu(p => !p); setShowSubjectMenu(false) }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200 hover:bg-blue-100 transition">
            {grade}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          {showGradeMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 w-36 max-h-60 overflow-y-auto">
              {GRADES.map(g => (
                <button key={g} onClick={() => { setGrade(g); setShowGradeMenu(false);
                  setUser(u => { const nu = {...u, grade: g}; localStorage.setItem('ai_tutor_user', JSON.stringify(nu)); return nu }) }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 transition ${g === grade ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>
                  {g}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-100">
          <Avatar name={user.name} size="sm" />
          <div className="hidden sm:block">
            <div className="text-xs font-semibold text-gray-800 leading-tight">{user.name}</div>
            <div className="text-xs text-gray-400 leading-tight">{user.school}</div>
          </div>
          <button onClick={logout} title="Log out"
            className="ml-1 p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-56 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
            <div className="px-3 pt-4 pb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Tools</p>
              <div className="space-y-1">
                {TOOLS.map(t => (
                  <button key={t.id} onClick={() => setActiveTool(t.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition
                      ${activeTool === t.id ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'}`}>
                    <span className={activeTool === t.id ? 'text-white' : 'text-blue-500'}>{t.icon}</span>
                    <div>
                      <div className="text-xs font-semibold">{t.label}</div>
                      <div className={`text-xs ${activeTool === t.id ? 'text-blue-200' : 'text-gray-400'}`}>{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto px-3 pb-4">
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                <p className="text-xs font-semibold text-blue-700 mb-1">Studying</p>
                <p className="text-xs text-gray-600">{grade}</p>
                <p className="text-xs text-gray-500">{user.school}</p>
              </div>
            </div>
          </aside>
        )}

        {/* Main chat area */}
        <main className="flex-1 flex flex-col overflow-hidden">

          {/* Tool header */}
          <div className="px-6 py-3 bg-white border-b border-gray-100 flex items-center gap-3 flex-shrink-0">
            <span className="text-blue-500">{currentTool?.icon}</span>
            <div>
              <h1 className="text-sm font-bold text-gray-800">{currentTool?.label}</h1>
              <p className="text-xs text-gray-400">{grade} · {subject}</p>
            </div>
            {currentMessages.length > 0 && (
              <button onClick={() => setMessages(p => ({ ...p, [activeTool]: [] }))}
                className="ml-auto text-xs text-gray-400 hover:text-red-500 transition px-2 py-1 rounded-lg hover:bg-red-50">
                Clear chat
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            {currentMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center pb-10">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-blue-500 scale-150">{currentTool?.icon}</span>
                </div>
                <h2 className="text-base font-bold text-gray-700 mb-1">{currentTool?.label}</h2>
                <p className="text-sm text-gray-400 max-w-xs">
                  {activeTool === 'concept'
                    ? `Ask me to explain any ${subject} concept for ${grade}. I'll make it easy to understand!`
                    : `Paste your notes or text below and I'll create a clear summary for ${grade}.`
                  }
                </p>
                <div className="mt-5 flex flex-wrap gap-2 justify-center max-w-sm">
                  {(activeTool === 'concept'
                    ? [`What is ${subject === 'Maths' ? 'addition' : subject === 'Science' ? 'photosynthesis' : subject === 'English' ? 'a noun' : 'a vowel'}?`, 'Explain with an example', 'Give me a simple definition']
                    : ['Summarize my notes', 'Make it shorter', 'List the key points']
                  ).map(s => (
                    <button key={s} onClick={() => setInput(s)}
                      className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-100 transition">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentMessages.map((msg, i) => <Message key={i} msg={msg} />)}
            {loading && <TypingDots />}
            <div ref={bottomRef} />
          </div>

          {/* Bottom input bar */}
          <div className="px-4 py-3 bg-white border-t border-gray-200 flex-shrink-0">
            <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2 focus-within:border-blue-400 focus-within:bg-white transition">

              {/* File upload */}
              <button onClick={() => fileRef.current?.click()} title="Upload file"
                className="p-1.5 text-gray-400 hover:text-blue-500 transition flex-shrink-0 mb-0.5">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
              </button>
              <input ref={fileRef} type="file" accept=".txt,.pdf" className="hidden" onChange={handleFileUpload} />

              {/* Voice input (mic) */}
              <button onClick={toggleVoice} title={listening ? "Stop recording" : "Voice input"}
                className={`p-1.5 transition flex-shrink-0 mb-0.5 rounded-lg relative
                  ${listening ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-blue-500'}`}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
                {listening && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>

              {/* Subject selector */}
              <div className="relative flex-shrink-0 mb-0.5">
                <button onClick={() => { setShowSubjectMenu(p => !p); setShowGradeMenu(false) }}
                  className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:bg-blue-50 px-2 py-1.5 rounded-lg transition">
                  {subject}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {showSubjectMenu && (
                  <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 w-40">
                    {SUBJECTS.map(s => (
                      <button key={s} onClick={() => { setSubject(s); setShowSubjectMenu(false) }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 transition ${s === subject ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Text input */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={currentTool?.placeholder}
                rows={1}
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none max-h-32 py-1"
                style={{ lineHeight: '1.5' }}
                onInput={e => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px' }}
              />

              {/* Send button */}
              <button onClick={sendMessage} disabled={!input.trim() || loading}
                className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex-shrink-0 mb-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <p className="text-center text-xs text-gray-300 mt-1.5">Press Enter to send · Shift+Enter for new line</p>
          </div>
        </main>
      </div>

      {/* Close dropdowns on outside click */}
      {(showGradeMenu || showSubjectMenu) && (
        <div className="fixed inset-0 z-40" onClick={() => { setShowGradeMenu(false); setShowSubjectMenu(false) }} />
      )}
    </div>
  )
}
