'use client'

import { useEffect, useCallback, useState } from 'react'
import { useLocale } from '@/lib/LocaleContext'

interface LightboxProps {
  images: { src: string; alt: string; title?: string; spec?: string }[]
  startIndex: number
  onClose: () => void
}

export default function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const { t } = useLocale()
  const [index, setIndex] = useState(startIndex)
  const [zoomed, setZoomed] = useState(false)
  const current = images[index]
  const hasPrev = index > 0
  const hasNext = index < images.length - 1

  const prev = useCallback(() => { if (hasPrev) { setIndex((i) => i - 1); setZoomed(false) } }, [hasPrev])
  const next = useCallback(() => { if (hasNext) { setIndex((i) => i + 1); setZoomed(false) } }, [hasNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose, prev, next])

  return (
    <div className="lightbox open" role="dialog" aria-modal="true" aria-label={t.lightbox.dialogAria}>
      <div className="lightbox__backdrop" onClick={onClose} />
      <button className="lightbox__close" onClick={onClose} aria-label={t.lightbox.close}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>
      {hasPrev && (
        <button className="lightbox__arrow lightbox__arrow--prev" onClick={prev} aria-label={t.lightbox.prev}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      )}
      {hasNext && (
        <button className="lightbox__arrow lightbox__arrow--next" onClick={next} aria-label={t.lightbox.next}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      )}
      <div className="lightbox__content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current.src} alt={current.alt} className={`lightbox__img ${zoomed ? 'zoomed' : ''}`} onClick={() => setZoomed((z) => !z)} style={{ cursor: zoomed ? 'zoom-out' : 'zoom-in' }} />
      </div>
      <div className="lightbox__info">
        {current.title && <span className="lightbox__title">{current.title}</span>}
        {current.spec && <span className="lightbox__spec">{current.spec}</span>}
        <span className="lightbox__counter">{index + 1} / {images.length}</span>
      </div>
    </div>
  )
}
