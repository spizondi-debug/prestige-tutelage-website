import { useEffect, useRef } from 'react'
import { particleBudget, usePrefersReducedMotion } from '../lib/motion.js'

/**
 * THE PRESTIGE PATH
 *
 * The signature visual: potential → learning → skills → capability → growth.
 * Particles are people; links are the pathways between them; blue is learning,
 * green is growth, white is opportunity.
 *
 * `stage` (0 → 3) drives the whole system, so the same object reads as
 * scattered potential, connecting pathways, an organisational network, and a
 * resolved composition — one object evolving, not four different graphics.
 *
 * Built on Canvas 2D rather than WebGL on purpose. The scene is particles and
 * lines; a 2D canvas renders it at 60fps on mid-range phones and adds nothing
 * to the bundle, where Three.js and a scroll library would have added roughly
 * 200KB gzipped to every page load. Luxury does not mean slow.
 *
 * Accessibility: this is decoration. Every word of the story is real HTML
 * elsewhere in the DOM, and the canvas is aria-hidden. Under reduced motion it
 * paints one still frame of the resolved composition and never animates.
 */
export default function PrestigePath({ stage = 0, className = '', intensity = 1 }) {
  const canvasRef = useRef(null)
  const stageRef = useRef(stage)
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const reduced = usePrefersReducedMotion()

  stageRef.current = stage

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let particles = []
    let raf = 0
    let running = true

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    // Each particle carries four homes — one per stage — and eases between
    // them, so the transformation is continuous rather than a cut.
    const build = () => {
      const count = Math.round(particleBudget() * intensity)
      particles = new Array(count).fill(0).map((_, i) => {
        const t = i / count
        const scatter = { x: Math.random() * w, y: Math.random() * h }

        // Stage 1 — three flowing pathways across the canvas
        const lane = i % 3
        const laneY = h * (0.34 + lane * 0.16)
        const px = t * w * 1.08 - w * 0.04
        const path = { x: px, y: laneY + Math.sin(t * Math.PI * 2 + lane) * h * 0.06 }

        // Stage 2 — clustered network around organisational hubs
        const hub = i % 5
        const hx = w * (0.18 + hub * 0.16)
        const hy = h * (0.5 + Math.sin(hub * 1.7) * 0.16)
        const ang = (i / count) * Math.PI * 12 + hub
        const rad = (0.06 + ((i * 37) % 100) / 100 * 0.1) * Math.min(w, h)
        const net = { x: hx + Math.cos(ang) * rad, y: hy + Math.sin(ang) * rad }

        // Stage 3 — a single ascending ribbon: the resolved Prestige Path
        const rt = t
        const ribbon = {
          x: rt * w * 1.05 - w * 0.025,
          y: h * 0.74 - Math.pow(rt, 1.35) * h * 0.46 + Math.sin(rt * Math.PI * 3) * h * 0.045,
        }

        return {
          homes: [scatter, path, net, ribbon],
          x: scatter.x,
          y: scatter.y,
          z: 0.35 + Math.random() * 0.65,          // depth → size, alpha, parallax
          drift: Math.random() * Math.PI * 2,
          speed: 0.15 + Math.random() * 0.35,
          hue: Math.random(),                       // 0 blue … 1 green
        }
      })
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const draw = (time) => {
      if (!running) return
      const s = stageRef.current
      const idx = Math.min(3, Math.floor(s))
      const nextIdx = Math.min(3, idx + 1)
      const blend = s - idx

      pointer.current.x = lerp(pointer.current.x, pointer.current.tx, 0.06)
      pointer.current.y = lerp(pointer.current.y, pointer.current.ty, 0.06)

      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      const t = time * 0.001
      // Links appear as pathways form and thin out again once resolved.
      const linkStrength = s < 0.6 ? 0 : Math.min(1, (s - 0.6) / 0.8) * (s > 2.6 ? 1 - (s - 2.6) * 0.55 : 1)
      const linkDist = Math.min(w, h) * (s < 2 ? 0.13 : 0.1)

      for (const p of particles) {
        const a = p.homes[idx]
        const b = p.homes[nextIdx]
        const hx = lerp(a.x, b.x, blend)
        const hy = lerp(a.y, b.y, blend)

        // Idle drift keeps the object alive when the scroll is still.
        const wob = s < 0.5 ? 12 : 5
        const tx = hx + Math.sin(t * p.speed + p.drift) * wob
        const ty = hy + Math.cos(t * p.speed * 0.9 + p.drift) * wob

        // Parallax by depth — far particles barely move with the pointer.
        p.x = lerp(p.x, tx + pointer.current.x * 26 * p.z, 0.055)
        p.y = lerp(p.y, ty + pointer.current.y * 26 * p.z, 0.055)
      }

      if (linkStrength > 0.01) {
        ctx.lineWidth = 1
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          for (let j = i + 1; j < i + 7 && j < particles.length; j++) {
            const q = particles[j]
            const dx = p.x - q.x
            const dy = p.y - q.y
            const d = Math.hypot(dx, dy)
            if (d > linkDist) continue
            const alpha = (1 - d / linkDist) * 0.85 * linkStrength * Math.min(p.z, q.z)
            // Colour flows along the path: blue where learning begins,
            // green where it turns into growth.
            const mix = (p.x / w + p.hue * 0.25) % 1
            ctx.strokeStyle =
              mix < 0.5
                ? `rgba(76,135,255,${alpha})`
                : `rgba(47,227,160,${alpha})`
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        const r = (s > 2.4 ? 2.15 : 1.7) * p.z
        const glow = 0.5 + 0.5 * Math.sin(t * 0.8 + p.drift)
        // People read as white; the pathway light is blue → green.
        const warm = Math.min(1, Math.max(0, (p.x / w) * 1.2 - 0.1))
        const cr = Math.round(lerp(150, 90, warm))
        const cg = Math.round(lerp(190, 235, warm))
        const cb = Math.round(lerp(255, 190, warm))
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${(0.62 + glow * 0.38) * p.z})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(draw)
    }

    const onPointer = (e) => {
      pointer.current.tx = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.current.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduced) {
      // One still frame of the resolved composition — no loop, no listeners.
      stageRef.current = 3
      for (const p of particles) { p.x = p.homes[3].x; p.y = p.homes[3].y }
      draw(0)
      running = false
      cancelAnimationFrame(raf)
      return () => window.removeEventListener('resize', resize)
    }

    window.addEventListener('pointermove', onPointer, { passive: true })

    // The loop runs only when the canvas is both on screen and in a visible
    // tab. Several Paths can be mounted at once, so an off-screen one must
    // cost nothing — otherwise every instance animates for the whole page.
    let onScreen = true
    const gate = () => {
      const should = onScreen && !document.hidden
      if (should === running) return
      running = should
      if (should) raf = requestAnimationFrame(draw)
      else cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        gate()
      },
      { rootMargin: '150px' },
    )
    io.observe(canvas)

    document.addEventListener('visibilitychange', gate)
    raf = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', gate)
    }
  }, [reduced, intensity])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
