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

        <h1 className="text-5xl font-black mb-2 drop-shadow-lg">Ryan Khoo</h1>

        <p className={`text-xl font-light mb-2 ${isOnDuty ? 'text-blue-200' : 'text-orange-100'}`}>
          {isOnDuty ? 'Full Stack Developer | Web3 & Blockchain | Freelance Community Manager' : 'Explorer · Foodie · Lifelong Learner'}
        </p>

        <p className={`text-sm ${isOnDuty ? 'text-slate-400' : 'text-orange-200/80'}`}>
          Bayan Lepas, Penang 🇲🇾
        </p>

        <div className={`inline-block mt-3 px-4 py-1.5 rounded-full text-sm font-medium ${isOnDuty ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-orange-500/30 text-orange-100 border border-orange-400/50'}`}>
          {isOnDuty ? '🟢 Available for work' : '🌴 Currently exploring'}
        </div>
      </header>

      {isOnDuty ? (
        <main className="relative max-w-5xl mx-auto px-6 pb-16 z-10">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">👤 About</h2>
            <div className="rounded-xl p-5 backdrop-blur-md bg-white/5 border border-white/10">
              <p className="text-sm text-slate-300">A computer science graduate who is exposed to various tools and skills, also blockchain or web3 knowledge. Two years of remote corporate experience and freelance community manager. Previously involved in blockchain and e-commerce projects.</p>
            </div>
          </section>

          <section className="grid grid-cols-3 gap-4 mb-12">
            <StatCard num="3+" label="Years Exp" />
            <StatCard num="10+" label="Projects" />
            <StatCard num="8" label="Countries" />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">💼 Experience</h2>
            <div className="space-y-3">
              <ExperienceItem title="Full Stack Developer" company="SISTIC Singapore · Remote" period="Aug 2024 - Present · 2 yrs 1 mo" desc="Full-stack development with modern web technologies." />
              <ExperienceItem title="Frontend Software Engineer" company="StixCloud & StixLite" period="May 2023 - Aug 2024 · 1 yr 4 mos" desc="Graylog, Burp Suite, Scrum, Gitlab. Frontend development and security testing." />
              <ExperienceItem title="Backend Software Engineer (Intern)" company="StixLite" period="Dec 2022 - Apr 2023 · 5 mos" desc="Agile Environment, Microservices architecture." />
              <ExperienceItem title="Community Manager (Freelance)" company="Lysto · Remote" period="Mar 2022 - Aug 2022 · 6 mos" desc="Liaised with overseas community members on Blockchain P2E gaming experience." />
              <ExperienceItem title="Customer Specialist (Intern)" company="Zebra Technologies · Bayan Lepas, Penang" period="Apr 2021 - Dec 2021 · 9 mos" desc="Oracle Siebel CRM, Salesforce.com, Report Writing, Data Validation." />
              <ExperienceItem title="Office Support (Intern)" company="Zebra Technologies · Bayan Lepas, Penang" period="Jan 2021 - Apr 2021 · 4 mos" desc="Report Writing and Data Validation." />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🎓 Education</h2>
            <div className="space-y-3">
              <ExperienceItem title="Bachelor's Degree, Computer Science" company="Coventry University" period="Apr 2021 - Apr 2023" desc="JavaScript, Blockchain, Web Development." />
              <ExperienceItem title="Diploma, Information Technology" company="INTI" period="Apr 2019 - Mar 2021" desc="Front-End Development, IT Fundamentals." />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">⚡ Tech Stack</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {['JavaScript', 'React', 'Node.js', 'Python', 'Blockchain', 'Web3', 'Solidity', 'GitLab', 'Scrum', 'Agile', 'Graylog', 'Burp Suite', 'AWS', 'Salesforce', 'Oracle Siebel', 'Microservices'].map(t => (
                <TechBadge key={t} name={t} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📜 Certifications</h2>
            <div className="space-y-3">
              <ExperienceItem title="DevOps on AWS" company="Amazon Web Services (AWS)" period="Issued Dec 2022" desc="Cloud DevOps certification." />
              <ExperienceItem title="Employer Project Completion" company="IDEAL VISION INTEGRATION SDN BHD" period="Issued Dec 2021" desc="Project completion certification." />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🔗 LinkedIn</h2>
            <a href="https://www.linkedin.com/in/ryankhoo/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#0A66C2] hover:bg-[#004182] text-white px-6 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Connect on LinkedIn
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📬 Contact</h2>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.linkedin.com/in/ryankhoo/" target="_blank" rel="noopener noreferrer" className="bg-[#0A66C2] text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2">💼 LinkedIn</a>
              <ContactBadge icon="🐙" label="GitHub" />
              <ContactBadge icon="✉️" label="Email" />
            </div>
          </section>
        </main>
      ) : (
        <main className="relative max-w-5xl mx-auto px-6 pb-16 z-10">
          <section className="grid grid-cols-3 gap-4 mb-12">
            <StatCard num="8" label="Countries" />
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
              <TravelCard emoji="🇪🇬" place="Egypt" desc="Pyramids, Nile, ancient history" />
              <TravelCard emoji="🇯🇵" place="Japan" desc="Cherry blossoms, ramen, neon streets" />
              <TravelCard emoji="🇹🇼" place="Taiwan" desc="Night markets, bubble tea, mountains" />
              <TravelCard emoji="🇹🇭" place="Thailand" desc="Beaches, temples, street food" />
              <TravelCard emoji="🇸🇬" place="Singapore" desc="Hawker centers, gardens, islands" />
              <TravelCard emoji="🇬🇧" place="United Kingdom" desc="History, pubs, rainy weather" />
              <TravelCard emoji="🇫🇷" place="France" desc="Eiffel Tower, baguettes, wine" />
              <TravelCard emoji="🇲🇾" place="Malaysia" desc="Home sweet home — Pulau Pinang" />
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
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🎵 Music</h2>
            <div className="rounded-xl p-6 backdrop-blur-md bg-black/30 border border-white/20">
              <p className="text-sm text-white/90 mb-4">Favourite Artists</p>
              <div className="flex flex-wrap gap-2">
                {['Jeremy Zucker', 'Joji', 'NewJeans', 'Man With A Mission', 'Jon Bellion', 'Adele'].map(artist => (
                  <span key={artist} className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-white/80">{artist}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🏸 Sports</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-white/80">Badminton</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-white/80">Pickleball</span>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">🎮 Gaming</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-white/80">WuWa</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-white/80">Minecraft</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-white/80">Hytale</span>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📷 Instagram</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Dbhzy0izAXD',
                'Db0Q6SjzzDU',
                'Dbx1hNXzolx',
                'DbxPU_vzFp5',
                'DbvHdm0E3B6',
                'Dbsn-afEyb0',
              ].map(code => (
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
