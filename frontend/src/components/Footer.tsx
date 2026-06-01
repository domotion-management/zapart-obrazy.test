import { type Locale, getDictionary } from '@/lib/dictionaries'

interface FooterProps {
  footerTagline?: string
  locale: Locale
  showFeatured?: boolean
  signatureUrl?: string
  signatureTitle?: string
  signatureAriaLabel?: string
}

export default function Footer({
  footerTagline,
  locale,
  showFeatured = false,
  signatureUrl,
  signatureTitle,
  signatureAriaLabel
}: FooterProps) {
  const t = getDictionary(locale)

  return (
    <>
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer__inner">
            <div>
              <div className="footer__brand-name">Włodzimierz Zapart</div>
              <div className="footer__brand-sub">zapart-obrazy.com</div>
            </div>
            <nav className="footer__nav" aria-label={t.nav.footerNav}>
              <a href="/#o-mnie">{t.nav.about}</a>
              {showFeatured && <a href="/#wybrane-prace">{t.footer.works}</a>}
              <a href="/#galeria">{t.nav.gallery}</a>
              <a href="/#kontakt">{t.nav.contact}</a>
              <a href="/polityka-prywatnosci">{t.contact.privacyPolicy}</a>
            </nav>
          </div>
          <div className="footer__bottom">
            <span className="footer__copy">
              {t.footer.copyright(new Date().getFullYear())}
            </span>
            {footerTagline && (
              <span className="footer__tagline">{footerTagline}</span>
            )}
          </div>
        </div>
      </footer>
      <div className="footer__signature">
        <div className="container">
          <span>
            {locale === 'en' ? 'Designed & developed by ' : (locale === 'de' ? 'Design & Entwicklung von ' : 'Projekt i wykonanie: ')}
            <a
              href={signatureUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__signature-link"
              title={signatureTitle}
              aria-label={signatureAriaLabel}
            >
              DOMINIUM
            </a>
          </span>
        </div>
      </div>
    </>
  )
}
