import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Strona nie znaleziona — Włodzimierz Zapart',
  robots: 'noindex',
}

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-[var(--bg)] p-8 text-center text-[var(--ink)]"
    >
      <p className="m-0 font-[family-name:var(--font-montserrat)] text-6xl font-extrabold text-[var(--gold)]">
        404
      </p>
      <h1 className="m-0 font-[family-name:var(--font-montserrat)] text-2xl">
        Ta strona nie istnieje
      </h1>
      <p className="m-0 max-w-lg text-[var(--ink-muted)]">
        Szukany adres nie został znaleziony. Wróć na stronę główną, aby zobaczyć obrazy i aktualne serie.
      </p>
      <Link
        href="/"
        className="font-[family-name:var(--font-montserrat)] font-bold text-[var(--gold)] underline underline-offset-4"
      >
        ← Strona główna
      </Link>
    </main>
  )
}
