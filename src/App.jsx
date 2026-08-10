import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ConstellationBackground from './components/ConstellationBackground'
import WorldMap from './components/WorldMap'
import { CONTENT, detectChineseRegion } from './i18n'

function StatCard({ num, label }) {
  return (
    <div className="rounded-xl p-5 text-center backdrop-blur-md border transition-all hover:scale-105 bg-white/5 border-white/10">
      <div className="text-3xl font-bold">{num}</div>
      <div className="text-xs mt-1 text-slate-400">{label}</div>
    </div>
  )
}

function TechBadge({ name }) {
  return (
    <div className="rounded-lg p-3 text-center text-sm font-medium backdrop-blur-md bg-white/5 border border-white/10">
      {name}
    </div>
  )
}

function App() {
  const [mode, setMode] = useState('off-duty')  // Default to off-duty
  const [loaded, setLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [lang, setLang] = useState(() => {
    if (detectChineseRegion()) return 'zh'
    return 'en'
  })

  useEffect(() => {
    const saved = localStorage.getItem('mode')
    if (saved === 'on-duty') setMode('on-duty')
    const savedLang = localStorage.getItem('lang')
    if (savedLang === 'zh' || savedLang === 'en') setLang(savedLang)

    const preloader = document.getElementById('preloader')
    if (preloader) {
      setTimeout(() => preloader.classList.add('hidden'), 800)
    }
    setLoaded(true)

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggle = () => {
    const newMode = mode === 'on-duty' ? 'off-duty' : 'on-duty'
    setMode(newMode)
    localStorage.setItem('mode', newMode)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'zh' : 'en'
    setLang(newLang)
    localStorage.setItem('lang', newLang)
  }

  const isOnDuty = mode === 'on-duty'
  const t = CONTENT[lang]

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
    <div className={`min-h-screen transition-all duration-700 ${isOnDuty ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'}`} style={{ scrollBehavior: 'smooth' }}>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[60] transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

      <div className="fixed inset-0 z-0 transition-opacity duration-1000 pointer-events-none">
        {isOnDuty ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
        )}
        <div className={`absolute inset-0 ${isOnDuty ? 'bg-white/60' : 'bg-black/40'}`} />
      </div>

      <ConstellationBackground isOnDuty={isOnDuty} />

      <button
        onClick={toggle}
        className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-full font-bold text-sm shadow-2xl transition-all transform hover:scale-105 backdrop-blur-md border ${isOnDuty ? 'bg-white/80 border-slate-300 text-slate-700 hover:bg-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
      >
        {isOnDuty ? t.onDuty : t.offDuty}
      </button>

      {/* Language Toggle */}
      <button
        onClick={toggleLang}
        className={`fixed top-6 left-6 z-50 px-4 py-3 rounded-full font-bold text-sm shadow-2xl transition-all transform hover:scale-105 backdrop-blur-md border ${isOnDuty ? 'bg-white/80 border-slate-300 text-slate-700 hover:bg-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
      >
        {lang === 'en' ? '中文' : 'EN'}
      </button>

      <header className="relative max-w-5xl mx-auto px-6 py-16 text-center z-10">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden">
          <img src="./images/profile.jpg" alt={t.name} className="w-full h-full object-cover" />
        </div>

        <h1 className="text-5xl font-black mb-2 drop-shadow-lg">{t.name}</h1>

        <p className={`text-xl font-light mb-2 ${isOnDuty ? 'text-slate-600' : 'text-orange-100'}`}>
          {isOnDuty ? t.headline : t.offDutyHeadline}
        </p>

        <p className={`text-sm ${isOnDuty ? 'text-slate-500' : 'text-orange-200/80'}`}>
          {t.location}
        </p>
      </header>

      <AnimatePresence mode="wait">
        {isOnDuty ? (
          <motion.main
            key="on-duty"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }}
            className="relative max-w-5xl mx-auto px-6 pb-16 z-10"
          >
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.about}</h2>
              <div className="rounded-xl p-5 backdrop-blur-md bg-white/5 border border-slate-200/50">
                <p className="text-sm text-slate-700">{t.about}</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.techStack}</h2>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {t.techStack.map(name => (
                  <TechBadge key={name} name={name} />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.linkedin}</h2>
              <a href="https://www.linkedin.com/in/ryankhoo/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#0A66C2] hover:bg-[#004182] text-white px-6 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                {t.linkedinButton}
              </a>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📬 Contact</h2>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.linkedin.com/in/ryankhoo/" target="_blank" rel="noopener noreferrer" className="bg-[#0A66C2] text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">{t.contactLinkedIn}</a>
                <span className="bg-slate-200 text-slate-700 px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">{t.contactGitHub}</span>
                <a href={`mailto:${t.contactEmail}`} className="bg-slate-200 text-slate-700 px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">✉️</a>
              </div>
            </section>
          </motion.main>
        ) : (
          <motion.main
            key="off-duty"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }}
            className="relative max-w-5xl mx-auto px-6 pb-16 z-10"
          >
            <section className="grid grid-cols-3 gap-4 mb-12">
              <StatCard num="15" label={t.stats.countries} />
              <StatCard num="6" label="Hotels" />
              <StatCard num="3+" label={t.stats.years} />
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.travelMap}</h2>
              <WorldMap isOnDuty={isOnDuty} />
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.instagram}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['Dbhzy0izAXD', 'Db0Q6SjzzDU', 'Dbx1hNXzolx'].map(code => (
                  <iframe
                    key={code}
                    src={`https://www.instagram.com/p/${code}/embed/`}
                    className="w-full h-[500px] rounded-xl border-0"
                    allowFullScreen
                    loading="lazy"
                  />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.tiktok}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <iframe src="https://www.tiktok.com/embed/v2/7653078167917464850" className="w-full h-[500px] rounded-xl border-0" allowFullScreen></iframe>
                <iframe src="https://www.tiktok.com/embed/v2/7669322761092762898" className="w-full h-[500px] rounded-xl border-0" allowFullScreen></iframe>
                <iframe src="https://www.tiktok.com/embed/v2/7671982861867633927" className="w-full h-[500px] rounded-xl border-0" allowFullScreen></iframe>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.social}</h2>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.instagram.com/_engineeroffduty/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">📷 Instagram</a>
                <a href="https://www.tiktok.com/@engineeroffduty" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">🎵 TikTok</a>
                <a href="https://www.xiaohongshu.com/user/profile/6a4cde6b000000000e03b800" target="_blank" rel="noopener noreferrer" className="bg-[#FE2C55] text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">📕 Xiaohongshu</a>
                <a href={`mailto:${t.contactEmail}`} className="bg-slate-700 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">✉️</a>
              </div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>

      <footer className="text-center py-8 text-xs text-white/50 border-t border-white/10 relative z-10">
        {t.footer}
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 ${scrollProgress > 10 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        ↑
      </button>

      {/* Scroll to bottom button */}
      <button
        onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
        className={`fixed bottom-20 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 ${scrollProgress < 90 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Scroll to bottom"
      >
        ↓
      </button>
    </div>
  )
}

export default App
