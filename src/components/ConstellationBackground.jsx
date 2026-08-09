import { useRef, useEffect } from 'react'

export default function ConstellationBackground({ isOnDuty }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef([])
  const sparklesRef = useRef([])
  const floatingElementsRef = useRef([])
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    // Different content based on mode
    const onDutySymbols = ['0', '1', '0xFF', '&&', '||', '!=', '=>', '++', '--', '==', 'null', 'void', 'this', 'new', 'try', 'async', 'await', 'import', 'export', 'class', 'const', 'let', 'var', 'if', 'for', 'while', 'do', 'switch', 'case', 'break', 'return', 'throw', 'catch', 'finally', 'function', '=>', '...', '?.', '??', '||=', '&&=', '**', '>>>', '<<', '>>', '|', '&', '^', '~', '!', '<', '>', '<=', '>=', '===', '!==', 'instanceof', 'typeof', 'delete', 'in', 'of', 'extends', 'implements', 'interface', 'type', 'enum', 'abstract', 'static', 'public', 'private', 'protected', 'readonly', 'as', 'is', 'keyof', 'infer', 'extends', 'satisfies']
    const offDutySymbols = ['🌴', '🌺', '🌊', '☀️', '🌅', '🏖️', '🌴', '🥥', '🌺', '🦜', '🌊', '☀️', '🌅', '🏝️', '🐚', '🌴', '🌺', '🌊', '☀️', '🌅', '🏖️', '🦋', '🌴', '🌺', '🌊', '☀️', '🌅', '🏝️', '🐠', '🌴', '🌺', '🌊', '☀️', '🌅', '🏖️', '🌴', '🌺', '🌊', '☀️', '🌅']

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouse = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      
      // Spawn sparkles on mouse move
      if (frameRef.current % 2 === 0) {
        spawnSparkle()
      }
      // Spawn floating element occasionally
      if (frameRef.current % 30 === 0) {
        spawnFloatingElement()
      }
    }
    window.addEventListener('mousemove', handleMouse)

    function spawnSparkle() {
      const count = isOnDuty ? 1 + Math.floor(Math.random() * 2) : 3 + Math.floor(Math.random() * 4)
      for (let i = 0; i < count; i++) {
        if (isOnDuty) {
          // On Duty: Precise, geometric, digital
          sparklesRef.current.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 20,
            y: mouseRef.current.y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            size: Math.random() * 3 + 2,
            life: 1,
            decay: 0.02 + Math.random() * 0.02,
            color: `hsl(${200 + Math.random() * 30}, 100%, 75%)`,
            shape: Math.random() > 0.8 ? 'square' : 'circle',
          })
        } else {
          // Off Duty: Organic, flowing, natural
          sparklesRef.current.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 40,
            y: mouseRef.current.y + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5,
            size: Math.random() * 6 + 3,
            life: 1,
            decay: 0.01 + Math.random() * 0.015,
            color: `hsl(${Math.random() * 360}, 80%, 65%)`,
            shape: Math.random() > 0.7 ? 'leaf' : 'circle',
          })
        }
      }
    }

    function spawnFloatingElement() {
      if (isOnDuty) {
        // On Duty: Binary digits and hex values
        floatingElementsRef.current.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 80,
          y: mouseRef.current.y + (Math.random() - 0.5) * 80,
          text: onDutySymbols[Math.floor(Math.random() * onDutySymbols.length)],
          vx: (Math.random() - 0.5) * 0.8,
          vy: -0.5 - Math.random() * 1,
          size: 10 + Math.random() * 6,
          rotation: 0,
          rotationSpeed: 0,
          life: 1,
          decay: 0.006 + Math.random() * 0.006,
          color: `hsla(${200 + Math.random() * 40}, 80%, 70%, `,
          glowColor: 'rgba(100, 200, 255, 0.3)',
        })
      } else {
        // Off Duty: Nature emojis and organic shapes
        floatingElementsRef.current.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 100,
          y: mouseRef.current.y + (Math.random() - 0.5) * 100,
          text: offDutySymbols[Math.floor(Math.random() * offDutySymbols.length)],
          vx: (Math.random() - 0.5) * 2,
          vy: -1 - Math.random() * 2,
          size: 14 + Math.random() * 8,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          life: 1,
          decay: 0.004 + Math.random() * 0.006,
          color: `hsla(${Math.random() * 360}, 70%, 60%, `,
          glowColor: `hsla(${Math.random() * 360}, 70%, 60%, 0.2)`,
        })
      }
    }

    // Initialize background particles
    if (!window.__bgParticles) {
      window.__bgParticles = []
      for (let i = 0; i < 40; i++) {
        window.__bgParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }
    particlesRef.current = window.__bgParticles

    function animate() {
      frameRef.current++
      const frame = frameRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const w = canvas.width
      const h = canvas.height

      if (isOnDuty) {
        // ===== ON DUTY: Tech/Matrix/Digital =====
        const cx = w * 0.25
        const cy = h * 0.5
        const scale = Math.min(w, h) / 1200

        // Taurus constellation
        const taurusStars = [
          { x: 0, y: 0, s: 4, b: true },
          { x: -30, y: -25, s: 2.5 },
          { x: 25, y: -20, s: 2.5 },
          { x: -80, y: -120, s: 3.5, b: true },
          { x: 70, y: -130, s: 3.5, b: true },
        ]

        ctx.strokeStyle = 'rgba(100, 200, 255, 0.2)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(cx + taurusStars[1].x * scale, cy + taurusStars[1].y * scale)
        ctx.lineTo(cx + taurusStars[0].x * scale, cy + taurusStars[0].y * scale)
        ctx.lineTo(cx + taurusStars[2].x * scale, cy + taurusStars[2].y * scale)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(cx + taurusStars[1].x * scale, cy + taurusStars[1].y * scale)
        ctx.lineTo(cx + taurusStars[3].x * scale, cy + taurusStars[3].y * scale)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(cx + taurusStars[2].x * scale, cy + taurusStars[2].y * scale)
        ctx.lineTo(cx + taurusStars[4].x * scale, cy + taurusStars[4].y * scale)
        ctx.stroke()

        taurusStars.forEach(star => {
          const glow = 0.5 + 0.5 * Math.sin(frame * 0.03)
          const gradient = ctx.createRadialGradient(
            cx + star.x * scale, cy + star.y * scale, 0,
            cx + star.x * scale, cy + star.y * scale, star.s * 6
          )
          gradient.addColorStop(0, `rgba(100, 200, 255, ${0.4 * glow})`)
          gradient.addColorStop(1, 'rgba(100, 200, 255, 0)')
          ctx.beginPath()
          ctx.arc(cx + star.x * scale, cy + star.y * scale, star.s * 6, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()

          ctx.beginPath()
          ctx.arc(cx + star.x * scale, cy + star.y * scale, star.s, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + 0.2 * glow})`
          ctx.fill()
        })

        // Background particles (digital rain effect)
        particlesRef.current.forEach(p => {
          const dx = mouseRef.current.x - p.x
          const dy = mouseRef.current.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            p.vx += dx * 0.00003
            p.vy += dy * 0.00003
          }
          p.x += p.vx
          p.y += p.vy
          p.vx *= 0.99
          p.vy *= 0.99
          if (p.x < 0) p.x = w
          if (p.x > w) p.x = 0
          if (p.y < 0) p.y = h
          if (p.y > h) p.y = 0

          const pulse = 0.5 + 0.5 * Math.sin(frame * 0.05 + p.phase)
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(100, 200, 255, ${0.3 + 0.2 * pulse})`
          ctx.fill()
        })

        // Cursor glow (tech blue)
        if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
          const glow = ctx.createRadialGradient(
            mouseRef.current.x, mouseRef.current.y, 0,
            mouseRef.current.x, mouseRef.current.y, 120
          )
          glow.addColorStop(0, 'rgba(80, 180, 255, 0.2)')
          glow.addColorStop(0.5, 'rgba(80, 180, 255, 0.05)')
          glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
          ctx.fillStyle = glow
          ctx.fillRect(0, 0, w, h)
        }

      } else {
        // ===== OFF DUTY: Tropical/Nature/Organic =====
        
        // Rainbow aurora at top
        const auroraGradient = ctx.createLinearGradient(0, 0, w * 0.4, h * 0.5)
        auroraGradient.addColorStop(0, 'rgba(255, 100, 200, 0.08)')
        auroraGradient.addColorStop(0.25, 'rgba(255, 200, 100, 0.06)')
        auroraGradient.addColorStop(0.5, 'rgba(100, 255, 200, 0.06)')
        auroraGradient.addColorStop(0.75, 'rgba(100, 150, 255, 0.04)')
        auroraGradient.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = auroraGradient
        ctx.fillRect(0, 0, w, h)

        // Rainbow cursor glow (cycles through hues)
        if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
          const hue = (frame * 2) % 360
          const glow = ctx.createRadialGradient(
            mouseRef.current.x, mouseRef.current.y, 0,
            mouseRef.current.x, mouseRef.current.y, 180
          )
          glow.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.12)`)
          glow.addColorStop(0.3, `hsla(${(hue + 60) % 360}, 70%, 50%, 0.06)`)
          glow.addColorStop(0.6, `hsla(${(hue + 120) % 360}, 60%, 40%, 0.03)`)
          glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
          ctx.fillStyle = glow
          ctx.fillRect(0, 0, w, h)
        }

        // Rainbow background particles (flowing, organic)
        particlesRef.current.forEach((p, i) => {
          const dx = mouseRef.current.x - p.x
          const dy = mouseRef.current.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 250) {
            p.vx += dx * 0.00002
            p.vy += dy * 0.00002
          }
          p.x += p.vx
          p.y += p.vy
          p.vx *= 0.995
          p.vy *= 0.995
          if (p.x < 0) p.x = w
          if (p.x > w) p.x = 0
          if (p.y < 0) p.y = h
          if (p.y > h) p.y = 0

          const hue = (frame + i * 15) % 360
          const pulse = 0.6 + 0.4 * Math.sin(frame * 0.03 + p.phase)
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${0.4 + 0.2 * pulse})`
          ctx.fill()
        })
      }

      // ===== COMMON: Sparkles =====
      sparklesRef.current = sparklesRef.current.filter(s => {
        s.x += s.vx
        s.y += s.vy
        s.life -= s.decay
        s.vx *= 0.96
        s.vy *= 0.96

        if (s.life > 0) {
          const alpha = s.life * 0.8
          ctx.save()
          ctx.translate(s.x, s.y)

          if (s.shape === 'star') {
            ctx.rotate(s.life * 5)
            ctx.beginPath()
            for (let i = 0; i < 4; i++) {
              const angle = (i / 4) * Math.PI * 2
              ctx.moveTo(0, 0)
              ctx.lineTo(Math.cos(angle) * s.size * 2, Math.sin(angle) * s.size * 2)
            }
            ctx.strokeStyle = s.color
            ctx.lineWidth = 1.5
            ctx.shadowColor = s.color
            ctx.shadowBlur = 8
            ctx.stroke()
          } else if (s.shape === 'square') {
            ctx.rotate(s.life * 3)
            ctx.fillStyle = s.color
            ctx.shadowColor = s.color
            ctx.shadowBlur = 6
            ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size)
          } else if (s.shape === 'leaf') {
            // Leaf shape for off-duty
            ctx.beginPath()
            ctx.ellipse(0, 0, s.size, s.size * 0.5, s.life * 2, 0, Math.PI * 2)
            ctx.fillStyle = s.color
            ctx.shadowColor = s.color
            ctx.shadowBlur = 6
            ctx.fill()
          } else {
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, s.size * 2)
            gradient.addColorStop(0, s.color)
            gradient.addColorStop(1, 'rgba(0,0,0,0)')
            ctx.beginPath()
            ctx.arc(0, 0, s.size * 2, 0, Math.PI * 2)
            ctx.fillStyle = gradient
            ctx.fill()
          }

          ctx.restore()
          return true
        }
        return false
      })

      // ===== COMMON: Floating Elements =====
      floatingElementsRef.current = floatingElementsRef.current.filter(c => {
        c.x += c.vx
        c.y += c.vy
        c.life -= c.decay
        c.rotation += c.rotationSpeed

        if (c.life > 0) {
          ctx.save()
          ctx.translate(c.x, c.y)
          ctx.rotate(c.rotation)
          ctx.font = `${c.size}px monospace`
          ctx.fillStyle = c.color + (c.life * 0.6) + ')'
          ctx.shadowColor = c.glowColor
          ctx.shadowBlur = 10
          ctx.fillText(c.text, 0, 0)
          ctx.restore()
          return true
        }
        return false
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      cancelAnimationFrame(animationId)
    }
  }, [isOnDuty])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: 'transparent', pointerEvents: 'none' }}
    />
  )
}
