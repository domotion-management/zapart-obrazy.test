'use client'

import { useCallback, useEffect, useState } from 'react'
import { useLocale } from '@/lib/LocaleContext'

/* Consent Mode v2 — baner zgody na cookies.
   Decyzja trzymana w localStorage; gtag('consent','update') wysyłany tylko
   gdy GA jest obecne (produkcja). Ponowne otwarcie: element z [data-cookie-settings]. */

const STORAGE_KEY = 'cookie-consent'
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000 // po roku pytamy ponownie

interface StoredConsent {
  v: 1
  analytics: boolean
  ts: number
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function readStoredConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredConsent
    if (parsed?.v !== 1 || typeof parsed.analytics !== 'boolean' || typeof parsed.ts !== 'number') return null
    return parsed
  } catch {
    return null
  }
}

function pushConsentUpdate(analytics: boolean) {
  window.gtag?.('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

export default function CookieConsent() {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const stored = readStoredConsent()
    if (!stored || Date.now() - stored.ts > MAX_AGE_MS) {
      setOpen(true)
    }
  }, [])

  // Ponowne otwarcie banera np. z linku "Ustawienia cookies" w stopce
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-cookie-settings]')) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const decide = useCallback((analytics: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, analytics, ts: Date.now() } satisfies StoredConsent))
    } catch {
      /* localStorage niedostępny — zgoda obowiązuje do końca sesji */
    }
    pushConsentUpdate(analytics)
    setOpen(false)
    setShowDetails(false)
  }, [])

  if (!open) return null

  const c = t.cookies
  const rows = [
    { name: 'locale', purpose: c.purposeLocale, duration: c.durationYear, analytics: false },
    { name: 'cookie-consent', purpose: c.purposeConsent, duration: c.durationYear, analytics: false },
    { name: 'wcag-size / wcag-contrast', purpose: c.purposeWcag, duration: c.durationPersistent, analytics: false },
    { name: '_ga', purpose: c.purposeGa, duration: c.durationTwoYears, analytics: true },
    { name: '_ga_*', purpose: c.purposeGaSession, duration: c.durationTwoYears, analytics: true },
  ]

  return (
    <aside className="cookie-consent" role="region" aria-label={c.regionAria}>
      <div className="cookie-consent__inner">
        <span className="t-label cookie-consent__label">{c.label}</span>
        <h2 className="cookie-consent__title">{c.title}</h2>
        <p className="cookie-consent__body">
          {c.body}{' '}
          <a href="/polityka-prywatnosci" className="cookie-consent__link">{c.privacyLink}</a>
        </p>

        {showDetails && (
          <div className="cookie-consent__details">
            <table className="cookie-consent__table" aria-label={c.tableAria}>
              <thead>
                <tr>
                  <th scope="col">{c.colName}</th>
                  <th scope="col">{c.colPurpose}</th>
                  <th scope="col">{c.colDuration}</th>
                  <th scope="col">{c.colType}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name}>
                    <td className="cookie-consent__name">{row.name}</td>
                    <td>{row.purpose}</td>
                    <td>{row.duration}</td>
                    <td>
                      <span className={`cookie-consent__badge ${row.analytics ? 'cookie-consent__badge--analytics' : ''}`}>
                        {row.analytics ? c.typeAnalytics : c.typeNecessary}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="cookie-consent__actions">
          <button type="button" className="btn-primary" onClick={() => decide(true)}>
            {c.acceptAll}
          </button>
          <button type="button" className="cookie-consent__btn-secondary" onClick={() => decide(false)}>
            {c.necessaryOnly}
          </button>
          <button
            type="button"
            className="cookie-consent__toggle"
            aria-expanded={showDetails}
            onClick={() => setShowDetails((d) => !d)}
          >
            {showDetails ? c.hideDetails : c.showDetails}
          </button>
        </div>
      </div>
    </aside>
  )
}
