import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WcagBar from '@/components/WcagBar'
import { getNavbarFooterData } from '@/lib/queries'
import { getServerI18n } from '@/lib/getLocale'
import { localized } from '@/lib/dictionaries'

export const metadata = {
  title: 'Polityka prywatności — Włodzimierz Zapart',
  description: 'Polityka prywatności i ochrona danych osobowych.',
}

export default async function PrivacyPolicyPage() {
  const navFooterData = await getNavbarFooterData()
  const { artist, settings, showFeatured } = navFooterData as { artist: any; settings: any; showFeatured: boolean }
  const { locale, t } = await getServerI18n()
  
  const privacyText = settings ? localized(settings, 'privacyPolicy', locale) : ''

  return (
    <>
      <Navbar
        artistName={artist?.name}
        tagline={artist ? localized(artist, 'tagline', locale) : undefined}
        instagramUrl={settings?.instagramUrl}
        facebookUrl={settings?.facebookUrl}
        locale={locale}
        showFeatured={showFeatured}
      />
      <main id="main-content" style={{ paddingTop: 'var(--nav-h)' }}>
        <section style={{ padding: 'var(--section-pad) 0', minHeight: '60vh' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="gallery__header" style={{ marginBottom: 48, textAlign: 'left' }}>
              <div className="section-label" style={{ marginBottom: 16 }}>
                <span className="t-label" style={{ color: 'var(--gold)' }}>{t.contact.privacyPolicy}</span>
              </div>
              <h1 className="gallery__title" style={{ textAlign: 'left', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                {t.contact.privacyPolicy}
              </h1>
            </div>
            
            <div style={{ 
              whiteSpace: 'pre-line', 
              fontSize: '0.95rem', 
              lineHeight: '1.8', 
              color: 'var(--ink-muted)' 
            }}>
              {privacyText || (locale === 'de' ? 'Die Datenschutzerklärung wird vorbereitet.' : (locale === 'en' ? 'Privacy policy content is being prepared.' : 'Treść polityki prywatności jest w trakcie przygotowania.'))}
            </div>
          </div>
        </section>
      </main>
      <Footer
        footerTagline={settings ? localized(settings, 'footerTagline', locale) : undefined}
        locale={locale}
        showFeatured={showFeatured}
        signatureUrl={settings?.signatureUrl}
        signatureTitle={settings ? localized(settings, 'signatureTitle', locale) : undefined}
        signatureAriaLabel={settings ? localized(settings, 'signatureAriaLabel', locale) : undefined}
      />
      <WcagBar />
    </>
  )
}
