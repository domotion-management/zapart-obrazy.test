// --- Nav scroll effect ---
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });

// --- Hero bg parallax + loaded ---
const heroBg = document.getElementById('heroBg');
setTimeout(() => {
  heroBg.classList.add('loaded');
  // Light sweep — spawned once, removed after animation
  const sweep = document.createElement('div');
  sweep.className = 'hero__sweep';
  heroBg.appendChild(sweep);
  requestAnimationFrame(() => requestAnimationFrame(() => sweep.classList.add('active')));
  sweep.addEventListener('transitionend', () => sweep.remove(), { once: true });
}, 100);
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  heroBg.style.transform = `scale(1.15) translateY(-${y * 0.25}px)`;
}, { passive: true });

// --- Mobile nav ---
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
let mobileOpen = false;
navToggle.addEventListener('click', () => {
  mobileOpen = !mobileOpen;
  mobileNav.classList.toggle('open', mobileOpen);
  navToggle.setAttribute('aria-expanded', mobileOpen);
  navToggle.setAttribute('aria-label', mobileOpen ? 'Zamknij menu nawigacji' : 'Otwórz menu nawigacji');
  mobileNav.setAttribute('aria-hidden', !mobileOpen);
  document.body.style.overflow = mobileOpen ? 'hidden' : '';
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileOpen = false;
    mobileNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Otwórz menu nawigacji');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

// --- Intersection Observer for reveals ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================================
//  GALLERY — placeholder data, filter, load-more
// ============================================================

const PLACEHOLDER_DATA = [
  { title: 'Sen o morzu',             tech: 'olej',     techLabel: 'Olej na płótnie',    size: '90 × 70 cm',  desc: 'Morska cisza ujęta w tonacjach granatu i srebra — obraz przywołuje spokój wczesnego poranka nad wodą.',                                   c1: '#0f1f3d', c2: '#2a5f8a' },
  { title: 'Kompozycja w błękicie',   tech: 'akryl',    techLabel: 'Akryl',               size: '70 × 50 cm',  desc: 'Abstrakcyjna symfonia niebieskiego — warstwy farby nakładają się tworząc iluzję głębi i przestrzeni.',                                  c1: '#0a2a6a', c2: '#1a6ab0' },
  { title: 'Wieczorne refleksy',      tech: 'olej',     techLabel: 'Olej na płótnie',    size: '80 × 60 cm',  desc: 'Ostatnie promienie dnia odbite w nieruchomej wodzie. Czas zatrzymany między dniem a nocą.',                                             c1: '#2a0a3a', c2: '#7a3a8a' },
  { title: 'Taniec form',             tech: 'akryl',    techLabel: 'Akryl',               size: '60 × 60 cm',  desc: 'Energia ruchu zamknięta w abstrakcyjnym tańcu kształtów. Kompozycja wibruje dynamizmem i rytmem.',                                      c1: '#7a2a0a', c2: '#c05a1a' },
  { title: 'Jesienne lamento',        tech: 'olej',     techLabel: 'Olej na płótnie',    size: '100 × 80 cm', desc: 'Melancholia późnego lata — ugry i brązy mówią o przemijaniu piękniej niż słowa.',                                                       c1: '#2a1a0a', c2: '#8a5a1a' },
  { title: 'Przestrzeń wewnętrzna',   tech: 'mieszana', techLabel: 'Technika mieszana',  size: '70 × 70 cm',  desc: 'Głębia, którą można poczuć tylko zamykając oczy. Wielowarstwowa eksploracja wewnętrznego krajobrazu.',                                  c1: '#0a0a1a', c2: '#3a3a6a' },
  { title: 'Przesilenie',             tech: 'akryl',    techLabel: 'Akryl',               size: '80 × 80 cm',  desc: 'Moment równowagi między przeciwieństwami — biel i czerń, ciepło i chłód, spokój i napięcie.',                                          c1: '#1a1a1a', c2: '#5a5a5a' },
  { title: 'Cisza przed burzą',       tech: 'olej',     techLabel: 'Olej na płótnie',    size: '120 × 90 cm', desc: 'Chwila bezdechu — niebo nabrzmiałe elektrycznością, horyzont w oczekiwaniu na to, co nieuchronne.',                                     c1: '#0a0a1a', c2: '#1a2a4a' },
  { title: 'Mgła nad rzeką',          tech: 'akryl',    techLabel: 'Akryl',               size: '60 × 90 cm',  desc: 'Delikatna zasłona porannej mgły spowalnia czas. Kontury topią się w szarościach i zieleniach.',                                        c1: '#1a2a1a', c2: '#3a6a4a' },
  { title: 'Złoty środek',            tech: 'mieszana', techLabel: 'Technika mieszana',  size: '80 × 80 cm',  desc: 'Harmonia jako cel i droga — złoto dominuje w kompozycji symbolizując doskonałość i spełnienie.',                                        c1: '#3a2a0a', c2: '#aa7a10' },
  { title: 'Pole słoneczne',          tech: 'akryl',    techLabel: 'Akryl',               size: '100 × 70 cm', desc: 'Wybuch żółcieni i zieleni — radość letnia uchwycona w ekspresjonistycznym geście malarskim.',                                          c1: '#1a2a0a', c2: '#7a9a00' },
  { title: 'Portret nieznajomej',     tech: 'olej',     techLabel: 'Olej na płótnie',    size: '60 × 80 cm',  desc: 'Twarz wyłaniająca się z mroku — fragment serii (NIE)ZNAJOMI. Kim jest? To pytanie pozostaje otwarte.',                                  c1: '#1a0a0a', c2: '#5a2a2a' },
  { title: 'Architektura duszy',      tech: 'mieszana', techLabel: 'Technika mieszana',  size: '90 × 90 cm',  desc: 'Geometria emocji — linie i płaszczyzny budują wewnętrzną architekturę człowieka. Poważna, monumentalna praca.',                         c1: '#0a1a2a', c2: '#2a4a6a' },
  { title: 'Błysk',                   tech: 'akryl',    techLabel: 'Akryl',               size: '50 × 50 cm',  desc: 'Krótka, intensywna chwila olśnienia — mały format kontrastuje z siłą przekazu.',                                                       c1: '#2a0a0a', c2: '#9a1010' },
  { title: 'Stare miasto w deszczu',  tech: 'olej',     techLabel: 'Olej na płótnie',    size: '80 × 60 cm',  desc: 'Pejzaż miejski rozmyty przez deszcz i nostalgię. Odbicia latarni tańczą na mokrym bruku.',                                             c1: '#0a0a1a', c2: '#2a2a4a' },
  { title: 'Meridian',                tech: 'mieszana', techLabel: 'Technika mieszana',  size: '70 × 100 cm', desc: 'Pionowa eksploracja przestrzeni — obraz czyta się od dołu do góry jak wiersz.',                                                         c1: '#0a1a2a', c2: '#1a4a7a' },
  { title: 'Burza w farbach',         tech: 'akryl',    techLabel: 'Akryl',               size: '120 × 80 cm', desc: 'Gwałtowność gestu malarskiego — farba narzucana szpachlą i pędzlem w eksplozji energii.',                                              c1: '#0a0a0a', c2: '#3a0a3a' },
  { title: 'Czas zatrzymany',         tech: 'olej',     techLabel: 'Olej na płótnie',    size: '60 × 60 cm',  desc: 'Medytacja nad przemijaniem — obraz wymaga długiego patrzenia, nie szybkiego odejścia.',                                                 c1: '#1a1a0a', c2: '#4a4a1a' },
  { title: 'Korzenie',                tech: 'mieszana', techLabel: 'Technika mieszana',  size: '90 × 70 cm',  desc: 'Co nas trzyma? Faktura ziemi i gliny, głębia brązów i ochr opowiada o przynależności do miejsca.',                                      c1: '#1a0a0a', c2: '#4a1a0a' },
  { title: 'Płomień',                 tech: 'akryl',    techLabel: 'Akryl',               size: '60 × 80 cm',  desc: 'Dynamika ognia w abstrakcyjnej formie — czerwień i pomarańcz walczą o dominację na płótnie.',                                          c1: '#2a0a00', c2: '#8a2a00' },
  { title: 'Horyzont wewnętrzny',     tech: 'olej',     techLabel: 'Olej na płótnie',    size: '100 × 60 cm', desc: 'Panoramiczna kompozycja eksploruje granicę między tym, co widzialne, a tym, co przeczuwalne.',                                          c1: '#0a0a1a', c2: '#1a2a4a' },
];

const TOTAL_ARTWORKS = 9 + PLACEHOLDER_DATA.length; // 30
const PAGE_SIZE = 9;
let galleryRendered = 9;
let galleryFilter = 'all';

function makePlaceholderSvg(c1, c2, idx) {
  const dims  = [[400, 300], [400, 400], [300, 400]];
  const [w, h] = dims[idx % 3];
  const id    = `pg${idx}`;
  const decos = [
    `<ellipse cx="${w*.5}" cy="${h*.45}" rx="${w*.38}" ry="${h*.22}" fill="rgba(255,255,255,0.05)" transform="rotate(${20+idx*3} ${w*.5} ${h*.5})"/>`,
    `<rect x="${w*.12}" y="${h*.12}" width="${w*.76}" height="${h*.76}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/><rect x="${w*.2}" y="${h*.2}" width="${w*.6}" height="${h*.6}" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>`,
    `<circle cx="${w*.5}" cy="${h*.38}" r="${Math.min(w,h)*.28}" fill="rgba(255,255,255,0.05)"/><line x1="0" y1="${h*.6}" x2="${w}" y2="${h*.58}" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>`,
    `<rect x="${w*.35}" y="0" width="${w*.3}" height="${h}" fill="rgba(255,255,255,0.04)"/>`,
    `<line x1="${w*.15}" y1="${h*.5}" x2="${w*.85}" y2="${h*.5}" stroke="rgba(255,255,255,0.07)" stroke-width="1"/><line x1="${w*.5}" y1="${h*.15}" x2="${w*.5}" y2="${h*.85}" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>`,
    `<line x1="0" y1="0" x2="${w*.65}" y2="${h}" stroke="rgba(255,255,255,0.05)" stroke-width="2"/><line x1="${w*.35}" y1="0" x2="${w}" y2="${h*.65}" stroke="rgba(255,255,255,0.04)" stroke-width="1.5"/>`,
  ];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#${id})"/>${decos[idx % 6]}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function renderPlaceholderCard(item, dataIdx) {
  const src = makePlaceholderSvg(item.c1, item.c2, dataIdx);
  const card = document.createElement('article');
  card.className = 'listing-card listing-card--enter';
  card.setAttribute('data-tech', item.tech);
  card.setAttribute('aria-label', `${item.title} — ${item.techLabel}, ${item.size}`);
  card.innerHTML = `
    <div class="listing-card__img-wrap">
      <img src="${src}" alt="${item.title} — ${item.techLabel}, Włodzimierz Zapart"
           class="listing-card__img listing-card__img--placeholder"
           width="400" height="300" loading="lazy" decoding="async" />
      <div class="listing-card__badge-wrap" aria-hidden="true">
        <span class="listing-card__badge listing-card__badge--size">${item.size}</span>
        <span class="listing-card__badge listing-card__badge--tech">${item.techLabel}</span>
      </div>
    </div>
    <div class="listing-card__body">
      <h3 class="listing-card__title">${item.title}</h3>
      <p class="listing-card__desc">${item.desc}</p>
      <div class="listing-card__footer">
        <div class="listing-card__spec-inline" aria-label="${item.size}, ${item.techLabel}">
          <span class="listing-card__spec-item">${item.size}</span>
          <div class="listing-card__spec-sep" aria-hidden="true"></div>
          <span class="listing-card__spec-item">${item.techLabel}</span>
        </div>
        <a href="#kontakt" class="listing-card__cta">
          Zapytaj
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false">
            <path d="M1 5h8M6 1.5l3.5 3.5L6 8.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>`;
  return card;
}

function updateLoadMoreUI() {
  const loadMoreWrap = document.getElementById('galleryLoadMore');
  const loadMoreBtn  = document.getElementById('loadMoreBtn');
  const counter      = document.getElementById('loadMoreCounter');
  if (!loadMoreWrap) return;
  if (galleryRendered >= TOTAL_ARTWORKS) {
    loadMoreWrap.classList.add('is-hidden');
    return;
  }
  loadMoreWrap.classList.remove('is-hidden');
  counter.textContent = `${galleryRendered} z ${TOTAL_ARTWORKS} obrazów`;
  const remaining = TOTAL_ARTWORKS - galleryRendered;
  const nextBatch = Math.min(PAGE_SIZE, remaining);
  loadMoreBtn.querySelector('span').textContent = `Załaduj więcej (${nextBatch})`;
}

function loadMoreCards() {
  const grid   = document.getElementById('galleryGrid');
  const start  = galleryRendered - 9;
  const end    = Math.min(start + PAGE_SIZE, PLACEHOLDER_DATA.length);
  const newCards = [];

  for (let i = start; i < end; i++) {
    const card = renderPlaceholderCard(PLACEHOLDER_DATA[i], i);
    const show = galleryFilter === 'all' || PLACEHOLDER_DATA[i].tech === galleryFilter;
    if (!show) card.style.display = 'none';
    grid.appendChild(card);
    newCards.push({ card, show });
  }
  galleryRendered += (end - start);

  // Stagger-animate visible new cards
  let delay = 0;
  newCards.forEach(({ card, show }) => {
    if (!show) return;
    const d = delay;
    requestAnimationFrame(() => {
      setTimeout(() => {
        card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        card.classList.remove('listing-card--enter');
      }, d);
    });
    delay += 70;
  });

  updateLoadMoreUI();
}

// --- Gallery filter ---
const filterBtns = document.querySelectorAll('.filter-btn');

function applyGalleryFilter(filter) {
  galleryFilter = filter;
  const cards = document.querySelectorAll('#galleryGrid .listing-card');
  cards.forEach(card => {
    const show = filter === 'all' || card.dataset.tech === filter;
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    setTimeout(() => {
      card.style.display = show ? 'block' : 'none';
      if (show) {
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      }
    }, 200);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    applyGalleryFilter(btn.dataset.filter);
  });
});

document.getElementById('loadMoreBtn').addEventListener('click', loadMoreCards);
updateLoadMoreUI();

// --- Contact form validation ---
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formContent = document.getElementById('formContent');

function validateField(id, validator) {
  const input = document.getElementById(id);
  const group = document.getElementById('group-' + id);
  const valid = validator(input.value.trim());
  input.classList.toggle('error', !valid);
  group.classList.toggle('has-error', !valid);
  return valid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameOk    = validateField('name',    v => v.length >= 2);
  const emailOk   = validateField('email',   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  const subjectOk = validateField('subject', v => v.length >= 2);
  const msgOk     = validateField('message', v => v.length >= 10);

  if (nameOk && emailOk && subjectOk && msgOk) {
    // Simulate send
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Wysyłanie...';
    btn.disabled = true;
    setTimeout(() => {
      formContent.style.display = 'none';
      formSuccess.classList.add('visible');
    }, 1200);
  }
});

// --- Image variant switcher ---
document.querySelectorAll('.img-switcher').forEach(switcher => {
  switcher.querySelectorAll('.img-switcher__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('is-active')) return;

      const card = btn.closest('.listing-card');
      const mainImg = card.querySelector('.listing-card__img');
      const newSrc = btn.dataset.src;
      const newAlt = btn.dataset.alt;

      switcher.querySelectorAll('.img-switcher__btn').forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      mainImg.classList.add('is-switching');
      const preload = new Image();
      preload.onload = () => {
        mainImg.src = newSrc;
        mainImg.alt = newAlt;
        mainImg.classList.remove('is-switching');
      };
      preload.onerror = () => mainImg.classList.remove('is-switching');
      preload.src = newSrc;
    });
  });
});

// Clear errors on input
['name', 'email', 'subject', 'message'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('input', () => {
    el.classList.remove('error');
    document.getElementById('group-' + id).classList.remove('has-error');
  });
});

// ============================================================
//  LIGHTBOX — full-screen product gallery view
// ============================================================
const Lightbox = (() => {
  // ── State ──────────────────────────────────────────────────
  let items      = [];   // [{title, spec, variants:[{src,alt,label}]}]
  let current    = 0;    // active artwork index
  let variantIdx = 0;    // 0=Obraz, 1=Wnętrze
  let dialog, imgEl, figureEl, titleEl, specEl, counterEl, descEl, stripEl, viewBtns, prevBtn, nextBtn;

  // ── Build DOM (once) ───────────────────────────────────────
  function build() {
    dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Podgląd obrazu');

    dialog.innerHTML = `
      <button class="lightbox__close" aria-label="Zamknij podgląd">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <div class="lightbox__main">
        <button class="lightbox__nav lightbox__nav--prev" aria-label="Poprzedni obraz">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <polyline points="13,4 7,10 13,16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <figure class="lightbox__figure">
          <img class="lightbox__img" src="" alt="" draggable="false" />
          <div class="lightbox__view-pill" role="group" aria-label="Widok obrazu">
            <button class="lightbox__view-btn is-active" data-variant="0">Obraz</button>
            <button class="lightbox__view-btn" data-variant="1">Wnętrze</button>
          </div>
        </figure>

        <button class="lightbox__nav lightbox__nav--next" aria-label="Następny obraz">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <polyline points="7,4 13,10 7,16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <footer class="lightbox__footer">
        <div class="lightbox__info-row">
          <span class="lightbox__title"></span>
          <span class="lightbox__spec"></span>
          <span class="lightbox__counter"></span>
        </div>
        <p class="lightbox__desc"></p>
        <div class="lightbox__strip-wrap">
          <div class="lightbox__strip" role="listbox" aria-label="Miniatury obrazów"></div>
        </div>
      </footer>
    `;

    document.body.appendChild(dialog);

    // Cache refs
    imgEl     = dialog.querySelector('.lightbox__img');
    figureEl  = dialog.querySelector('.lightbox__figure');
    titleEl   = dialog.querySelector('.lightbox__title');
    specEl    = dialog.querySelector('.lightbox__spec');
    counterEl = dialog.querySelector('.lightbox__counter');
    descEl    = dialog.querySelector('.lightbox__desc');
    stripEl   = dialog.querySelector('.lightbox__strip');
    viewBtns  = dialog.querySelectorAll('.lightbox__view-btn');
    prevBtn   = dialog.querySelector('.lightbox__nav--prev');
    nextBtn   = dialog.querySelector('.lightbox__nav--next');

    // Close button
    dialog.querySelector('.lightbox__close').addEventListener('click', close);

    // Backdrop click
    dialog.addEventListener('click', e => {
      if (e.target === dialog) close();
    });

    // Prev / Next arrows
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // Pill view buttons
    viewBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation(); // don't bubble to figure click
        switchVariant(+btn.dataset.variant);
      });
    });

    // Click on image/figure = cycle variant (most natural interaction)
    figureEl.addEventListener('click', e => {
      if (e.target.closest('.lightbox__view-pill')) return; // handled by pill
      const item = items[current];
      if (!item || item.variants.length < 2) return;
      switchVariant((variantIdx + 1) % item.variants.length);
    });

    // Keyboard
    dialog.addEventListener('keydown', onKey);

    // Native dialog cancel (Esc)
    dialog.addEventListener('cancel', e => {
      e.preventDefault();
      close();
    });

    // Touch swipe — horizontal = navigate, vertical = variant
    let touchStartX = 0, touchStartY = 0;
    dialog.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    dialog.addEventListener('touchend', e => {
      const dx = touchStartX - e.changedTouches[0].clientX;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe → navigate
        if (Math.abs(dx) > 50) navigate(dx > 0 ? 1 : -1);
      } else {
        // Vertical swipe → cycle variant
        if (Math.abs(dy) > 40) {
          const item = items[current];
          if (item && item.variants.length > 1) switchVariant((variantIdx + 1) % item.variants.length);
        }
      }
    }, { passive: true });
  }

  // ── Collect data from gallery cards ───────────────────────
  function collect() {
    items = [...document.querySelectorAll('#galleryGrid .listing-card')].map(card => {
      const mainImg  = card.querySelector('.listing-card__img');
      const btns     = [...card.querySelectorAll('.img-switcher__btn')];
      const titleNode = card.querySelector('.listing-card__title');
      const specNode  = card.querySelector('.listing-card__spec-inline');
      const descNode  = card.querySelector('.listing-card__desc');

      return {
        title:    titleNode ? titleNode.textContent.trim() : '',
        spec:     specNode  ? specNode.getAttribute('aria-label') || specNode.textContent.trim() : '',
        desc:     descNode  ? descNode.textContent.trim() : '',
        variants: btns.length
          ? btns.map(b => {
              const labelEl = b.querySelector('.img-switcher__label');
              return { src: b.dataset.src, alt: b.dataset.alt, label: labelEl ? labelEl.textContent.trim() : '' };
            })
          : [{ src: mainImg.src, alt: mainImg.alt, label: 'Obraz' }]
      };
    });
  }

  // ── Open ──────────────────────────────────────────────────
  function open(idx) {
    if (!items.length) collect();
    current    = idx;
    variantIdx = 0;
    buildStrip();
    render();
    dialog.showModal();
    requestAnimationFrame(() => dialog.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
  }

  // ── Close ─────────────────────────────────────────────────
  function close() {
    dialog.classList.remove('is-open');
    const onEnd = () => {
      dialog.close();
      dialog.removeEventListener('transitionend', onEnd);
      document.body.style.overflow = '';
    };
    dialog.addEventListener('transitionend', onEnd);
  }

  // ── Navigate ──────────────────────────────────────────────
  function navigate(dir) {
    const next = current + dir;
    if (next < 0 || next >= items.length) return;
    current    = next;
    variantIdx = 0;
    render();
  }

  // ── Switch variant ────────────────────────────────────────
  function switchVariant(idx) {
    const item = items[current];
    if (!item.variants[idx]) return;
    variantIdx = idx;
    renderImage(item.variants[idx]);
    updateVariantBtns();
  }

  // ── Render current item ───────────────────────────────────
  function render() {
    const item    = items[current];
    const variant = item.variants[variantIdx] || item.variants[0];

    titleEl.textContent   = item.title;
    specEl.textContent    = item.spec;
    counterEl.textContent = `${current + 1} / ${items.length}`;
    descEl.textContent    = item.desc || '';

    renderImage(variant);
    updateVariantBtns();
    updateStrip();
    updateNavBtns();
  }

  // ── Render image with crossfade ───────────────────────────
  function renderImage(variant) {
    imgEl.classList.add('is-switching');
    const preload = new Image();
    preload.onload = () => {
      imgEl.src = variant.src;
      imgEl.alt = variant.alt;
      imgEl.classList.remove('is-switching');
    };
    preload.onerror = () => {
      imgEl.src = variant.src;
      imgEl.alt = variant.alt;
      imgEl.classList.remove('is-switching');
    };
    preload.src = variant.src;
  }

  // ── Update variant buttons + figure state ────────────────
  function updateVariantBtns() {
    const item = items[current];
    const hasMultiple = item.variants.length > 1;

    // Pill visibility — show pill only if artwork has 2 variants
    dialog.querySelector('.lightbox__view-pill').style.display = hasMultiple ? '' : 'none';
    figureEl.classList.toggle('has-variants', hasMultiple);

    viewBtns.forEach((btn, i) => {
      const hasVariant = !!item.variants[i];
      btn.classList.toggle('is-active', i === variantIdx);
      btn.disabled = !hasVariant;
      btn.style.display = hasVariant ? '' : 'none';
    });
  }

  // ── Build thumbnail strip ─────────────────────────────────
  function buildStrip() {
    stripEl.innerHTML = '';
    items.forEach((item, i) => {
      const btn = document.createElement('button');
      btn.className = 'lightbox__strip-btn' + (i === current ? ' is-active' : '');
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-selected', i === current ? 'true' : 'false');
      btn.setAttribute('aria-label', item.title);
      const src = item.variants[0].src;
      btn.innerHTML = `<img src="${src}" alt="" loading="lazy" decoding="async" width="52" height="52">`;
      btn.addEventListener('click', () => {
        current    = i;
        variantIdx = 0;
        render();
      });
      stripEl.appendChild(btn);
    });
  }

  // ── Update strip active state ─────────────────────────────
  function updateStrip() {
    [...stripEl.querySelectorAll('.lightbox__strip-btn')].forEach((btn, i) => {
      const active = i === current;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    const activeBtn = stripEl.children[current];
    if (activeBtn) activeBtn.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
  }

  // ── Update prev/next disabled state ───────────────────────
  function updateNavBtns() {
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === items.length - 1;
  }

  // ── Keyboard handler ──────────────────────────────────────
  function onKey(e) {
    switch (e.key) {
      case 'ArrowLeft':  e.preventDefault(); navigate(-1); break;
      case 'ArrowRight': e.preventDefault(); navigate(1);  break;
    }
  }

  // ── Bind gallery cards — event delegation ────────────────
  function bindCards() {
    const grid = document.getElementById('galleryGrid');
    grid.addEventListener('click', e => {
      const wrap = e.target.closest('.listing-card__img-wrap');
      if (!wrap) return;
      if (e.target.closest('.img-switcher')) return;
      const card     = wrap.closest('.listing-card');
      const allCards = [...grid.querySelectorAll('.listing-card')];
      const idx      = allCards.indexOf(card);
      if (idx === -1) return;
      collect(); // always fresh — picks up placeholder cards
      open(idx);
    });
  }

  // ── Init ──────────────────────────────────────────────────
  function init() {
    build();
    bindCards();
  }

  return { init };
})();

Lightbox.init();
