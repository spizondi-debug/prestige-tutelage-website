import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { qualifications, nqfLevels } from '../data/programmes.js'
import { usePrefersReducedMotion } from '../lib/motion.js'

/**
 * The NQF ladder, in three dimensions.
 *
 * Every node is a real Prestige qualification placed on the plane of the NQF
 * level it actually sits at, so the object teaches the thing it depicts: the
 * ladder is genuinely 5 levels deep, the rings are genuinely uneven, and the
 * wide NQF 5 ring next to the single node at NQF 6 is what the catalogue
 * actually looks like. Nothing here is invented or padded for symmetry.
 *
 * Rendered with a hand-rolled perspective projection on a 2D canvas rather
 * than a 3D library: the whole scene is ~26 nodes and a few dozen lines, and
 * the existing budget for this page does not have 200KB of WebGL in it.
 *
 * Colour follows the house semantics — Electric Blue where learning starts,
 * Growth Green where it arrives.
 */

const BLUE = [21, 133, 216]
const GREEN = [69, 185, 92]

// Geometry, in scene units. Tuned so the whole stack sits inside the frame
// at the narrowest supported width without clipping.
const RING_RADIUS = 132
const LEVEL_GAP = 62
const FOCAL = 560

function buildScene() {
  const byLevel = new Map()
  for (const q of qualifications) {
    if (!byLevel.has(q.nqf)) byLevel.set(q.nqf, [])
    byLevel.get(q.nqf).push(q)
  }

  const levels = [...nqfLevels].sort((a, b) => a - b)
  const mid = (levels.length - 1) / 2

  const nodes = []
  for (const [i, level] of levels.entries()) {
    const group = byLevel.get(level) ?? []
    // Progress up the ladder, 0 at the bottom level and 1 at the top.
    const t = levels.length > 1 ? i / (levels.length - 1) : 0
    // A single node reads as an accident on a wide ring, so tighten the
    // radius when a level is sparsely populated.
    const radius = RING_RADIUS * (group.length === 1 ? 0.001 : 0.62 + 0.38 * Math.min(1, group.length / 8))

    group.forEach((q, j) => {
      const theta = (j / group.length) * Math.PI * 2 + i * 0.4
      nodes.push({
        q,
        level,
        levelIndex: i,
        t,
        theta,
        radius,
        // Negative y is up the screen, and NQF 6 belongs at the top.
        y: (mid - i) * LEVEL_GAP,
      })
    })
  }

  return { levels, nodes, byLevel }
}

const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`
const mixC = (a, b, t) => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
]

export default function QualificationLattice({ className = '' }) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [hover, setHover] = useState(null)

  // The pointer lives in a ref so moving the mouse never re-renders React;
  // only a change of hovered node does.
  const pointer = useRef({ x: -9999, y: -9999, inside: false })
  const hoverRef = useRef(null)

  // Pointer events rather than mouse events, so a tap works as well as a
  // hover — the caption promises tapping, so it has to actually do something.
  const onMove = useCallback((e) => {
    const r = canvasRef.current?.getBoundingClientRect()
    if (!r) return
    pointer.current = {
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      inside: true,
      touch: e.pointerType !== 'mouse',
    }
  }, [])

  // Only a departing mouse clears the selection. A touch has nowhere to
  // "leave" to, so a tapped node stays readable until the next tap.
  const onLeave = useCallback((e) => {
    if (e && e.pointerType && e.pointerType !== 'mouse') return
    pointer.current = { x: -9999, y: -9999, inside: false, touch: false }
  }, [])

  // The catalogue is static, so the scene is built once and shared by the
  // canvas and the text equivalent below it.
  const scene = useMemo(buildScene, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let running = true
    let rot = 0.6
    let last = performance.now()

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Scale the scene to the frame so it never clips on a narrow canvas.
    const sceneScale = () => Math.min(1.15, w / 520, h / 430)

    const project = (n, rotation, cx, cy, k) => {
      const x = Math.cos(n.theta + rotation) * n.radius
      const z = Math.sin(n.theta + rotation) * n.radius
      const depth = FOCAL / (FOCAL + z)
      return {
        x: cx + x * depth * k,
        y: cy + n.y * depth * k,
        depth,
        z,
      }
    }

    const draw = (now) => {
      if (!running) return
      const dt = Math.min(64, now - last)
      last = now

      if (!reduced) {
        // Slow the rotation while the pointer is over the object so a node
        // can actually be read before it turns away.
        rot += (pointer.current.inside ? 0.00006 : 0.00019) * dt
      }

      // Offset right so the object clears the label gutter.
      const cx = w / 2 + Math.min(58, w * 0.09)
      const cy = h / 2
      const k = sceneScale()
      ctx.clearRect(0, 0, w, h)

      const pts = scene.nodes.map((n) => ({ n, p: project(n, rot, cx, cy, k) }))

      // Ring outlines, drawn behind everything.
      for (const [i, level] of scene.levels.entries()) {
        const group = scene.nodes.filter((n) => n.level === level)
        if (group.length < 2) continue
        const t = group[0].t
        const col = mixC(BLUE, GREEN, t)
        ctx.beginPath()
        for (let a = 0; a <= 64; a++) {
          const theta = (a / 64) * Math.PI * 2
          const p = project(
            { theta, radius: group[0].radius, y: group[0].y },
            rot, cx, cy, k,
          )
          if (a === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.strokeStyle = rgba(col, 0.14)
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Progression lines: each node reaches up toward the level above it.
      ctx.lineWidth = 1
      for (const { n, p } of pts) {
        if (n.levelIndex === 0) continue
        const below = pts.filter((o) => o.n.levelIndex === n.levelIndex - 1)
        if (!below.length) continue
        // Connect to the nearest node on the level below, by angle.
        let best = below[0]
        let bestD = Infinity
        for (const o of below) {
          const d = Math.abs(Math.atan2(
            Math.sin(o.n.theta - n.theta),
            Math.cos(o.n.theta - n.theta),
          ))
          if (d < bestD) { bestD = d; best = o }
        }
        const col = mixC(BLUE, GREEN, (n.t + best.n.t) / 2)
        ctx.strokeStyle = rgba(col, 0.2 * Math.min(p.depth, best.p.depth))
        ctx.beginPath()
        ctx.moveTo(best.p.x, best.p.y)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }

      // Painter's algorithm — far nodes first.
      pts.sort((a, b) => b.p.z - a.p.z)

      // Hit-test in screen space against the nearest node to the pointer.
      let hit = null
      if (pointer.current.inside) {
        let bestD = pointer.current.touch ? 34 : 22
        for (const item of pts) {
          const d = Math.hypot(item.p.x - pointer.current.x, item.p.y - pointer.current.y)
          if (d < bestD) { bestD = d; hit = item }
        }
      }

      for (const { n, p } of pts) {
        const col = mixC(BLUE, GREEN, n.t)
        const isHit = hit && hit.n === n
        const r = (isHit ? 6.5 : 4.2) * p.depth

        // Halo
        ctx.fillStyle = rgba(col, (isHit ? 0.3 : 0.13) * p.depth)
        ctx.beginPath()
        ctx.arc(p.x, p.y, r * 2.6, 0, Math.PI * 2)
        ctx.fill()

        // Core — people read as white, as everywhere else on the site.
        ctx.fillStyle = isHit
          ? 'rgba(255,255,255,0.98)'
          : `rgba(255,255,255,${0.55 + 0.4 * p.depth})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = rgba(col, 0.9 * p.depth)
        ctx.lineWidth = isHit ? 2 : 1.2
        ctx.stroke()
      }

      // Level labels live in a fixed gutter down the left edge, and take their
      // y from the ring's centre (radius 0) rather than a point on the ring —
      // otherwise they swing with the rotation and collide with the nodes.
      ctx.font = '600 11px "DM Sans", Inter, Arial, sans-serif'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      const labelX = 4
      for (const level of scene.levels) {
        const group = scene.nodes.filter((n) => n.level === level)
        if (!group.length) continue
        const centre = project({ theta: 0, radius: 0, y: group[0].y }, rot, cx, cy, k)
        const col = mixC(BLUE, GREEN, group[0].t)
        ctx.fillStyle = rgba(col, 0.95)
        ctx.fillText(`NQF ${level}`, labelX, centre.y - 7)
        ctx.fillStyle = 'rgba(255,255,255,0.42)'
        ctx.fillText(
          `${group.length} ${group.length === 1 ? 'qualification' : 'qualifications'}`,
          labelX,
          centre.y + 8,
        )
      }

      // Publish the hovered node to React only when it actually changes.
      const nextId = hit ? hit.n.q.saqaId + ':' + hit.n.level : null
      if (nextId !== hoverRef.current) {
        hoverRef.current = nextId
        setHover(hit ? { q: hit.n.q, x: hit.p.x, y: hit.p.y } : null)
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduced) {
      // One still frame of the resolved object. No loop, no listeners.
      draw(performance.now())
      running = false
      cancelAnimationFrame(raf)
      return () => window.removeEventListener('resize', resize)
    }

    let onScreen = true
    const gate = () => {
      const should = onScreen && !document.hidden
      if (should === running) return
      running = should
      if (should) { last = performance.now(); raf = requestAnimationFrame(draw) }
      else cancelAnimationFrame(raf)
    }
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; gate() }, { rootMargin: '150px' })
    io.observe(canvas)
    document.addEventListener('visibilitychange', gate)
    raf = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', gate)
    }
  }, [reduced, scene])

  return (
    <div ref={wrapRef} className={`relative ${className}`.trim()}>
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={onLeave}
        onPointerCancel={onLeave}
        aria-hidden="true"
      />

      {hover && (
        <div
          className="pointer-events-none absolute z-10 max-w-[15rem] -translate-x-1/2 -translate-y-full rounded-lg border border-white/15 bg-midnight/95 px-3.5 py-2.5 shadow-premium backdrop-blur"
          style={{ left: hover.x, top: hover.y - 14 }}
        >
          <p className="font-display text-sm font-semibold leading-snug text-white">{hover.q.name}</p>
          <p className="mt-1 text-[0.7rem] text-white/60">
            SAQA ID {hover.q.saqaId} · NQF {hover.q.nqf}
            {hover.q.credits ? ` · ${hover.q.credits} credits` : ''}
          </p>
        </div>
      )}

      {/* The canvas carries real information, so it needs a real text
          equivalent rather than being hidden and left at that. */}
      <div className="sr-only">
        <h3>Prestige Tutelage qualifications by NQF level</h3>
        <ul>
          {scene.levels.map((level) => {
            const group = scene.nodes.filter((n) => n.level === level)
            return (
              <li key={level}>
                NQF {level}: {group.length} {group.length === 1 ? 'qualification' : 'qualifications'} —{' '}
                {group.map((n) => `${n.q.name} (SAQA ID ${n.q.saqaId})`).join(', ')}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
