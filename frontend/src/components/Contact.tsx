'use client'

import { useState } from 'react'
import RevealOnScroll from './RevealOnScroll'
import { useLocale } from '@/lib/LocaleContext'
import type { Locale } from '@/lib/dictionaries'

interface ContactProps {
  email?: string
  phone?: string
  location?: string
  instagramUrl?: string
  facebookUrl?: string
  locale?: Locale
}

export default function Contact({ email, phone, location, instagramUrl, facebookUrl }: ContactProps) {
  const { t } = useLocale()
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setServerError(null)
    const fd = new FormData(e.currentTarget)
    const errs: Record<string, boolean> = {}
    
    const name = fd.get('name')?.toString().trim() || ''
    const email = fd.get('email')?.toString() || ''
    const subject = fd.get('subject')?.toString().trim() || ''
    const message = fd.get('message')?.toString().trim() || ''
    const consent = !!fd.get('consent')

    if (!name) errs.name = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = true
    if (!subject) errs.subject = true
    if (!message) errs.message = true
    if (!consent) errs.consent = true
    
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message, consent }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setServerError(data.error || 'Wystąpił błąd po stronie serwera. Spróbuj ponownie później.')
      }
    } catch {
      setServerError('Błąd połączenia z serwerem. Sprawdź swoje połączenie internetowe.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact" id="kontakt" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact__grid">
          <RevealOnScroll>
            <div>
              <div className="section-label">
                <span className="t-label" style={{ color: 'var(--gold)' }}>{t.contact.label}</span>
              </div>
              <h2 id="contact-heading" className="contact__info-title"
                dangerouslySetInnerHTML={{ __html: t.contact.title }}
              />
              <p className="contact__info-lead">{t.contact.lead}</p>
              <div className="contact__detail-list">
                {email && (
                  <div className="contact__detail">
                    <div className="contact__detail-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>
                    </div>
                    <div className="contact__detail-text">
                      <strong>{t.contact.emailLabel}</strong>
                      <a href={`mailto:${email}`}>{email}</a>
                    </div>
                  </div>
                )}
                {phone && (
                  <div className="contact__detail">
                    <div className="contact__detail-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    </div>
                    <div className="contact__detail-text">
                      <strong>{t.contact.phoneLabel}</strong>
                      <a href={`tel:${phone}`}>{phone}</a>
                    </div>
                  </div>
                )}
                {location && (
                  <div className="contact__detail">
                    <div className="contact__detail-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
                    </div>
                    <div className="contact__detail-text">
                      <strong>{t.contact.studioLabel}</strong>
                      <span>{location}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="contact__social">
                {instagramUrl && (
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Instagram">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                    Instagram
                  </a>
                )}
                {facebookUrl && (
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Facebook">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                    Facebook
                  </a>
                )}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={2}>
            <div className="contact__form" id="contactFormWrap">
              {!submitted ? (
                <div id="formContent">
                  <p className="form__title">{t.contact.formTitle}</p>
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form__row">
                      <div className={`form__group ${errors.name ? 'has-error' : ''}`}>
                        <label className="form__label" htmlFor="name">{t.contact.fieldName}</label>
                        <input className="form__input" type="text" id="name" name="name" placeholder={t.contact.fieldNamePlaceholder} autoComplete="name" aria-required="true" />
                        <span className="form__error-msg" role="alert">{t.contact.errorName}</span>
                      </div>
                      <div className={`form__group ${errors.email ? 'has-error' : ''}`}>
                        <label className="form__label" htmlFor="email">{t.contact.fieldEmail}</label>
                        <input className="form__input" type="email" id="email" name="email" placeholder={t.contact.fieldEmailPlaceholder} autoComplete="email" aria-required="true" />
                        <span className="form__error-msg" role="alert">{t.contact.errorEmail}</span>
                      </div>
                    </div>
                    <div className={`form__group ${errors.subject ? 'has-error' : ''}`}>
                      <label className="form__label" htmlFor="subject">{t.contact.fieldSubject}</label>
                      <input className="form__input" type="text" id="subject" name="subject" placeholder={t.contact.fieldSubjectPlaceholder} aria-required="true" />
                      <span className="form__error-msg" role="alert">{t.contact.errorSubject}</span>
                    </div>
                    <div className={`form__group ${errors.message ? 'has-error' : ''}`}>
                      <label className="form__label" htmlFor="message">{t.contact.fieldMessage}</label>
                      <textarea className="form__textarea" id="message" name="message" placeholder={t.contact.fieldMessagePlaceholder} aria-required="true" />
                      <span className="form__error-msg" role="alert">{t.contact.errorMessage}</span>
                    </div>
                    <div className="form__checkbox-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <input type="checkbox" className="form__checkbox" id="consent" name="consent" aria-required="true" disabled={isSubmitting} />
                        <label className="form__checkbox-label" htmlFor="consent">
                          {t.contact.consent} <a href="#">{t.contact.privacyPolicy}</a>.
                        </label>
                      </div>
                      {errors.consent && (
                        <span className="form__error-msg" style={{ display: 'block', marginTop: 0 }}>
                          Musisz wyrazić zgodę na przetwarzanie danych.
                        </span>
                      )}
                    </div>
                    {serverError && (
                      <div className="form__server-error" role="alert">
                        {serverError}
                      </div>
                    )}
                    <button type="submit" className="btn-submit" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                      <span>{isSubmitting ? 'Wysyłanie...' : t.contact.submit}</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="form__success visible" role="status" aria-live="polite">
                  <div className="form__success-icon" aria-hidden="true">✦</div>
                  <h3>{t.contact.successTitle}</h3>
                  <p>{t.contact.successMessage}</p>
                </div>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
