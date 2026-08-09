import { useState, useEffect } from 'react'
import ConstellationBackground from './components/ConstellationBackground'

function App() {
  const [mode, setMode] = useState('on-duty')

  useEffect(() => {
    const saved = localStorage.getItem('mode')
    if (saved === 'off-duty') setMode('off-duty')
  }, [])

  const toggle = () => {
    const newMode = mode === 'on-duty' ? 'off-duty' : 'on-duty'
    setMode(newMode)
    localStorage.setItem('mode', newMode)
  }

  const isOnDuty = mode === 'on-duty'

  return (
    <div className={`min-h-screen transition-all duration-700 ${isOnDuty ? 'bg-slate-950 text-white' : 'text-white'}`}>
      {/* Background Images */}
      <div className="fixed inset-0 z-0 transition-opacity duration-1000">
        {isOnDuty ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
        ) : (
          <img 
            src="/images/phuket-resort.png" 
            alt="Phuket Resort" 
            className="w-full h-full object-cover"
          />
        )}
        {/* Overlay for readability */}
        <div className={`absolute inset-0 ${isOnDuty ? 'bg-black/40' : 'bg-black/50'}`} />
      </div>

      {/* Canvas Constellation/Rainbow Background */}
      <ConstellationBackground isOnDuty={isOnDuty} />

      {/* Mode Toggle */}
      <button
        onClick={toggle}
        className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-full font-bold text-sm shadow-2xl transition-all transform hover:scale-105 backdrop-blur-md border ${
          isOnDuty
            ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            : 'bg-white/20 border-white/40 text-white hover:bg-white/30'
        }`}
      >
        {isOnDuty ? '👔 On Duty' : '🏖️ Off Duty'}
      </button>

      {/* Hero Section */}
      <header className="relative max-w-5xl mx-auto px-6 py-24 text-center z-10">
        <div className={`w-44 h-44 mx-auto mb-8 rounded-full border-4 shadow-2xl overflow-hidden ${isOnDuty ? 'border-blue-400 shadow-blue-500/30' : 'border-orange-300 shadow-orange-500/30'}`}>
          <img src="/images/profile.png" alt="Eddy" className="w-full h-full object-cover" />
        </div>

        <h1 className="text-6xl font-black mb-4 text-white drop-shadow-lg">
          Eddy
        </h1>

        <p className={`text-2xl font-light mb-3 ${isOnDuty ? 'text-blue-200' : 'text-orange-100'}`}>
          {isOnDuty ? 'Senior Software Engineer' : 'Explorer · Foodie · Lifelong Learner'}
        </p>

        <p className={`text-lg ${isOnDuty ? 'text-slate-400' : 'text-orange-200/80'}`}>
          Singapore 🇸🇬
        </p>

        <div className={`inline-block mt-6 px-5 py-2 rounded-full text-sm font-medium ${isOnDuty ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-orange-500/30 text-orange-100 border border-orange-400/50'}`}>
          {isOnDuty ? '🟢 Available for work' : '🌴 Currently exploring'}
        </div>

        {/* Intro Video */}
        <div className="mt-8 max-w-3xl mx-auto">
          <video
            id="intro-video"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="auto"
            width="100%"
            height="auto"
            style={{ 
              display: 'block',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: `1px solid ${isOnDuty ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)'}`,
              minHeight: '320px',
              backgroundColor: 'black',
            }}
            poster="/images/intro-video.png"
          >
            <source src="/videos/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag. 
            <br />
            <a href="/videos/intro.mp4" download style={{ color: '#60a5fa' }}>Download the video</a>
          </video>
        </div>

      {isOnDuty ? (
        <main className="relative max-w-5xl mx-auto px-6 pb-20 z-10">
          {/* Stats */}
          <section className="grid grid-cols-3 gap-6 mb-16">
            {[
              { num: '5+', label: 'Years Exp', icon: '⚡' },
              { num: '20+', label: 'Projects', icon: '🚀' },
              { num: '3', label: 'Countries', icon: '🌍' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-6 text-center backdrop-blur-md bg-white/5 border border-white/10 transition-all hover:scale-105 hover:shadow-xl hover:border-blue-400/30">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-4xl font-bold">{s.num}</div>
                <div className="text-sm mt-1 text-slate-400">{s.label}</div>
              </div>
            ))}
          </section>

          {/* Experience */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-blue-500/20">💼</span>
              Experience
            </h2>
            <div className="space-y-4">
              <div className="rounded-2xl p-6 backdrop-blur-md bg-white/5 border border-white/10 transition-all hover:scale-[1.02]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">Senior Software Engineer</h3>
                    <p className="text-sm text-blue-300">Freelance · Remote</p>
                  </div>
                  <span className="text-sm text-slate-400">2022 - Present</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Full-stack development, DeFi protocols, trading bots, browser automation with React, Python, cloud infrastructure.
                </p>
              </div>
              <div className="rounded-2xl p-6 backdrop-blur-md bg-white/5 border border-white/10 transition-all hover:scale-[1.02]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">Full Stack Developer</h3>
                    <p className="text-sm text-blue-300">Various Companies</p>
                  </div>
                  <span className="text-sm text-slate-400">2019 - 2022</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  React, Node.js, Python, PostgreSQL. Built MVPs, maintained systems, led teams.
                </p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-blue-500/20">⚡</span>
              Tech Stack
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {['React', 'Next.js', 'TypeScript', 'Python', 'Flask', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Supabase', 'Playwright', 'Vercel'].map(t => (
                <div key={t} className="rounded-xl p-4 text-center text-sm font-medium backdrop-blur-md bg-white/5 border border-white/10 transition-all hover:scale-105">{t}</div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-blue-500/20">🚀</span>
              Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'Price Tracker', desc: 'Price monitoring', icon: '📊', url: 'https://price-tracker-six-xi.vercel.app' },
                { name: 'Social Bot', desc: 'Browser automation', icon: '🤖', url: 'https://github.com/Kytosyn/social-media-automation' },
                { name: 'Telegram Archive', desc: 'Message backup', icon: '💬', url: 'https://github.com/Kytosyn/telegram-archive' },
                { name: 'PDF Toolkit', desc: 'ilovepdf alt', icon: '📄', url: 'https://pdf-toolkit-six-peach.vercel.app' },
              ].map(p => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl p-5 backdrop-blur-md bg-white/5 border border-white/10 transition-all hover:scale-[1.02] group block">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{p.icon}</span>
                    <div>
                      <h3 className="font-bold">{p.name}</h3>
                      <p className="text-sm text-slate-400">{p.desc}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-blue-500/20">📬</span>
              Contact
            </h2>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.linkedin.com/in/kytosyn/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105">💼 LinkedIn</a>
              <a href="https://github.com/Kytosyn" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105">🐙 GitHub</a>
              <a href="mailto:kytosyn@gmail.com" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105">✉️ Email</a>
            </div>
          </section>
        </main>
      ) : (
        <main className="relative max-w-5xl mx-auto px-6 pb-20 z-10">
          {/* Stats */}
          <section className="grid grid-cols-3 gap-6 mb-16">
            {[
              { num: '15+', label: 'Countries', icon: '✈️' },
              { num: '∞', label: 'Coffee', icon: '☕' },
              { num: '50+', label: 'Dishes', icon: '🍜' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-6 text-center backdrop-blur-md bg-black/30 border border-white/20 transition-all hover:scale-105">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-4xl font-bold">{s.num}</div>
                <div className="text-sm mt-1 text-orange-200/80">{s.label}</div>
              </div>
            ))}
          </section>

          {/* Travel */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-orange-500/20">✈️</span>
              Travel Adventures
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { place: 'Phuket, Thailand', emoji: '🇹🇭', desc: 'Beaches, islands, infinity pools' },
                { place: 'Tokyo, Japan', emoji: '🇯🇵', desc: 'Cherry blossoms, ramen, neon streets' },
                { place: 'Barcelona, Spain', emoji: '🇪🇸', desc: 'Gaudí, beach sunsets, tapas' },
                { place: 'Reykjavik, Iceland', emoji: '🇮🇸', desc: 'Northern lights, hot springs' },
              ].map(d => (
                <div key={d.place} className="rounded-2xl p-5 backdrop-blur-md bg-black/30 border border-white/20 transition-all hover:scale-[1.02]">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{d.emoji}</span>
                    <div>
                      <h3 className="font-bold">{d.place}</h3>
                      <p className="text-sm text-orange-200/80 mt-1">{d.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Food */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-orange-500/20">🍜</span>
              Food & Flavors
            </h2>
            <div className="rounded-2xl p-8 backdrop-blur-md bg-black/30 border border-white/20">
              <p className="text-lg leading-relaxed text-white/90">
                📍 <strong>Singapore</strong> — Laksa, Hainanese chicken rice, Chili crab, Satay, Kaya toast
              </p>
              <p className="text-lg leading-relaxed text-white/90 mt-4">
                🏆 <strong>Top 3:</strong> Tonkotsu ramen (Tokyo), Paella (Barcelona), Nasi lemak (KL)
              </p>
              <p className="text-lg leading-relaxed text-white/90 mt-4">
                ☕ <strong>Coffee:</strong> Flat white person. Always hunting third-wave cafes.
              </p>
            </div>
          </section>

          {/* Lifestyle */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-orange-500/20">🎮</span>
              Beyond the Screen
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Gym', icon: '💪' },
                { name: 'Cycling', icon: '🚴' },
                { name: 'Gaming', icon: '🎮' },
                { name: 'Photo', icon: '📸' },
                { name: 'Coffee', icon: '☕' },
                { name: 'Podcasts', icon: '🎧' },
              ].map(h => (
                <div key={h.name} className="rounded-xl p-5 text-center backdrop-blur-md bg-black/30 border border-white/20 transition-all hover:scale-105">
                  <span className="text-3xl">{h.icon}</span>
                  <div className="font-medium mt-2 text-sm">{h.name}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Social */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-orange-500/20">📱</span>
              Social
            </h2>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105">📷 Instagram</a>
              <a href="#" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105">𝕏 Twitter</a>
            </div>
          </section>
        </main>
      )}

      <footer className="text-center py-12 text-sm text-white/50 border-t border-white/10 relative z-10">
        <p>Engineer Off Duty © 2026</p>
        <p className="mt-2">Built with React + Tailwind · Deployed on Vercel</p>
      </footer>
    </div>
  )
}

export default App
