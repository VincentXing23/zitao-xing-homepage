'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

type Vec3 = [number, number, number]
const derivative = ([x, y, z]: Vec3): Vec3 => [10 * (y - x), x * (28 - z) - y, x * y - (8 / 3) * z]
const add = (a: Vec3, b: Vec3, scale: number): Vec3 => a.map((v, i) => v + b[i] * scale) as Vec3

function trajectory() {
  let point: Vec3 = [0.1, 0, 0]
  const points: Vec3[] = []
  const dt = 0.008
  for (let i = 0; i < 3300; i++) {
    const a = derivative(point)
    const b = derivative(add(point, a, dt / 2))
    const c = derivative(add(point, b, dt / 2))
    const d = derivative(add(point, c, dt))
    point = point.map((value, j) => value + dt * (a[j] + 2 * b[j] + 2 * c[j] + d[j]) / 6) as Vec3
    if (i >= 500) points.push([point[0], point[1], point[2] - 25])
  }
  return points
}

export function ResearchField({ locale }: { locale: 'zh' | 'en' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const elapsedRef = useRef(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !wrapper || !context) return
    const points = trajectory()
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0, height = 0, frame = 0, last = 0, elapsed = elapsedRef.current
    let inView = true
    const project = (x: number, y: number, z: number, angle: number): [number, number] => {
      const rotated = x * Math.cos(angle) - y * Math.sin(angle)
      const depth = x * Math.sin(angle) + y * Math.cos(angle)
      const scale = Math.min(width / 66, height / 58)
      return [width / 2 + rotated * scale, height / 2 - (z * 0.93 - depth * 0.28) * scale]
    }
    const draw = () => {
      context.clearRect(0, 0, width, height)
      const angle = -0.35 + Math.sin(elapsed * 0.00012) * 0.6
      context.lineWidth = 1
      context.strokeStyle = '#45617d25'
      for (let x = -30; x <= 30; x += 6) {
        context.beginPath()
        for (let y = -30; y <= 30; y += 3) {
          const p = project(x, y, -22, angle)
          if (y === -30) context.moveTo(...p); else context.lineTo(...p)
        }
        context.stroke()
      }
      for (let y = -30; y <= 30; y += 6) {
        const a = project(-30, y, -22, angle), b = project(30, y, -22, angle)
        context.beginPath(); context.moveTo(...a); context.lineTo(...b); context.stroke()
      }
      const gradient = context.createLinearGradient(width * .15, height * .2, width * .8, height * .85)
      gradient.addColorStop(0, '#78ffe0'); gradient.addColorStop(.55, '#5cd8ef'); gradient.addColorStop(1, '#c987e8')
      context.beginPath()
      points.forEach((p, i) => {
        const projected = project(...p, angle)
        if (i === 0) context.moveTo(...projected); else context.lineTo(...projected)
      })
      context.strokeStyle = gradient
      context.globalAlpha = .055; context.lineWidth = 7; context.stroke()
      context.globalAlpha = .62; context.lineWidth = .8; context.stroke()
      context.globalAlpha = 1
      for (let i = 0; i < 3; i++) {
        const p = points[(Math.floor(elapsed * .075) + i * 827) % points.length]
        const [x, y] = project(...p, angle)
        context.beginPath(); context.arc(x, y, 3, 0, Math.PI * 2)
        context.fillStyle = '#e8ffad'; context.fill()
        context.beginPath(); context.arc(x, y, 8, 0, Math.PI * 2)
        context.fillStyle = '#e8ffad14'; context.fill()
      }
    }
    const tick = (time: number) => {
      frame = 0
      if (!inView || document.hidden || paused || media.matches) return
      if (time - last > 32) {
        elapsed += last ? Math.min(time - last, 64) : 0
        elapsedRef.current = elapsed
        last = time; draw()
      }
      frame = window.requestAnimationFrame(tick)
    }
    const schedule = () => {
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0; last = 0; draw()
      if (inView && !document.hidden && !paused && !media.matches) frame = window.requestAnimationFrame(tick)
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height
      const dpr = Math.min(window.devicePixelRatio || 1, width < 420 ? 1.5 : 2)
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0); schedule()
    })
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; schedule() })
    resize.observe(wrapper); observer.observe(wrapper)
    document.addEventListener('visibilitychange', schedule)
    media.addEventListener('change', schedule)
    return () => {
      window.cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect()
      document.removeEventListener('visibilitychange', schedule); media.removeEventListener('change', schedule)
    }
  }, [paused])

  return (
    <figure className="research-field">
      <div className="field-heading"><span><i /> DYNAMICAL SYSTEMS</span>
        <button className="field-toggle" onClick={() => setPaused(!paused)} disabled={reduced} aria-label={locale === 'zh' ? (paused ? '继续播放轨迹动画' : '暂停轨迹动画') : (paused ? 'Play visualization' : 'Pause visualization')} aria-pressed={paused || reduced}>
          {paused || reduced ? <Play size={14} /> : <Pause size={14} />}
          <span>{reduced ? (locale === 'zh' ? '静态' : 'Static') : (paused ? (locale === 'zh' ? '播放' : 'Play') : (locale === 'zh' ? '暂停' : 'Pause'))}</span>
        </button>
      </div>
      <div ref={wrapperRef} className="field-canvas-wrap">
        <canvas ref={canvasRef} role="img" aria-label={locale === 'zh' ? '洛伦兹吸引子的三维轨迹数值可视化' : 'Numerically integrated three-dimensional Lorenz attractor trajectory'} />
        <span className="field-axis field-axis-y">z</span><span className="field-axis field-axis-x">x →</span>
        <span className="field-equation">ẋ = σ(y − x)<br />ẏ = x(ρ − z) − y<br />ż = xy − βz</span>
      </div>
      <figcaption className="field-caption"><div><span className="field-index">FIG. 01</span><strong>{locale === 'zh' ? '洛伦兹吸引子：混沌中的秩序' : 'Order within chaos.'}</strong></div><span>LORENZ ATTRACTOR<br />σ = 10 · ρ = 28 · β = 8/3</span></figcaption>
    </figure>
  )
}
