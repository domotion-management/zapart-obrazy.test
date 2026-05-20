import { type Locale, getDictionary } from '@/lib/dictionaries'

export default function Footer({ footerTagline, locale }: { footerTagline?: string; locale: Locale }) {
  const t = getDictionary(locale)

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          <div>
            <div className="footer__brand-name">Włodzimierz Zapart</div>
            <div className="footer__brand-sub">zapart-obrazy.com</div>
          </div>
          <nav className="footer__nav" aria-label={t.nav.footerNav}>
            <a href="/#o-mnie">{t.nav.about}</a>
            <a href="/#wybrane-prace">{t.footer.works}</a>
            <a href="/#galeria">{t.nav.gallery}</a>
            <a href="/#kontakt">{t.nav.contact}</a>
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
  )
}
