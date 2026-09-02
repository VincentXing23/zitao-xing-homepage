'use client'

import { useEffect, useRef } from 'react'

export function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      if (!container || reducedMotion.matches) return

      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(window.scrollY / scrollRange, 0), 1)
      container.style.setProperty('--ambient-scroll-x', `${(progress - 0.5) * 28}px`)
      container.style.setProperty('--ambient-scroll-y', `${progress * 150}px`)
      container.style.setProperty('--ambient-scroll-rotate', `${progress * 4}deg`)
    }

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    reducedMotion.addEventListener('change', scheduleUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      reducedMotion.removeEventListener('change', scheduleUpdate)
    }
  }, [])

  return (
    <div ref={containerRef} className="ambient-background" aria-hidden="true">
      <div className="ambient-grid" />
      <div className="ambient-orb ambient-orb-teal" />
      <div className="ambient-orb ambient-orb-amber" />
      <div className="ambient-noise" />
    </div>
  )
}
