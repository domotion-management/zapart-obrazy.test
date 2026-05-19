'use client'

import { useEffect, useRef } from 'react'
import { useLocale } from '@/lib/LocaleContext'
import type { Locale } from '@/lib/dictionaries'

export default function Hero({
  label,
  headline,
  headlineAccent,
  tagline,
  heroImageUrl,
  locale: _locale,
}: {
  label?: string
  headline?: string
  headlineAccent?: string
  tagline?: string
  heroImageUrl?: string
  locale?: Locale
}) {
  const { t } = useLocale()
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bgRef.current
    if (el) setTimeout(() => el.classList.add('loaded'), 100)
  }, [])

  const bgStyle = heroImageUrl
    ? { backgroundImage: `url('${heroImageUrl}')` }
    : undefined

  return (
    <section className="hero" id="hero" aria-label={t.hero.sectionAria}>
      <div
        className="hero__bg"
        ref={bgRef}
        role="img"
        aria-label={t.hero.bgAria}
        style={bgStyle}
      />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <div className="hero__content">
        <div className="container">
          <p className="t-label hero__label">{label}</p>
          <h1 className="hero__title">
            {headline}
            <br />
            <em>{headlineAccent}</em>
          </h1>
          {tagline && (
            <p className="hero__tagline" dangerouslySetInnerHTML={{ __html: tagline }} />
          )}
          <div className="hero__actions">
            <a href="#galeria" className="btn-primary">
              <span>{t.hero.cta}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#kontakt" className="btn-ghost">
              {t.hero.ctaSecondary}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="hero__scroll-line" aria-hidden="true">
        <span className="hero__scroll-text">{t.hero.scroll}</span>
        <div className="hero__scroll-bar" />
      </div>
    </section>
  )
}
