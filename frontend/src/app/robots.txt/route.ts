import { SITE_URL } from '@/lib/site'

// Route handler zamiast Metadata API (app/robots.ts), bo tylko tu można dodać
// komentarze `#` — a z nich zbudowany jest obraz. Roboty czytają wyłącznie dyrektywy.
const ROBOTS_TXT = `#
#      .--------------------------------------------.
#      |  ##### ##  ##  ###  #  #   ##  ####  ##### |
#      |    #   ## # # #   # ####  #  # #   #   #   |
#      |   #    # ## # ##### #  #  #### ####    #   |
#      |  #     #    # #   # #     #  # # #     #   |
#      |  ##### #    # #   # #     #  # #  #    #   |
#      |                                            |
#      |     .    *  .   ~   painted in Poznan  .   |
#      '--------------------------------------------'
#          |  |                              |  |
#         /    \\                            /    \\
#
#  Wlodzimierz Zapart — malarz abstrakcjonista, Poznan
#  Obraz powyzej zbudowano z tagow, ktorych roboty nie czytaja.
#  Ludzie i boty AI: zapraszamy — ${SITE_URL}
#

User-Agent: *
Allow: /
Disallow: /studio
Disallow: /api/

# Boty AI (GEO) — jawnie mile widziane, sztuka jest po to, by ja cytowac
User-Agent: GPTBot
User-Agent: ChatGPT-User
User-Agent: ClaudeBot
User-Agent: Claude-Web
User-Agent: PerplexityBot
User-Agent: Google-Extended
Allow: /
Disallow: /studio
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`

export function GET() {
  return new Response(ROBOTS_TXT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
