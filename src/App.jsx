import { useState, useEffect } from 'react'
import ConstellationBackground from './components/ConstellationBackground'
import WorldMap from './components/WorldMap'

function SocialEmbed({ platform, url, icon, label, color }) {
  const [hover, setHover] = useState(false)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${color} ${hover ? 'shadow-lg' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="text-3xl">{icon}</div>
      <div className="flex-1">
        <div className="font-bold text-sm">{label}</div>
        <div className="text-xs opacity-80 mt-0.5">@{url.split('/').filter(Boolean).pop()?.split('/')[0] || 'engineeroffduty'}</div>
      </div>
      <div className="text-xs opacity-60">↗</div>
      {hover && (
        <div className="absolute inset-0 rounded-xl bg-white/10 pointer-events-none" />
      )}
    </a>
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
          <img src="./images/phuket-resort.png" alt="Phuket Resort" className="w-full h-full object-cover" />
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
          <img src="./images/profile.png" alt="Eddy" className="w-full h-full object-cover" />
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

        {/* Video removed by user request */}
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

          {/* Instagram Posts */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📷 Instagram</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { code: 'Dbhzy0izAXD', desc: 'Recalculating the bill...' },
                { code: 'Db0Q6SjzzDU', desc: 'Lifestyle post' },
                { code: 'Dbx1hNXzolx', desc: 'Travel post' },
                { code: 'DbxPU_vzFp5', desc: 'Behind the scenes' },
                { code: 'DbvHdm0E3B6', desc: 'Daily life' },
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

          {/* Social Embeds Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📱 Social</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <SocialEmbed platform="instagram" url="https://www.instagram.com/_engineeroffduty/" icon="📷" label="Instagram" color="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/30 hover:border-pink-400" />
              <SocialEmbed platform="tiktok" url="https://www.tiktok.com/@engineeroffduty" icon="🎵" label="TikTok" color="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30 hover:border-cyan-400" />
              <SocialEmbed platform="xiaohongshu" url="https://www.xiaohongshu.com/user/profile/engineeroffduty" icon="📕" label="小红书" color="bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-500/30 hover:border-red-400" />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📬 Contact</h2>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.linkedin.com/in/kytosyn/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">💼 LinkedIn</a>
              <a href="https://github.com/Kytosyn" target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">🐙 GitHub</a>
              <a href="mailto:kytosyn@gmail.com" className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">✉️ Email</a>
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
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🌍 My Travel Map</h2>
            <WorldMap isOnDuty={isOnDuty} />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">✈️ Travel</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { place: 'Phuket, Thailand', emoji: '🇹🇭', desc: 'Beaches, islands, infinity pools' },
                { place: 'Tokyo, Japan', emoji: '🇯🇵', desc: 'Cherry blossoms, ramen, neon streets' },
                { place: 'Barcelona, Spain', emoji: '🇪🇸', desc: 'Gaudí, beach sunsets, tapas' },
                { place: 'Singapore', emoji: '🇸🇬', desc: 'Hawker centers, gardens, islands' },
              ].map(d => (
                <div key={d.place} className="rounded-xl p-4 backdrop-blur-md bg-black/30 border border-white/20 flex items-start gap-3">
                  <span className="text-3xl">{d.emoji}</span>
                  <div>
                    <h3 className="font-bold text-sm">{d.place}</h3>
                    <p className="text-xs text-white/70 mt-1">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🍜 Food</h2>
            <div className="rounded-xl p-6 backdrop-blur-md bg-black/30 border border-white/20">
              <p className="text-sm text-white/90">📍 <strong>Singapore</strong> — Laksa, Hainanese chicken rice, Chili crab, Satay, Kaya toast</p>
              <p className="text-sm text-white/90 mt-3">🏆 <strong>Top 3:</strong> Tonkotsu ramen (Tokyo), Paella (Barcelona), Nasi lemak (KL)</p>
              <p className="text-sm text-white/90 mt-3">☕ <strong>Coffee:</strong> Flat white person. Always hunting third-wave cafes.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🎮 Lifestyle</h2>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: 'Gym', icon: '💪' },
                { name: 'Cycling', icon: '🚴' },
                { name: 'Gaming', icon: '🎮' },
                { name: 'Photo', icon: '📸' },
                { name: 'Coffee', icon: '☕' },
                { name: 'Podcasts', icon: '🎧' },
              ].map(h => (
                <div key={h.name} className="rounded-lg p-4 text-center backdrop-blur-md bg-black/30 border border-white/20">
                  <div className="text-2xl mb-2">{h.icon}</div>
                  <div className="font-medium text-xs">{h.name}</div>
                </div>
              ))}
            </div>
          </section>

          {/* TikTok Embeds */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🎵 TikTok</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <iframe src="https://www.tiktok.com/embed/v2/7653078167917464850" className="w-full h-[500px] rounded-xl border-0" allowFullScreen></iframe>
              <iframe src="https://www.tiktok.com/embed/v2/7669322761092762898" className="w-full h-[500px] rounded-xl border-0" allowFullScreen></iframe>
              <iframe src="https://www.tiktok.com/embed/v2/7671982861867633927" className="w-full h-[500px] rounded-xl border-0" allowFullScreen></iframe>
              <iframe src="https://www.tiktok.com/embed/v2/7671632703753702663" className="w-full h-[500px] rounded-xl border-0" allowFullScreen></iframe>
              <iframe src="https://www.tiktok.com/embed/v2/7671240889209031944" className="w-full h-[500px] rounded-xl border-0" allowFullScreen></iframe>
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
        Engineer Off Duty © 2026 · Built with React + Tailwind
      </footer>
    </div>
  )
}

export default App
