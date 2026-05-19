'use client'

import { useEffect, useState } from 'react'
import { useLocale } from '@/lib/LocaleContext'

export default function WcagBar() {
  const { t } = useLocale()
  const [size, setSize] = useState(16)
  const [hc, setHc] = useState(false)

  useEffect(() => {
    const s = parseInt(localStorage.getItem('wcag-size') || '16', 10)
    const c = localStorage.getItem('wcag-contrast') === '1'
    setSize(s)
    setHc(c)
  }, [])

  useEffect(() => {
    document.documentElement.style.fontSize = size + 'px'
    localStorage.setItem('wcag-size', String(size))
  }, [size])

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', hc)
    localStorage.setItem('wcag-contrast', hc ? '1' : '0')
  }, [hc])

  return (
    <div className="wcag-bar" role="group" aria-label={t.wcag.groupAria}>
      <button className="wcag-btn" onClick={() => setSize((s) => Math.max(12, s - 2))} aria-label={t.wcag.decreaseFont} title={t.wcag.decreaseFont}>
        A−
      </button>
      <button className="wcag-btn" onClick={() => setSize((s) => Math.min(22, s + 2))} aria-label={t.wcag.increaseFont} title={t.wcag.increaseFont}>
        A+
      </button>
      <button className={`wcag-btn wcag-btn--contrast ${hc ? 'is-active' : ''}`} onClick={() => setHc((c) => !c)} aria-label={t.wcag.highContrast} aria-pressed={hc} title={t.wcag.highContrast}>
        ◐
      </button>
    </div>
  )
}
