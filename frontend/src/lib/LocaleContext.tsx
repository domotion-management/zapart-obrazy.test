'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { type Locale, type Dictionary, getDictionary, DEFAULT_LOCALE } from './dictionaries'

interface LocaleContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Dictionary
}

const LocaleCtx = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: getDictionary(DEFAULT_LOCALE),
})

export function LocaleProvider({ initial, children }: { initial: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initial)

  const setLocale = useCallback((l: Locale) => {
    // Set cookie (max-age 1 year)
    document.cookie = `locale=${l};path=/;max-age=31536000;SameSite=Lax`
    setLocaleState(l)
    // Reload so server components pick up the new locale from the cookie
    window.location.reload()
  }, [])

  return (
    <LocaleCtx.Provider value={{ locale, setLocale, t: getDictionary(locale) }}>
      {children}
    </LocaleCtx.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleCtx)
}
