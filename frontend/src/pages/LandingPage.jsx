import { useState } from 'react'
import SignUpModal from '../components/SignUpModal'
import LoginModal from '../components/LoginModal'

export default function LandingPage() {
  const [modal, setModal] = useState(null) // 'signup' | 'login' | null

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-blue-100 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 7v9h4v-5h6v5h4V7L10 2z" fill="white" />
            </svg>
          </div>
          <span className="text-xl font-bold text-blue-700">AI Tutor</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setModal('login')}
            className="px-5 py-2 text-blue-600 font-semibold rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-sm"
          >
            Log In
          </button>
          <button
            onClick={() => setModal('signup')}
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm shadow"
          >
            Sign Up Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              CBSE Curriculum · Grades 1–12
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
              Your Personal
              <span className="text-blue-600"> AI Tutor</span>
              <br />for Every Subject
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Get instant explanations, summaries, and concept breakdowns tailored to your grade level — powered by AI and aligned to the CBSE curriculum.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setModal('signup')}
                className="px-7 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 text-base"
              >
                Get Started Free →
              </button>
              <button
                onClick={() => setModal('login')}
                className="px-7 py-3.5 text-blue-700 font-bold rounded-xl border-2 border-blue-200 hover:bg-blue-50 transition-all text-base"
              >
                Log In
              </button>
            </div>
            <div className="flex items-center gap-6 mt-8">
              {['Grade 1–12', 'Maths, Science, English', 'Hindi & More'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#dbeafe" />
                    <path d="M5 8l2 2 4-4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Illustration 1 – Laptop */}
          <div className="flex-1 flex flex-col gap-6 items-center">
            <div className="relative">
              <div className="w-72 lg:w-80 bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
                {/* Laptop screen mockup */}
                <div className="bg-blue-700 px-4 py-3 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  <div className="ml-3 flex-1 bg-blue-600 rounded px-2 py-0.5 text-xs text-blue-200">ai-tutor.app</div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-bold">AI</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Concept Explainer</span>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 mb-3 text-xs text-gray-600 leading-relaxed">
                    <span className="text-blue-600 font-semibold">Q: </span>What is photosynthesis?
                  </div>
                  <div className="bg-white border border-blue-100 rounded-xl p-3 text-xs text-gray-700 leading-relaxed">
                    <span className="text-green-600 font-semibold">AI: </span>
                    Photosynthesis is how plants make their own food using sunlight, water, and carbon dioxide. It happens in the leaves inside tiny green parts called chloroplasts...
                  </div>
                  <div className="mt-3 flex gap-2">
                    <div className="flex-1 bg-blue-50 rounded-lg px-2 py-1.5 text-xs text-gray-400">Ask a question...</div>
                    <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 6h10M7 2l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative laptop base */}
              <div className="mx-4 h-3 bg-blue-200 rounded-b-xl shadow-sm"></div>
              <div className="mx-2 h-1.5 bg-blue-100 rounded-b-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / How it works */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
            Everything you need to learn smarter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="3" fill="#dbeafe" />
                    <path d="M8 12h8M8 8h5M8 16h6" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                ),
                title: 'Concept Explainer',
                desc: 'Get clear, grade-appropriate explanations for any topic in your CBSE syllabus — Maths, Science, English, Hindi and more.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="3" fill="#dbeafe" />
                    <path d="M7 8h10M7 12h7M7 16h9" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M17 14l2 2-2 2" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'AI Summarizer',
                desc: 'Upload your notes or paste text and get instant concise summaries perfectly matched to your grade level.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="3" fill="#dbeafe" />
                    <circle cx="12" cy="11" r="3" stroke="#2563eb" strokeWidth="1.8" />
                    <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: 'Grade-Aware AI',
                desc: 'AI that adjusts its language and depth for Grade 1 all the way to Grade 12 — no overly complex answers, ever.'
              }
            ].map(f => (
              <div key={f.title} className="bg-blue-50 rounded-2xl p-6 border border-blue-100 hover:shadow-md transition-shadow">
                <div className="mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Computer illustration section */}
      <section className="py-16 px-8 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Desktop monitor mockup */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-64 lg:w-72 bg-white rounded-2xl shadow-2xl border-4 border-blue-900 overflow-hidden">
                <div className="bg-gray-900 px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-2 text-gray-400 text-xs">AI Summarizer</div>
                </div>
                <div className="p-4 bg-gradient-to-b from-blue-50 to-white min-h-[160px]">
                  <div className="text-xs font-semibold text-blue-600 mb-2">Summary · Grade 6 · Science</div>
                  <div className="space-y-1.5">
                    {['• Water cycle involves evaporation, condensation & precipitation', '• Plants release water vapour through transpiration', '• Clouds form when water vapour cools at high altitude'].map(l => (
                      <div key={l} className="text-xs text-gray-700 leading-relaxed">{l}</div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-1 flex-wrap">
                    {['Evaporation', 'Condensation', 'Precipitation'].map(tag => (
                      <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mx-auto mt-0 w-16 h-3 bg-blue-900 rounded-b-md"></div>
              <div className="mx-auto w-24 h-2 bg-blue-950 rounded-b-md"></div>
            </div>
          </div>

          <div className="flex-1 text-white text-left">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Learn at your own pace, <br />any subject, any grade
            </h2>
            <p className="text-blue-200 text-base leading-relaxed mb-6">
              Whether you're in Grade 1 just starting out or in Grade 12 preparing for board exams, AI Tutor adapts to your level and helps you understand concepts clearly — in the way that works for you.
            </p>
            <button
              onClick={() => setModal('signup')}
              className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start Learning Today →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-8 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 7v9h4v-5h6v5h4V7L10 2z" fill="white" />
            </svg>
          </div>
          <span className="text-white font-semibold">AI Tutor</span>
        </div>
        <p>© 2025 AI Tutor. CBSE-aligned learning for every student.</p>
      </footer>

      {/* Modals */}
      {modal === 'signup' && <SignUpModal onClose={() => setModal(null)} onSwitchLogin={() => setModal('login')} />}
      {modal === 'login' && <LoginModal onClose={() => setModal(null)} onSwitchSignup={() => setModal('signup')} />}
    </div>
  )
}
