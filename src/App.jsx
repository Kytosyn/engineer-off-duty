import { useState, useEffect, useRef } from 'react'
import ConstellationBackground from './components/ConstellationBackground'

function VideoPlayer({ src, poster, isOnDuty }) {
  const videoRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setLoading(false)
      video.play().catch(() => {
        // Auto-play blocked, show controls
      })
    }

    const handleError = () => {
      setError(true)
      setLoading(false)
    }

    const handleLoadStart = () => setLoading(true)

    video.addEventListener('canplaythrough', handleCanPlay)
    video.addEventListener('error', handleError)
    video.addEventListener('loadstart', handleLoadStart)

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay)
      video.removeEventListener('error', handleError)
      video.removeEventListener('loadstart', handleLoadStart)
    }
  }, [src])

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
      {/* Loading overlay */}
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-white/60">Loading video...</p>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="text-center p-6">
            <div className="text-4xl mb-3">🎬</div>
            <p className="text-white/80 text-sm">Video unavailable</p>
            <a href={src} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-xs underline mt-2 inline-block">
              Download instead
            </a>
          </div>
        </div>
      )}

      {/* Poster image (shown until video loads) */}
      {loading && poster && (
        <img
          src={poster}
        alt="Video poster"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        className="w-full h-full object-cover"
        style={{ display: error ? 'none' : 'block' }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

function App() {
  const [mode, setMode] = useState('on-duty')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('mode')
    if (saved === 'off-duty') setMode('off-duty')
    
    const preloader = document.getElementById('preloader')
    if (preloader) {
      setTimeout(() => preloader.classList.add('hidden'), 800)
    }
    setLoaded(true)
  }, [])

  const toggle = () => {
    const newMode = mode === 'on-duty' ? 'off-duty' : 'on-duty'
    setMode(newMode)
    localStorage.setItem('mode', newMode)
  }

  const isOnDuty = mode === 'on-duty'

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-400 text-sm tracking-widest uppercase">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-all duration-700 ${isOnDuty ? 'bg-slate-950 text-white' : 'text-white'}`}>
      <div className="fixed inset-0 z-0 transition-opacity duration-1000">
        {isOnDuty ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
        ) : (
          <img src="/images/phuket-resort.png" alt="Phuket Resort" className="w-full h-full object-cover" />
        )}
        <div className={`absolute inset-0 ${isOnDuty ? 'bg-black/40' : 'bg-black/50'}`} />
      </div>

      <ConstellationBackground isOnDuty={isOnDuty} />

      <button
        onClick={toggle}
        className="fixed top-6 right-6 z-50 px-6 py-3 rounded-full font-bold text-sm shadow-2xl transition-all transform hover:scale-105 backdrop-blur-md border bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        {isOnDuty ? '👔 On Duty' : '🏖️ Off Duty'}
      </button>

      <header className="relative max-w-5xl mx-auto px-6 py-20 text-center z-10">
        <div className={`w-40 h-40 mx-auto mb-6 rounded-full border-4 shadow-2xl overflow-hidden ${isOnDuty ? 'border-blue-400 shadow-blue-500/30' : 'border-orange-300 shadow-orange-500/30'}`}>
          <img src="/images/profile.png" alt="Eddy" className="w-full h-full object-cover" />
        </div>

        <h1 className="text-6xl font-black mb-3 drop-shadow-lg">Eddy</h1>

        <p className={`text-2xl font-light mb-2 ${isOnDuty ? 'text-blue-200' : 'text-orange-100'}`}>
          {isOnDuty ? 'Senior Software Engineer' : 'Explorer · Foodie · Lifelong Learner'}
        </p>

        <p className={`text-base ${isOnDuty ? 'text-slate-400' : 'text-orange-200/80'}`}>
          Singapore 🇸🇬
        </p>

        <div className={`inline-block mt-4 px-4 py-1.5 rounded-full text-sm font-medium ${isOnDuty ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-orange-500/30 text-orange-100 border border-orange-400/50'}`}>
          {isOnDuty ? '🟢 Available for work' : '🌴 Currently exploring'}
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <VideoPlayer
            src="/videos/intro.mp4"
            poster="/images/intro-video.png"
            isOnDuty={isOnDuty}
          />
        </div>
      </header>

      {isOnDuty ? (
        <main className="relative max-w-5xl mx-auto px-6 pb-16 z-10">
          <section className="grid grid-cols-3 gap-4 mb-12">
            {[
              { num: '5+', label: 'Years Exp' },
              { num: '20+', label: 'Projects' },
              { num: '3', label: 'Countries' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-5 text-center backdrop-blur-md bg-white/5 border border-white/10 transition-all hover:scale-105">
                <div className="text-3xl font-bold">{s.num}</div>
                <div className="text-xs mt-1 text-slate-400">{s.label}</div>
              </div>
            ))}
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">💼 Experience</h2>
            <div className="space-y-3">
              <div className="rounded-xl p-5 backdrop-blur-md bg-white/5 border border-white/10">
                <div className="flex justify-between items-start">
                  <div><h3 className="font-bold">Senior Software Engineer</h3><p className="text-sm text-blue-300">Freelance · Remote</p></div>
                  <span className="text-sm text-slate-400">2022 - Present</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">Full-stack development, DeFi protocols, trading bots, browser automation.</p>
              </div>
              <div className="rounded-xl p-5 backdrop-blur-md bg-white/5 border border-white/10">
                <div className="flex justify-between items-start">
                  <div><h3 className="font-bold">Full Stack Developer</h3><p className="text-sm text-blue-300">Various Companies</p></div>
                  <span className="text-sm text-slate-400">2019 - 2022</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">React, Node.js, Python, PostgreSQL. Built MVPs, maintained systems.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">⚡ Tech Stack</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {['React', 'Next.js', 'TypeScript', 'Python', 'Flask', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Supabase', 'Playwright', 'Vercel'].map(t => (
                <div key={t} className="rounded-lg p-3 text-center text-sm font-medium backdrop-blur-md bg-white/5 border border-white/10">{t}</div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🚀 Projects</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { name: 'Price Tracker', icon: '📊', url: 'https://price-tracker-six-xi.vercel.app' },
                { name: 'Social Bot', icon: '🤖', url: 'https://github.com/Kytosyn/social-media-automation' },
                { name: 'Telegram Archive', icon: '💬', url: 'https://github.com/Kytosyn/telegram-archive' },
                { name: 'PDF Toolkit', icon: '📄', url: 'https://pdf-toolkit-six-peach.vercel.app' },
              ].map(p => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="rounded-xl p-4 backdrop-blur-md bg-white/5 border border-white/10 transition-all hover:scale-[1.02] block">
                  <div className="flex items-center gap-3"><span className="text-2xl">{p.icon}</span><h3 className="font-bold text-sm">{p.name}</h3></div>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📬 Contact</h2>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.linkedin.com/in/kytosyn/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium">💼 LinkedIn</a>
              <a href="https://github.com/Kytosyn" target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-medium">🐙 GitHub</a>
              <a href="mailto:kytosyn@gmail.com" className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium">✉️ Email</a>
            </div>
          </section>
        </main>
      ) : (
        <main className="relative max-w-5xl mx-auto px-6 pb-16 z-10">
          <section className="grid grid-cols-3 gap-4 mb-12">
            {[
              { num: '15+', label: 'Countries' },
              { num: '∞', label: 'Coffee' },
              { num: '50+', label: 'Dishes' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-5 text-center backdrop-blur-md bg-black/30 border border-white/20">
                <div className="text-3xl font-bold">{s.num}</div>
                <div className="text-xs mt-1 text-orange-200/80">{s.label}</div>
              </div>
            ))}
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">✈️ Travel</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { place: 'Phuket, Thailand', emoji: '🇹🇭' },
                { place: 'Tokyo, Japan', emoji: '🇯🇵' },
                { place: 'Barcelona, Spain', emoji: '🇪🇸' },
                { place: 'Singapore', emoji: '🇸🇬' },
              ].map(d => (
                <div key={d.place} className="rounded-xl p-4 backdrop-blur-md bg-black/30 border border-white/20 flex items-center gap-3">
                  <span className="text-3xl">{d.emoji}</span><h3 className="font-bold text-sm">{d.place}</h3>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🍜 Food</h2>
            <div className="rounded-xl p-6 backdrop-blur-md bg-black/30 border border-white/20">
              <p className="text-sm text-white/90">📍 Singapore — Laksa, Hainanese chicken rice, Chili crab</p>
              <p className="text-sm text-white/90 mt-2">🏆 Top 3: Tonkotsu ramen, Paella, Nasi lemak</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🎮 Lifestyle</h2>
            <div className="grid grid-cols-3 gap-2">
              {['Gym', 'Cycling', 'Gaming', 'Photo', 'Coffee', 'Podcasts'].map(h => (
                <div key={h} className="rounded-lg p-4 text-center backdrop-blur-md bg-black/30 border border-white/20 text-sm">{h}</div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📱 Social</h2>
            <div className="flex gap-3">
              <a href="#" className="bg-pink-500 text-white px-5 py-2 rounded-lg text-sm">📷 Instagram</a>
              <a href="#" className="bg-black text-white px-5 py-2 rounded-lg text-sm">𝕏 Twitter</a>
            </div>
          </section>
        </main>
      )}

      <footer className="text-center py-8 text-xs text-white/50 border-t border-white/10 relative z-10">
        Engineer Off Duty © 2026 · Built with React + Tailwind
      </footer>
    </div>
  )
}

export default App
