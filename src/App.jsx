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

function ProjectCard({ name, icon, desc }) {
  return (
    <div className="rounded-xl p-4 backdrop-blur-md bg-white/5 border border-white/10">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-bold text-sm">{name}</h3>
      </div>
      <p className="text-xs text-slate-400 mt-1">{desc}</p>
    </div>
  )
}

function PlaceholderCard({ icon, label, sublabel }) {
  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center aspect-square">
      <div className="text-center p-4">
        <div className="text-4xl mb-2">{icon}</div>
        <div className="text-xs text-white/50">{label}</div>
        {sublabel && <div className="text-[10px] text-white/30 mt-0.5">{sublabel}</div>}
      </div>
    </div>
  )
}

function PlaceholderVideo({ icon, label }) {
  return (
    <div className="h-[200px] rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <div className="text-xs text-white/50">{label}</div>
      </div>
    </div>
  )
}

function HobbyCard({ icon, name }) {
  return (
    <div className="rounded-lg p-4 text-center backdrop-blur-md bg-black/30 border border-white/20">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="font-medium text-xs">{name}</div>
    </div>
  )
}

function TravelCard({ emoji, place, desc }) {
  return (
    <div className="rounded-xl p-4 backdrop-blur-md bg-black/30 border border-white/20 flex items-start gap-3">
      <span className="text-3xl">{emoji}</span>
      <div>
        <h3 className="font-bold text-sm">{place}</h3>
        <p className="text-xs text-white/70 mt-1">{desc}</p>
      </div>
    </div>
  )
}

function ContactBadge({ icon, label }) {
  return (
    <span className="bg-white/10 text-white/70 px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-white/10">
      {icon} {label}
    </span>
  )
}

function SocialBadge({ icon, label, gradient }) {
  return (
    <span className={`${gradient} text-white/70 px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2`}>
      {icon} {label}
    </span>
  )
}

function ExperienceItem({ title, company, period, desc }) {
  return (
    <div className="rounded-xl p-5 backdrop-blur-md bg-white/5 border border-white/10">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-blue-300">{company}</p>
        </div>
        <span className="text-sm text-slate-400">{period}</span>
      </div>
      <p className="mt-2 text-sm text-slate-300">{desc}</p>
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
  const [mode, setMode] = useState('on-duty')
  const [loaded, setLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [lang, setLang] = useState(() => {
    // On first visit, detect region. If in HK/Macau/China/Taiwan, default to zh
    if (detectChineseRegion()) return 'zh'
    return 'en'
  })

  useEffect(() => {
    const saved = localStorage.getItem('mode')
    if (saved === 'off-duty') setMode('off-duty')
    const savedLang = localStorage.getItem('lang')
    if (savedLang === 'zh' || savedLang === 'en') setLang(savedLang)

    const preloader = document.getElementById('preloader')
    if (preloader) {
      setTimeout(() => preloader.classList.add('hidden'), 800)
    }
    setLoaded(true)

    // Track scroll progress
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
    <div className={`min-h-screen transition-colors duration-700 ${isOnDuty ? 'bg-slate-950 text-white' : 'text-white'}`} style={{ scrollBehavior: 'smooth' }}>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[60] transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

      {/* Scroll indicator - shows when not at top */}
      <div className={`fixed top-0 left-0 right-0 h-1 bg-white/5 z-[59]`}>
        <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="fixed inset-0 z-0 transition-opacity duration-1000 pointer-events-none">
        {isOnDuty ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-600 via-rose-500 to-purple-700" />
        )}
        <div className={`absolute inset-0 ${isOnDuty ? 'bg-black/40' : 'bg-black/50'}`} />
      </div>

      <ConstellationBackground isOnDuty={isOnDuty} />

      <button
        onClick={toggle}
        className="fixed top-6 right-6 z-50 px-6 py-3 rounded-full font-bold text-sm shadow-2xl transition-all transform hover:scale-105 backdrop-blur-md border bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        {isOnDuty ? t.onDuty : t.offDuty}
      </button>

      {/* Language Toggle */}
      <button
        onClick={toggleLang}
        className="fixed top-6 left-6 z-50 px-4 py-3 rounded-full font-bold text-sm shadow-2xl transition-all transform hover:scale-105 backdrop-blur-md border bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        {lang === 'en' ? '中文' : 'EN'}
      </button>

      <header className="relative max-w-5xl mx-auto px-6 py-16 text-center z-10">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden">
          <img src="./images/profile.jpg" alt={t.name} className="w-full h-full object-cover" />
        </div>

        <h1 className="text-5xl font-black mb-2 drop-shadow-lg">{t.name}</h1>

        <p className={`text-xl font-light mb-2 ${isOnDuty ? 'text-blue-200' : 'text-orange-100'}`}>
          {isOnDuty ? t.headline : t.offDutyHeadline}
        </p>

        <p className={`text-sm ${isOnDuty ? 'text-slate-400' : 'text-orange-200/80'}`}>
          {t.location}
        </p>

        <div className={`inline-block mt-3 px-4 py-1.5 rounded-full text-sm font-medium ${isOnDuty ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-orange-500/30 text-orange-100 border border-orange-400/50'}`}>
          {isOnDuty ? t.status : t.offDutyStatus}
        </div>
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
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.aboutTitle}</h2>
            <div className="rounded-xl p-5 backdrop-blur-md bg-white/5 border border-white/10">
              <p className="text-sm text-slate-300">{t.about}</p>
            </div>
          </section>

          <section className="grid grid-cols-3 gap-4 mb-12">
            <StatCard num={t.stats.years.split(' ')[0]} label={t.stats.years.split(' ').slice(1).join(' ')} />
            <StatCard num={t.stats.projects.split(' ')[0]} label={t.stats.projects.split(' ').slice(1).join(' ')} />
            <StatCard num={t.stats.countries.split(' ')[0]} label={t.stats.countries.split(' ').slice(1).join(' ')} />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.experience}</h2>
            <div className="space-y-3">
              {t.experience.map((exp, i) => (
                <ExperienceItem key={i} {...exp} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.education}</h2>
            <div className="space-y-3">
              {t.education.map((edu, i) => (
                <ExperienceItem key={i} {...edu} />
              ))}
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
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.certifications}</h2>
            <div className="space-y-3">
              {t.certifications.map((cert, i) => (
                <ExperienceItem key={i} {...cert} />
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
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.contact}</h2>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.linkedin.com/in/ryankhoo/" target="_blank" rel="noopener noreferrer" className="bg-[#0A66C2] text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">{t.contactLinkedIn}</a>
              <ContactBadge icon={t.contactGitHub.split(' ')[0]} label={t.contactGitHub.split(' ')[1]} />
              <ContactBadge icon={t.contactEmail.split(' ')[0]} label={t.contactEmail.split(' ')[1]} />
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
            <StatCard num="8" label={t.offDutyStats.countries} />
            <StatCard num="0" label={t.offDutyStats.projects} />
            <StatCard num="0" label={t.offDutyStats.years} />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.travelMap}</h2>
            <WorldMap isOnDuty={isOnDuty} />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.travel}</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {t.travel.map((tr, i) => (
                <TravelCard key={i} {...tr} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.food}</h2>
            <div className="rounded-xl p-6 backdrop-blur-md bg-black/30 border border-white/20">
              <p className="text-sm text-white/90">{t.food}</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🏨 Hotel Stays</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {t.hotels.map((hotel, i) => (
                <div key={i} className="rounded-xl p-5 backdrop-blur-md bg-black/30 border border-white/20">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm">{hotel.name}</h3>
                    <span className="text-xs text-yellow-400">{hotel.rating}</span>
                  </div>
                  <p className="text-xs text-white/60 mb-2">{hotel.location}</p>
                  <p className="text-xs text-white/80">{hotel.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.lifestyle}</h2>
            <div className="grid grid-cols-3 gap-2">
              {[1,2,3,4,5,6].map(i => (
                <HobbyCard key={i} icon="🎯" name={`${t.hobby} ${i}`} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.music}</h2>
            <div className="rounded-xl p-6 backdrop-blur-md bg-black/30 border border-white/20">
              <p className="text-sm text-white/90 mb-4">{t.music}</p>
              <div className="flex flex-wrap gap-2">
                {t.musicArtists.map(artist => (
                  <span key={artist} className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-white/80">{artist}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.sports}</h2>
            <div className="flex flex-wrap gap-2">
              {t.sports.map(s => (
                <span key={s} className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-white/80">{s}</span>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.gaming}</h2>
            <div className="flex flex-wrap gap-2">
              {t.gaming.map(g => (
                <span key={g} className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-white/80">{g}</span>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.instagram}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {['Dbhzy0izAXD', 'Db0Q6SjzzDU', 'Dbx1hNXzolx', 'DbxPU_vzFp5', 'DbvHdm0E3B6', 'Dbsn-afEyb0'].map(code => (
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <iframe src="https://www.tiktok.com/embed/v2/7653078167917464850" className="w-full h-[500px] rounded-xl border-0" allowFullScreen></iframe>
              <iframe src="https://www.tiktok.com/embed/v2/7669322761092762898" className="w-full h-[500px] rounded-xl border-0" allowFullScreen></iframe>
              <iframe src="https://www.tiktok.com/embed/v2/7671982861867633927" className="w-full h-[500px] rounded-xl border-0" allowFullScreen></iframe>
              <iframe src="https://www.tiktok.com/embed/v2/7671632703753702663" className="w-full h-[500px] rounded-xl border-0" allowFullScreen></iframe>
              <iframe src="https://www.tiktok.com/embed/v2/7671240889209031944" className="w-full h-[500px] rounded-xl border-0" allowFullScreen></iframe>
              <iframe src="https://www.tiktok.com/embed/v2/7670881437691694344" className="w-full h-[500px] rounded-xl border-0" allowFullScreen></iframe>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{t.sections.social}</h2>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.instagram.com/_engineeroffduty/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">📷 Instagram</a>
              <a href="https://www.tiktok.com/@engineeroffduty" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">🎵 TikTok</a>
              <a href="https://www.xiaohongshu.com/user/profile/6a4cde6b000000000e03b800" target="_blank" rel="noopener noreferrer" className="bg-[#FE2C55] text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">📕 Xiaohongshu</a>
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
