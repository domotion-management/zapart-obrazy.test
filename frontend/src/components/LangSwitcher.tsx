'use client'

import { useLocale } from '@/lib/LocaleContext'
import type { Locale } from '@/lib/dictionaries'

export default function LangSwitcher() {
  const { locale, setLocale } = useLocale()

  const handleSwitch = (l: Locale) => {
    if (l !== locale) setLocale(l)
  }

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      <button
        className={`lang-switcher__btn ${locale === 'pl' ? 'is-active' : ''}`}
        onClick={() => handleSwitch('pl')}
        aria-pressed={locale === 'pl'}
        aria-label="Polski"
      >
        PL
      </button>
      <span className="lang-switcher__sep" aria-hidden="true">|</span>
      <button
        className={`lang-switcher__btn ${locale === 'en' ? 'is-active' : ''}`}
        onClick={() => handleSwitch('en')}
        aria-pressed={locale === 'en'}
        aria-label="English"
      >
        EN
      </button>
      <span className="lang-switcher__sep" aria-hidden="true">|</span>
      <button
        className={`lang-switcher__btn ${locale === 'de' ? 'is-active' : ''}`}
        onClick={() => handleSwitch('de')}
        aria-pressed={locale === 'de'}
        aria-label="Deutsch"
      >
        DE
      </button>
    </div>
  )
}
