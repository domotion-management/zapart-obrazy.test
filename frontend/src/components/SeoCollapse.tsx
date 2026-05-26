'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/dictionaries'

interface SeoCollapseProps {
  description?: string
  locale: Locale
}

export default function SeoCollapse({ description, locale }: SeoCollapseProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!description) return null

  const title = locale === 'en' ? 'About the artist & collections' : 'O artyście i kolekcjach'
  const buttonText = isOpen
    ? (locale === 'en' ? 'Show less' : 'Pokaż mniej')
    : (locale === 'en' ? 'Read more' : 'Dowiedz się więcej')

  return (
    <section className="seo-collapse" aria-labelledby="seo-collapse-title">
      <div className="container">
        <div className={`seo-collapse__wrapper ${isOpen ? 'is-open' : ''}`}>
          <h2 id="seo-collapse-title" className="seo-collapse__title">{title}</h2>
          
          <div className="seo-collapse__content-outer">
            <div className="seo-collapse__content-inner">
              <p>{description}</p>
            </div>
            {!isOpen && <div className="seo-collapse__fade-overlay" aria-hidden="true" />}
          </div>
          
          <div className="seo-collapse__actions">
            <button
              className="seo-collapse__toggle-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="seo-collapse-content"
            >
              <span>{buttonText}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.3s ease',
                }}
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
