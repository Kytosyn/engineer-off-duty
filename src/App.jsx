import { useState, useEffect } from 'react'

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
    <div className={`min-h-screen transition-colors ${isOnDuty ? 'bg-slate-50 text-slate-900' : 'bg-orange-50 text-orange-900'}`}>
      {/* Mode Toggle */}
      <button
        onClick={toggle}
        className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-full font-semibold text-sm shadow-lg transition-all ${
          isOnDuty ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-orange-500 text-white hover:bg-orange-600'
        }`}
      >
        {isOnDuty ? '👔 On Duty' : '🏖️ Off Duty'}
      </button>

      {/* Hero */}
      <header className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Eddy</h1>
        <p className="text-xl mb-2">
          {isOnDuty ? 'Senior Software Engineer' : 'Explorer, Foodie & Lifelong Learner'}
        </p>
        <p className="text-lg opacity-75">Singapore 🇸🇬</p>
      </header>

      {isOnDuty ? (
        <main className="max-w-4xl mx-auto px-6 pb-16">
          {/* Experience */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Experience</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="font-bold text-lg">Senior Software Engineer</h3>
                <p className="text-sm opacity-75 mb-2">2022 - Present</p>
                <p>Full-stack development, DeFi protocols, trading bots, browser automation</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="font-bold text-lg">Full Stack Developer</h3>
                <p className="text-sm opacity-75 mb-2">2019 - 2022</p>
                <p>React, Node.js, Python, cloud infrastructure</p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript', 'Python', 'Flask', 'Node.js', 'PostgreSQL', 'Supabase', 'Vercel', 'Docker', 'Playwright', 'AWS'].map(skill => (
                <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="font-bold">Price Tracker</h3>
                <p className="text-sm opacity-75">Price monitoring with Supabase</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="font-bold">Social Media Bot</h3>
                <p className="text-sm opacity-75">Browser automation for posting</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="font-bold">Telegram Archive</h3>
                <p className="text-sm opacity-75">Message backup + search</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="font-bold">PDF Toolkit</h3>
                <p className="text-sm opacity-75">ilovepdf.com alternative</p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Contact</h2>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/kytosyn/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">LinkedIn</a>
              <a href="https://github.com/Kytosyn" target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900">GitHub</a>
              <a href="mailto:kytosyn@gmail.com" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Email</a>
            </div>
          </section>
        </main>
      ) : (
        <main className="max-w-4xl mx-auto px-6 pb-16">
          {/* Travel */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Travel</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="font-bold">Tokyo, Japan</h3>
                <p className="text-sm opacity-75">Cherry blossoms, ramen, tech districts</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="font-bold">Barcelona, Spain</h3>
                <p className="text-sm opacity-75">Architecture, beaches, nightlife</p>
              </div>
            </div>
          </section>

          {/* Food */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Food</h2>
            <div className="bg-white rounded-xl p-6 shadow">
              <p>📍 Singapore - Laksa, Hainanese chicken rice, Chili crab, Satay, Kaya toast, Teh Tarik</p>
            </div>
          </section>

          {/* Lifestyle */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Lifestyle</h2>
            <div className="flex flex-wrap gap-2">
              {['Gym', 'Cycling', 'Gaming', 'Photography', 'Coffee', 'Podcasts'].map(hobby => (
                <span key={hobby} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">{hobby}</span>
              ))}
            </div>
          </section>

          {/* Social */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Social</h2>
            <div className="flex gap-4">
              <a href="#" className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">Instagram</a>
              <a href="#" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">X/Twitter</a>
            </div>
          </section>
        </main>
      )}

      <footer className="text-center py-8 text-sm opacity-50">
        Engineer Off Duty © 2026
      </footer>
    </div>
  )
}

export default App
