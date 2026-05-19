import { cookies } from 'next/headers'
import { type Locale, type Dictionary, getDictionary, DEFAULT_LOCALE, LOCALES } from './dictionaries'

/**
 * Read locale from cookies (server-side, for RSC / generateMetadata).
 */
export async function getLocaleFromCookies(): Promise<Locale> {
  const cookieStore = await cookies()
  const raw = cookieStore.get('locale')?.value
  if (raw && LOCALES.includes(raw as Locale)) return raw as Locale
  return DEFAULT_LOCALE
}

/**
 * Get locale + dictionary on the server side.
 */
export async function getServerI18n(): Promise<{ locale: Locale; t: Dictionary }> {
  const locale = await getLocaleFromCookies()
  return { locale, t: getDictionary(locale) }
}
