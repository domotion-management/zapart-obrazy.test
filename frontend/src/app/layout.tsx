import type { Metadata } from 'next'
import { Montserrat, Open_Sans, Inter } from 'next/font/google'
import { getServerI18n } from '@/lib/getLocale'
import { LocaleProvider } from '@/lib/LocaleContext'
import { localized } from '@/lib/dictionaries'
import { urlFor } from '@/lib/sanity.image'
import { SITE_URL } from '@/lib/site'
import CookieConsent from '@/components/CookieConsent'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-open-sans',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const FALLBACK_TITLE = 'Włodzimierz Zapart — Malarz Abstrakcjonista | Poznań'
const FALLBACK_DESCRIPTION =
  'Włodzimierz Zapart — malarz abstrakcjonista z Poznania. Ponad 35 lat twórczości, 350+ obrazów w kolekcjach prywatnych i galeriach w Polsce i za granicą.'

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getServerI18n()

  let settings: Awaited<ReturnType<typeof import('@/lib/queries').getSiteSettings>> = null
  try {
    const { getSiteSettings } = await import('@/lib/queries')
    settings = await getSiteSettings()
  } catch { /* Sanity not configured — static fallbacks */ }

  const s = settings as Record<string, unknown> | null
  const title = (s && localized(s, 'seoTitle', locale)) || FALLBACK_TITLE
  const description = (s && localized(s, 'seoDescription', locale)) || FALLBACK_DESCRIPTION

  let ogImageUrl: string | undefined
  try {
    if (s?.heroImage) {
      ogImageUrl = urlFor(s.heroImage as Parameters<typeof urlFor>[0]).width(1200).height(630).fit('crop').url() || undefined
    }
  } catch { /* keep metadata without image */ }

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      type: 'website',
      locale: 'pl_PL',
      siteName: 'Włodzimierz Zapart',
      title,
      description,
      ...(ogImageUrl ? { images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
    robots: 'index, follow',
    authors: [{ name: 'Włodzimierz Zapart' }],
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { locale, t } = await getServerI18n()

  return (
    <html lang={locale} className={`scroll-smooth ${montserrat.variable} ${openSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#141210" />
        <script dangerouslySetInnerHTML={{__html: `
          (function() {
            try {
              var s = localStorage.getItem('wcag-size');
              if (s) {
                document.documentElement.style.fontSize = s + 'px';
              }
              var c = localStorage.getItem('wcag-contrast');
              if (c === '1') {
                document.documentElement.classList.add('high-contrast');
              }
            } catch (e) {}
          })();
        `}} />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-nav">
          {t.skipNav}
        </a>
        <LocaleProvider initial={locale}>
          {children}
          <CookieConsent />
        </LocaleProvider>
      </body>
    </html>
  )
}
