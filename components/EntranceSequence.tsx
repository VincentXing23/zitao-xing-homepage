'use client'

import { useEffect, useState } from 'react'

/** A decorative arrival sequence, independent of the page's loading state. */
export function EntranceSequence() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!visible) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const dismiss = () => setVisible(false)
    const onMotionChange = () => {
      if (reducedMotion.matches) dismiss()
    }

    // Deep links and restored scroll positions should go straight to their content.
    if (reducedMotion.matches || window.location.hash || window.scrollY > 0) {
      dismiss()
      return
    }

    const timeout = window.setTimeout(dismiss, 2300)
    const events = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const
    for (const event of events) {
      window.addEventListener(event, dismiss, { passive: true, once: true })
    }
    reducedMotion.addEventListener('change', onMotionChange)
    window.addEventListener('pagehide', dismiss, { once: true })

    return () => {
      window.clearTimeout(timeout)
      for (const event of events) window.removeEventListener(event, dismiss)
      reducedMotion.removeEventListener('change', onMotionChange)
      window.removeEventListener('pagehide', dismiss)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className="entrance-sequence"
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setVisible(false)
      }}
    >
      <div className="entrance-grid" />
      <div className="entrance-scan" />
      <div className="entrance-coordinate entrance-coordinate-top">ZX / PERSONAL SPACE</div>
      <div className="entrance-stage">
        <div className="entrance-orbits">
          <span className="entrance-orbit entrance-orbit-one" />
          <span className="entrance-orbit entrance-orbit-two" />
          <span className="entrance-orbit entrance-orbit-three" />
          <span className="entrance-formula entrance-formula-one">∇f(x)</span>
          <span className="entrance-formula entrance-formula-two">G = (V, E)</span>
          <span className="entrance-formula entrance-formula-three">fθ : X → Y</span>
        </div>
        <div className="entrance-identity">
          <span className="entrance-prompt">&gt; zitao_xing.init()</span>
          <span className="entrance-monogram">Z<span>X</span><i>_</i></span>
          <span className="entrance-name">ZITAO XING</span>
          <span className="entrance-disciplines">MATH <b>×</b> AI <b>×</b> SCIENCE</span>
        </div>
      </div>
      <div className="entrance-coordinate entrance-coordinate-bottom">探索 · 推导 · 构建 / EXPLORE · DERIVE · BUILD</div>
    </div>
  )
}
