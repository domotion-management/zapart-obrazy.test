'use client'

import { useEffect, useCallback, useState, useRef } from 'react'
import { useLocale } from '@/lib/LocaleContext'
import { localized, formatPrice } from '@/lib/dictionaries'

interface LightboxProps {
  artworks: {
    _id: string
    title: string
    title_en?: string
    mainImageUrl: string
    interiorImageUrl?: string
    technique: string
    techniqueLabel: string
    techniqueLabel_en?: string
    dimensions: string
    description?: string
    description_en?: string
    price?: number
  }[]
  startIndex: number
  onClose: () => void
}

export default function Lightbox({ artworks, startIndex, onClose }: LightboxProps) {
  const { t, locale } = useLocale()
  const [index, setIndex] = useState(startIndex)
  const [variantIdx, setVariantIdx] = useState(0)
  const [switching, setSwitching] = useState(false)
  const [showDescMobile, setShowDescMobile] = useState(false)
  
  const currentArtwork = artworks[index]
  const title = localized(currentArtwork, 'title', locale)
  const tech = localized(currentArtwork, 'techniqueLabel', locale)
  const desc = localized(currentArtwork, 'description', locale)

  const views: { src: string; alt: string; label: string }[] = [
    {
      src: currentArtwork.mainImageUrl,
      alt: [title, tech, 'Włodzimierz Zapart'].filter(Boolean).join(', '),
      label: t.gallery.viewPainting
    },
  ]
  if (currentArtwork.interiorImageUrl) {
    views.push({
      src: currentArtwork.interiorImageUrl,
      alt: locale === 'en'
        ? `${title}, ${tech}, Włodzimierz Zapart (visualization in an interior)`
        : `${title}, ${tech}, Włodzimierz Zapart (wizualizacja we wnętrzu)`,
      label: t.gallery.viewInterior,
    })
  }
  const currentView = views[variantIdx] || views[0]

  const [imageSrc, setImageSrc] = useState(currentView.src)
  const [imageAlt, setImageAlt] = useState(currentView.alt)

  // Image loading/transition logic
  useEffect(() => {
    setSwitching(true)
    const img = new Image()
    img.src = currentView.src
    img.onload = () => {
      setImageSrc(currentView.src)
      setImageAlt(currentView.alt)
      setSwitching(false)
    }
    img.onerror = () => {
      setImageSrc(currentView.src)
      setImageAlt(currentView.alt)
      setSwitching(false)
    }
  }, [currentView.src, currentView.alt])

  const hasPrev = index > 0
  const hasNext = index < artworks.length - 1

  const prev = useCallback(() => {
    if (hasPrev) {
      setIndex((i) => i - 1)
      setVariantIdx(0)
      setShowDescMobile(false)
    }
  }, [hasPrev])

  const next = useCallback(() => {
    if (hasNext) {
      setIndex((i) => i + 1)
      setVariantIdx(0)
      setShowDescMobile(false)
    }
  }, [hasNext])

  // Key listener
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, prev, next])

  const stripRef = useRef<HTMLDivElement>(null)

  // Smooth scroll active thumbnail into view
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const activeBtn = strip.children[index] as HTMLElement
    if (activeBtn) {
      activeBtn.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' })
    }
  }, [index])

  const handleFigureClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.lightbox__view-pill')) return
    if (views.length > 1) {
      setVariantIdx((v) => (v + 1) % views.length)
    }
  }

  // Swipe support (replicated from JS)
  const touchX = useRef(0)
  const touchY = useRef(0)
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX
    touchY.current = e.touches[0].clientY
  }
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchX.current - e.changedTouches[0].clientX
    const dy = touchY.current - e.changedTouches[0].clientY
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 50) {
        if (dx > 0) next()
        else prev()
      }
    } else {
      if (Math.abs(dy) > 40) {
        if (views.length > 1) {
          setVariantIdx((v) => (v + 1) % views.length)
        }
      }
    }
  }

  return (
    <div
      className="lightbox open"
      role="dialog"
      aria-modal="true"
      aria-label={t.lightbox?.dialogAria || "Podgląd obrazu"}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="lightbox__backdrop" onClick={onClose} />
      <button className="lightbox__close" onClick={onClose} aria-label={t.lightbox?.close || "Zamknij"}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div className="lightbox__main">
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={prev}
          disabled={!hasPrev}
          aria-label={t.lightbox?.prev || "Poprzedni"}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <polyline points="13,4 7,10 13,16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <figure
          className={`lightbox__figure ${views.length > 1 ? 'has-variants' : ''}`}
          onClick={handleFigureClick}
        >
          <img
            className={`lightbox__img ${switching ? 'is-switching' : ''}`}
            src={imageSrc}
            alt={imageAlt}
            draggable="false"
          />
          {views.length > 1 && (
            <div className="lightbox__view-pill" role="group" aria-label={t.gallery?.viewsAria || "Widok obrazu"}>
              {views.map((v, i) => (
                <button
                  key={i}
                  className={`lightbox__view-btn ${i === variantIdx ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setVariantIdx(i)
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
        </figure>

        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={next}
          disabled={!hasNext}
          aria-label={t.lightbox?.next || "Następny"}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <polyline points="7,4 13,10 7,16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <footer className="lightbox__footer">
        <div className="lightbox__info-row">
          <span className="lightbox__title">{title}</span>
          <span className="lightbox__spec">
            {tech} · {currentArtwork.dimensions}
            {currentArtwork.price !== undefined && (
              <> · <span className="lightbox__price-highlight">
                {currentArtwork.price > 0 && (locale === 'en' ? 'Price: ' : 'Cena: ')}
                {formatPrice(currentArtwork.price, locale)}
              </span></>
            )}
          </span>
          {desc && (
            <button
              className={`lightbox__desc-toggle ${showDescMobile ? 'is-active' : ''}`}
              onClick={() => setShowDescMobile(!showDescMobile)}
              aria-expanded={showDescMobile}
              aria-label={
                showDescMobile
                  ? (locale === 'en' ? 'Collapse description' : 'Zwiń opis')
                  : (locale === 'en' ? 'Read full description' : 'Czytaj cały opis')
              }
            >
              <span>
                {showDescMobile
                  ? (locale === 'en' ? 'collapse description' : 'zwiń opis')
                  : (locale === 'en' ? 'read full description' : 'czytaj cały opis')}
              </span>
            </button>
          )}
          <span className="lightbox__counter">
            {index + 1} / {artworks.length}
          </span>
        </div>
        {desc && (
          <p className={`lightbox__desc ${showDescMobile ? 'is-expanded' : ''}`}>
            {desc}
          </p>
        )}
        <div className="lightbox__strip-wrap">
          <div ref={stripRef} className="lightbox__strip" role="listbox" aria-label="Miniatury obrazów">
            {artworks.map((art, i) => {
              const active = i === index
              return (
                <button
                  key={art._id}
                  className={`lightbox__strip-btn ${active ? 'is-active' : ''}`}
                  role="option"
                  aria-selected={active}
                  aria-label={localized(art, 'title', locale)}
                  onClick={() => {
                    setIndex(i)
                    setVariantIdx(0)
                    setShowDescMobile(false)
                  }}
                >
                  <img src={art.mainImageUrl} alt="" role="presentation" loading="lazy" decoding="async" width="52" height="52" />
                </button>
              )
            })}
          </div>
        </div>
      </footer>
    </div>
  )
}
