import { useState, useEffect } from 'react'
import ConstellationBackground from './components/ConstellationBackground'
import WorldMap from './components/WorldMap'

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
          <div className="w-full h-full bg-gradient-to-br from-orange-600 via-rose-500 to-purple-700" />
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

      <header className="relative max-w-5xl mx-auto px-6 py-16 text-center z-10">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden">
          <img src="./images/profile.png" alt="Ryan" className="w-full h-full object-cover" />
        </div>

        <h1 className="text-5xl font-black mb-2 drop-shadow-lg">Ryan</h1>

        <p className={`text-xl font-light mb-2 ${isOnDuty ? 'text-blue-200' : 'text-orange-100'}`}>
          {isOnDuty ? 'Senior Software Engineer' : 'Explorer · Foodie · Lifelong Learner'}
        </p>

        <p className={`text-sm ${isOnDuty ? 'text-slate-400' : 'text-orange-200/80'}`}>
          Pulau Pinang 🇲🇾
        </p>

        <div className={`inline-block mt-3 px-4 py-1.5 rounded-full text-sm font-medium ${isOnDuty ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-orange-500/30 text-orange-100 border border-orange-400/50'}`}>
          {isOnDuty ? '🟢 Available for work' : '🌴 Currently exploring'}
        </div>
      </header>

      {isOnDuty ? (
        <main className="relative max-w-5xl mx-auto px-6 pb-16 z-10">
          <section className="grid grid-cols-3 gap-4 mb-12">
            <StatCard num="0+" label="Years Exp" />
            <StatCard num="0+" label="Projects" />
            <StatCard num="0" label="Countries" />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">💼 Experience</h2>
            <div className="space-y-3">
              <ExperienceItem title="Senior Software Engineer" company="Your Company · Remote" period="2022 - Present" desc="Full-stack development, cloud architecture, automation." />
              <ExperienceItem title="Full Stack Developer" company="Previous Company" period="2019 - 2022" desc="React, Node.js, Python, PostgreSQL. Built MVPs, maintained systems." />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">⚡ Tech Stack</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {['React', 'Next.js', 'TypeScript', 'Python', 'Flask', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Supabase', 'Playwright', 'Vercel'].map(t => (
                <TechBadge key={t} name={t} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🚀 Projects</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <ProjectCard name="Project Alpha" icon="🔒" desc="Coming soon" />
              <ProjectCard name="Project Beta" icon="🔒" desc="Coming soon" />
              <ProjectCard name="Project Gamma" icon="🔒" desc="Coming soon" />
              <ProjectCard name="Project Delta" icon="🔒" desc="Coming soon" />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📬 Contact</h2>
            <div className="flex flex-wrap gap-3">
              <ContactBadge icon="💼" label="LinkedIn" />
              <ContactBadge icon="🐙" label="GitHub" />
              <ContactBadge icon="✉️" label="Email" />
            </div>
          </section>
        </main>
      ) : (
        <main className="relative max-w-5xl mx-auto px-6 pb-16 z-10">
          <section className="grid grid-cols-3 gap-4 mb-12">
            <StatCard num="0" label="Countries" />
            <StatCard num="0" label="Projects" />
            <StatCard num="0" label="Years" />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🌍 Travel Map</h2>
            <WorldMap isOnDuty={isOnDuty} />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">✈️ Travel</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <TravelCard emoji="🌍" place="City, Country" desc="Coming soon" />
              <TravelCard emoji="🌍" place="City, Country" desc="Coming soon" />
              <TravelCard emoji="🌍" place="City, Country" desc="Coming soon" />
              <TravelCard emoji="🌍" place="City, Country" desc="Coming soon" />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🍜 Food</h2>
            <div className="rounded-xl p-6 backdrop-blur-md bg-black/30 border border-white/20">
              <p className="text-sm text-white/90">Your food story goes here...</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🎮 Lifestyle</h2>
            <div className="grid grid-cols-3 gap-2">
              <HobbyCard icon="🎯" name="Hobby 1" />
              <HobbyCard icon="🎯" name="Hobby 2" />
              <HobbyCard icon="🎯" name="Hobby 3" />
              <HobbyCard icon="🎯" name="Hobby 4" />
              <HobbyCard icon="🎯" name="Hobby 5" />
              <HobbyCard icon="🎯" name="Hobby 6" />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📷 Instagram</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { code: 'Dbhzy0izAXD', desc: 'Recalculating the bill...' },
                { code: 'Db0Q6SjzzDU', desc: 'Lifestyle post' },
                { code: 'Dbx1hNXzolx', desc: 'Travel post' },
                { code: 'DbxPU_vzFp5', desc: 'Behind the scenes' },
                { code: 'DbvHdm0E3B6', desc: 'Daily life' },
                { code: 'Dbsn-afEyb0', desc: 'New post' },
              ].map(post => (
                <a
                  key={post.code}
                  href={`https://www.instagram.com/p/${post.code}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all hover:scale-[1.02]"
                >
                  <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">📷</div>
                      <div className="text-xs text-white/70">{post.desc}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🎵 TikTok</h2>
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
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📱 Social</h2>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.instagram.com/_engineeroffduty/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">📷 Instagram</a>
              <a href="https://www.tiktok.com/@engineeroffduty" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">🎵 TikTok</a>
            </div>
          </section>
        </main>
      )}

      <footer className="text-center py-8 text-xs text-white/50 border-t border-white/10 relative z-10">
        Ryan © 2026 · Built with React + Tailwind
      </footer>
    </div>
  )
}

export default App
