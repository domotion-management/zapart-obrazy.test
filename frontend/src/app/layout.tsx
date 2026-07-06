import type { Metadata } from 'next'
import { Montserrat, Open_Sans, Inter } from 'next/font/google'
import { getServerI18n } from '@/lib/getLocale'
import { LocaleProvider } from '@/lib/LocaleContext'
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

export const metadata: Metadata = {
  title: 'Włodzimierz Zapart — Malarz | Abstrakcja, Olej, Akryl | Kraków',
  description:
    'Włodzimierz Zapart — malarz abstrakcjonista z Krakowa. Ponad 30 lat twórczości, 200+ obrazów w kolekcjach prywatnych i galeriach w Polsce i za granicą.',
  metadataBase: new URL('https://zapart-obrazy.com'),
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Włodzimierz Zapart',
    title: 'Włodzimierz Zapart — Malarz | Kraków',
    description: 'Malarz abstrakcjonista z Krakowa. Ponad 30 lat twórczości, 200+ obrazów w kolekcjach.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Włodzimierz Zapart — Malarz | Kraków',
    description: 'Malarz abstrakcjonista z Krakowa. Ponad 30 lat twórczości, 200+ obrazów w kolekcjach.',
  },
  robots: 'index, follow',
  authors: [{ name: 'Włodzimierz Zapart' }],
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
        </LocaleProvider>
      </body>
    </html>
  )
}
