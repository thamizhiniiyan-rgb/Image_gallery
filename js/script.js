'use strict';

/* ==========================================================================
   LUMINA – Curated Image Gallery Data & State
   ========================================================================== */

const FALLBACK_IMAGE_PATH = 'assets/images/fallback-frame.svg';
const STORAGE_KEYS = {
  favorites: 'lumina_favorites',
  theme: 'lumina_theme',
};

const INITIAL_VISIBLE_COUNT = 12;
const LOAD_MORE_STEP = 6;

const CATEGORY_DEFINITIONS = [
  {
    name: 'Nature',
    subtitle: 'Mountains, aurora & ancient forests',
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=75',
  },
  {
    name: 'Architecture',
    subtitle: 'Glass monoliths & minimal geometry',
    coverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=75',
  },
  {
    name: 'Wildlife',
    subtitle: 'Untamed portraits in natural habitats',
    coverUrl: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=700&q=75',
  },
  {
    name: 'Technology',
    subtitle: 'Silicon pathways, servers & robotics',
    coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=75',
  },
  {
    name: 'Travel',
    subtitle: 'Iconic horizons & vibrant night streets',
    coverUrl: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=700&q=75',
  },
  {
    name: 'Abstract',
    subtitle: 'Fluid pigments, prisms & 3D gradients',
    coverUrl: 'https://images.unsplash.com/photo-1632900112366-ce054a609422?auto=format&fit=crop&w=700&q=75',
  },
];

/**
 * Helper to generate optimized Unsplash delivery URLs for grid and lightbox.
 * @param {string} baseUrl
 * @param {number} width
 * @param {number} quality
 * @returns {string}
 */
function buildUnsplashUrl(baseUrl, width = 900, quality = 80) {
  return `${baseUrl}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

/**
 * 24 curated high-resolution photographs interleaved across all 6 categories
 * so the initial 12 frames represent every visual category and aspect ratio.
 */
const GALLERY_IMAGES = [
  {
    id: 1,
    title: 'Emerald Valley Reflections',
    category: 'Nature',
    location: 'Yosemite Valley, California',
    aspect: 'landscape',
    featuredInHero: true,
    baseUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  },
  {
    id: 2,
    title: 'Monolith of Glass & Steel',
    category: 'Architecture',
    location: 'Downtown Chicago, USA',
    aspect: 'portrait',
    featuredInHero: true,
    baseUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
  },
  {
    id: 3,
    title: 'Crimson Fox in Winter Snow',
    category: 'Wildlife',
    location: 'Hokkaido, Japan',
    aspect: 'landscape',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5',
  },
  {
    id: 4,
    title: 'Silicon Neural Pathways',
    category: 'Technology',
    location: 'Microchip Macro Study',
    aspect: 'wide',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
  },
  {
    id: 5,
    title: 'Lantern Glow in Shinjuku',
    category: 'Travel',
    location: 'Tokyo, Japan',
    aspect: 'tall',
    featuredInHero: true,
    baseUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
  },
  {
    id: 6,
    title: 'Iridescent Obsidian Waves',
    category: 'Abstract',
    location: '3D Digital Sculpture',
    aspect: 'square',
    featuredInHero: true,
    baseUrl: 'https://images.unsplash.com/photo-1632900112366-ce054a609422',
  },
  {
    id: 7,
    title: 'Aurora Over Arctic Peaks',
    category: 'Nature',
    location: 'Tromso, Norway',
    aspect: 'portrait',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf',
  },
  {
    id: 8,
    title: 'Nordic Daylight Atrium',
    category: 'Architecture',
    location: 'Copenhagen, Denmark',
    aspect: 'landscape',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
  },
  {
    id: 9,
    title: 'Sovereign of the Savanna',
    category: 'Wildlife',
    location: 'Serengeti, Tanzania',
    aspect: 'square',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1588442025058-dffe84001858',
  },
  {
    id: 10,
    title: 'Cybernetic Neon Horizon',
    category: 'Technology',
    location: 'Luminous Grid Tunnel',
    aspect: 'wide',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42',
  },
  {
    id: 11,
    title: 'Aegean Dusk in Oia',
    category: 'Travel',
    location: 'Santorini, Greece',
    aspect: 'landscape',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713',
  },
  {
    id: 12,
    title: 'Chromatic Liquid Resonance',
    category: 'Abstract',
    location: 'Fluid Pigment Macro',
    aspect: 'portrait',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1629006308120-bac258becf4c',
  },
  {
    id: 13,
    title: 'Sunbeams in Ancient Woods',
    category: 'Nature',
    location: 'Black Forest, Germany',
    aspect: 'wide',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
  },
  {
    id: 14,
    title: 'Skyline Geometric Ascent',
    category: 'Architecture',
    location: 'Financial District, Toronto',
    aspect: 'tall',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a',
  },
  {
    id: 15,
    title: 'Silent Gaze of the Snowy Owl',
    category: 'Wildlife',
    location: 'Arctic Tundra',
    aspect: 'portrait',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1500373994708-4d781bd7bd15',
  },
  {
    id: 16,
    title: 'Hyperscale Data Corridor',
    category: 'Technology',
    location: 'Cloud Server Vault',
    aspect: 'landscape',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1564457461758-8ff96e439e83',
  },
  {
    id: 17,
    title: 'Golden Dunes of Merzouga',
    category: 'Travel',
    location: 'Sahara Desert, Morocco',
    aspect: 'landscape',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
  },
  {
    id: 18,
    title: 'Refracted Prism Spectrum',
    category: 'Abstract',
    location: 'Optical Light Study',
    aspect: 'square',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1548159417-f283998827c1',
  },
  {
    id: 19,
    title: 'Glacial Ridge at First Light',
    category: 'Nature',
    location: 'Dolomites, Northern Italy',
    aspect: 'square',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
  },
  {
    id: 20,
    title: 'Minimalist Concrete Facade',
    category: 'Architecture',
    location: 'Zurich, Switzerland',
    aspect: 'wide',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1',
  },
  {
    id: 21,
    title: 'Deep Blue Humpback Glide',
    category: 'Wildlife',
    location: 'South Pacific Ocean',
    aspect: 'wide',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1698472505070-6d3b90afb530',
  },
  {
    id: 22,
    title: 'Autonomous Lab Companion',
    category: 'Technology',
    location: 'Robotics Research Studio',
    aspect: 'landscape',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
  },
  {
    id: 23,
    title: 'Above the Alpine Clouds',
    category: 'Travel',
    location: 'Bernese Oberland, Switzerland',
    aspect: 'square',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
  },
  {
    id: 24,
    title: 'Harmonic Ribbon Geometry',
    category: 'Abstract',
    location: 'Minimalist Wave Study',
    aspect: 'landscape',
    featuredInHero: false,
    baseUrl: 'https://images.unsplash.com/photo-1567746135551-999fa08b4756',
  },
].map((item) => ({
  ...item,
  thumbUrl: buildUnsplashUrl(item.baseUrl, 900, 80),
  fullUrl: buildUnsplashUrl(item.baseUrl, 1600, 85),
}));

/* Application State */
const state = {
  activeCategory: 'All',
  searchQuery: '',
  visibleCount: INITIAL_VISIBLE_COUNT,
  favorites: loadStoredFavorites(),
  filteredImages: [],
  displayedImages: [],
  lightboxIndex: -1,
  lastFocusedElement: null,
};

/* Cached DOM References */
const dom = {
  siteHeader: document.getElementById('site-header'),
  navLinks: document.querySelectorAll('.nav-link'),
  mobileNavLinks: document.querySelectorAll('.mobile-nav-link[data-nav-section]'),
  headerSearchBox: document.getElementById('header-search-box'),
  headerSearchToggle: document.getElementById('header-search-toggle'),
  headerSearchInput: document.getElementById('header-search-input'),
  headerSearchClear: document.getElementById('header-search-clear'),
  navFavoritesBtn: document.getElementById('nav-favorites-btn'),
  headerFavCount: document.getElementById('header-fav-count'),
  themeToggle: document.getElementById('theme-toggle'),
  mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
  mobileMenu: document.getElementById('mobile-menu'),
  mobileSearchInput: document.getElementById('mobile-search-input'),
  mobileSearchClear: document.getElementById('mobile-search-clear'),
  mobileFavoritesBtn: document.getElementById('mobile-favorites-btn'),
  mobileFavCount: document.getElementById('mobile-fav-count'),

  heroCollageGrid: document.getElementById('hero-collage-grid'),
  heroTotalCount: document.getElementById('hero-total-count'),

  categoryShowcaseGrid: document.getElementById('category-showcase-grid'),

  gallerySection: document.getElementById('gallery'),
  galleryCountDisplay: document.getElementById('gallery-count-display'),
  filterPills: document.getElementById('filter-pills'),
  gallerySearchInput: document.getElementById('gallery-search-input'),
  gallerySearchClear: document.getElementById('gallery-search-clear'),
  activeFilterBanner: document.getElementById('active-filter-banner'),
  activeFilterText: document.getElementById('active-filter-text'),
  bannerResetBtn: document.getElementById('banner-reset-btn'),
  galleryGrid: document.getElementById('gallery-grid'),
  emptyState: document.getElementById('empty-state'),
  emptyStateTitle: document.getElementById('empty-state-title'),
  emptyStateMessage: document.getElementById('empty-state-message'),
  resetFiltersBtn: document.getElementById('reset-filters-btn'),
  loadMoreWrap: document.getElementById('load-more-wrap'),
  loadMoreBtn: document.getElementById('load-more-btn'),
  loadMoreRemaining: document.getElementById('load-more-remaining'),
  galleryEndNote: document.getElementById('gallery-end-note'),

  aboutTotalFrames: document.getElementById('about-total-frames'),
  aboutTotalCategories: document.getElementById('about-total-categories'),
  aboutTotalFavorites: document.getElementById('about-total-favorites'),

  footerFavoritesLink: document.getElementById('footer-favorites-link'),
  footerCategoryLinks: document.querySelectorAll('[data-footer-category]'),

  lightbox: document.getElementById('lightbox'),
  lightboxDialog: document.getElementById('lightbox-dialog'),
  lightboxCounter: document.getElementById('lightbox-counter'),
  lightboxFavBtn: document.getElementById('lightbox-fav-btn'),
  lightboxClose: document.getElementById('lightbox-close'),
  lightboxPrev: document.getElementById('lightbox-prev'),
  lightboxNext: document.getElementById('lightbox-next'),
  lightboxLoader: document.getElementById('lightbox-loader'),
  lightboxImage: document.getElementById('lightbox-image'),
  lightboxCategory: document.getElementById('lightbox-category'),
  lightboxTitle: document.getElementById('lightbox-title'),
  lightboxMeta: document.getElementById('lightbox-meta'),

  backToTop: document.getElementById('back-to-top'),
};

/* ==========================================================================
   Persistence Utilities (Favorites & Theme)
   ========================================================================== */

/**
 * Safely reads saved favorite IDs from localStorage.
 * @returns {Set<number>}
 */
function loadStoredFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.favorites);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    const validIds = parsed.filter((id) => GALLERY_IMAGES.some((img) => img.id === id));
    return new Set(validIds);
  } catch {
    return new Set();
  }
}

/**
 * Persists favorite IDs to localStorage.
 */
function saveFavorites() {
  try {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify([...state.favorites]));
  } catch {
    // Storage quota or privacy mode fallback: keep working in memory
  }
}

/**
 * Initializes and applies the persisted theme (defaults to dark).
 */
function initTheme() {
  let savedTheme = 'dark';
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.theme);
    if (stored === 'light' || stored === 'dark') {
      savedTheme = stored;
    }
  } catch {
    savedTheme = 'dark';
  }
  applyTheme(savedTheme);
}

/**
 * Applies a theme to the document root and updates toggle accessibility labels.
 * @param {'dark' | 'light'} theme
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const isLight = theme === 'light';
  dom.themeToggle.setAttribute('aria-pressed', String(isLight));
  dom.themeToggle.setAttribute(
    'aria-label',
    isLight ? 'Switch to dark theme' : 'Switch to light theme'
  );

  try {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(current === 'light' ? 'dark' : 'light');
}

/* ==========================================================================
   Image Error & Loading Handling
   ========================================================================== */

/**
 * Attaches graceful loading and error fallback handling to an <img> element.
 * @param {HTMLImageElement} imgEl
 * @param {HTMLElement | null} containerEl
 */
function attachImageHandlers(imgEl, containerEl = null) {
  const markLoaded = () => {
    if (containerEl) {
      containerEl.classList.add('is-loaded');
    }
  };

  imgEl.addEventListener('load', markLoaded);
  imgEl.addEventListener('error', () => {
    if (imgEl.dataset.fallbackApplied === 'true') {
      markLoaded();
      return;
    }
    imgEl.dataset.fallbackApplied = 'true';
    imgEl.src = FALLBACK_IMAGE_PATH;
    markLoaded();
  });

  if (imgEl.complete && imgEl.naturalWidth > 0) {
    markLoaded();
  }
}

/* ==========================================================================
   Filtering, Searching & Derived Counts
   ========================================================================== */

function getCategoryCount(categoryName) {
  if (categoryName === 'All') return GALLERY_IMAGES.length;
  if (categoryName === 'Favorites') return state.favorites.size;
  return GALLERY_IMAGES.filter((img) => img.category === categoryName).length;
}

/**
 * Filters GALLERY_IMAGES by activeCategory and searchQuery.
 * @returns {Array}
 */
function computeFilteredImages() {
  const query = state.searchQuery.trim().toLowerCase();

  return GALLERY_IMAGES.filter((item) => {
    const matchesCategory =
      state.activeCategory === 'All'
        ? true
        : state.activeCategory === 'Favorites'
          ? state.favorites.has(item.id)
          : item.category === state.activeCategory;

    if (!matchesCategory) return false;
    if (!query) return true;

    return (
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query)
    );
  });
}

/* ==========================================================================
   Render Hero Collage & Categories Showcase
   ========================================================================== */

function renderHeroCollage() {
  const featured = GALLERY_IMAGES.filter((item) => item.featuredInHero).slice(0, 4);
  const fragment = document.createDocumentFragment();

  featured.forEach((item) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'collage-card';
    button.setAttribute('aria-label', `Inspect ${item.title} (${item.category}) in lightbox`);

    const img = document.createElement('img');
    img.src = item.thumbUrl;
    img.alt = item.title;
    img.loading = 'eager';
    attachImageHandlers(img);

    const caption = document.createElement('div');
    caption.className = 'collage-caption';

    const textWrap = document.createElement('div');
    const catSpan = document.createElement('span');
    catSpan.textContent = item.category;
    const titleStrong = document.createElement('strong');
    titleStrong.textContent = item.title;
    textWrap.append(catSpan, titleStrong);
    caption.appendChild(textWrap);

    button.append(img, caption);
    button.addEventListener('click', () => {
      // Ensure the featured frame is part of active displayed images so lightbox stays synchronized
      if (!state.displayedImages.some((imgItem) => imgItem.id === item.id)) {
        resetFilters({ scroll: false });
      }
      const idx = state.displayedImages.findIndex((imgItem) => imgItem.id === item.id);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });

    fragment.appendChild(button);
  });

  dom.heroCollageGrid.replaceChildren(fragment);
  dom.heroTotalCount.textContent = String(GALLERY_IMAGES.length);
  dom.aboutTotalFrames.textContent = String(GALLERY_IMAGES.length);
  dom.aboutTotalCategories.textContent = String(CATEGORY_DEFINITIONS.length);
}

function renderCategoryShowcase() {
  const fragment = document.createDocumentFragment();

  CATEGORY_DEFINITIONS.forEach((cat) => {
    const count = getCategoryCount(cat.name);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `category-card${state.activeCategory === cat.name ? ' is-active' : ''}`;
    card.dataset.category = cat.name;
    card.setAttribute('aria-label', `Filter gallery by ${cat.name} (${count} images)`);

    const bgImg = document.createElement('img');
    bgImg.className = 'category-card-bg';
    bgImg.src = cat.coverUrl;
    bgImg.alt = '';
    bgImg.loading = 'lazy';
    attachImageHandlers(bgImg);

    const scrim = document.createElement('div');
    scrim.className = 'category-card-scrim';

    const content = document.createElement('div');
    content.className = 'category-card-content';

    const countBadge = document.createElement('span');
    countBadge.className = 'category-card-count';
    countBadge.textContent = `${count} ${count === 1 ? 'Frame' : 'Frames'}`;

    const title = document.createElement('h3');
    title.className = 'category-card-title';
    title.textContent = cat.name;

    const sub = document.createElement('p');
    sub.className = 'category-card-sub';
    sub.textContent = cat.subtitle;

    content.append(countBadge, title, sub);
    card.append(bgImg, scrim, content);

    card.addEventListener('click', () => {
      setActiveCategory(cat.name, { scrollToGallery: true });
    });

    fragment.appendChild(card);
  });

  dom.categoryShowcaseGrid.replaceChildren(fragment);
}

function syncCategoryShowcaseActiveState() {
  const cards = dom.categoryShowcaseGrid.querySelectorAll('.category-card');
  cards.forEach((card) => {
    card.classList.toggle('is-active', card.dataset.category === state.activeCategory);
  });
}

/* ==========================================================================
   Filter Pills & Counters
   ========================================================================== */

function createHeartSvg() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute(
    'd',
    'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
  );
  svg.appendChild(path);
  return svg;
}

function createExpandSvg() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2.2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');

  const p1 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  p1.setAttribute('points', '15 3 21 3 21 9');
  const p2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  p2.setAttribute('points', '9 21 3 21 3 15');
  const l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  l1.setAttribute('x1', '21');
  l1.setAttribute('y1', '3');
  l1.setAttribute('x2', '14');
  l1.setAttribute('y2', '10');
  const l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  l2.setAttribute('x1', '3');
  l2.setAttribute('y1', '21');
  l2.setAttribute('x2', '10');
  l2.setAttribute('y2', '14');

  svg.append(p1, p2, l1, l2);
  return svg;
}

function renderFilterPills() {
  const filterNames = ['All', ...CATEGORY_DEFINITIONS.map((c) => c.name), 'Favorites'];
  const fragment = document.createDocumentFragment();

  filterNames.forEach((name) => {
    const isActive = state.activeCategory === name;
    const count = getCategoryCount(name);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `filter-pill${isActive ? ' is-active' : ''}`;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', String(isActive));
    btn.dataset.filter = name;

    if (name === 'Favorites') {
      btn.appendChild(createHeartSvg());
    }

    const labelSpan = document.createElement('span');
    labelSpan.textContent = name;

    const countSpan = document.createElement('span');
    countSpan.className = 'pill-count';
    countSpan.textContent = String(count);

    btn.append(labelSpan, countSpan);
    btn.addEventListener('click', () => {
      setActiveCategory(name);
    });

    fragment.appendChild(btn);
  });

  dom.filterPills.replaceChildren(fragment);
}

function syncFavoriteCounters() {
  const favCount = state.favorites.size;
  dom.headerFavCount.textContent = String(favCount);
  dom.mobileFavCount.textContent = String(favCount);
  dom.aboutTotalFavorites.textContent = String(favCount);

  const isFavActive = state.activeCategory === 'Favorites';
  dom.navFavoritesBtn.classList.toggle('is-active', isFavActive);

  const favPillCount = dom.filterPills.querySelector('[data-filter="Favorites"] .pill-count');
  if (favPillCount) {
    favPillCount.textContent = String(favCount);
  }
}

/* ==========================================================================
   Gallery Card Creation & CSS Grid Masonry Layout
   ========================================================================== */

/**
 * Creates an individual gallery card DOM node.
 * @param {object} item
 * @param {number} displayIndex
 * @param {number} staggerIndex
 * @returns {HTMLElement}
 */
function createGalleryCard(item, displayIndex, staggerIndex) {
  const card = document.createElement('article');
  card.className = 'gallery-card';
  card.dataset.id = String(item.id);
  card.style.setProperty('--stagger', `${Math.min(staggerIndex * 45, 360)}ms`);

  const isFav = state.favorites.has(item.id);

  // Main button opening Lightbox
  const triggerBtn = document.createElement('button');
  triggerBtn.type = 'button';
  triggerBtn.className = 'card-trigger';
  triggerBtn.setAttribute('aria-label', `View ${item.title} (${item.category}) in full screen`);

  const media = document.createElement('div');
  media.className = 'card-media';
  media.dataset.aspect = item.aspect;

  const img = document.createElement('img');
  img.className = 'card-image';
  img.src = item.thumbUrl;
  img.alt = `${item.title} — ${item.category}`;
  img.loading = 'lazy';
  img.decoding = 'async';
  attachImageHandlers(img, media);

  // Top metadata row (number + category label)
  const topBar = document.createElement('div');
  topBar.className = 'card-top-bar';

  const leftBadges = document.createElement('div');
  leftBadges.className = 'card-badges-left';

  const indexBadge = document.createElement('span');
  indexBadge.className = 'card-index-badge';
  indexBadge.textContent = `#${String(item.id).padStart(2, '0')}`;

  const categoryBadge = document.createElement('span');
  categoryBadge.className = 'card-category-badge';
  categoryBadge.textContent = item.category;

  leftBadges.append(indexBadge, categoryBadge);
  topBar.appendChild(leftBadges);

  // Hover Overlay (Title, Location & Expand Indicator)
  const overlay = document.createElement('div');
  overlay.className = 'card-hover-overlay';

  const overlayRow = document.createElement('div');
  overlayRow.className = 'card-overlay-row';

  const textBlock = document.createElement('div');
  const titleEl = document.createElement('h3');
  titleEl.className = 'card-title';
  titleEl.textContent = item.title;

  const metaEl = document.createElement('p');
  metaEl.className = 'card-meta';
  metaEl.textContent = item.location;

  textBlock.append(titleEl, metaEl);

  const expandBadge = document.createElement('span');
  expandBadge.className = 'card-expand-indicator';
  expandBadge.setAttribute('aria-hidden', 'true');
  expandBadge.appendChild(createExpandSvg());

  overlayRow.append(textBlock, expandBadge);
  overlay.appendChild(overlayRow);

  media.append(img, topBar, overlay);
  triggerBtn.appendChild(media);

  triggerBtn.addEventListener('click', () => {
    const currentIdx = state.displayedImages.findIndex((entry) => entry.id === item.id);
    if (currentIdx !== -1) {
      openLightbox(currentIdx);
    }
  });

  // Independent Favorite Heart Button
  const favBtn = document.createElement('button');
  favBtn.type = 'button';
  favBtn.className = `card-fav-btn${isFav ? ' is-favorited' : ''}`;
  favBtn.setAttribute('aria-pressed', String(isFav));
  favBtn.setAttribute(
    'aria-label',
    isFav ? `Remove ${item.title} from favorites` : `Save ${item.title} to favorites`
  );
  favBtn.title = isFav ? 'Remove from favorites' : 'Add to favorites';
  favBtn.appendChild(createHeartSvg());

  favBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleFavorite(item.id);
  });

  card.append(triggerBtn, favBtn);
  return card;
}

/**
 * Calculates CSS Grid row spans so varied aspect-ratio cards stack tightly
 * with zero horizontal or vertical gaps across desktop, tablet, and mobile.
 */
function layoutMasonryGrid() {
  const grid = dom.galleryGrid;
  if (!grid || grid.children.length === 0) return;

  const styles = window.getComputedStyle(grid);
  const rowUnit = parseFloat(styles.getPropertyValue('grid-auto-rows')) || 8;
  const cards = grid.querySelectorAll('.gallery-card');

  cards.forEach((card) => {
    const cardMarginBottom = parseFloat(window.getComputedStyle(card).marginBottom) || 24;
    const height = card.offsetHeight;
    const rowSpan = Math.ceil((height + cardMarginBottom) / rowUnit);
    card.style.gridRowEnd = `span ${rowSpan}`;
  });
}

/* ==========================================================================
   Gallery Rendering, Counters, Empty State & Load More
   ========================================================================== */

function updateGalleryStatusAndPagination() {
  const totalFiltered = state.filteredImages.length;
  const shown = state.displayedImages.length;
  const hasQuery = state.searchQuery.trim().length > 0;
  const isFiltered = state.activeCategory !== 'All' || hasQuery;

  // Update Image Counter
  if (totalFiltered === 0) {
    dom.galleryCountDisplay.textContent = 'Showing 0 images';
  } else if (isFiltered) {
    dom.galleryCountDisplay.textContent = `Showing ${shown} of ${totalFiltered} matching ${totalFiltered === 1 ? 'image' : 'images'}`;
  } else {
    dom.galleryCountDisplay.textContent = `Showing ${shown} of ${GALLERY_IMAGES.length} images`;
  }

  // Active Filter / Search Banner
  if (isFiltered) {
    const parts = [];
    if (state.activeCategory !== 'All') {
      parts.push(`Category: ${state.activeCategory}`);
    }
    if (hasQuery) {
      parts.push(`Search: "${state.searchQuery.trim()}"`);
    }
    dom.activeFilterText.textContent = `${parts.join('  •  ')} (${totalFiltered} ${totalFiltered === 1 ? 'result' : 'results'})`;
    dom.activeFilterBanner.hidden = false;
  } else {
    dom.activeFilterBanner.hidden = true;
  }

  // Empty State Handling
  if (totalFiltered === 0) {
    dom.galleryGrid.style.display = 'none';
    dom.emptyState.hidden = false;
    dom.loadMoreWrap.hidden = true;

    if (state.activeCategory === 'Favorites' && !hasQuery) {
      dom.emptyStateTitle.textContent = 'No favorite frames saved yet';
      dom.emptyStateMessage.textContent =
        'Tap the heart icon on any photograph to build your personal curated collection.';
    } else {
      dom.emptyStateTitle.textContent = 'No matching images found';
      dom.emptyStateMessage.textContent =
        'Try another keyword, clear your search query, or explore a different visual category.';
    }
  } else {
    dom.galleryGrid.style.display = 'grid';
    dom.emptyState.hidden = true;
    dom.loadMoreWrap.hidden = false;

    const remaining = totalFiltered - shown;
    if (remaining > 0) {
      dom.loadMoreBtn.hidden = false;
      dom.loadMoreRemaining.textContent = `+${Math.min(LOAD_MORE_STEP, remaining)} (${remaining} left)`;
      dom.galleryEndNote.hidden = true;
    } else {
      dom.loadMoreBtn.hidden = true;
      dom.galleryEndNote.hidden = false;
      dom.galleryEndNote.textContent = `Displaying all ${totalFiltered} curated ${totalFiltered === 1 ? 'frame' : 'frames'}.`;
    }
  }
}

/**
 * Full gallery re-render (used on filter or search updates).
 */
function renderGallery() {
  state.filteredImages = computeFilteredImages();
  state.displayedImages = state.filteredImages.slice(0, state.visibleCount);

  const fragment = document.createDocumentFragment();
  state.displayedImages.forEach((item, idx) => {
    fragment.appendChild(createGalleryCard(item, idx, idx));
  });

  dom.galleryGrid.replaceChildren(fragment);
  layoutMasonryGrid();
  updateGalleryStatusAndPagination();
  renderFilterPills();
  syncCategoryShowcaseActiveState();
  syncFavoriteCounters();

  requestAnimationFrame(layoutMasonryGrid);
}

/**
 * Appends only the newly revealed batch when "Load More" is clicked
 * so already-visible cards do not flicker or replay entrance animations.
 */
function handleLoadMore() {
  const prevCount = state.displayedImages.length;
  state.visibleCount += LOAD_MORE_STEP;
  state.displayedImages = state.filteredImages.slice(0, state.visibleCount);

  const newItems = state.displayedImages.slice(prevCount);
  const fragment = document.createDocumentFragment();

  newItems.forEach((item, offset) => {
    fragment.appendChild(createGalleryCard(item, prevCount + offset, offset));
  });

  dom.galleryGrid.appendChild(fragment);
  layoutMasonryGrid();
  updateGalleryStatusAndPagination();
  requestAnimationFrame(layoutMasonryGrid);
}

/* ==========================================================================
   Category Filtering, Search Synchronization & Favorites
   ========================================================================== */

function setActiveCategory(categoryName, options = {}) {
  state.activeCategory = categoryName;
  state.visibleCount = INITIAL_VISIBLE_COUNT;
  renderGallery();

  if (options.scrollToGallery) {
    dom.gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function setSearchQuery(rawValue) {
  state.searchQuery = rawValue;
  state.visibleCount = INITIAL_VISIBLE_COUNT;

  const inputs = [
    dom.headerSearchInput,
    dom.mobileSearchInput,
    dom.gallerySearchInput,
  ];
  inputs.forEach((input) => {
    if (input && input.value !== rawValue) {
      input.value = rawValue;
    }
  });

  const hasText = rawValue.length > 0;
  dom.headerSearchClear.hidden = !hasText;
  dom.mobileSearchClear.hidden = !hasText;
  dom.gallerySearchClear.hidden = !hasText;

  if (hasText) {
    dom.headerSearchBox.classList.add('is-expanded');
    dom.headerSearchToggle.setAttribute('aria-expanded', 'true');
  }

  renderGallery();
}

function resetFilters(options = { scroll: false }) {
  state.activeCategory = 'All';
  setSearchQuery('');
  if (options.scroll) {
    dom.gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function toggleFavorite(imageId) {
  const wasFavorited = state.favorites.has(imageId);
  if (wasFavorited) {
    state.favorites.delete(imageId);
  } else {
    state.favorites.add(imageId);
  }
  saveFavorites();

  // Update card button state in place (or re-render if currently viewing Favorites view)
  if (state.activeCategory === 'Favorites') {
    const activeLightboxItem =
      state.lightboxIndex >= 0 ? state.displayedImages[state.lightboxIndex] : null;

    renderGallery();

    if (dom.lightbox.classList.contains('is-open')) {
      if (state.displayedImages.length === 0) {
        closeLightbox();
      } else if (activeLightboxItem && !state.favorites.has(activeLightboxItem.id)) {
        const nextIndex = Math.min(state.lightboxIndex, state.displayedImages.length - 1);
        updateLightboxContent(nextIndex);
      }
    }
    return;
  }

  const cardBtn = dom.galleryGrid.querySelector(`.gallery-card[data-id="${imageId}"] .card-fav-btn`);
  if (cardBtn) {
    const nowFav = !wasFavorited;
    cardBtn.classList.toggle('is-favorited', nowFav);
    cardBtn.setAttribute('aria-pressed', String(nowFav));
    cardBtn.title = nowFav ? 'Remove from favorites' : 'Add to favorites';
  }

  syncFavoriteCounters();
  syncLightboxFavoriteButton();
}

/* ==========================================================================
   JavaScript Lightbox Viewer
   ========================================================================== */

function syncLightboxFavoriteButton() {
  if (state.lightboxIndex < 0 || !state.displayedImages[state.lightboxIndex]) return;
  const item = state.displayedImages[state.lightboxIndex];
  const isFav = state.favorites.has(item.id);

  dom.lightboxFavBtn.classList.toggle('is-favorited', isFav);
  dom.lightboxFavBtn.setAttribute('aria-pressed', String(isFav));
  dom.lightboxFavBtn.setAttribute(
    'aria-label',
    isFav ? `Remove ${item.title} from favorites` : `Save ${item.title} to favorites`
  );
  dom.lightboxFavBtn.title = isFav ? 'Remove from favorites' : 'Save to favorites';
}

function updateLightboxContent(index) {
  const list = state.displayedImages;
  if (!list.length) return;

  // Continuous wrap-around navigation
  const wrappedIndex = ((index % list.length) + list.length) % list.length;
  state.lightboxIndex = wrappedIndex;
  const item = list[wrappedIndex];

  dom.lightboxCounter.textContent = `${wrappedIndex + 1} / ${list.length}`;
  dom.lightboxCategory.textContent = item.category;
  dom.lightboxTitle.textContent = item.title;
  dom.lightboxMeta.textContent = `${item.location}  •  Frame #${String(item.id).padStart(2, '0')}`;

  dom.lightboxImage.classList.remove('is-ready');
  dom.lightboxLoader.classList.add('is-visible');
  dom.lightboxImage.dataset.fallbackApplied = 'false';
  dom.lightboxImage.alt = `${item.title} — ${item.category}`;
  dom.lightboxImage.src = item.fullUrl;

  syncLightboxFavoriteButton();

  // Disable arrows visually only if a single filtered photo exists
  const singleItem = list.length <= 1;
  dom.lightboxPrev.disabled = singleItem;
  dom.lightboxNext.disabled = singleItem;
  dom.lightboxPrev.style.opacity = singleItem ? '0.35' : '';
  dom.lightboxNext.style.opacity = singleItem ? '0.35' : '';
}

function openLightbox(index) {
  if (!state.displayedImages.length) return;
  state.lastFocusedElement = document.activeElement;

  updateLightboxContent(index);
  dom.lightbox.classList.add('is-open');
  dom.lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  dom.lightboxClose.focus({ preventScroll: true });
}

function closeLightbox() {
  if (!dom.lightbox.classList.contains('is-open')) return;

  dom.lightbox.classList.remove('is-open');
  dom.lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  state.lightboxIndex = -1;

  if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
    state.lastFocusedElement.focus({ preventScroll: true });
    state.lastFocusedElement = null;
  }
}

function showNextLightboxImage() {
  if (state.displayedImages.length <= 1) return;
  updateLightboxContent(state.lightboxIndex + 1);
}

function showPrevLightboxImage() {
  if (state.displayedImages.length <= 1) return;
  updateLightboxContent(state.lightboxIndex - 1);
}

/* ==========================================================================
   Navigation, Mobile Drawer, Scroll Spy & Reveal Animations
   ========================================================================== */

function toggleMobileMenu(forceState) {
  const isOpen =
    typeof forceState === 'boolean'
      ? forceState
      : !dom.mobileMenu.classList.contains('is-open');

  dom.mobileMenu.classList.toggle('is-open', isOpen);
  dom.mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  dom.mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
  dom.mobileMenuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation menu' : 'Open navigation menu'
  );
}

function updateActiveNavSection(sectionId) {
  dom.navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.navSection === sectionId);
  });
  dom.mobileNavLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.navSection === sectionId);
  });
}

function updateActiveNavFromScroll() {
  const sectionIds = ['home', 'categories', 'gallery', 'about'];
  const headerOffset = (dom.siteHeader?.offsetHeight || 76) + 120;

  // If scrolled to the very bottom, highlight the final section
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24) {
    updateActiveNavSection('about');
    return;
  }

  let currentSection = 'home';
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= headerOffset) {
      currentSection = id;
    }
  }
  updateActiveNavSection(currentSection);
}

function initScrollObservers() {
  // 1. Scroll-triggered entrance reveals
  const revealEls = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-revealed'));
  }

  // 2. Masonry layout recalculation on grid resize
  if ('ResizeObserver' in window) {
    const gridResizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(layoutMasonryGrid);
    });
    gridResizeObserver.observe(dom.galleryGrid);
  }
}

function handleScrollState() {
  const y = window.scrollY;
  dom.siteHeader.classList.toggle('scrolled', y > 18);
  dom.backToTop.classList.toggle('is-visible', y > 420);
  updateActiveNavFromScroll();
}

/* ==========================================================================
   Event Wiring & Initialization
   ========================================================================== */

function bindEvents() {
  // Theme switcher
  dom.themeToggle.addEventListener('click', toggleTheme);

  // Header expandable search
  dom.headerSearchToggle.addEventListener('click', () => {
    const isExpanded = dom.headerSearchBox.classList.toggle('is-expanded');
    dom.headerSearchToggle.setAttribute('aria-expanded', String(isExpanded));
    if (isExpanded) {
      dom.headerSearchInput.focus();
    }
  });

  // Synchronized live search across all search bars
  [
    { input: dom.headerSearchInput, clear: dom.headerSearchClear, isTopBar: true },
    { input: dom.mobileSearchInput, clear: dom.mobileSearchClear, isTopBar: true },
    { input: dom.gallerySearchInput, clear: dom.gallerySearchClear, isTopBar: false },
  ].forEach(({ input, clear, isTopBar }) => {
    input.addEventListener('input', (event) => {
      setSearchQuery(event.target.value);
    });

    if (isTopBar) {
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          toggleMobileMenu(false);
          dom.gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    clear.addEventListener('click', () => {
      setSearchQuery('');
      input.focus();
    });
  });

  // Collapse header search if empty and clicked outside
  document.addEventListener('click', (event) => {
    if (
      dom.headerSearchBox.classList.contains('is-expanded') &&
      !dom.headerSearchBox.contains(event.target) &&
      !dom.headerSearchInput.value.trim()
    ) {
      dom.headerSearchBox.classList.remove('is-expanded');
      dom.headerSearchToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Quick Favorites navigation buttons
  dom.navFavoritesBtn.addEventListener('click', () => {
    setActiveCategory('Favorites', { scrollToGallery: true });
  });

  dom.mobileFavoritesBtn.addEventListener('click', () => {
    toggleMobileMenu(false);
    setActiveCategory('Favorites', { scrollToGallery: true });
  });

  dom.footerFavoritesLink.addEventListener('click', (event) => {
    event.preventDefault();
    setActiveCategory('Favorites', { scrollToGallery: true });
  });

  // Footer category links filter gallery smoothly
  dom.footerCategoryLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const cat = link.dataset.footerCategory;
      if (cat) {
        setActiveCategory(cat, { scrollToGallery: true });
      }
    });
  });

  // Mobile Hamburger Menu
  dom.mobileMenuToggle.addEventListener('click', () => toggleMobileMenu());

  dom.mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820 && dom.mobileMenu.classList.contains('is-open')) {
      toggleMobileMenu(false);
    }
    requestAnimationFrame(layoutMasonryGrid);
  });

  // Load More & Reset Filters
  dom.loadMoreBtn.addEventListener('click', handleLoadMore);
  dom.bannerResetBtn.addEventListener('click', () => resetFilters({ scroll: false }));
  dom.resetFiltersBtn.addEventListener('click', () => resetFilters({ scroll: false }));

  // Lightbox Image Load & Error Handlers
  dom.lightboxImage.addEventListener('load', () => {
    dom.lightboxLoader.classList.remove('is-visible');
    dom.lightboxImage.classList.add('is-ready');
  });

  dom.lightboxImage.addEventListener('error', () => {
    dom.lightboxLoader.classList.remove('is-visible');
    if (dom.lightboxImage.dataset.fallbackApplied !== 'true') {
      dom.lightboxImage.dataset.fallbackApplied = 'true';
      dom.lightboxImage.src = FALLBACK_IMAGE_PATH;
    }
    dom.lightboxImage.classList.add('is-ready');
  });

  // Lightbox Controls
  dom.lightboxClose.addEventListener('click', closeLightbox);
  dom.lightboxPrev.addEventListener('click', showPrevLightboxImage);
  dom.lightboxNext.addEventListener('click', showNextLightboxImage);

  dom.lightboxFavBtn.addEventListener('click', () => {
    if (state.lightboxIndex >= 0 && state.displayedImages[state.lightboxIndex]) {
      toggleFavorite(state.displayedImages[state.lightboxIndex].id);
    }
  });

  // Close when clicking outside image/dialog controls; never close when clicking inside image/caption
  dom.lightbox.addEventListener('click', (event) => {
    const clickedInsideContent = event.target.closest(
      '.lightbox-figure, .lightbox-nav-btn, .lightbox-topbar'
    );
    if (!clickedInsideContent) {
      closeLightbox();
    }
  });

  // Keyboard navigation for Lightbox & Mobile Drawer
  document.addEventListener('keydown', (event) => {
    if (dom.lightbox.classList.contains('is-open')) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNextLightboxImage();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrevLightboxImage();
      }
      return;
    }

    if (event.key === 'Escape' && dom.mobileMenu.classList.contains('is-open')) {
      toggleMobileMenu(false);
    }
  });

  // Touch swipe navigation inside Lightbox
  let touchStartX = 0;
  dom.lightboxDialog.addEventListener(
    'touchstart',
    (event) => {
      if (event.changedTouches.length > 0) {
        touchStartX = event.changedTouches[0].clientX;
      }
    },
    { passive: true }
  );

  dom.lightboxDialog.addEventListener(
    'touchend',
    (event) => {
      if (event.changedTouches.length === 0) return;
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          showNextLightboxImage();
        } else {
          showPrevLightboxImage();
        }
      }
    },
    { passive: true }
  );

  // Back-to-Top & Header Scroll State
  window.addEventListener('scroll', handleScrollState, { passive: true });
  dom.backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initApp() {
  initTheme();
  renderHeroCollage();
  renderCategoryShowcase();
  renderGallery();
  bindEvents();
  initScrollObservers();
  handleScrollState();
}

document.addEventListener('DOMContentLoaded', initApp);

