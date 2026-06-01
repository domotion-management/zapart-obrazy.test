'use client'

import { useState, useCallback, useRef } from 'react'
import RevealOnScroll from './RevealOnScroll'
import Lightbox from './Lightbox'
import { useLocale } from '@/lib/LocaleContext'
import { localized, formatPrice, type Locale } from '@/lib/dictionaries'

export interface ArtworkItem {
  _id: string
  title: string
  title_en?: string
  title_de?: string
  mainImageUrl: string
  mainImageAlt?: string
  mainImageTitle?: string
  interiorImageUrl?: string
  interiorImageAlt?: string
  interiorImageTitle?: string
  technique: string
  techniqueLabel: string
  techniqueLabel_en?: string
  techniqueLabel_de?: string
  dimensions: string
  description?: string
  description_en?: string
  description_de?: string
  price?: number
}

const INITIAL_COUNT = 9
const PAGE_SIZE = 9

export default function Gallery({ artworks, locale: serverLocale }: { artworks: ArtworkItem[]; locale?: Locale }) {
  const { t, locale: clientLocale } = useLocale()
  const locale = serverLocale || clientLocale
  const [filter, setFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const activeImageUrls = useRef<Map<string, string>>(new Map())

  const filtered = filter === 'all' ? artworks : artworks.filter((a) => a.technique === filter)
  const shown = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const loadMore = useCallback(() => {
    setVisibleCount((c) => c + PAGE_SIZE)
  }, [])

  const applyFilter = (f: string) => {
    setFilter(f)
    setVisibleCount(INITIAL_COUNT)
  }

  const setActiveUrl = (artworkId: string, url: string) => {
    activeImageUrls.current.set(artworkId, url)
  }

  const openLightbox = (artworkId: string) => {
    const idx = filtered.findIndex((a) => a._id === artworkId)
    if (idx >= 0) setLightboxIndex(idx)
  }



  const filters = [
    { key: 'all', label: t.gallery.filterAll },
    { key: 'olej', label: t.gallery.filterOil },
    { key: 'akryl', label: t.gallery.filterAcrylic },
    { key: 'mieszana', label: t.gallery.filterMixed },
  ]

  return (
    <section className="gallery" id="galeria" aria-labelledby="gallery-heading">
      <div className="container">
        <RevealOnScroll>
          <div className="gallery__header">
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>
              <span className="t-label" style={{ color: 'var(--gold)' }}>{t.gallery.label}</span>
            </div>
            <h2 id="gallery-heading" className="gallery__title">{t.gallery.title}</h2>
            <p className="gallery__subtitle">{t.gallery.subtitle}</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={1}>
          <div className="gallery__filters" role="group" aria-label={t.gallery.filterAria}>
            {filters.map((f) => (
              <button
                key={f.key}
                className={`filter-btn ${filter === f.key ? 'active' : ''}`}
                data-filter={f.key}
                aria-pressed={filter === f.key}
                onClick={() => applyFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={2}>
          <div className="gallery__grid" id="galleryGrid" aria-live="polite" aria-label={t.gallery.listAria}>
            {shown.map((art) => (
              <GalleryCard
                key={art._id}
                artwork={art}
                locale={locale}
                onOpenLightbox={openLightbox}
                onViewChange={setActiveUrl}
              />
            ))}
          </div>
        </RevealOnScroll>

        {hasMore && (
          <div className="gallery__load-more">
            <p className="load-more-counter">
              {t.gallery.counter(shown.length, filtered.length)}
            </p>
            <button className="load-more-btn" onClick={loadMore} aria-label={t.gallery.loadMoreAria}>
              <span>{t.gallery.loadMore(Math.min(PAGE_SIZE, filtered.length - visibleCount))}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1v12M2 8l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          artworks={filtered}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}

function GalleryCard({
  artwork: art,
  locale,
  onOpenLightbox,
  onViewChange,
}: {
  artwork: ArtworkItem
  locale: Locale
  onOpenLightbox: (id: string) => void
  onViewChange: (id: string, url: string) => void
}) {
  const { t } = useLocale()
  const [activeView, setActiveView] = useState(0)
  const title = localized(art, 'title', locale)
  const tech = localized(art, 'techniqueLabel', locale)
  const desc = localized(art, 'description', locale)

  const views: { src: string; alt: string; title: string; label: string }[] = [
    {
      src: art.mainImageUrl,
      alt: art.mainImageAlt || [title, tech, 'Włodzimierz Zapart'].filter(Boolean).join(', '),
      title: art.mainImageTitle || title,
      label: t.gallery.viewPainting
    },
  ]
  if (art.interiorImageUrl) {
    views.push({
      src: art.interiorImageUrl,
      alt: art.interiorImageAlt || (locale === 'de'
        ? `${title}, ${tech}, Włodzimierz Zapart (Visualisierung im Interieur)`
        : (locale === 'en'
          ? `${title}, ${tech}, Włodzimierz Zapart (visualization in an interior)`
          : `${title}, ${tech}, Włodzimierz Zapart (wizualizacja we wnętrzu)`)),
      title: art.interiorImageTitle || (locale === 'de'
        ? `${title} (Interieur-Visualisierung)`
        : (locale === 'en'
          ? `${title} (interior visualization)`
          : `${title} (wizualizacja we wnętrzu)`)),
      label: t.gallery.viewInterior
    })
  }

  const currentView = views[activeView] || views[0]

  const switchView = (i: number) => {
    setActiveView(i)
    onViewChange(art._id, views[i].src)
  }

  return (
    <article className="listing-card" data-tech={art.technique}>
      <div className="listing-card__img-wrap" onClick={() => onOpenLightbox(art._id)} style={{ cursor: 'zoom-in' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentView.src}
          alt={currentView.alt}
          title={currentView.title}
          className="listing-card__img"
          loading="lazy"
          decoding="async"
        />
        {views.length > 1 && (
          <div className="img-switcher" role="tablist" aria-label={t.gallery.viewsAria}>
            {views.map((v, i) => (
              <button
                key={i}
                className={`img-switcher__btn ${i === activeView ? 'is-active' : ''}`}
                role="tab"
                aria-selected={i === activeView}
                aria-label={v.label}
                onClick={(e) => { e.stopPropagation(); switchView(i) }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.src} alt="" role="presentation" aria-hidden="true" width={52} height={52} loading="lazy" decoding="async" />
                <span className="img-switcher__label">{v.label}</span>
              </button>
            ))}
          </div>
        )}
        <div className="listing-card__badge-wrap" aria-hidden="true">
          <span className="listing-card__badge listing-card__badge--size">{art.dimensions}</span>
          <span className="listing-card__badge listing-card__badge--tech">{tech}</span>
        </div>
      </div>
      <div className="listing-card__body">
        <h3 className="listing-card__title">{title}</h3>
        {desc && <p className="listing-card__desc">{desc}</p>}
        <div className="listing-card__price">
          {art.price && art.price > 0 ? (
            <>
              <span className="listing-card__price-label">{locale === 'en' ? 'Price: ' : (locale === 'de' ? 'Preis: ' : 'Cena: ')}</span>
              <span className="listing-card__price-value">{formatPrice(art.price, locale)}</span>
            </>
          ) : (
            <span className="listing-card__price-request">{formatPrice(art.price, locale)}</span>
          )}
        </div>
        <div className="listing-card__footer">
          <div className="listing-card__spec-inline" aria-label={`${art.dimensions}, ${tech}`}>
            <span className="listing-card__spec-item">{art.dimensions}</span>
            <div className="listing-card__spec-sep" aria-hidden="true" />
            <span className="listing-card__spec-item">{tech}</span>
          </div>
          <a href="#kontakt" className="listing-card__cta">
            {t.gallery.ask}{' '}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1 5h8M6 1.5l3.5 3.5L6 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}
