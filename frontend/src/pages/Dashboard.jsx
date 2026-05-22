import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ProfileModal from '../components/ProfileModal'
import TopicSelectionModal from '../components/TopicSelectionModal'

const API = import.meta.env.VITE_API_URL || ''

const SUMMARY_FORMATS = [
  { id: '1_paragraph',  icon: '📄', label: '1 Paragraph',   desc: '' },
  { id: '2_paragraphs', icon: '📄', label: '2 Paragraphs',  desc: 'default' },
  { id: '3_paragraphs', icon: '📄', label: '3 Paragraphs',  desc: '' },
  { id: '4_paragraphs', icon: '📄', label: '4 Paragraphs',  desc: '' },
  { id: '5_paragraphs', icon: '📄', label: '5 Paragraphs',  desc: '' },
  { id: 'bullets',      icon: '•',  label: 'Bullet Points', desc: '5-8 points' },
  { id: 'notes',        icon: '📝', label: 'Study Notes',   desc: 'sections + bullets' },
  { id: 'short',        icon: '⚡', label: 'Short',         desc: '2-3 sentences' },
  { id: 'medium',       icon: '📋', label: 'Medium',        desc: '5-8 sentences' },
  { id: 'long',         icon: '📚', label: 'Long',          desc: '3-4 paragraphs' },
]

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
    placeholder: 'Paste study text here, or upload a document/image above...',
  },
]

function Message({ msg, speakingId, onSpeak, msgId }) {
  const isUser = msg.role === 'user'
  const isSpeaking = speakingId === msgId
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start group`}>
      {isUser
        ? <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{msg.initials}</div>
        : <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v9h4v-5h6v5h4V7L12 2z" fill="white"/></svg>
          </div>
      }
      <div className={`max-w-[75%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
          ${isUser ? 'bg-blue-600 text-white rounded-tr-sm whitespace-pre-wrap' : 'bg-white text-gray-800 border border-blue-100 rounded-tl-sm prose prose-sm max-w-none ai-content'}`}>
          {isUser ? msg.content : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...p}) => <h1 className="text-base font-bold text-blue-700 mt-3 mb-2 first:mt-0" {...p} />,
                h2: ({node, ...p}) => <h2 className="text-sm font-bold text-blue-700 mt-3 mb-1.5 first:mt-0" {...p} />,
                h3: ({node, ...p}) => <h3 className="text-sm font-semibold text-gray-800 mt-2 mb-1 first:mt-0" {...p} />,
                p: ({node, ...p}) => <p className="my-1.5 leading-relaxed" {...p} />,
                ul: ({node, ...p}) => <ul className="list-disc list-outside ml-5 my-1.5 space-y-1" {...p} />,
                ol: ({node, ...p}) => <ol className="list-decimal list-outside ml-5 my-1.5 space-y-1" {...p} />,
                li: ({node, ...p}) => <li className="leading-relaxed" {...p} />,
                strong: ({node, ...p}) => <strong className="font-bold text-blue-700" {...p} />,
                em: ({node, ...p}) => <em className="italic text-gray-700" {...p} />,
                code: ({node, inline, ...p}) => inline
                  ? <code className="bg-blue-50 text-blue-700 px-1 py-0.5 rounded text-xs font-mono" {...p} />
                  : <code className="block bg-gray-50 text-gray-800 p-3 rounded-lg my-2 text-xs font-mono whitespace-pre overflow-x-auto border border-gray-200" {...p} />,
                pre: ({node, ...p}) => <pre className="my-2" {...p} />,
                blockquote: ({node, ...p}) => <blockquote className="border-l-4 border-blue-300 pl-3 my-2 text-gray-600 italic" {...p} />,
                table: ({node, ...p}) => <div className="overflow-x-auto my-2"><table className="border-collapse border border-gray-300 text-xs" {...p} /></div>,
                th: ({node, ...p}) => <th className="border border-gray-300 px-2 py-1 bg-blue-50 font-semibold text-blue-700" {...p} />,
                td: ({node, ...p}) => <td className="border border-gray-300 px-2 py-1" {...p} />,
                hr: () => <hr className="my-3 border-blue-100" />,
              }}
            >{msg.content}</ReactMarkdown>
          )}
        </div>
        {!isUser && (
          <button onClick={() => onSpeak(msgId, msg.content)} title={isSpeaking ? "Stop reading" : "Read aloud"}
            className={`mt-1 flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition opacity-60 group-hover:opacity-100
              ${isSpeaking ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:bg-gray-100 hover:text-blue-600'}`}>
            {isSpeaking
              ? <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
              : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            }
            {isSpeaking ? "Stop" : "Listen"}
          </button>
        )}
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
  const [curriculum, setCurriculum] = useState({})
  const [activeTool, setActiveTool] = useState('concept')
  const [subject, setSubject] = useState('')
  const [topic, setTopic] = useState(null)        // chapter object from RAG
  const [summaryFormat, setSummaryFormat] = useState('2_paragraphs')
  const [showFormatMenu, setShowFormatMenu] = useState(false)
  const [focusKeyword, setFocusKeyword] = useState('')
  const [messages, setMessages] = useState({})
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  // UI panels
  const [sidebarOpen, setSidebarOpen] = useState(false)         // CLOSED by default
  const [profileOpen, setProfileOpen] = useState(false)
  const [topicModalOpen, setTopicModalOpen] = useState(false)
  const [showSubjectMenu, setShowSubjectMenu] = useState(false)
  const [hoveredSubject, setHoveredSubject] = useState(null)
  const [initialTopic, setInitialTopic] = useState(null)
  const [showFileMenu, setShowFileMenu] = useState(false)

  const [disclaimer, setDisclaimer] = useState(null)
  const [listening, setListening] = useState(false)
  const [speakingId, setSpeakingId] = useState(null)

  const bottomRef = useRef(null)
  const textareaRef = useRef(null)
  const fileRef = useRef(null)
  const recognitionRef = useRef(null)

  // ── Load user + curriculum + chat history ─────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem('ai_tutor_user')
    if (!stored) { navigate('/'); return }
    const u = JSON.parse(stored)
    setUser(u)

    fetch(`${API}/api/curriculum`)
      .then(r => r.json())
      .then(c => setCurriculum(c))
      .catch(() => {})

    const savedChats = localStorage.getItem(`ai_tutor_chats_${u.name}`)
    if (savedChats) {
      try { setMessages(JSON.parse(savedChats)) } catch { /* corrupted */ }
    }
  }, [navigate])

  // Persist chat history
  useEffect(() => {
    if (!user || Object.keys(messages).length === 0) return
    localStorage.setItem(`ai_tutor_chats_${user.name}`, JSON.stringify(messages))
  }, [messages, user])

  // Subjects available for the current grade (grade-specific)
  const gradeSubjects = useMemo(() => {
    if (!user?.grade) return []
    return Object.keys(curriculum[user.grade] || {})
  }, [curriculum, user?.grade])

  // Auto-pick first subject when grade changes / curriculum loads
  useEffect(() => {
    if (gradeSubjects.length === 0) return
    if (!gradeSubjects.includes(subject)) {
      setSubject(gradeSubjects[0])
      setTopic(null)
    }
  }, [gradeSubjects, subject])

  // Auto-scroll
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  // Disclaimer auto-dismiss
  useEffect(() => {
    if (!disclaimer) return
    const t = setTimeout(() => setDisclaimer(null), 5000)
    return () => clearTimeout(t)
  }, [disclaimer])

  // Stop speech on unmount
  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  const currentMessages = messages[activeTool] || []
  const currentTool = TOOLS.find(t => t.id === activeTool)

  // ── Profile save ──────────────────────────────────────────────────────
  const saveProfile = (next) => {
    const updated = { ...user, ...next }
    setUser(updated)
    localStorage.setItem('ai_tutor_user', JSON.stringify(updated))
    setProfileOpen(false)
  }

  const logout = () => {
    window.speechSynthesis?.cancel()
    localStorage.removeItem('ai_tutor_user')
    navigate('/')
  }

  // ── Text-to-speech ────────────────────────────────────────────────────
  const speak = (id, text) => {
    if (!('speechSynthesis' in window)) {
      setDisclaimer("Text-to-speech is not supported in this browser.")
      return
    }
    if (speakingId === id) { window.speechSynthesis.cancel(); setSpeakingId(null); return }
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'en-IN'; utter.rate = 0.95
    utter.onend = () => setSpeakingId(null)
    utter.onerror = () => setSpeakingId(null)
    window.speechSynthesis.speak(utter)
    setSpeakingId(id)
  }

  // ── Voice input ───────────────────────────────────────────────────────
  const toggleVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { setDisclaimer("Voice input is not supported in this browser. Please use Chrome or Edge."); return }
    if (listening) { recognitionRef.current?.stop(); setListening(false); return }

    const rec = new SR()
    rec.continuous = false; rec.interimResults = true; rec.lang = 'en-IN'
    let finalT = ''
    rec.onresult = (event) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript
        if (event.results[i].isFinal) finalT += t; else interim += t
      }
      setInput((finalT + interim).trim())
    }
    rec.onerror = (e) => {
      setListening(false)
      if (e.error === 'not-allowed') setDisclaimer("Microphone access denied. Allow microphone permission in your browser.")
    }
    rec.onend = () => setListening(false)
    recognitionRef.current = rec
    rec.start()
    setListening(true)
  }

  // ── File upload ───────────────────────────────────────────────────────
  const openFilePicker = (accept) => {
    setShowFileMenu(false)
    if (fileRef.current) {
      fileRef.current.accept = accept
      fileRef.current.click()
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    const isPdf = file.name.toLowerCase().endsWith('.pdf')
    const isImage = file.type.startsWith('image/')

    if (isImage) {
      setLoading(true)
      try {
        const fd = new FormData(); fd.append('file', file)
        const res = await fetch(`${API}/api/analyze-image`, { method: 'POST', body: fd })
        const data = await res.json()
        if (!res.ok) { setDisclaimer(data.detail || "Could not analyze this image."); return }
        setInput(prev => prev + (prev ? '\n\n' : '') + `[From image: ${data.filename}]\n${data.text}`)
      } catch {
        setDisclaimer("Image upload failed. Check your connection and try again.")
      } finally { setLoading(false) }
      return
    }

    if (isPdf) {
      setLoading(true)
      try {
        const fd = new FormData(); fd.append('file', file)
        const res = await fetch(`${API}/api/upload-pdf`, { method: 'POST', body: fd })
        const data = await res.json()
        if (!res.ok) { setDisclaimer(data.detail || "Could not read this PDF."); return }
        setInput(prev => prev + (prev ? '\n\n' : '') + `[From ${data.filename} (${data.pages} pages)]\n${data.text}`)
      } catch {
        setDisclaimer("Upload failed. Check your connection and try again.")
      } finally { setLoading(false) }
      return
    }

    const reader = new FileReader()
    reader.onload = (ev) => setInput(prev => prev + (prev ? '\n\n' : '') + ev.target.result)
    reader.readAsText(file)
  }

  // ── Send message ──────────────────────────────────────────────────────
  // `apiText` is sent to the backend; `displayText` (optional) is what shows
  // in the chat bubble. When omitted, both are the same.
  const sendToBackend = async (apiText, chapter, displayText) => {
    if (loading) return
    const userMsg = { role: 'user', content: displayText || apiText, initials: user.name.charAt(0).toUpperCase() }
    setMessages(prev => ({ ...prev, [activeTool]: [...(prev[activeTool] || []), userMsg] }))
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: apiText,
          grade: user.grade,
          subject: activeTool === 'concept' ? subject : '',
          tool: activeTool,
          topic: chapter?.title || '',
          format: activeTool === 'summarizer' ? summaryFormat : 'default',
          focus: activeTool === 'summarizer' ? focusKeyword.trim() : '',
        }),
      })
      const data = await res.json()
      if (data.blocked) setDisclaimer("Inappropriate language detected. Please keep questions focused on your studies. This message will close in 5 seconds.")
      const aiMsg = { role: 'ai', content: data.response || data.detail || 'Sorry, I could not get a response.' }
      setMessages(prev => ({ ...prev, [activeTool]: [...(prev[activeTool] || []), aiMsg] }))
    } catch {
      setMessages(prev => ({ ...prev, [activeTool]: [...(prev[activeTool] || []), { role: 'ai', content: 'Connection error. Please try again.' }] }))
    } finally { setLoading(false) }
  }

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return
    sendToBackend(text, topic)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const onPickTopic = (chapter) => {
    setTopic(chapter)
    setTopicModalOpen(false)
    // Auto-explain when a chapter is picked (not for "Any topic" → chapter null)
    if (chapter && activeTool === 'concept') {
      const apiPrompt = `Please explain "${chapter.title}" from ${user.grade} ${subject} (CBSE curriculum) in detail. Cover the main concepts, give simple examples, and include any key formulas or definitions a student should learn.`
      const display = `📚 ${chapter.title}`
      sendToBackend(apiPrompt, chapter, display)
    }
  }

  const subjectChapters = (curriculum[user?.grade]?.[subject]) || []

  // Topics (units/streams) available within a subject
  const getTopicsForSubject = (subjectName) => {
    const chapters = curriculum[user?.grade]?.[subjectName] || []
    const topics = []
    const seen = new Set()
    for (const ch of chapters) {
      const key = ch.unit || ch.stream
      if (key && !seen.has(key)) { seen.add(key); topics.push(key) }
    }
    return topics
  }

  // When user picks a topic from the nested hover submenu, open chapter modal
  // directly at the chapter list (skipping topic step in the modal)
  const onPickSubjectTopic = (subjectName, topicLabel) => {
    setSubject(subjectName)
    setTopic(null)
    setInitialTopic(topicLabel)
    setShowSubjectMenu(false)
    setHoveredSubject(null)
    setTopicModalOpen(true)
  }

  if (!user) return null

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">

      {/* Red disclaimer toast */}
      {disclaimer && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]">
          <div className="bg-red-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-md border border-red-700">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-sm font-medium leading-snug">{disclaimer}</p>
            <button onClick={() => setDisclaimer(null)} className="ml-2 text-white/80 hover:text-white text-lg leading-none">✕</button>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 flex-shrink-0 shadow-sm z-20">
        {/* Tools toggle button (prominent) */}
        <button onClick={() => setSidebarOpen(p => !p)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm transition
            ${sidebarOpen ? 'bg-blue-600 text-white shadow' : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
          Tools
        </button>

        <div className="flex items-center gap-2 ml-1">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 7v9h4v-5h6v5h4V7L10 2z" fill="white"/></svg>
          </div>
          <span className="font-bold text-blue-700 text-base">AI Tutor</span>
        </div>

        <div className="flex-1" />

        {/* Profile button — clickable, opens ProfileModal */}
        <button onClick={() => setProfileOpen(true)}
          className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl hover:bg-blue-50 transition border border-transparent hover:border-blue-100">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-gray-800 leading-tight">{user.name}</div>
            <div className="text-xs text-gray-400 leading-tight">{user.grade} · {user.school}</div>
          </div>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">

        {/* Sidebar — overlay style, only shown when sidebarOpen */}
        {sidebarOpen && (
          <>
            {/* Backdrop to close on outside click */}
            <div className="absolute inset-0 bg-black/20 z-10" onClick={() => setSidebarOpen(false)} />

            <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 z-20 shadow-lg animate-in slide-in-from-left duration-200">
              <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tools</p>
                <button onClick={() => setSidebarOpen(false)} title="Close"
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              <div className="px-3 py-3 space-y-1">
                {TOOLS.map(t => (
                  <button key={t.id} onClick={() => { setActiveTool(t.id); setSidebarOpen(false) }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition
                      ${activeTool === t.id ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'}`}>
                    <span className={activeTool === t.id ? 'text-white' : 'text-blue-500'}>{t.icon}</span>
                    <div>
                      <div className="text-xs font-semibold">{t.label}</div>
                      <div className={`text-xs ${activeTool === t.id ? 'text-blue-200' : 'text-gray-400'}`}>{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-auto px-3 pb-4">
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                  <p className="text-xs font-semibold text-blue-700 mb-1">Studying</p>
                  <p className="text-xs text-gray-600">{user.grade}</p>
                  <p className="text-xs text-gray-500">{user.school}</p>
                </div>
              </div>
            </aside>
          </>
        )}

        {/* Main chat area */}
        <main className="flex-1 flex flex-col overflow-hidden">

          {/* Tool header */}
          <div className="px-6 py-3 bg-white border-b border-gray-100 flex items-center gap-3 flex-shrink-0">
            <span className="text-blue-500">{currentTool?.icon}</span>
            <div>
              <h1 className="text-sm font-bold text-gray-800">{currentTool?.label}</h1>
              <p className="text-xs text-gray-400">
                {user.grade}
                {activeTool === 'concept' && subject && ` · ${subject}`}
                {activeTool === 'concept' && topic && ` · ${topic.title}`}
              </p>
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
                    ? `Pick a subject below, then ask anything about ${user.grade} ${subject || ''}.`
                    : `📄 The AI Summarizer only works on study documents. Upload a PDF, image, or paste your notes below, then pick a format on the right.`
                  }
                </p>
              </div>
            )}

            {currentMessages.map((msg, i) => (
              <Message key={i} msg={msg} msgId={`${activeTool}-${i}`} speakingId={speakingId} onSpeak={speak} />
            ))}
            {loading && <TypingDots />}
            <div ref={bottomRef} />
          </div>

          {/* Bottom input bar — different for concept vs summarizer */}
          <div className="px-4 py-3 bg-white border-t border-gray-200 flex-shrink-0">

            {/* Summarizer focus keyword + format hover dropdown */}
            {activeTool === 'summarizer' && (
              <div className="flex items-center gap-2 mb-2 px-1 flex-wrap">
                <div className="relative flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-2 py-1 min-w-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-blue-500 flex-shrink-0">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    type="text"
                    value={focusKeyword}
                    onChange={e => setFocusKeyword(e.target.value)}
                    placeholder="Focus on keyword/tag (optional)"
                    className="bg-transparent text-xs text-blue-700 placeholder-blue-400 focus:outline-none w-40 sm:w-48"
                  />
                  {focusKeyword && (
                    <button onClick={() => setFocusKeyword('')} title="Clear focus"
                      className="text-blue-400 hover:text-red-500 text-xs flex-shrink-0">✕</button>
                  )}
                </div>
                <div className="flex-1" />
                <div className="relative"
                  onMouseEnter={() => setShowFormatMenu(true)}
                  onMouseLeave={() => setShowFormatMenu(false)}>
                  <button className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition
                    ${showFormatMenu ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}`}>
                    <span>{SUMMARY_FORMATS.find(f => f.id === summaryFormat)?.icon}</span>
                    {SUMMARY_FORMATS.find(f => f.id === summaryFormat)?.label || 'Format'}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {showFormatMenu && (
                    <div className="absolute bottom-full right-0 pb-2 z-50">
                      <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-56 max-h-80 overflow-y-auto">
                        <p className="text-[10px] text-gray-400 px-3 py-1 uppercase font-semibold sticky top-0 bg-white border-b border-gray-100">Choose summary format</p>
                        {SUMMARY_FORMATS.map(f => (
                          <button key={f.id} onClick={() => { setSummaryFormat(f.id); setShowFormatMenu(false) }}
                            className={`w-full text-left px-3 py-2 text-xs transition flex items-center gap-2
                              ${f.id === summaryFormat ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-blue-50'}`}>
                            <span className="w-4 text-center">{f.icon}</span>
                            <span className="flex-1">{f.label}</span>
                            <span className="text-[10px] text-gray-400">{f.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2 focus-within:border-blue-400 focus-within:bg-white transition">

              {/* File upload with hover menu */}
              <div className="relative flex-shrink-0 mb-0.5"
                onMouseEnter={() => setShowFileMenu(true)}
                onMouseLeave={() => setShowFileMenu(false)}>
                <button title="Attach file"
                  className={`p-1.5 transition ${showFileMenu ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'}`}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                  </svg>
                </button>
                {showFileMenu && (
                  <div className="absolute bottom-full left-0 pb-2 z-50">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-48">
                      <button onClick={() => openFilePicker('.pdf')}
                        className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 transition flex items-center gap-2">
                        <span className="text-red-500">📄</span> PDF Document
                      </button>
                      <button onClick={() => openFilePicker('image/*')}
                        className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 transition flex items-center gap-2">
                        <span className="text-green-500">🖼️</span> Picture / Image
                      </button>
                      <button onClick={() => openFilePicker('.txt,.md,.csv')}
                        className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 transition flex items-center gap-2">
                        <span className="text-blue-500">📝</span> Text File
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button onClick={() => openFilePicker('*/*')}
                        className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 transition flex items-center gap-2">
                        <span>📎</span> Any File (from computer)
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" className="hidden" onChange={handleFileUpload} />

              {/* Voice input */}
              <button onClick={toggleVoice} title={listening ? "Stop recording" : "Voice input"}
                className={`p-1.5 transition flex-shrink-0 mb-0.5 rounded-lg relative
                  ${listening ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-blue-500'}`}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
                {listening && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
              </button>

              {/* Subject selector — only for Concept Explainer (hover menu with nested topic submenu) */}
              {activeTool === 'concept' && gradeSubjects.length > 0 && (
                <div className="relative flex-shrink-0 mb-0.5"
                  onMouseEnter={() => setShowSubjectMenu(true)}
                  onMouseLeave={() => { setShowSubjectMenu(false); setHoveredSubject(null) }}>
                  <button className={`flex items-center gap-1 text-xs font-semibold px-2 py-1.5 rounded-lg transition ${showSubjectMenu ? 'bg-blue-100 text-blue-700' : 'text-blue-600 hover:bg-blue-50'}`}>
                    {subject || 'Subject'}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {showSubjectMenu && (
                    <div className="absolute bottom-full left-0 pb-2 z-50">
                      <div className="flex gap-1">

                        {/* Subjects column */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-52 max-h-80 overflow-y-auto">
                          <p className="text-[10px] text-gray-400 px-3 py-1 uppercase font-semibold sticky top-0 bg-white border-b border-gray-100">{user.grade} subjects</p>
                          {gradeSubjects.map(s => {
                            const subTopics = getTopicsForSubject(s)
                            const hasTopics = subTopics.length > 0
                            return (
                              <div key={s}
                                onMouseEnter={() => setHoveredSubject(s)}
                                className={`flex items-center justify-between transition ${hoveredSubject === s ? 'bg-blue-50' : ''}`}>
                                <button onClick={() => {
                                    setSubject(s)
                                    setTopic(null)
                                    setInitialTopic(null)
                                    setShowSubjectMenu(false)
                                    setHoveredSubject(null)
                                    setTopicModalOpen(true)
                                  }}
                                  className={`flex-1 text-left px-3 py-2 text-xs transition ${s === subject ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>
                                  {s}
                                </button>
                                {hasTopics && (
                                  <span className="pr-2 text-gray-400">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                  </span>
                                )}
                              </div>
                            )
                          })}
                        </div>

                        {/* Nested topic submenu (shows when a subject is hovered AND it has topics) */}
                        {hoveredSubject && getTopicsForSubject(hoveredSubject).length > 0 && (
                          <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-56 max-h-80 overflow-y-auto">
                            <p className="text-[10px] text-gray-400 px-3 py-1 uppercase font-semibold sticky top-0 bg-white border-b border-gray-100">{hoveredSubject} · topics</p>
                            {getTopicsForSubject(hoveredSubject).map(t => (
                              <button key={t} onClick={() => onPickSubjectTopic(hoveredSubject, t)}
                                className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition">
                                {t}
                              </button>
                            ))}
                            <div className="border-t border-gray-100 my-1"></div>
                            <button onClick={() => {
                                setSubject(hoveredSubject)
                                setTopic(null)
                                setInitialTopic(null)
                                setShowSubjectMenu(false)
                                setHoveredSubject(null)
                                setTopicModalOpen(true)
                              }}
                              className="w-full text-left px-3 py-2 text-xs text-blue-600 font-semibold hover:bg-blue-50 transition">
                              See all chapters →
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Topic chip (shows when topic picked, click to change) */}
              {activeTool === 'concept' && topic && (
                <button onClick={() => setTopicModalOpen(true)}
                  className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded-lg hover:bg-blue-200 transition flex-shrink-0 mb-0.5 max-w-[140px]">
                  <span className="truncate">{topic.title}</span>
                  <span className="text-blue-500">✕</span>
                </button>
              )}

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

            <p className="text-center text-xs text-gray-300 mt-1.5">
              {activeTool === 'concept'
                ? 'Press Enter to send · Click subject to choose a topic'
                : 'Type a topic to focus the summary, or paste/upload text · Press Enter to send'}
            </p>
          </div>
        </main>
      </div>

      {/* Modals */}
      {profileOpen && <ProfileModal user={user} onClose={() => setProfileOpen(false)} onSave={saveProfile} onLogout={logout} />}
      {topicModalOpen && (
        <TopicSelectionModal
          grade={user.grade}
          subject={subject}
          chapters={subjectChapters}
          initialTopic={initialTopic}
          onClose={() => { setTopicModalOpen(false); setInitialTopic(null) }}
          onPick={(ch) => { setInitialTopic(null); onPickTopic(ch) }}
        />
      )}
    </div>
  )
}
