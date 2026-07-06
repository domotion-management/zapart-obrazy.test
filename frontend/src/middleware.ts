import { NextRequest, NextResponse } from 'next/server'

// Basic Auth dla środowisk nieprodukcyjnych (TEST ma być ukryty).
// Produkcja i localhost przechodzą bez logowania.
const OPEN_HOSTS = new Set(['zapart-obrazy.com', 'www.zapart-obrazy.com', 'localhost', '127.0.0.1'])

const BASIC_AUTH_USER = process.env.TEST_BASIC_AUTH_USER || 'wuody'
const BASIC_AUTH_PASS = process.env.TEST_BASIC_AUTH_PASS || 'zapart2026'

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') ?? '').split(':')[0].toLowerCase()
  if (OPEN_HOSTS.has(host)) {
    return NextResponse.next()
  }

  const auth = request.headers.get('authorization')
  if (auth?.startsWith('Basic ')) {
    const [user, pass] = atob(auth.slice(6)).split(':')
    if (user === BASIC_AUTH_USER && pass === BASIC_AUTH_PASS) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Zapart TEST"' },
  })
}
